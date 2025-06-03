import React, { useEffect, useState, useCallback } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { io, Socket } from 'socket.io-client';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  TextField,
  IconButton,
  Box,
  Typography,
  Button,
  Container,
  Paper,
  Snackbar,
} from '@mui/material';
import {
  ArrowBack as ArrowBackIcon,
  Save as SaveIcon,
  Description as DescriptionIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { Document, UpdateDocumentRequest } from '../types/document';

const SAVE_INTERVAL_MS = 2000;
const SOCKET_URL = 'http://localhost:5000';
const API_URL = 'http://localhost:5000/api';

const DocumentEditor: React.FC = () => {
  const { id: documentId } = useParams<{ id: string }>();
  const [socket, setSocket] = useState<Socket | null>(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [saveStatus, setSaveStatus] = useState<'saving' | 'saved' | 'error'>('saved');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const s = io(SOCKET_URL);
    setSocket(s);

    return () => {
      s.disconnect();
    };
  }, []);

  useEffect(() => {
    if (socket == null || documentId == null) return;

    socket.emit('join-document', documentId);

    socket.on('document-change', (newContent: string) => {
      setContent(newContent);
    });

    const loadDocument = async () => {
      try {
        const response = await axios.get<Document>(`${API_URL}/documents/${documentId}`);
        setTitle(response.data.title);
        setContent(response.data.content);
        setLastSaved(new Date(response.data.updatedAt));
        setSaveStatus('saved');
      } catch (error) {
        console.error('Error loading document:', error);
        setSnackbarMessage('Error loading document');
        setSnackbarOpen(true);
      }
    };

    loadDocument();

    return () => {
      socket.off('document-change');
    };
  }, [socket, documentId]);

  const saveDocument = useCallback(async () => {
    if (!documentId) return;
    
    setSaveStatus('saving');
    try {
      const updateData: UpdateDocumentRequest = {};
      if (title) updateData.title = title;
      if (content) updateData.content = content;
      
      const response = await axios.put(`${API_URL}/documents/${documentId}`, updateData);
      setLastSaved(new Date(response.data.updatedAt));
      setSaveStatus('saved');
      setSnackbarMessage('Document saved successfully');
      setSnackbarOpen(true);
    } catch (error) {
      console.error('Error saving document:', error);
      setSaveStatus('error');
      setSnackbarMessage('Error saving document');
      setSnackbarOpen(true);
    }
  }, [documentId, title, content]);

  useEffect(() => {
    if (socket == null || documentId == null) return;

    const interval = setInterval(saveDocument, SAVE_INTERVAL_MS);

    return () => {
      clearInterval(interval);
    };
  }, [socket, documentId, content, title, saveDocument]);

  const handleChange = (value: string) => {
    setContent(value);
    setSaveStatus('saving');
    if (socket) {
      socket.emit('document-change', { documentId, content: value });
    }
  };

  const handleTitleChange = async (newTitle: string) => {
    setTitle(newTitle);
    setSaveStatus('saving');
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <AppBar position="static" color="default" elevation={1}>
        <Toolbar>
          <IconButton edge="start" onClick={() => navigate('/')} sx={{ mr: 2 }}>
            <ArrowBackIcon />
          </IconButton>
          <DescriptionIcon sx={{ mr: 2, color: 'primary.main' }} />
          <Box sx={{ flexGrow: 1 }}>
            <TextField
              value={title}
              onChange={(e) => handleTitleChange(e.target.value)}
              variant="standard"
              sx={{
                '& .MuiInputBase-input': {
                  fontSize: '1.2rem',
                  fontWeight: 500,
                  fontFamily: "'Google Sans', sans-serif",
                },
                '& .MuiInput-underline:before': { borderBottom: 'none' },
                '& .MuiInput-underline:hover:before': { borderBottom: 'none' },
                '& .MuiInput-underline:after': { borderBottom: 'none' },
              }}
              placeholder="Untitled document"
            />
            <Typography 
              variant="caption" 
              color="text.secondary" 
              sx={{ 
                display: 'block',
                fontFamily: "'Google Sans', sans-serif"
              }}
            >
              {saveStatus === 'saving' ? 'Saving...' : 
               saveStatus === 'saved' ? `Last saved: ${lastSaved?.toLocaleTimeString()}` :
               'Error saving'}
            </Typography>
          </Box>
          <Button
            startIcon={<SaveIcon />}
            variant="contained"
            sx={{ 
              borderRadius: 20,
              textTransform: 'none',
              fontFamily: "'Google Sans', sans-serif",
              fontWeight: 500
            }}
            onClick={saveDocument}
            disabled={saveStatus === 'saving'}
          >
            {saveStatus === 'saving' ? 'Saving...' : 'Save'}
          </Button>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ flexGrow: 1, py: 3 }}>
        <Paper 
          elevation={0} 
          sx={{ 
            minHeight: 'calc(100vh - 180px)',
            backgroundColor: '#ffffff',
            border: '1px solid #e0e0e0',
            borderRadius: 2,
            boxShadow: '0 1px 3px rgba(0,0,0,0.12)',
            '& .ql-container': {
              minHeight: 'calc(100vh - 240px)',
              fontSize: '16px',
              fontFamily: "'Google Sans', Arial, sans-serif",
            },
            '& .ql-editor': {
              padding: '40px',
              maxWidth: '816px',
              margin: '0 auto',
            },
            '& .ql-toolbar': {
              borderTop: 'none',
              borderLeft: 'none',
              borderRight: 'none',
              borderBottom: '1px solid #e0e0e0',
              padding: '8px 40px',
            },
            '& .ql-formats': {
              marginRight: '15px',
            },
          }}
        >
          <ReactQuill
            theme="snow"
            value={content}
            onChange={handleChange}
            modules={{
              toolbar: [
                [{ 'header': [1, 2, 3, false] }],
                ['bold', 'italic', 'underline', 'strike'],
                [{ 'color': [] }, { 'background': [] }],
                [{ 'align': [] }],
                [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                ['link', 'image'],
                ['clean']
              ],
            }}
          />
        </Paper>
      </Container>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        message={snackbarMessage}
      />
    </Box>
  );
};

export default DocumentEditor; 