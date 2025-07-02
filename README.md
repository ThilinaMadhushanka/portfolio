# Thilina Madhushanka - Portfolio Website

A modern, responsive portfolio website showcasing my journey as a Computer Engineering student and full-stack developer. Built with React and featuring stunning animations, glassmorphism design, and interactive elements.

## 🌟 Features

- **Modern Design**: Glassmorphism UI with gradient backgrounds and blur effects
- **Fully Responsive**: Optimized for desktop, tablet, and mobile devices
- **Smooth Animations**: Intersection Observer API for scroll-triggered animations
- **Interactive Navigation**: Smooth scrolling with active section highlighting
- **Performance Optimized**: Efficient rendering and minimal bundle size
- **Accessibility**: Semantic HTML and keyboard navigation support


## 🛠️ Built With

- **Frontend**: React 18+ with Hooks
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Animations**: CSS3 Transforms & Intersection Observer
- **Build Tool**: Create React App / Vite
- **Deployment**: Netlify / Vercel / GitHub Pages

## 🔧 Installation & Setup

### Prerequisites
- Node.js (v16.0 or higher)
- npm or yarn package manager

### Local Development

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Start development server**
   ```bash
   npm start
   ```

3. **Open in browser**
   ```
   http://localhost:3000
   ```

### Build for Production

```bash
npm run build
```

## 📁 Project Structure

```
portfolio/
├── public/
│   ├── index.html
│   ├── favicon.ico
│   └── images/
│       ├── profile.jpg
│       ├── university-jaffna.jpg
│       └── school-photos/
├── src/
│   ├── components/
│   │   ├── Portfolio.jsx
│   │   ├── Navigation.jsx
│   │   └── Sections/
│   ├── styles/
│   │   └── index.css
│   ├── utils/
│   │   └── constants.js
│   ├── App.js
│   └── index.js
├── package.json
├── tailwind.config.js
└── README.md
```

## 🎨 Customization

### Colors & Theme
The portfolio uses a purple-pink gradient theme. To customize colors, update the Tailwind configuration:

```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: '#8B5CF6',    // Purple
        secondary: '#EC4899',  // Pink
        dark: '#0F172A',       // Dark background
      }
    }
  }
}
```
## 📱 Responsive Design

The portfolio is fully responsive with breakpoints:

- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

## 🎯 Performance

- **Lighthouse Score**: 95+ across all metrics
- **Bundle Size**: < 500KB gzipped
- **Loading Time**: < 2 seconds on 3G
- **SEO Optimized**: Meta tags and semantic HTML

⭐ **Star this repository if you found it helpful!**

Built with ❤️ by Thilina Madhushanka
