# DocCraft - Real-time Collaborative Document Editor

A modern, real-time collaborative document editor built with React, Node.js, Socket.io, and MongoDB. Features a sleek, minimalistic design inspired by Google Docs.

![DocCraft Logo](frontend/public/logo192.png)

## ✨ Features

### Real-time Collaboration
- Live collaborative editing with multiple users
- Real-time cursor and selection synchronization
- Instant updates across all connected clients
- Collaborative presence indicators

### Modern UI/UX
- Sleek, minimalistic design with glassmorphism effects
- Responsive layout that works on all devices
- Smooth animations and transitions
- Modern gradient accents and subtle shadows
- Clean, intuitive document management interface

### Document Management
- Create, edit, and delete documents
- Real-time document search
- Auto-saving functionality
- Last modified timestamps
- Document list with grid layout
- Quick access to recent documents

### Rich Text Editor
- Full-featured text formatting
- Support for multiple heading styles
- Lists and bullet points
- Text alignment options
- Link embedding
- Clean, distraction-free writing experience

### Performance & Reliability
- Efficient real-time synchronization
- Automatic conflict resolution
- Robust error handling
- Optimized for low latency
- Reliable auto-save functionality

## 🚀 Technical Stack

### Frontend
- React with TypeScript
- Material-UI v5 for modern UI components
- Socket.io-client for real-time communication
- React Router for navigation
- Axios for API requests
- React-Quill for rich text editing

### Backend
- Node.js with Express
- TypeScript for type safety
- Socket.io for real-time functionality
- MongoDB for document storage
- Mongoose for database modeling
- CORS for secure cross-origin requests

## 🛠️ Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (v4.4 or higher)
- npm or yarn package manager

### Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a .env file with the following variables:
   ```
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/document-editor
   ```

4. Start the backend server:
   ```bash
   npm start
   ```

### Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

4. Open http://localhost:3000 in your browser

## 🎨 UI Features

### Modern Design Elements
- Gradient backgrounds and accents
- Glassmorphism effects with backdrop blur
- Smooth hover animations
- Responsive card layouts
- Custom Google Sans typography
- Subtle shadows and transitions

### Interactive Elements
- Animated document cards
- Dynamic search bar with instant results
- Gradient buttons with hover effects
- Clean, minimal form inputs
- Intuitive navigation

## 🔒 Security Features
- CORS protection
- Secure WebSocket connections
- Input validation and sanitization
- Error handling and logging
- Safe document access control

## 🔄 State Management
- Real-time state synchronization
- Optimistic UI updates
- Efficient document caching
- Robust error recovery
- Consistent state across clients

## 🚧 Future Improvements
- User authentication and authorization
- Document sharing and permissions
- Rich media support (images, videos)
- Document version history
- Export to different formats
- Mobile applications

## 📝 License
This project is licensed under the MIT License - see the LICENSE file for details.

## 👥 Contributing
Contributions are welcome! Please feel free to submit a Pull Request. 