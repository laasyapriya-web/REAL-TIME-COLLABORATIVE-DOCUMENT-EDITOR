import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import DocumentList from './components/DocumentList';
import DocumentEditor from './components/DocumentEditor';

const theme = createTheme();

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/" element={<DocumentList />} />
          <Route path="/documents/:id" element={<DocumentEditor />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;
