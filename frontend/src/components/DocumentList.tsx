import React, { useEffect, useState } from 'react';
import {
  Container,
  Grid,
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  IconButton,
  Box,
  AppBar,
  Toolbar,
  InputAdornment,
} from '@mui/material';
import {
  Delete as DeleteIcon,
  Edit as EditIcon,
  Description as DescriptionIcon,
  Add as AddIcon,
  Search as SearchIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Document } from '../types/document';

const API_URL = 'http://localhost:5000/api';

const DocumentList: React.FC = () => {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [open, setOpen] = useState(false);
  const [newDocTitle, setNewDocTitle] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const fetchDocuments = async () => {
    try {
      const response = await axios.get<Document[]>(`${API_URL}/documents`);
      setDocuments(response.data);
    } catch (error) {
      console.error('Error fetching documents:', error);
    }
  };

  useEffect(() => {
    fetchDocuments();
  }, []);

  const handleCreateDocument = async () => {
    if (!newDocTitle.trim()) {
      return; // Don't create empty titled documents
    }

    try {
      const response = await axios.post(`${API_URL}/documents`, {
        title: newDocTitle,
        content: '',
        createdBy: 'user', // You might want to replace this with actual user ID from auth
      });
      
      setOpen(false);
      setNewDocTitle('');
      await fetchDocuments(); // Refresh the document list
      
      // Navigate to the new document
      navigate(`/documents/${response.data._id}`);
    } catch (error) {
      console.error('Error creating document:', error);
      // You might want to show an error message to the user here
    }
  };

  const handleDeleteDocument = async (id: string) => {
    try {
      await axios.delete(`${API_URL}/documents/${id}`);
      fetchDocuments();
    } catch (error) {
      console.error('Error deleting document:', error);
    }
  };

  const handleDialogClose = () => {
    setOpen(false);
    setNewDocTitle('');
  };

  const filteredDocuments = documents.filter(doc =>
    doc.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box sx={{ 
      minHeight: '100vh',
      backgroundColor: '#f8f9fa',
      background: 'linear-gradient(145deg, #f8f9fa 0%, #ffffff 100%)'
    }}>
      <AppBar position="static" color="transparent" elevation={0} sx={{ 
        borderBottom: '1px solid #e0e0e0',
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        backdropFilter: 'blur(10px)'
      }}>
        <Toolbar sx={{ minHeight: '64px' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', width: '240px' }}>
            <DescriptionIcon sx={{ 
              fontSize: 32, 
              color: 'primary.main',
              mr: 2,
              filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))'
            }} />
            <Typography variant="h6" component="h1" sx={{ 
              fontFamily: "'Google Sans', sans-serif",
              fontWeight: 500,
              fontSize: '22px',
              background: 'linear-gradient(90deg, #1a73e8 0%, #4285f4 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              DocCraft
            </Typography>
          </Box>

          <Box sx={{ 
            flexGrow: 1, 
            display: 'flex', 
            justifyContent: 'center',
            maxWidth: '720px',
            margin: '0 auto'
          }}>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Search documents..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon sx={{ color: 'rgba(0,0,0,0.4)' }} />
                  </InputAdornment>
                ),
                sx: { 
                  fontFamily: "'Google Sans', sans-serif",
                  height: '48px',
                  backgroundColor: 'rgba(255,255,255,0.8)',
                  backdropFilter: 'blur(10px)',
                  transition: 'all 0.2s ease',
                  '&:hover': {
                    backgroundColor: '#ffffff',
                    boxShadow: '0 2px 6px rgba(0,0,0,0.05)'
                  }
                }
              }}
              sx={{ 
                maxWidth: '720px',
                '& .MuiOutlinedInput-root': {
                  borderRadius: '12px',
                  '& fieldset': {
                    borderColor: 'transparent'
                  },
                  '&:hover fieldset': {
                    borderColor: 'transparent'
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: 'transparent',
                    boxShadow: '0 0 0 2px rgba(26,115,232,0.2)'
                  }
                }
              }}
            />
          </Box>

          <Box sx={{ width: '240px', display: 'flex', justifyContent: 'flex-end' }}>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => setOpen(true)}
              sx={{ 
                borderRadius: 20,
                textTransform: 'none',
                fontFamily: "'Google Sans', sans-serif",
                fontWeight: 500,
                px: 3,
                background: 'linear-gradient(45deg, #1a73e8 0%, #4285f4 100%)',
                boxShadow: '0 2px 8px rgba(26,115,232,0.3)',
                transition: 'all 0.2s ease',
                '&:hover': {
                  boxShadow: '0 4px 12px rgba(26,115,232,0.4)'
                }
              }}
            >
              New Document
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Grid container spacing={3}>
          {filteredDocuments.map((doc) => (
            <Grid item xs={12} sm={6} md={4} key={doc._id}>
              <Card 
                sx={{ 
                  height: '100%', 
                  display: 'flex', 
                  flexDirection: 'column',
                  transition: 'all 0.3s ease',
                  backgroundColor: 'rgba(255,255,255,0.8)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(0,0,0,0.05)',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: '0 12px 20px rgba(0,0,0,0.1)',
                    backgroundColor: '#ffffff'
                  }
                }}
              >
                <CardContent sx={{ flexGrow: 1, p: 3 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <DescriptionIcon sx={{ 
                      color: 'primary.main',
                      mr: 1,
                      opacity: 0.8
                    }} />
                    <Typography 
                      variant="h6" 
                      component="h2" 
                      noWrap
                      sx={{ 
                        fontFamily: "'Google Sans', sans-serif",
                        fontWeight: 500
                      }}
                    >
                      {doc.title}
                    </Typography>
                  </Box>
                  <Typography 
                    variant="body2" 
                    color="text.secondary"
                    sx={{ 
                      fontFamily: "'Google Sans', sans-serif",
                      opacity: 0.7
                    }}
                  >
                    Last modified: {new Date(doc.updatedAt).toLocaleDateString()}
                  </Typography>
                </CardContent>
                <CardActions sx={{ px: 3, pb: 2 }}>
                  <Button
                    size="small"
                    startIcon={<EditIcon />}
                    onClick={() => navigate(`/documents/${doc._id}`)}
                    sx={{ 
                      textTransform: 'none',
                      fontFamily: "'Google Sans', sans-serif",
                      fontWeight: 500,
                      color: 'primary.main'
                    }}
                  >
                    Open
                  </Button>
                  <IconButton
                    size="small"
                    onClick={() => handleDeleteDocument(doc._id)}
                    sx={{ 
                      ml: 'auto',
                      color: 'error.main',
                      opacity: 0.7,
                      '&:hover': {
                        opacity: 1,
                        backgroundColor: 'error.lighter'
                      }
                    }}
                  >
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      <Dialog 
        open={open} 
        onClose={handleDialogClose}
        PaperProps={{
          sx: {
            borderRadius: 2,
            width: '100%',
            maxWidth: '400px',
          }
        }}
      >
        <DialogTitle sx={{ 
          fontFamily: "'Google Sans', sans-serif",
          borderBottom: '1px solid #e0e0e0',
          pb: 2
        }}>
          Create New Document
        </DialogTitle>
        <DialogContent sx={{ mt: 2 }}>
          <TextField
            autoFocus
            margin="dense"
            label="Document Title"
            fullWidth
            value={newDocTitle}
            onChange={(e) => setNewDocTitle(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                handleCreateDocument();
              }
            }}
            InputProps={{
              sx: { fontFamily: "'Google Sans', sans-serif" }
            }}
            InputLabelProps={{
              sx: { fontFamily: "'Google Sans', sans-serif" }
            }}
          />
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button 
            onClick={handleDialogClose}
            sx={{ 
              textTransform: 'none',
              fontFamily: "'Google Sans', sans-serif",
              fontWeight: 500
            }}
          >
            Cancel
          </Button>
          <Button 
            onClick={handleCreateDocument}
            variant="contained"
            disabled={!newDocTitle.trim()}
            sx={{ 
              borderRadius: 20,
              textTransform: 'none',
              fontFamily: "'Google Sans', sans-serif",
              fontWeight: 500,
              px: 3
            }}
          >
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default DocumentList; 