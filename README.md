# Elevate Project

React front-end project for Elevate Task - A modern, responsive post management application featuring search functionality, author filtering, and pagination.

## Features

- 📝 **Post Listing** - Display posts with clean, responsive design
- 🔍 **Search Functionality** - Search posts by title in real-time
- 👤 **Author Filter** - Filter posts by author
- 📄 **Pagination** - Navigate through posts with 12 posts per page
- 🎨 **Responsive Design** - Works seamlessly on all devices
- ⚡ **Fast Loading** - Built with React Query for efficient data caching

## Tech Stack

- **React** - UI library
- **React Router** - Navigation and routing
- **TanStack Query** - Server state management
- **Tailwind CSS** - Styling
- **Lucide React** - Icons
- **Axios** - HTTP client

## Usage

- **Search** - Use the search bar to filter posts by title in real-time
- **Filter by Author** - Select an author from the dropdown to view their posts only
- **Navigate Pages** - Use pagination controls at the bottom to browse through posts
- **Create Post** - Click "Create new post" button to add a new post

## Project Structure

```
src/
├── components/
│   ├── Posts.jsx          # Main container with search and filters
│   ├── Post.jsx           # Post list with pagination
│   ├── Footer.jsx         # Pagination component
│   └── ui/                # UI components
├── Api/
│   ├── api.js             # API endpoints
│   └── axios.js           # Axios configuration
└── App.jsx
```

