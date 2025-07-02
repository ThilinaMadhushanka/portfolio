import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { Menu, X, Github, Linkedin, Mail, ExternalLink, Code, Palette, Database, Globe, Award, BookOpen, GraduationCap, Terminal, Braces, BarChart3, Network, MapPin, Calendar, Eye, Star } from 'lucide-react';
import './Portfolio.css';
import aboutImg from './376728350_1292994751351301_1136127884073783092_n.png';
import video from '../../public/202507010006.mp4';

const Portfolio = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isVisible, setIsVisible] = useState({});
  const [showSplash, setShowSplash] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  // --- Video Splash State ---
  const [showVideo, setShowVideo] = useState(true);
  const [videoPlaying, setVideoPlaying] = useState(false);
  const videoRef = useRef(null);

  // Handle video end
  const handleVideoEnd = () => {
    setShowVideo(false);
    setShowSplash(true);
  };

  // Handle skip button
  const handleSkip = () => {
    if (videoRef.current) {
      videoRef.current.pause();
    }
    setShowVideo(false);
    setShowSplash(true);
  };

  // Handle play button
  const handlePlay = () => {
    setVideoPlaying(true);
    videoRef.current.play();
  };

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
        setIsMenuOpen(false);
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
      setIsMenuOpen(false);
    }
  }, []);

  const [splashFade, setSplashFade] = useState(false);

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
    { label: "Years Experience", value: "2+" },
    { label: "GitHub Stars", value: "50+" },
    { label: "Profile Views", value: "1K+" }
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

  const skillCategories = useMemo(() => [
    {
      name: 'Programming Languages',
      icon: <Terminal size={24} />,
      skills: [
        { name: 'Java', level: 90, icon: <Code size={20} /> },
        { name: 'Python', level: 95, icon: <Code size={20} /> },
        { name: 'JavaScript', level: 85, icon: <Code size={20} /> },
        { name: 'C++', level: 80, icon: <Code size={20} /> },
        { name: 'Go', level: 70, icon: <Code size={20} /> },
        { name: 'PHP', level: 75, icon: <Code size={20} /> },
        { name: 'SQL', level: 85, icon: <Database size={20} /> }
      ]
    },
    {
      name: 'Frontend Technologies',
      icon: <Globe size={24} />,
      skills: [
        { name: 'React.js', level: 90, icon: <Globe size={20} /> },
        { name: 'HTML/CSS', level: 95, icon: <Code size={20} /> },
        { name: 'Bootstrap', level: 80, icon: <Palette size={20} /> },
        { name: 'AngularJS', level: 70, icon: <Braces size={20} /> }
      ]
    },
    {
      name: 'Backend & Databases',
      icon: <Database size={24} />,
      skills: [
        { name: 'Spring Boot', level: 85, icon: <Braces size={20} /> },
        { name: 'Node.js', level: 80, icon: <Braces size={20} /> },
        { name: 'FastAPI', level: 75, icon: <Braces size={20} /> },
        { name: 'MySQL', level: 85, icon: <Database size={20} /> },
        { name: 'MongoDB', level: 80, icon: <Database size={20} /> },
        { name: 'PostgreSQL', level: 75, icon: <Database size={20} /> }
      ]
    },
    {
      name: 'AI & Machine Learning',
      icon: <BarChart3 size={24} />,
      skills: [
        { name: 'TensorFlow', level: 80, icon: <BarChart3 size={20} /> },
        { name: 'PyTorch', level: 75, icon: <BarChart3 size={20} /> },
        { name: 'Scikit-learn', level: 85, icon: <BarChart3 size={20} /> },
        { name: 'OpenAI API', level: 90, icon: <BarChart3 size={20} /> },
        { name: 'LangGraph', level: 70, icon: <Network size={20} /> }
      ]
    }
  ], []);

  const projects = useMemo(() => [
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
    }
  ], []);

  const certifications = useMemo(() => [
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
      title: 'Wen Design for Beginners',
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
      period: '2022 - Present',
      Results: '2.6/4.0',
      description: 'Specializing in Computer engineering, embedded systems and AI/ML applications. Active member of IEEE student branch.',
      coursework: ['Data Structures & Algorithms', 'Database Systems', 'Computer Networks', 'Embedded Systems', 'Machine Learning', 'Software Engineering'],
      image: 'https://th.bing.com/th/id/OIP.V2r4etsFSTphXamLkOVFlAHaHa?rs=1&pid=ImgDetMain'
    },
    {
      degree: 'Advanced Level (A/L) - Physical Science',
      institution: 'Gankandhura Central College, Pelmadulla',
      period: '2017 - 2020',
      Results: 'ABB',
      description: 'Focused on Mathematics, Physics and Chemistry with distinction in Mathematics.',
      coursework: ['Combined Mathematics', 'Physics', 'Chemistry'],
      image: 'https://gankandacc.schweb.lk/images/Untitled_design_1.jpg'
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

  useEffect(() => {
    setIsVisible({
      home: true,
      about: true,
      education: true,
      skills: true,
      achievements: true,
      projects: true,
      certifications: true,
      contact: true,
    });
  }, []);

  // --- Splash Screen ---
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
        <button
          onClick={handleSplashEnd}
          className="splash-btn"
        >
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
              <span className="modal-category">{project.category}</span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="modal-close"
          >
            <X size={24} />
          </button>
        </div>
        <img
          src={project.image}
          alt={project.title}
          className="modal-img"
        />
        <p className="modal-desc">
          {project.fullDescription}
        </p>
        <div className="modal-tech-list">
          {project.tech.map((tech) => (
            <span
              key={tech}
              className="modal-tech"
            >
              {tech}
            </span>
          ))}
        </div>
        <div className="modal-links">
          <a
            href={project.github}
            className="modal-link-code"
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
          {['home', 'about', 'education', 'skills', 'achievements', 'projects', 'contact'].map((item) => (
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
          {/* Video at the bottom */}
          <div className="home-video-col" style={{ marginTop: '2rem' }}>
            <video
              width="100%"
              style={{ maxWidth: 400, borderRadius: 16, boxShadow: '0 8px 32px #a78bfa55' }}
              src={video}
              controls
            />
          </div>
        </div>
      </section>
      {/* About Section */}
      <section id="about" className="section about">
        <div className="about-container">
          <h2 className="about-title">About Me</h2>
          <div className="about-grid">
            <div className={`about-image-col ${isVisible.about ? 'about-visible' : ''}`}>
              <div className="about-image-wrapper">
                <img 
                  src={aboutImg}
                  alt={personalInfo.name}
                  className="about-image"
                />
                <div className="about-location-icon">
                  <MapPin size={24} className="about-location-icon-svg" />
                </div>
              </div>
            </div>
            <div className={`about-text-col ${isVisible.about ? 'about-visible-delay' : ''}`}>
              <h3 className="about-hello">Hi, I'm Thilina!</h3>
              <p className="about-desc">
                I'm a passionate full-stack developer and Computer Engineering undergraduate with a strong foundation in both software and hardware systems. With hands-on experience in building scalable, real-time and intelligent applications, I thrive on solving real-world problems through strategic thinking and efficient coding.
              </p>
              <p className="about-desc">
                Whether it's crafting responsive UIs, engineering IoT systems or exploring AI-powered solutions, I love creating meaningful tech that drives positive change. Outside of coding, you'll often find me diving into emerging technologies, working on research-driven projects or contributing to the open-source community.
              </p>
              <div className="about-location">
                <MapPin size={20} />
                <span>{personalInfo.location}</span>
              </div>
              <div className="about-links">
                <a
                  href={personalInfo.github}
                  className="about-link github"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github size={20} />
                  GitHub
                </a>
                <a
                  href={personalInfo.linkedin}
                  className="about-link linkedin"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Linkedin size={20} />
                  LinkedIn
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Education Section */}
      <section id="education" className="section education">
        <div className="education-container">
          <h2 className="education-title">Education</h2>
          <div className="education-list">
            {education.map((edu, index) => (
              <div
                key={edu.degree}
                className={`education-item ${isVisible.education ? 'education-visible' : ''}`}
              >
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
                            <span
                              key={course}
                              className="education-course"
                            >
                              {course}
                            </span>
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
                        <img 
                          src={edu.image} 
                          alt={edu.institution}
                          className="education-image"
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Skills Section */}
      <section id="skills" className="section skills">
        <div className="skills-container">
          <h2 className="skills-title">Skills & Technologies</h2>
          <div className="skills-grid">
            {skillCategories.map((category, catIdx) => (
              <div key={category.name} className={`skills-category${isVisible.skills ? ' skills-visible' : ''}`}>
                <div className="skills-card">
                  <div className="skills-header">
                    <div className="skills-icon">{category.icon}</div>
                    <h3 className="skills-category-title">{category.name}</h3>
                  </div>
                  <div className="skills-list">
                    {category.skills.map((skill) => (
                      <div key={skill.name} className="skills-skill">
                        <div className="skills-skill-row">
                          <div className="skills-skill-info">
                            <span className="skills-skill-icon">{skill.icon}</span>
                            <span className="skills-skill-name">{skill.name}</span>
                          </div>
                          <span className="skills-skill-level">{skill.level}%</span>
                        </div>
                        <div className="skills-bar-bg">
                          <div
                            className="skills-bar"
                            style={{ width: isVisible.skills ? `${skill.level}%` : '0%' }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Achievements Section */}
      <section id="achievements" className="section achievements">
        <div className="achievements-container">
          <h2 className="achievements-title">Achievements & Recognition</h2>
          <div className="achievements-grid">
            {achievements.map((achievement, index) => (
              <div
                key={achievement.title}
                className={`achievements-item${isVisible.achievements ? ' achievements-visible' : ''}`}
              >
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
      {/* Certifications Section */}
      <section id="certifications" className="section certifications">
        <div className="certifications-container">
          <h2 className="certifications-title">Certifications</h2>
          <div className="certifications-grid">
            {certifications.map((cert, index) => (
              <div
                key={cert.title}
                className={`certifications-item${isVisible.certifications ? ' certifications-visible' : ''}`}
              >
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
      {/* Projects Section */}
      <section id="projects" className="section projects">
        <div className="projects-container">
          <h2 className="projects-title">Featured Projects</h2>
          <div className="projects-grid">
            {projects.map((project, index) => (
              <div
                key={project.id}
                className={`projects-item${isVisible.projects ? ' projects-visible' : ''}`}
                onClick={() => setSelectedProject(project)}
              >
                <div className="projects-card">
                  <div className="projects-img-wrapper">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="projects-img"
                    />
                    <div className="projects-img-overlay"></div>
                  </div>
                  <div className="projects-content">
                    <h3 className="projects-item-title">{project.title}</h3>
                    <p className="projects-desc">{project.description}</p>
                    <div className="projects-tech-list">
                      {project.tech.map((tech) => (
                        <span
                          key={tech}
                          className="projects-tech"
                        >
                          {tech}
                        </span>
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
      {/* Contact Section */}
      <section id="contact" className="section contact">
        <div className="contact-container">
          <h2 className="contact-title">Let's Connect & Collaborate</h2>
          <p className="contact-subtitle">
            Computer Engineering Student at University of Jaffna
          </p>
          <p className="contact-desc">
            Interested in collaborating on innovative projects? Let's connect and create impactful solutions together!
          </p>
          <div className="contact-links">
            <a
              href={`mailto:${personalInfo.email}`}
              className="contact-link"
            >
              <Mail size={40} className="contact-link-icon" />
              <h3 className="contact-link-title">Email</h3>
              <p className="contact-link-desc">{personalInfo.email}</p>
            </a>
            <a
              href={personalInfo.linkedin}
              className="contact-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Linkedin size={40} className="contact-link-icon" />
              <h3 className="contact-link-title">LinkedIn</h3>
              <p className="contact-link-desc">Connect with me</p>
            </a>
            <a
              href={personalInfo.github}
              className="contact-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github size={40} className="contact-link-icon" />
              <h3 className="contact-link-title">GitHub</h3>
              <p className="contact-link-desc">View my projects</p>
            </a>
          </div>
          <a 
            href={`mailto:${personalInfo.email}`}
            className="contact-btn"
          >
            Start a Conversation
          </a>
        </div>
      </section>
      {/* Footer */}
      <footer className="footer">
        <div className="footer-container">
          <p className="footer-text">
            © 2025 Thilina Madhushanka. Built with React and ❤️
          </p>
        </div>
      </footer>
      {/* Project Modal */}
      {selectedProject && (
        <ProjectModal 
          project={selectedProject} 
          onClose={() => setSelectedProject(null)} 
        />
      )}
    </div>
  );
};

export default Portfolio;