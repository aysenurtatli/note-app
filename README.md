# 📝 Note List - Modern Note-Taking App

A beautiful, full-stack note-taking application built with **Next.js 16**, **TypeScript**, **MongoDB**, and **Tailwind CSS**. Features a macOS-inspired interface with smooth animations, real-time search, and intuitive note management.

![Next.js](https://img.shields.io/badge/Next.js-16.1.1-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat-square&logo=typescript)
![MongoDB](https://img.shields.io/badge/MongoDB-9.1.5-green?style=flat-square&logo=mongodb)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-38bdf8?style=flat-square&logo=tailwind-css)

## ✨ Features

### 🎨 **Beautiful UI/UX**

- **Colorful Sticky Notes**: Random colors (yellow, pink, blue, green, purple) with tape decorations
- **Smooth Animations**: Hover effects, page transitions, loading skeletons
- **macOS-Inspired Interface**: Window controls, browser-style navigation
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile
- **Dark/Light Contrast**: Stunning gradient backgrounds

### 🚀 **Core Functionality**

- ✅ **Create Notes**: Rich form with character counters and validation
- 🔍 **Real-time Search**: Search notes by title or content instantly
- ✏️ **Edit Notes**: Update notes with live character count and unsaved changes warning
- 🗑️ **Delete Notes**: Secure deletion with modal confirmation
- 💾 **Auto-save Detection**: Visual indicator for unsaved changes
- ⌨️ **Keyboard Shortcuts**: Cmd/Ctrl + S to save notes

### 🎯 **Advanced Features**

- **Toast Notifications**: Beautiful feedback for all user actions
- **Loading States**: Skeleton screens and spinners for better UX
- **Form Validation**: Client and server-side validation
- **Character Limits**: Title (100 chars), Body (5000 chars)
- **Error Handling**: Comprehensive error management
- **SEO Optimized**: Proper metadata and semantic HTML

### 🔧 **Technical Highlights**

- **Next.js App Router**: Modern routing with server/client components
- **MongoDB with Mongoose**: Efficient data persistence with caching
- **TypeScript**: Full type safety throughout the application
- **API Routes**: RESTful API for CRUD operations
- **React Hooks**: State management with useState, useEffect
- **Sound Effects**: Click sounds for interactive elements

## 📸 Screenshots

### Home Page

Beautiful landing page with gradient background and call-to-action buttons.

### Notes List

Grid layout with colorful sticky notes, search functionality, and smooth hover effects.

### Note Editor

Full-featured editor with character counters, auto-save detection, and keyboard shortcuts.

## 🛠️ Tech Stack

### Frontend

- **Framework**: Next.js 16.1.1 (React 19.2.3)
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 4
- **Icons**: Lucide React
- **Notifications**: React Hot Toast
- **Utilities**: clsx

### Backend

- **Database**: MongoDB with Mongoose
- **API**: Next.js API Routes
- **Validation**: Server-side validation

### Development

- **Linting**: ESLint with Next.js config
- **Package Manager**: npm

## 🚀 Getting Started

### Prerequisites

- **Node.js** 20+
- **npm** or **yarn**
- **MongoDB** account (MongoDB Atlas or local instance)

### Installation

1. **Clone the repository**

   ```bash
   git clone <your-repo-url>
   cd note-list
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   Create a `.env.local` file in the root directory:

   ```env
   MONGODB_URI=your_mongodb_connection_string_here
   ```

   You can use `.env.local.example` as a reference.

4. **Run the development server**

   ```bash
   npm run dev
   ```

5. **Open your browser**

   Navigate to [http://localhost:3000](http://localhost:3000)

### MongoDB Setup

#### Using MongoDB Atlas (Recommended)

1. Create a free account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster
3. Click "Connect" and choose "Connect your application"
4. Copy the connection string
5. Replace `<password>` with your database user password
6. Add the connection string to your `.env.local` file

#### Using Local MongoDB

```env
MONGODB_URI=mongodb://localhost:27017/note-list
```

## 📁 Project Structure

```
note-list/
├── app/
│   ├── api/
│   │   └── notes/
│   │       ├── route.ts          # GET, POST endpoints
│   │       └── [id]/
│   │           └── route.ts      # GET, PUT, DELETE endpoints
│   ├── context/
│   │   └── LayoutContext.tsx     # Layout state management
│   ├── notes/
│   │   ├── page.tsx              # Notes list page
│   │   ├── new/
│   │   │   └── page.tsx          # Create note page
│   │   └── [id]/
│   │       └── page.tsx          # Edit note page
│   ├── utils/
│   │   └── playsound.ts          # Sound effects utility
│   ├── layout.tsx                # Root layout with providers
│   ├── page.tsx                  # Home/landing page
│   └── globals.css               # Global styles & animations
├── components/
│   ├── layout/
│   │   ├── Header.tsx            # macOS-style header
│   │   └── Navbar.tsx            # Browser-style navigation
│   ├── notes/
│   │   ├── NoteCard.tsx          # Sticky note card component
│   │   ├── NoteForm.tsx          # Create/edit form
│   │   └── NoteList.tsx          # Notes grid with search
│   ├── ui/
│   │   ├── Modal.tsx             # Reusable modal component
│   │   └── LoadingSkeleton.tsx   # Loading skeleton animation
│   └── LayoutWrapper.tsx         # Layout wrapper component
├── lib/
│   └── mongodb.ts                # MongoDB connection with caching
├── models/
│   └── Note.ts                   # Mongoose Note schema
└── public/
    ├── images/                   # Static images
    └── sounds/                   # Sound effects
```

## 🎯 API Endpoints

### Notes API

| Method | Endpoint          | Description                      |
| ------ | ----------------- | -------------------------------- |
| GET    | `/api/notes`      | Get all notes (sorted by newest) |
| POST   | `/api/notes`      | Create a new note                |
| GET    | `/api/notes/[id]` | Get a specific note              |
| PUT    | `/api/notes/[id]` | Update a specific note           |
| DELETE | `/api/notes/[id]` | Delete a specific note           |

### Request/Response Examples

**Create Note (POST /api/notes)**

```json
{
  "title": "My Note Title",
  "body": "Note content here..."
}
```

**Response**

```json
{
  "_id": "507f1f77bcf86cd799439011",
  "title": "My Note Title",
  "body": "Note content here...",
  "createdAt": "2026-01-29T12:00:00.000Z",
  "updatedAt": "2026-01-29T12:00:00.000Z"
}
```

## 🎨 Customization

### Color Scheme

Edit note card colors in `/components/notes/NoteCard.tsx`:

```typescript
const colors = [
  "bg-yellow-50",
  "bg-pink-50",
  "bg-blue-50",
  "bg-green-50",
  "bg-purple-50",
];
```

### Character Limits

Modify limits in form components:

```typescript
const TITLE_MAX_LENGTH = 100;
const BODY_MAX_LENGTH = 5000;
```

### Toast Notifications

Customize toast appearance in `/app/layout.tsx`:

```typescript
<Toaster
  position="top-right"
  toastOptions={{
    duration: 3000,
    // ... customize styles
  }}
/>
```

## 🔑 Keyboard Shortcuts

| Shortcut       | Action            |
| -------------- | ----------------- |
| `Cmd/Ctrl + S` | Save current note |
| `Esc`          | Close modal       |

## 🚦 Build & Deploy

### Build for Production

```bash
npm run build
```

### Start Production Server

```bash
npm start
```

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Import your repository on [Vercel](https://vercel.com)
3. Add your `MONGODB_URI` environment variable
4. Deploy!

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/note-list)

## 🧪 Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm start        # Start production server
npm run lint     # Run ESLint
```

## 🐛 Troubleshooting

### MongoDB Connection Issues

1. Check your `MONGODB_URI` in `.env.local`
2. Verify your IP address is whitelisted in MongoDB Atlas
3. Ensure your database user has proper permissions

### Port Already in Use

Change the port in `package.json`:

```json
"dev": "next dev -p 3001"
```

## 📝 Notes Data Model

```typescript
{
  _id: ObjectId,          // Auto-generated
  title: String,          // Required, max 100 chars
  body: String,           // Required, max 5000 chars
  createdAt: Date,        // Auto-generated
  updatedAt: Date         // Auto-updated
}
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- Icons by [Lucide](https://lucide.dev/)
- Font: [Quicksand](https://fonts.google.com/specimen/Quicksand) by Google Fonts

## 📧 Contact

Have questions or suggestions? Feel free to reach out!

---
