# Admin Dashboard - Quick Reference

## 🚀 Quick Start

### 1. Create Admin User
```
Firebase Console → Authentication → Users → Add User
Email: your-email@example.com
Password: your-secure-password
```

### 2. Start Dev Server
```bash
npm run dev
```

### 3. Login
Navigate to: `http://localhost:5173/admin/login`

---

## 📍 Routes

| URL | Page | Purpose |
|-----|------|---------|
| `/admin/login` | Login | Authentication |
| `/admin/dashboard` | Dashboard | Overview & stats |
| `/admin/profile` | Profile | Edit profile & avatar |
| `/admin/projects` | Projects | Manage projects |
| `/admin/skills` | Skills | Manage skills |
| `/admin/resume` | Resume | Edit experience & education |
| `/admin/messages` | Messages | View contact submissions |

---

## 🎨 Component Library

### UI Components (`src/components/admin/ui/`)

**Forms:**
- `Input` - Text input with validation
- `Textarea` - Multi-line input
- `Select` - Dropdown select
- `FileUpload` - Drag & drop file upload

**Layout:**
- `Card` - Container with Header/Body/Footer
- `Modal` - Dialog overlay
- `Tabs` - Tab navigation
- `Table` - Data table

**Actions:**
- `Button` - 4 variants (primary, secondary, danger, ghost)
- `Badge` - Status indicators

---

## 🔥 Firestore Collections

### `/content` (documents)
- `profile` - User profile data
- `about` - About section data
- `resume` - Experience & education arrays

### Collections
- `projects` - Portfolio projects
- `skills` - Technical skills
- `messages` - Contact form submissions

---

## 📝 Common Tasks

### Add New Project
1. Go to `/admin/projects`
2. Click "Add Project"
3. Fill in title, description, tech stack
4. Upload thumbnail (optional)
5. Set status (Draft/Published)
6. Click "Create Project"

### Edit Profile
1. Go to `/admin/profile`
2. Update fields
3. Upload new avatar (optional)
4. Click "Save Changes"

### View Messages
1. Go to `/admin/messages`
2. Click on any message to view details
3. Message automatically marked as read
4. Click "Reply via Email" to respond

### Manage Skills
1. Go to `/admin/skills`
2. Click "Add Skill"
3. Enter name, category
4. Adjust proficiency slider
5. Click "Create"

---

## 🎯 Tips

- **Grid/List Toggle**: Projects page has view switcher
- **Auto-Save**: Most forms save on submit
- **Image Upload**: Drag & drop or click to browse
- **Validation**: Required fields marked with *
- **Toast Notifications**: Success/error messages appear bottom-right
- **Breadcrumbs**: Top of page shows current location

---

## 🔐 Security Notes

**Before Production:**
1. Set up Firebase Security Rules
2. Restrict admin access by email
3. Enable rate limiting
4. Configure CORS properly
5. Use environment variables for sensitive data

---

## 🐛 Troubleshooting

**Can't login?**
- Verify admin user exists in Firebase Console
- Check email/password are correct
- Ensure Firebase Auth is enabled

**Images not uploading?**
- Check Firebase Storage is enabled
- Verify file size < 5MB
- Check browser console for errors

**Data not saving?**
- Check Firestore rules allow write access
- Verify internet connection
- Check browser console for errors

**404 on admin routes?**
- Ensure dev server is running
- Clear browser cache
- Check React Router is installed

---

## 📚 File Structure

```
src/
├── components/
│   ├── admin/
│   │   ├── ui/              # Reusable UI components
│   │   ├── dashboard/       # Dashboard page
│   │   ├── profile/         # Profile management
│   │   ├── projects/        # Projects management
│   │   ├── skills/          # Skills management
│   │   ├── resume/          # Resume editor
│   │   ├── messages/        # Messages inbox
│   │   ├── AdminLayout.jsx
│   │   ├── AdminSidebar.jsx
│   │   ├── AdminHeader.jsx
│   │   └── ProtectedRoute.jsx
│   └── auth/
│       └── LoginForm.jsx
├── context/
│   └── AuthContext.jsx      # Global auth state
├── hooks/
│   ├── useFirestore.js      # CRUD operations
│   └── useFileUpload.js     # File uploads
└── pages/
    └── AdminPage.jsx        # Admin router
```

---

## 🎨 Styling Guide

**Colors:**
- Primary: `bg-accent` (Wine Red #8B1538)
- Secondary: `bg-secondary` (Purple #7059e2)
- Success: `bg-green-500`
- Danger: `bg-red-600`

**Spacing:**
- Small: `gap-4`, `p-4`
- Medium: `gap-6`, `p-6`
- Large: `gap-8`, `p-8`

**Borders:**
- Default: `border border-white/10`
- Accent: `border-accent/30`
- Rounded: `rounded-xl`

---

## ✨ Features

✅ Authentication with Firebase Auth  
✅ Real-time data sync with Firestore  
✅ Image upload to Firebase Storage  
✅ Responsive design (mobile/tablet/desktop)  
✅ Form validation  
✅ Loading states  
✅ Error handling  
✅ Toast notifications  
✅ Protected routes  
✅ Breadcrumb navigation  
✅ Grid/List view toggle  
✅ Modal dialogs  
✅ Tab navigation  
✅ File drag & drop  

---

**Built with React 19, Firebase, Tailwind CSS, and React Router** 🚀
