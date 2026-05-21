import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { Menu, X, Github, Linkedin, Mail, ExternalLink, Code, Palette, Database, Globe, Award, BookOpen, GraduationCap, MapPin, BarChart3, Briefcase } from 'lucide-react';
import './Portfolio.css';
import aboutImg from './376728350_1292994751351301_1136127884073783092_n.png';
//import ComputersCanvas from './ComputersCanvas.jsx';
import ErrorBoundary from './ErrorBoundary.jsx';

// Intersection Observer to toggle section-visible
function useSectionReveal() {
  useEffect(() => {
    const sections = document.querySelectorAll('.section');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('section-visible');
        });
      },
      { threshold: 0.2 }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);
}

const Portfolio = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [isVisible, setIsVisible] = useState({});
  const [showSplash, setShowSplash] = useState(true);
  const [selectedProject, setSelectedProject] = useState(null);
  const [splashFade, setSplashFade] = useState(false);

  // Intersection Observer for scroll animations
  useEffect(() => {
    const observer = new window.IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
            setIsVisible(prev => ({ ...prev, [entry.target.id]: true }));
          }
        });
      },
      { threshold: 0.3, rootMargin: '-50px 0px' }
    );
    const sections = document.querySelectorAll('section[id]');
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setSelectedProject(null);
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  const scrollToSection = useCallback((sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);

  const handleSplashEnd = useCallback(() => {
    setSplashFade(true);
    setTimeout(() => setShowSplash(false), 700);
  }, []);

  useEffect(() => {
    if (showSplash) {
      const timer = setTimeout(() => {
        setSplashFade(true);
        setTimeout(() => setShowSplash(false), 700);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [showSplash]);

  // Data
  const personalInfo = useMemo(() => ({
    name: "Thilina Madhushanka",
    title: "Computer Engineering Student",
    subtitle: "Full-Stack Developer & AI Enthusiast",
    location: "University of Jaffna, Sri Lanka",
    email: "thilinamadhushanka378@gmail.com",
    linkedin: "https://www.linkedin.com/in/thilina-madhushanka-t0616",
    github: "https://github.com/ThilinaMadhushanka",
    profileImage: "https://avatars.githubusercontent.com/u/160057651?s=400&u=e1b4801ac5677f9cd2a9d8eb6a7b5a011e8f6adf&v=4"
  }), []);

  const stats = useMemo(() => [
    { label: "Projects Completed", value: "20+" },
    { label: "Years Experience", value: "1+" },
    { label: "GitHub Stars", value: "50+" },
    { label: "Profile Views", value: "100+" }
  ], []);

  const achievements = useMemo(() => [
    {
      title: "Dean's List Recognition",
      description: "Achieved academic excellence with GPA > 2.6 for consecutive semesters",
      year: "2025",
      icon: <Award size={24} />
    },
    {
      title: "IEEE Xtreme 18.0",
      description: "Ranked 1248th place globally in competitive programming",
      year: "2024",
      icon: <Award size={24} />
    },
    {
      title: "Mora Xtreme Champion",
      description: "Secured 61st place in university-level programming competition",
      year: "2024",
      icon: <Github size={24} />
    },
    {
      title: "Yarl Xtreme Winner",
      description: "First place in regional programming championship",
      year: "2024",
      icon: <Code size={24} />
    }
  ], []);

  const skillBadgeGroups = useMemo(() => ([
    {
      name: 'Programming Languages',
      items: [
        { label: 'Java', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg' },
        { label: 'Python', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
        { label: 'C++', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg' },
        { label: 'SQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg' },
        { label: 'JavaScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
        { label: 'Golang', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/go/go-original.svg' },
        { label: 'CSS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg' },
      ]
    },
    {
      name: 'Frameworks & Libraries',
      items: [
        { label: 'React.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
        { label: 'Express.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg' },
        { label: 'Spring Boot', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg' },
        { label: 'Bootstrap', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg' },
        { label: 'Tailwind CSS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-plain.svg' },
        { label: 'Material UI', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/materialui/materialui-original.svg' },
        { label: 'PHP', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg' },
        { label: 'Gin', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/go/go-original.svg' },
      ]
    },
    {
      name: 'DevOps & Cloud',
      items: [
        { label: 'Docker', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg' },
        { label: 'Kubernetes', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg' },
        { label: 'Jenkins', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jenkins/jenkins-original.svg' },
        { label: 'Terraform', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/terraform/terraform-original.svg' },
        { label: 'AWS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg' },
        { label: 'GCP', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/googlecloud/googlecloud-original.svg' },
        { label: 'Nginx', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nginx/nginx-original.svg' },
        { label: 'Linux', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg' },
      ]
    },
    {
      name: 'Developer Tools',
      items: [
        { label: 'Git', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg' },
        { label: 'VS Code', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg' },
        { label: 'Cursor', icon: 'https://raw.githubusercontent.com/cursor-ventures/brand/main/logo.svg' },
        { label: 'Postman', icon: 'https://www.vectorlogo.zone/logos/getpostman/getpostman-icon.svg' },
        { label: 'IntelliJ IDEA', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/intellij/intellij-original.svg' },
        { label: 'Figma', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg' },
        { label: 'Jira', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jira/jira-original.svg' },
      ]
    },
    {
      name: 'Databases',
      items: [
        { label: 'MySQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg' },
        { label: 'MongoDB', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg' },
        { label: 'PostgreSQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg' },
      ]
    },
    {
      name: 'Concepts',
      items: [
        { label: 'OOP', icon: 'https://raw.githubusercontent.com/gilbarbara/logos/main/logos/java.svg' },
        { label: 'DSA', icon: 'https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/leetcode.svg' },
        { label: 'REST APIs', icon: 'https://raw.githubusercontent.com/gilbarbara/logos/main/logos/openapi.svg' },
        { label: 'CI/CD', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg' },
        { label: 'IaC', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/terraform/terraform-original.svg' },
        { label: 'Microservices', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg' },
      ]
    }
  ]), []);

  const projects = useMemo(() => [
    {
      id: 101,
      title: 'PE Stock Management & ERP System',
      description: 'Full ERP and stock management system with POS, purchasing, inventory tracking, and financial modules.',
      fullDescription: 'Developed a full ERP and stock management system with POS, purchasing, inventory tracking, and financial modules. Implemented barcode generation, stock transfer management, customer credit control, and cheque management workflows. Created interactive dashboards and business analytics using .NET Charting libraries. Designed advanced Crystal Reports for invoices, financial summaries, and inventory analysis.',
      tech: ['VB.NET', 'MySQL', 'Crystal Reports'],
      image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=500&h=300&fit=crop',
      github: 'https://github.com/Code-Ai-Sys/PE_Stock_Management',
      live: '#',
      status: 'Completed'
    },
    {
      id: 102,
      title: 'Full-Stack Restaurant Management & ERP System',
      description: 'Scalable RESTful API based restaurant management system with POS, KOT, billing, inventory, and supplier management modules.',
      fullDescription: 'Built scalable RESTful APIs using Go (Gin Framework) with JWT authentication and RBAC authorization. Developed POS, Kitchen Order Ticket (KOT), billing, inventory, and supplier management modules. Integrated Chart.js dashboards, Swagger API documentation, and structured logging using Uber-Zap. Created responsive frontend interfaces using React 19 and Vite.',
      tech: ['React', 'Vite', 'Go', 'Gin', 'PostgreSQL', 'JWT'],
      image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=500&h=300&fit=crop',
      github: 'https://github.com/PabasaraDilshan/rms-v1.1-go-be',
      live: '#',
      status: 'Completed'
    },
    {
      id: 103,
      title: 'Containerized MERN Authentication System',
      description: 'Complete MERN stack authentication system with JWT-based login and registration, containerized using Docker.',
      fullDescription: 'Developed a complete MERN stack authentication system with JWT-based login and registration. Containerized frontend, backend, and database services using Docker and Docker Compose. Implemented secure password hashing and environment-based configuration management.',
      tech: ['MongoDB', 'Express.js', 'React.js', 'Node.js', 'Docker'],
      image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=500&h=300&fit=crop',
      github: 'https://github.com/ThilinaMadhushanka/Docker',
      live: '#',
      status: 'Completed'
    },
    {
      id: 104,
      title: 'Task Management System with DevOps Integration',
      description: 'Production-ready full-stack application using React frontend and Go backend APIs with Nginx as a reverse proxy.',
      fullDescription: 'Built a production-ready full-stack application using React frontend and Go backend APIs. Configured Nginx as a reverse proxy for frontend hosting and API routing. Implemented CRUD operations, PostgreSQL integration, and secure backend architecture.',
      tech: ['React', 'Go', 'PostgreSQL', 'Nginx'],
      image: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=500&h=300&fit=crop',
      github: 'https://github.com/ThilinaMadhushanka/nginx',
      live: '#',
      status: 'Completed'
    },
    {
      id: 105,
      title: 'Full-Stack DevOps Roadmap Application',
      description: 'CI/CD pipelines using GitHub Actions and Jenkins for automated testing and deployments with Kubernetes orchestration.',
      fullDescription: 'Implemented CI/CD pipelines using GitHub Actions and Jenkins for automated testing and deployments. Containerized multi-service applications using Docker and Docker Compose. Deployed and managed applications on AWS EC2 with Kubernetes orchestration. Designed scalable backend architecture with environment management and automated workflows.',
      tech: ['Go', 'React', 'PostgreSQL', 'Docker', 'Jenkins', 'Kubernetes', 'AWS'],
      image: 'https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?w=500&h=300&fit=crop',
      github: 'https://github.com/ThilinaMadhushanka/devops',
      live: '#',
      status: 'Completed'
    },
    {
      id: 106,
      title: 'Automated Cloud Infrastructure Deployment via Terraform',
      description: 'Designed and provisioned Google Cloud infrastructure securely and consistently using Terraform Infrastructure as Code (IaC).',
      fullDescription: 'Designed and provisioned Google Cloud infrastructure securely and consistently using Terraform Infrastructure as Code (IaC). Developed reusable Terraform modules to deploy scalable serverless applications with clean and maintainable architecture. Automated deployment of Python containerized applications to Google Cloud Run environments. Integrated Docker with Google Artifact Registry to build, authenticate, and push container images automatically. Provisioned Google Cloud Storage (GCS) buckets and dynamically managed cloud resources through Terraform outputs.',
      tech: ['Terraform', 'GCP', 'Docker', 'Cloud Run', 'Artifact Registry', 'GCS'],
      image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=500&h=300&fit=crop',
      github: 'https://github.com/ThilinaMadhushanka/terraform_demo',
      live: '#',
      status: 'Completed'
    },
    {
      id: 1,
      title: 'AI-Powered Travel Assistant',
      description: 'An intelligent, multimodal travel assistant that helps you plan, book, and manage your trips with ease. Powered by AI with personalized recommendations and interactive features.',
      fullDescription: 'This comprehensive travel assistant leverages cutting-edge AI technologies to provide personalized travel experiences. Features include multimodal input processing, real-time booking assistance, budget optimization, and interactive map integration.',
      tech: ['Python', 'AI', 'GroqAI', 'Hugging Face', 'LangGraph', 'Streamlit', 'Google Gemini API'],
      image: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=500&h=300&fit=crop',
      github: 'https://github.com/ThilinaMadhushanka/AI-Travel-Assistant',
      live: 'https://agentai-jt2q2yrgs9pa8uzdark2fm.streamlit.app/',
      status: 'Live'
    },
    {
      id: 2,
      title: 'Bookify - Booking Management System',
      description: 'Full-stack booking platform for lectures, doctors and fitness coaches with React frontend and Spring Boot backend. Features responsive UI, JWT authentication and RESTful API integration.',
      fullDescription: 'A comprehensive booking management system designed for service providers. Features include user authentication, appointment scheduling, payment integration, and real-time notifications.',
      tech: ['React', 'TypeScript', 'Spring Boot', 'MySQL', 'Tailwind CSS'],
      image: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=500&h=300&fit=crop',
      github: 'https://github.com/ThilinaMadhushanka/Bookify',
      live: '#',
      status: 'Development'
    },
    {
      id: 3,
      title: 'DriveSafeX - IoT Accident Detection',
      description: 'Smart safety system using ESP32 for real-time accident detection and prevention. Features ultrasonic collision alerts, gyroscope-based detection and Firebase live monitoring.',
      fullDescription: 'An innovative IoT solution for vehicle safety featuring real-time accident detection, GPS tracking, emergency alerts, and live monitoring dashboard.',
      tech: ['ESP32', 'Firebase', 'JavaScript', 'IoT', 'GPS'],
      image: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=500&h=300&fit=crop',
      github: 'https://github.com/ThilinaMadhushanka/Accident-Prevention-and-Detection-System',
      live: 'https://www.linkedin.com/feed/update/urn:li:activity:7316695149097467904/',
      status: 'Completed'
    },
    {
      id: 4,
      title: 'Real-Time Video Chat App',
      description: 'Peer-to-peer video chat platform with screen sharing, text chat and room-based communication using WebRTC and Socket.IO for real-time interaction.',
      fullDescription: 'A sophisticated video conferencing application with high-quality peer-to-peer communication, screen sharing capabilities, and multi-user room support.',
      tech: ['Node.js', 'WebRTC', 'Socket.IO', 'JavaScript'],
      image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=500&h=300&fit=crop',
      github: 'https://github.com/ThilinaMadhushanka/Real-Time-Video-Conferencing-Application-using-WebRTC',
      live: 'https://www.linkedin.com/feed/update/urn:li:activity:7323992113426137088/',
      status: 'Completed'
    },
    {
      id: 5,
      title: 'FootballApp - Management System',
      description: 'Full-stack football service management platform with responsive React + TypeScript frontend and Go-powered backend delivering secure RESTful APIs.',
      fullDescription: 'A robust football management system with user authentication, match scheduling, player stats, and RESTful API integration using Go and PostgreSQL.',
      tech: ['React', 'TypeScript', 'Go', 'PostgreSQL', 'Tailwind CSS'],
      image: 'https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=500&h=300&fit=crop',
      github: 'https://github.com/ThilinaMadhushanka/FootBall-App',
      live: '#',
      status: 'Development'
    },
    {
      id: 6,
      title: 'Blockchain IoT Security System',
      description: 'Lightweight blockchain-integrated security system for IoT devices using ECDSA, AES-128 and simplified PoS consensus for secure, scalable communication.',
      fullDescription: 'Implements blockchain-based authentication and encryption for IoT networks, ensuring secure and scalable device communication.',
      tech: ['Python', 'Blockchain', 'ECDSA', 'AES-128', 'NS3'],
      image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=500&h=300&fit=crop',
      github: '#',
      live: '#',
      status: 'Completed'
    },
    {
      id: 7,
      title: 'SummarizeMyText - AI Text Summarization',
      description: 'Offline text summarization web application using Flask and Hugging Face Transformers. Converts long text into concise summaries without requiring paid API keys or internet connection.',
      fullDescription: 'A web app that summarizes long text using BART transformer models, running fully offline with Flask backend and Hugging Face integration.',
      tech: ['Python', 'Flask', 'Hugging Face', 'BART', 'HTML/CSS'],
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=300&fit=crop',
      github: 'https://github.com/ThilinaMadhushanka/LLM_AI-Summary',
      live: '#',
      status: 'Completed'
    },
    {
      id: 8,
      title: 'Deep Learning Image Classification',
      description: 'Custom neural network implementation for image classification built from scratch using NumPy. Features forward/backward propagation, SGD with momentum, dropout regularization and comprehensive performance visualization.',
      fullDescription: 'A comprehensive deep learning project implementing neural networks from scratch with custom forward/backward propagation, optimization algorithms, and performance visualization.',
      tech: ['Python', 'NumPy', 'Pandas', 'Matplotlib', 'Scikit-learn'],
      image: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?w=500&h=300&fit=crop',
      github: 'https://github.com/ThilinaMadhushanka/Deep_learning_project',
      live: 'https://www.linkedin.com/feed/update/urn:li:activity:7322572128115904512/',
      status: 'Completed'
    },
    {
      id: 9,
      title: 'Multi-Category Product Recommendation System',
      description: 'A modern, interactive web application for discovering personalized product recommendations across multiple categories, powered by real datasets and a Flask backend.',
      fullDescription: 'Features personalized recommendations, live currency conversion, product details modal, and a responsive UI. Powered by Flask, Pandas, and scikit-learn.',
      tech: ['Flask', 'Pandas', 'scikit-learn', 'JavaScript', 'HTML/CSS', 'REST API'],
      image: 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?w=500&h=300&fit=crop',
      github: 'https://github.com/ThilinaMadhushanka/Product-Recommender-System-Project',
      live: '#',
      status: 'Completed'
    },
    {
      id: 10,
      title: 'AI Movie Recommend System',
      description: 'A visually stunning AI-powered movie recommendation web app built with Streamlit. Enter a movie you like and get intelligent recommendations with posters, genres, cast, director, and more!',
      fullDescription: 'Uses TF-IDF and cosine similarity for recommendations. Displays movie posters, genres, cast, and director info in a beautiful Streamlit UI.',
      tech: ['Streamlit', 'Python', 'Pandas', 'scikit-learn', 'TMDb API'],
      image: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?w=500&h=300&fit=crop',
      github: 'https://github.com/ThilinaMadhushanka/AI-Movie-Recommend-System',
      live: '#',
      status: 'Completed'
    },
    {
      id: 11,
      title: 'Portfolio Website',
      description: 'A modern, responsive portfolio website showcasing my journey as a Computer Engineering student and full-stack developer. Features glassmorphism UI, gradient backgrounds, smooth animations, interactive navigation, and is fully responsive and accessible.',
      fullDescription: 'Built with React, Tailwind CSS, and Lucide React. Implements intersection observer for scroll animations and is deployed with Vite/Create React App.',
      tech: ['React', 'Tailwind CSS', 'Lucide React', 'Intersection Observer', 'Vite/Create React App'],
      image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=500&h=300&fit=crop',
      github: 'https://github.com/ThilinaMadhushanka/my-Portfolio-Thilina',
      live: 'https://my-portfolio-thilina.netlify.app/',
      status: 'Live'
    },
    {
      id: 12,
      title: 'CPU Scheduling Simulator',
      description: 'A Java Swing application that provides a graphical interface to simulate and compare various CPU scheduling algorithms.',
      fullDescription: 'Users can add processes, visualize execution with a Gantt chart, and analyze performance metrics for algorithms like FCFS, Round Robin, SPN, SRTN, and Priority Scheduling.',
      tech: ['Java', 'Swing', 'GUI'],
      image: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?w=500&h=300&fit=crop',
      github: 'https://github.com/ThilinaMadhushanka/Operation_System_project',
      live: '#',
      status: 'Completed'
    },
    {
      id: 13,
      title: 'Concurrency: Currency Converter App',
      description: 'A modern, full-stack web application for converting currencies using historical exchange rates.',
      fullDescription: 'Features include conversion between any two currencies, date selection, responsive UI, and real-time conversion powered by a Node.js/Express backend.',
      tech: ['React 19', 'Tailwind CSS 3', 'Node.js', 'Express', 'Axios', 'Open Exchange Rates API'],
      image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=500&h=300&fit=crop',
      github: 'https://github.com/ThilinaMadhushanka/Concurrency',
      live: '#',
      status: 'Completed'
    },
    {
      id: 14,
      title: 'Machine Learning Mini Project: Clustering Analysis',
      description: 'Implements and compares multiple clustering algorithms on synthetic datasets, providing comprehensive analysis, performance metrics, and visualizations.',
      fullDescription: 'Includes K-Means, DBSCAN, Agglomerative, Mean Shift, Spectral, Affinity Propagation, BIRCH, OPTICS, and Gaussian Mixture Models. Visualizes results with Matplotlib and Seaborn.',
      tech: ['Python', 'scikit-learn', 'NumPy', 'Matplotlib', 'Pandas', 'Seaborn', 'python-docx'],
      image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=500&h=300&fit=crop',
      github: 'https://github.com/ThilinaMadhushanka/CLUSTERING_ALGORITHMS',
      live: '#',
      status: 'Completed'
    },
    {
      id: 15,
      title: 'Mobile Water Delivery & Hostel Services',
      description: 'Cross-platform app for water delivery and hostel services built with React Native (Expo) and Firebase. Implements auth, profile, product browsing, cart & checkout, onboarding and validations.',
      fullDescription: 'Developed a cross-platform React Native (Expo) application integrated with Firebase Auth and Firestore for real-time data. Implemented user authentication, profile management, product listing, cart and checkout flows. Focused on polished UX with onboarding, validation, and mobile-first design.',
      tech: ['React Native (Expo)', 'Firebase Auth', 'Firestore', 'React Navigation', 'React Native Paper'],
      image: 'https://img.waterworld.com/files/base/ebm/ww/image/2024/03/65e724a21f04ab001e1d8534-dreamstime_xl_32360015.png?auto=format,compress&fit=fill&fill=blur&q=45&w=640&width=640',
      github: 'https://github.com/ThilinaMadhushanka/MyApp',
      live: '#',
      status: 'Completed'
    },
    {
      id: 16,
      title: 'Full stack CRUD app (MERN)',
      description: 'Responsive MERN application with full CRUD for product management, client-side state handling, and robust UI/UX built with Chakra UI.',
      fullDescription: 'Built a full-stack MERN application with React + Chakra UI on the frontend and Node/Express + MongoDB on the backend. Implemented product CRUD operations, client state using Zustand, form validation, and toast notifications for a smooth UX.',
      tech: ['React', 'Chakra UI', 'Node.js', 'Express', 'MongoDB', 'Zustand'],
      image: 'https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=800&h=480&fit=crop',
      github: 'https://github.com/ThilinaMadhushanka/mern_project',
      live: 'https://mern-project-8qtt.onrender.com/',
      status: 'Completed'
    },
    {
      id: 17,
      title: 'Weather Dashboard (City Forecasts)',
      description: 'Responsive weather dashboard using OpenWeather API with Auth0, searchable city list, client-side caching, and a mobile-friendly Material UI layout.',
      fullDescription: 'A responsive weather dashboard integrating OpenWeatherMap API to fetch and display city forecasts. Features Auth0 authentication, searchable city lists, client-side caching to reduce API calls, and a mobile-first design using Material UI.',
      tech: ['React (Vite)', 'Material UI', 'Auth0', 'OpenWeatherMap API'],
      image: 'https://images.unsplash.com/photo-1501973801540-537f08ccae7b?w=800&h=480&fit=crop',
      github: 'https://github.com/ThilinaMadhushanka/weather-app',
      live: '#',
      status: 'Completed'
    }
  ], []);

  const certifications = useMemo(() => [
    {
      title: 'Introduction to Blockchain Technologies',
      issuer: 'UOM',
      year: '2024',
      credentialId: 'N/A',
      icon: <Briefcase size={24} />
    },
    {
      title: 'Python Programming',
      issuer: 'UOM',
      year: '2024',
      credentialId: 'yQOCVDT0JS',
      icon: <Code size={24} />
    },
    {
      title: 'Python for Beginners',
      issuer: 'UOM',
      year: '2024',
      credentialId: '7hQTaPwJ1d',
      icon: <Database size={24} />
    },
    {
      title: 'Front-End Web Developer',
      issuer: 'UOM',
      year: '2024',
      credentialId: 'b8MvKD28pm',
      icon: <Globe size={24} />
    },
    {
      title: 'Web Design for Beginners',
      issuer: 'UOM',
      year: '2024',
      credentialId: 'uYZDfYMBNw',
      icon: <Palette size={24} />
    }
  ], []);

  const education = useMemo(() => [
    {
      degree: 'Bachelor of Science in Computer Engineering',
      institution: 'Faculty Of Engineering, University of Jaffna',
      period: '2021 - Aug 2026',
      Results: '2.6/4.0',
      description: 'Specializing in Computer engineering, embedded systems and AI/ML applications. Active member of IEEE student branch.',
      coursework: ['Data Structures & Algorithms', 'Database Systems', 'Computer Networks', 'Embedded Systems', 'Machine Learning', 'Software Engineering'],
      image: 'https://th.bing.com/th/id/OIP.V2r4etsFSTphXamLkOVFlAHaHa?rs=1&pid=ImgDetMain'
    },
    {
      degree: 'Advanced Level (A/L) - Physical Science',
      institution: 'Gankandhura Central College, Pelmadulla',
      period: '2017 - 2019',
      Results: 'ABB',
      description: 'Focused on Mathematics, Physics and Chemistry with distinction in Mathematics.',
      coursework: ['Combined Mathematics', 'Physics', 'Chemistry'],
      image: 'https://i.ytimg.com/vi/ihJHReW3ZkA/maxresdefault.jpg'
    },
    {
      degree: 'Ordinary Level (O/L)',
      institution: 'Rambuka National College, Rambuka',
      period: '2006 - 2016',
      Results: 'A-6,B-2,S-1',
      description: 'Focused on Mathematics, Science, Sinhala, Buddhism, History, Commerce, Sinhala Literature, Agriculture And English with distinction in Mathematics, Agriculture, Sinhala Literature, Buddhism, History and Commerce.',
      coursework: ['Mathematics', 'Agriculture', 'Sinhala Literature', 'Buddhism', 'History', 'Commerce', 'Sinhala', 'Science', 'English']
    }
  ], []);

  const experience = useMemo(() => [
    {
      role: 'Software Engineer Intern',
      company: '4A Technologies (PVT) Ltd, Sri Lanka',
      period: 'Nov 2025 - May 2026',
      description: 'Contributed to enterprise-level ERP and stock management systems using VB.NET, MySQL, and Crystal Reports. Worked on Sales, Inventory, Purchasing, Customer Credit, and Financial Management modules. Developed reporting features including invoices, barcode labels, analytics dashboards, and financial summaries. Also contributed to the Full-Stack Restaurant Management & ERP System — built scalable RESTful APIs using Go (Gin Framework) with JWT authentication and RBAC authorization, developed POS, KOT, billing, inventory, and supplier management modules, integrated Chart.js dashboards and Swagger API documentation.',
      tech: ['VB.NET', 'MySQL', 'Crystal Reports', 'Go', 'Gin', 'React', 'PostgreSQL', 'JWT', 'ERP Systems']
    }
  ], []);

  useEffect(() => {
    setIsVisible({
      home: true,
      about: true,
      education: true,
      experience: true,
      skills: true,
      achievements: true,
      projects: true,
      certifications: true,
      contact: true,
    });
  }, []);

  useSectionReveal();

  // Splash Screen Component
  const SplashScreen = () => (
    <div className={`splash-screen${splashFade ? ' fade-out' : ''}`}>
      <div className="splash-content">
        <div className="splash-img">
          <img
            src={personalInfo.profileImage}
            alt={personalInfo.name}
            className="splash-profile"
          />
        </div>
        <h1 className="splash-title">Welcome</h1>
        <p className="splash-desc">Loading portfolio...</p>
        <div className="splash-bar">
          <div className="splash-bar-inner"></div>
        </div>
        <button onClick={handleSplashEnd} className="splash-btn">
          Enter Portfolio
        </button>
      </div>
    </div>
  );

  // Project Modal Component
  const ProjectModal = ({ project, onClose }) => (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <div>
            <h3 className="modal-title">{project.title}</h3>
            <div className="modal-status">
              <span className={`modal-status-badge ${project.status}`}>
                {project.status}
              </span>
            </div>
          </div>
          <button onClick={onClose} className="modal-close">
            <X size={24} />
          </button>
        </div>
        <img src={project.image} alt={project.title} className="modal-img" />
        <p className="modal-desc">{project.fullDescription}</p>
        <div className="modal-tech-list">
          {project.tech.map((tech) => (
            <span key={tech} className="modal-tech">{tech}</span>
          ))}
        </div>
        <div className="modal-links">
          <a
            href={project.github}
            className="modal-link-code"
            onClick={(e) => e.stopPropagation()}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Github size={20} />
            View Code
          </a>
          {project.live !== '#' && (
            <a
              href={project.live}
              className="modal-link-live"
              onClick={(e) => e.stopPropagation()}
              target="_blank"
              rel="noopener noreferrer"
            >
              <ExternalLink size={20} />
              Live Demo
            </a>
          )}
        </div>
      </div>
    </div>
  );

  if (showSplash) {
    return <SplashScreen />;
  }

  return (
    <div className="portfolio-container">
      <nav className="navbar">
        <div className="brand">{personalInfo.name.split(' ')[0]}</div>
        <div className="menu">
          {['home', 'about', 'education', 'experience', 'skills', 'achievements', 'projects', 'contact'].map((item) => (
            <button
              key={item}
              onClick={() => scrollToSection(item)}
              className={activeSection === item ? 'active' : ''}
            >
              {item}
            </button>
          ))}
        </div>
      </nav>

      <section id="home" className="section hero">
        <div className="home-info-col" style={{ textAlign: 'center' }}>
          <img src={personalInfo.profileImage} alt={personalInfo.name} className="profile-img" />
          <div className="name">{personalInfo.name}</div>
          <div className="title">{personalInfo.title}</div>
          <div className="subtitle">{personalInfo.subtitle} passionate about turning innovative ideas into practical solutions</div>
          <div className="stats">
            {stats.map((stat) => (
              <div key={stat.label} className="stat">
                <div className="stat-value">{stat.value}</div>
                <div className="stat-label">{stat.label}</div>
              </div>
            ))}
          </div>
          <div className="actions">
            <button className="primary" onClick={() => scrollToSection('projects')}>Explore My Work</button>
            <button className="secondary" onClick={() => scrollToSection('contact')}>Get In Touch</button>
          </div>
        </div>
      </section>

      <section id="about" className="section about">
        <div className="about-container" data-reveal>
          <h2 className="about-title">About Me</h2>
          <div className="about-grid">
            <div className={`about-image-col ${isVisible.about ? 'about-visible' : ''}`}>
              <div className="about-image-wrapper">
                <img src={aboutImg} alt={personalInfo.name} className="about-image" />
                <div className="about-location-icon">
                  <MapPin size={24} className="about-location-icon-svg" />
                </div>
              </div>
            </div>
            <div className={`about-text-col ${isVisible.about ? 'about-visible-delay' : ''}`}>
              <h3 className="about-hello">Hi, I'm Thilina!</h3>
              <p className="about-desc">
                I'm a passionate Full-Stack Developer and Computer Engineering undergraduate with hands-on experience in building scalable web applications, cloud-native systems, and intelligent AI/ML solutions. I thrive on solving real-world problems through clean architecture, efficient code, and modern DevOps practices.
              </p>
              <p className="about-desc">
                Whether it's engineering robust backend APIs, deploying containerized microservices on AWS and GCP, or building AI-powered applications with LangGraph and Hugging Face — I love creating impactful tech. Outside of coding, I'm constantly exploring emerging cloud technologies, contributing to open-source projects, and sharpening my competitive programming skills.
              </p>
              <div className="about-location">
                <MapPin size={20} />
                <span>{personalInfo.location}</span>
              </div>
              <div className="about-links">
                <a href={personalInfo.github} className="about-link github" target="_blank" rel="noopener noreferrer">
                  <Github size={20} />
                  GitHub
                </a>
                <a href={personalInfo.linkedin} className="about-link linkedin" target="_blank" rel="noopener noreferrer">
                  <Linkedin size={20} />
                  LinkedIn
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="education" className="section education">
        <div className="education-container" data-reveal>
          <h2 className="education-title">Education</h2>
          <div className="education-list">
            {education.map((edu) => (
              <div key={edu.degree} className={`education-item ${isVisible.education ? 'education-visible' : ''}`}>
                <div className="education-grid">
                  <div className="education-info">
                    <div className="education-card">
                      <div className="education-header">
                        <GraduationCap className="education-icon" size={28} />
                        <h3 className="education-degree">{edu.degree}</h3>
                      </div>
                      <p className="education-institution">{edu.institution}</p>
                      <div className="education-meta">
                        <span className="education-period">{edu.period}</span>
                        <span className="education-results">{edu.Results}</span>
                      </div>
                      <p className="education-desc">{edu.description}</p>
                      <div className="education-coursework">
                        <h4 className="education-coursework-title">Key Coursework:</h4>
                        <div className="education-coursework-list">
                          {edu.coursework.map((course) => (
                            <span key={course} className="education-course">{course}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="education-image-col">
                    {edu.institution === 'Rambuka National College, Rambuka' ? (
                      <div className="education-placeholder">
                        <BookOpen size={80} className="education-placeholder-icon" />
                      </div>
                    ) : (
                      <div className="education-image-wrapper">
                        <img src={edu.image} alt={edu.institution} className="education-image" />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="experience" className="section education">
        <div className="education-container" data-reveal>
          <h2 className="education-title">Experience</h2>
          <div className="education-list">
            {experience.map((exp) => (
              <div key={exp.role} className={`education-item ${isVisible.experience ? 'education-visible' : ''}`}>
                <div className="education-grid">
                  <div className="education-info">
                    <div className="education-card">
                      <div className="education-header">
                        <Briefcase className="education-icon" size={28} />
                        <h3 className="education-degree">{exp.role}</h3>
                      </div>
                      <p className="education-institution">{exp.company}</p>
                      <div className="education-meta">
                        <span className="education-period">{exp.period}</span>
                      </div>
                      <p className="education-desc">{exp.description}</p>
                      <div className="education-coursework">
                        <h4 className="education-coursework-title">Key Technologies:</h4>
                        <div className="education-coursework-list">
                          {exp.tech.map((tech) => (
                            <span key={tech} className="education-course">{tech}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="education-image-col">
                    <div className="education-placeholder">
                      <Briefcase size={80} className="education-placeholder-icon" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="skills" className="section skills">
        <div className="skills-container" data-reveal>
          <h2 className="skills-title">Skills & Technologies</h2>
          <div className="skills-badge-groups">
            {skillBadgeGroups.map((group) => (
              <div key={group.name} className={`skills-badge-group${isVisible.skills ? ' skills-visible' : ''}`}>
                <div className="skills-badge-header">
                  <div className="skills-icon"><BarChart3 size={20} /></div>
                  <h3 className="skills-badge-title">{group.name}</h3>
                </div>
                <div className="skills-badges">
                  {group.items.map((item) => (
                    <span key={item.label} className="skills-badge skills-badge-with-icon">
                      <img src={item.icon} alt={item.label} className="skills-badge-img" />
                      <span>{item.label}</span>
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="achievements" className="section achievements">
        <div className="achievements-container" data-reveal>
          <h2 className="achievements-title">Achievements & Recognition</h2>
          <div className="achievements-grid">
            {achievements.map((achievement) => (
              <div key={achievement.title} className={`achievements-item${isVisible.achievements ? ' achievements-visible' : ''}`}>
                <div className="achievements-card">
                  <div className="achievements-header">
                    <div className="achievements-icon">{achievement.icon}</div>
                    <div className="achievements-info">
                      <div className="achievements-title-row">
                        <h3 className="achievements-item-title">{achievement.title}</h3>
                        <span className="achievements-year">{achievement.year}</span>
                      </div>
                      <p className="achievements-desc">{achievement.description}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="certifications" className="section certifications">
        <div className="certifications-container" data-reveal>
          <h2 className="certifications-title">Certifications</h2>
          <div className="certifications-grid">
            {certifications.map((cert) => (
              <div key={cert.title} className={`certifications-item${isVisible.certifications ? ' certifications-visible' : ''}`}>
                <div className="certifications-card">
                  <div className="certifications-header">
                    <div className="certifications-icon">{cert.icon}</div>
                    <div className="certifications-info">
                      <div className="certifications-title-row">
                        <h3 className="certifications-item-title">{cert.title}</h3>
                        <span className="certifications-year">{cert.year}</span>
                      </div>
                      <p className="certifications-issuer">{cert.issuer}</p>
                      <p className="certifications-id">Credential ID: {cert.credentialId}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="projects" className="section projects">
        <div className="projects-container" data-reveal>
          <h2 className="projects-title">Featured Projects</h2>
          <div className="projects-grid">
            {projects.map((project) => (
              <div
                key={project.id}
                className={`projects-item${isVisible.projects ? ' projects-visible' : ''}`}
                onClick={() => setSelectedProject(project)}
              >
                <div className="projects-card">
                  <div className="projects-img-wrapper">
                    <img src={project.image} alt={project.title} className="projects-img" />
                    <div className="projects-img-overlay"></div>
                  </div>
                  <div className="projects-content">
                    <h3 className="projects-item-title">{project.title}</h3>
                    <p className="projects-desc">{project.description}</p>
                    <div className="projects-tech-list">
                      {project.tech.map((tech) => (
                        <span key={tech} className="projects-tech">{tech}</span>
                      ))}
                    </div>
                    <div className="projects-links">
                      <a
                        href={project.github}
                        className="projects-link"
                        onClick={(e) => e.stopPropagation()}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Github size={16} />
                        <span>Code</span>
                      </a>
                      {project.live !== '#' && (
                        <a
                          href={project.live}
                          className="projects-link"
                          onClick={(e) => e.stopPropagation()}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <ExternalLink size={16} />
                          <span>Live Demo</span>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="section contact">
        <div className="contact-container" data-reveal>
          <h2 className="contact-title">Let's Connect & Collaborate</h2>
          <p className="contact-subtitle">Computer Engineering Student at University of Jaffna</p>
          <p className="contact-desc">
            Interested in collaborating on innovative projects? Let's connect and create impactful solutions together!
          </p>
          <div className="contact-links">
            <a href={`mailto:${personalInfo.email}`} className="contact-link">
              <Mail size={40} className="contact-link-icon" />
              <h3 className="contact-link-title">Email</h3>
              <p className="contact-link-desc">{personalInfo.email}</p>
            </a>
            <a href={personalInfo.linkedin} className="contact-link" target="_blank" rel="noopener noreferrer">
              <Linkedin size={40} className="contact-link-icon" />
              <h3 className="contact-link-title">LinkedIn</h3>
              <p className="contact-link-desc">Connect with me</p>
            </a>
            <a href={personalInfo.github} className="contact-link" target="_blank" rel="noopener noreferrer">
              <Github size={40} className="contact-link-icon" />
              <h3 className="contact-link-title">GitHub</h3>
              <p className="contact-link-desc">View my projects</p>
            </a>
          </div>
          <a href={`mailto:${personalInfo.email}`} className="contact-btn">
            Start a Conversation
          </a>
        </div>
      </section>

      <footer className="footer">
        <div className="footer-container">
          <p className="footer-text">© 2025 Thilina Madhushanka. Built with React and ❤️</p>
        </div>
      </footer>

      {selectedProject && (
        <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
      )}
    </div>
  );
};

export default Portfolio

