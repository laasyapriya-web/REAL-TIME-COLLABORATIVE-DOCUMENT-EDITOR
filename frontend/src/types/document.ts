export interface Document {
  _id: string;
  title: string;
  content: string;
  createdBy: string;
  collaborators: string[];
  createdAt: string;
  updatedAt: string;
}

export interface CreateDocumentRequest {
  title: string;
  createdBy: string;
}

export interface UpdateDocumentRequest {
  title?: string;
  content?: string;
} 