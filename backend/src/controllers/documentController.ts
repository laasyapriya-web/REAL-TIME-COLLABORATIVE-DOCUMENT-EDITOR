import { Request, Response } from 'express';
import Document, { IDocument } from '../models/Document';

// Create a new document
export const createDocument = async (req: Request, res: Response) => {
  try {
    const { title, createdBy = 'anonymous' } = req.body;
    
    if (!title) {
      return res.status(400).json({ message: 'Title is required' });
    }

    const document = await Document.create({
      title,
      createdBy,
      content: '',
      collaborators: [createdBy]
    });

    res.status(201).json(document);
  } catch (error) {
    console.error('Error creating document:', error);
    res.status(500).json({ 
      message: 'Error creating document', 
      error: error instanceof Error ? error.message : 'Unknown error' 
    });
  }
};

// Get all documents
export const getDocuments = async (req: Request, res: Response) => {
  try {
    const documents = await Document.find().sort({ updatedAt: -1 });
    res.json(documents);
  } catch (error) {
    console.error('Error fetching documents:', error);
    res.status(500).json({ 
      message: 'Error fetching documents',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

// Get a single document
export const getDocument = async (req: Request, res: Response) => {
  try {
    const document = await Document.findById(req.params.id);
    if (!document) {
      return res.status(404).json({ message: 'Document not found' });
    }
    res.json(document);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching document', error });
  }
};

// Update document content
export const updateDocument = async (req: Request, res: Response) => {
  try {
    const { content } = req.body;
    const document = await Document.findByIdAndUpdate(
      req.params.id,
      { content },
      { new: true }
    );
    if (!document) {
      return res.status(404).json({ message: 'Document not found' });
    }
    res.json(document);
  } catch (error) {
    res.status(500).json({ message: 'Error updating document', error });
  }
};

// Delete a document
export const deleteDocument = async (req: Request, res: Response) => {
  try {
    const document = await Document.findByIdAndDelete(req.params.id);
    if (!document) {
      return res.status(404).json({ message: 'Document not found' });
    }
    res.json({ message: 'Document deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting document', error });
  }
}; 