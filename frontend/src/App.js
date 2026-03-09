import { useEffect, useState, useRef } from "react";
import "@/App.css";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { 
  Code2, 
  Smartphone, 
  Gamepad2, 
  ArrowRight, 
  MapPin, 
  Phone, 
  Menu, 
  X,
  Twitter,
  Facebook,
  ChevronDown
} from "lucide-react";

// Animation Variants
const fadeInUp = {
  initial: { opacity: 0, y: 50 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-10%" },
  transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
};

const staggerContainer = {
  initial: {},
  whileInView: {
    transition: {
      staggerChildren: 0.15
    }
  }
};

const staggerItem = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
};

// Custom Cursor Component
const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const updateCursor = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseEnter = () => setIsHovering(true);
    const handleMouseLeave = () => setIsHovering(false);

    window.addEventListener('mousemove', updateCursor);

    const interactiveElements = document.querySelectorAll('a, button, .interactive');
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', handleMouseEnter);
      el.addEventListener('mouseleave', handleMouseLeave);
    });

    return () => {
      window.removeEventListener('mousemove', updateCursor);
      interactiveElements.forEach(el => {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, []);

  return (
    <>
      <div 
        className={`custom-cursor ${isHovering ? 'expanded' : ''}`}
        style={{ left: position.x, top: position.y }}
      />
      <div 
        className="cursor-dot"
        style={{ left: position.x, top: position.y }}
      />
    </>
  );
};

// Floating Particles
const Particles = () => {
  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    delay: Math.random() * 15,
    size: Math.random() * 4 + 2
  }));

  return (
    <div className="particles">
      {particles.map(p => (
        <div
          key={p.id}
          className="particle"
          style={{
            left: `${p.left}%`,
            width: p.size,
            height: p.size,
            animationDelay: `${p.delay}s`
          }}
        />
      ))}
    </div>
  );
};

// Navigation
const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Nosotros', href: '#about' },
    { name: 'Servicios', href: '#services' },
    { name: 'Proyectos', href: '#portfolio' },
    { name: 'Contacto', href: '#contact' }
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled ? 'glass border-b border-[#C0002A]/20' : ''
      }`}
      data-testid="main-navigation"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <a href="#hero" className="flex items-center gap-3 interactive" data-testid="logo-link">
            <div className="w-10 h-10 relative">
              <svg viewBox="0 0 100 100" className="w-full h-full">
                <path
                  d="M50 10 C 80 10, 90 40, 70 60 C 50 80, 20 70, 20 50 C 20 30, 30 10, 50 10"
                  fill="none"
                  stroke="#C0002A"
                  strokeWidth="6"
                  strokeLinecap="round"
                />
              </svg>
            </div>
            <span className="font-heading text-2xl tracking-wider text-white">AMBAR ROJO</span>
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map(link => (
              <a
                key={link.name}
                href={link.href}
                className="nav-link text-sm font-medium tracking-widest uppercase interactive"
                data-testid={`nav-${link.name.toLowerCase()}`}
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 interactive"
            data-testid="mobile-menu-toggle"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass border-t border-white/10"
          >
            <div className="px-6 py-8 space-y-6">
              {navLinks.map(link => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block text-lg font-medium tracking-widest uppercase text-white/70 hover:text-white transition-colors"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

// Hero Section
const Hero = () => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden" data-testid="hero-section">
      {/* Background */}
      <div className="hero-bg">
        <div className="geometric-shape shape-1" />
        <div className="geometric-shape shape-2" />
        <div className="geometric-shape shape-3" />
        <div className="geometric-shape shape-4" />
        <div className="geometric-shape shape-5" />
        <Particles />
      </div>

      {/* Content */}
      <motion.div 
        style={{ y, opacity }}
        className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 text-center"
      >
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-sm md:text-base font-medium tracking-[0.3em] uppercase text-[#C0002A] mb-6"
        >
          Software Studio
        </motion.p>
        
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-heading text-6xl sm:text-7xl md:text-8xl lg:text-9xl tracking-tighter leading-none uppercase text-gradient mb-8"
        >
          FORGE YOUR<br />VISION
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-lg md:text-xl text-white/60 font-light max-w-2xl mx-auto mb-12 tracking-wide"
        >
          Crear y desarrollar experiencias es la meta
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <a
            href="#portfolio"
            className="animated-border inline-flex items-center justify-center gap-3 bg-[#C0002A] hover:bg-[#E60032] text-white px-8 py-4 rounded-full font-bold tracking-widest uppercase transition-all duration-300 hover:shadow-[0_0_25px_rgba(192,0,42,0.6)] hover:-translate-y-1 interactive"
            data-testid="hero-cta-primary"
          >
            Explorar Proyectos
            <ArrowRight size={18} />
          </a>
          <a
            href="#services"
            className="inline-flex items-center justify-center gap-3 bg-transparent border border-white/20 text-white hover:border-[#C0002A] hover:text-[#C0002A] px-8 py-4 rounded-full font-bold tracking-widest uppercase transition-all duration-300 interactive"
            data-testid="hero-cta-secondary"
          >
            Nuestros Servicios
          </a>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/40"
      >
        <span className="text-xs tracking-[0.2em] uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <ChevronDown size={20} />
        </motion.div>
      </motion.div>
    </section>
  );
};

// About Section
const About = () => {
  return (
    <section id="about" className="py-24 md:py-32 relative" data-testid="about-section">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <motion.div 
          {...fadeInUp}
          className="grid md:grid-cols-2 gap-12 md:gap-20 items-center"
        >
          {/* Image */}
          <div className="relative order-2 md:order-1">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <img
                src="https://images.unsplash.com/photo-1758691737182-d42aefd6dee8?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzh8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBvZmZpY2UlMjB0ZWFtJTIwbWVldGluZyUyMGRhcmslMjBtb29keXxlbnwwfHx8fDE3NzMwMzIxNDZ8MA&ixlib=rb-4.1.0&q=85"
                alt="Ambar Rojo Studios Team"
                className="w-full aspect-[4/5] object-cover rounded-xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050508] via-transparent to-transparent rounded-xl" />
              
              {/* Floating Badge */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="absolute -bottom-6 -right-6 glass-card p-6 rounded-xl"
              >
                <p className="text-[#D4860A] font-heading text-4xl">2025</p>
                <p className="text-white/60 text-sm tracking-wider uppercase">Established</p>
              </motion.div>
            </motion.div>
          </div>

          {/* Content */}
          <div className="order-1 md:order-2">
            <motion.span 
              {...staggerItem}
              className="text-sm font-medium tracking-[0.3em] uppercase text-[#C0002A] mb-4 block"
            >
              Nuestra Historia
            </motion.span>
            <motion.h2 
              {...staggerItem}
              className="font-heading text-5xl md:text-6xl lg:text-7xl tracking-tighter uppercase text-white mb-8"
            >
              DESDE EL CORAZÓN<br />DE CHIAPAS
            </motion.h2>
            <motion.div {...staggerItem} className="section-divider mb-8" />
            <motion.p 
              {...staggerItem}
              className="text-lg text-white/60 font-light leading-relaxed mb-6"
            >
              En Tuxtla Gutiérrez nace <span className="text-white">Ambar Rojo Studios</span>, un estudio de desarrollo de software que combina 
              pasión tecnológica con raíces profundas.
            </motion.p>
            <motion.p 
              {...staggerItem}
              className="text-lg text-white/60 font-light leading-relaxed mb-8"
            >
              Nuestro nombre evoca al <span className="amber-text amber-glow font-medium">ámbar rojo</span>, una gema prehistórica que solo 
              existe en dos lugares del mundo — y uno de ellos es <span className="text-white">Chiapas</span>. Como esa resina que 
              preserva la vida a través de millones de años, nosotros preservamos y transformamos ideas en 
              experiencias digitales duraderas.
            </motion.p>
            <motion.div {...staggerItem}>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 text-[#C0002A] font-medium tracking-wider uppercase hover:gap-4 transition-all interactive"
                data-testid="about-cta"
              >
                Conoce más
                <ArrowRight size={16} />
              </a>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// Services Section
const Services = () => {
  const services = [
    {
      icon: Code2,
      title: "Desarrollo de Software",
      description: "Soluciones empresariales robustas con .NET y PHP. Arquitecturas escalables que impulsan tu negocio al siguiente nivel.",
      tags: [".NET", "PHP", "Cloud", "API"]
    },
    {
      icon: Smartphone,
      title: "Apps Móviles",
      description: "Aplicaciones nativas para iOS y Android. Experiencias fluidas y rendimiento excepcional en cada dispositivo.",
      tags: ["iOS", "Android", "Native", "UX"]
    },
    {
      icon: Gamepad2,
      title: "Videojuegos",
      description: "Desarrollo de videojuegos con participación en el programa de incubación de PlayStation. Llevamos tu visión a las consolas.",
      tags: ["PlayStation", "Unity", "Unreal", "VR"]
    }
  ];

  return (
    <section id="services" className="py-24 md:py-32 relative bg-[#0A0A0F]" data-testid="services-section">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <motion.div {...fadeInUp} className="text-center mb-16">
          <span className="text-sm font-medium tracking-[0.3em] uppercase text-[#C0002A] mb-4 block">
            Lo Que Hacemos
          </span>
          <h2 className="font-heading text-5xl md:text-6xl lg:text-7xl tracking-tighter uppercase text-white mb-6">
            NUESTROS SERVICIOS
          </h2>
          <div className="section-divider mx-auto" />
        </motion.div>

        <motion.div 
          variants={staggerContainer}
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-6 md:gap-8"
        >
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              variants={staggerItem}
              className="service-card glass-card rounded-xl p-8 group interactive"
              data-testid={`service-card-${index}`}
            >
              {/* Icon */}
              <div className="w-16 h-16 rounded-xl bg-[#C0002A]/10 flex items-center justify-center mb-6 group-hover:bg-[#C0002A]/20 transition-colors">
                <service.icon className="w-8 h-8 text-[#C0002A]" />
              </div>

              {/* Title */}
              <h3 className="font-heading text-2xl md:text-3xl tracking-wider uppercase text-white mb-4">
                {service.title}
              </h3>

              {/* Description */}
              <p className="text-white/50 font-light leading-relaxed mb-6">
                {service.description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {service.tags.map(tag => (
                  <span
                    key={tag}
                    className="text-xs px-3 py-1 rounded-full bg-white/5 text-white/60 tracking-wider uppercase"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

// Portfolio Section
const Portfolio = () => {
  const projects = [
    {
      title: "Enterprise Dashboard",
      category: "Software Development",
      image: "https://images.unsplash.com/photo-1759661881353-5b9cc55e1cf4?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA2MjJ8MHwxfHNlYXJjaHwxfHxzb2Z0d2FyZSUyMGRldmVsb3BlciUyMGNvZGluZyUyMGRhcmslMjByb29tJTIwcmVkJTIwbGlnaHR8ZW58MHx8fHwxNzczMDMyMTM0fDA&ixlib=rb-4.1.0&q=85"
    },
    {
      title: "FinTech Mobile App",
      category: "Mobile Development",
      image: "https://images.unsplash.com/photo-1596742578443-7682ef5251cd?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjAzMzJ8MHwxfHNlYXJjaHwxfHxtb2JpbGUlMjBwaG9uZSUyMGRhcmslMjBiYWNrZ3JvdW5kJTIwYXBwJTIwdWl8ZW58MHx8fHwxNzczMDMyMTQ1fDA&ixlib=rb-4.1.0&q=85"
    },
    {
      title: "Action RPG",
      category: "Game Development",
      image: "https://images.unsplash.com/photo-1577741314755-048d8525d31e?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1ODF8MHwxfHNlYXJjaHwzfHxnYW1lciUyMGhvbGRpbmclMjBjb250cm9sbGVyJTIwcmVkJTIwbGlnaHR8ZW58MHx8fHwxNzczMDMyMTQ0fDA&ixlib=rb-4.1.0&q=85"
    },
    {
      title: "E-Commerce Platform",
      category: "Web Development",
      image: "https://images.unsplash.com/photo-1762009365851-c5b5b1aae3b9?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Nzh8MHwxfHNlYXJjaHwzfHxhYnN0cmFjdCUyMHJlZCUyMGdsb3dpbmclMjBnZW9tZXRyaWMlMjBzaGFwZXMlMjBkYXJrJTIwYmFja2dyb3VuZHxlbnwwfHx8fDE3NzMwMzIxMzN8MA&ixlib=rb-4.1.0&q=85"
    },
    {
      title: "Healthcare App",
      category: "Mobile Development",
      image: "https://images.unsplash.com/photo-1738641928061-e68c5e8e2f2b?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjAzMzJ8MHwxfHNlYXJjaHw0fHxtb2JpbGUlMjBwaG9uZSUyMGRhcmslMjBiYWNrZ3JvdW5kJTIwYXBwJTIwdWl8ZW58MHx8fHwxNzczMDMyMTQ1fDA&ixlib=rb-4.1.0&q=85"
    },
    {
      title: "VR Experience",
      category: "Game Development",
      image: "https://images.unsplash.com/photo-1674044164226-719e76fa644b?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1ODF8MHwxfHNlYXJjaHwyfHxnYW1lciUyMGhvbGRpbmclMjBjb250cm9sbGVyJTIwcmVkJTIwbGlnaHR8ZW58MHx8fHwxNzczMDMyMTQ0fDA&ixlib=rb-4.1.0&q=85"
    }
  ];

  return (
    <section id="portfolio" className="py-24 md:py-32 relative" data-testid="portfolio-section">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <motion.div {...fadeInUp} className="mb-16">
          <span className="text-sm font-medium tracking-[0.3em] uppercase text-[#C0002A] mb-4 block">
            Portafolio
          </span>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <h2 className="font-heading text-5xl md:text-6xl lg:text-7xl tracking-tighter uppercase text-white">
              PROYECTOS<br />DESTACADOS
            </h2>
            <p className="text-white/50 max-w-md font-light">
              Una selección de nuestros trabajos más recientes que demuestran nuestra capacidad técnica y creatividad.
            </p>
          </div>
          <div className="section-divider mt-8" />
        </motion.div>

        <motion.div 
          variants={staggerContainer}
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true }}
          className="portfolio-grid"
        >
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              variants={staggerItem}
              className="portfolio-item rounded-xl interactive"
              data-testid={`portfolio-item-${index}`}
            >
              <img src={project.image} alt={project.title} />
              <div className="portfolio-overlay">
                <span className="text-[#C0002A] text-xs tracking-[0.2em] uppercase mb-2">
                  {project.category}
                </span>
                <h3 className="font-heading text-2xl md:text-3xl tracking-wider uppercase text-white">
                  {project.title}
                </h3>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

// Stats Section
const Stats = () => {
  const stats = [
    { value: 8, suffix: "+", label: "Años de Experiencia" },
    { value: 120, suffix: "+", label: "Proyectos Entregados" },
    { value: 6, suffix: "", label: "Plataformas" },
    { value: 24, suffix: "/7", label: "Soporte" }
  ];

  const Counter = ({ value, suffix }) => {
    const [count, setCount] = useState(0);
    const ref = useRef(null);
    const [inView, setInView] = useState(false);

    useEffect(() => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setInView(true);
          }
        },
        { threshold: 0.5 }
      );

      if (ref.current) {
        observer.observe(ref.current);
      }

      return () => observer.disconnect();
    }, []);

    useEffect(() => {
      if (inView) {
        const duration = 2000;
        const steps = 60;
        const increment = value / steps;
        let current = 0;

        const timer = setInterval(() => {
          current += increment;
          if (current >= value) {
            setCount(value);
            clearInterval(timer);
          } else {
            setCount(Math.floor(current));
          }
        }, duration / steps);

        return () => clearInterval(timer);
      }
    }, [inView, value]);

    return (
      <span ref={ref} className="stat-number">
        {count}{suffix}
      </span>
    );
  };

  return (
    <section className="py-24 md:py-32 relative bg-[#0A0A0F]" data-testid="stats-section">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <motion.div 
          variants={staggerContainer}
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              variants={staggerItem}
              className="text-center"
              data-testid={`stat-${index}`}
            >
              <Counter value={stat.value} suffix={stat.suffix} />
              <p className="text-white/50 text-sm tracking-[0.2em] uppercase mt-2">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

// Contact Section
const Contact = () => {
  return (
    <section id="contact" className="py-24 md:py-32 relative" data-testid="contact-section">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <motion.div {...fadeInUp} className="grid md:grid-cols-2 gap-12 md:gap-20">
          {/* Left Side */}
          <div>
            <span className="text-sm font-medium tracking-[0.3em] uppercase text-[#C0002A] mb-4 block">
              Contacto
            </span>
            <h2 className="font-heading text-5xl md:text-6xl lg:text-7xl tracking-tighter uppercase text-white mb-8">
              HABLEMOS DE<br />TU PROYECTO
            </h2>
            <div className="section-divider mb-8" />
            <p className="text-lg text-white/60 font-light leading-relaxed mb-10">
              ¿Tienes una idea que quieres hacer realidad? Estamos listos para convertirla en una 
              experiencia digital extraordinaria.
            </p>

            {/* Contact Info */}
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#C0002A]/10 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5 text-[#C0002A]" />
                </div>
                <div>
                  <p className="text-white font-medium mb-1">Ubicación</p>
                  <p className="text-white/50">Tuxtla Gutiérrez, Chiapas, México</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#C0002A]/10 flex items-center justify-center flex-shrink-0">
                  <Phone className="w-5 h-5 text-[#C0002A]" />
                </div>
                <div>
                  <p className="text-white font-medium mb-1">Teléfono</p>
                  <p className="text-white/50">+52 961 XXX XXXX</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - CTA */}
          <div className="flex items-center justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="glass-card rounded-2xl p-10 text-center w-full max-w-md"
            >
              <div className="w-20 h-20 rounded-full bg-[#25D366]/10 flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10" viewBox="0 0 24 24" fill="#25D366">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
              </div>
              <h3 className="font-heading text-3xl tracking-wider uppercase text-white mb-4">
                Escríbenos
              </h3>
              <p className="text-white/50 mb-8 font-light">
                Respuesta inmediata por WhatsApp. Estamos disponibles para ti.
              </p>
              <a
                href="https://wa.me/529611234567"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 bg-[#25D366] hover:bg-[#20BD5A] text-white px-8 py-4 rounded-full font-bold tracking-widest uppercase transition-all duration-300 hover:shadow-[0_0_25px_rgba(37,211,102,0.5)] hover:-translate-y-1 interactive w-full"
                data-testid="whatsapp-cta"
              >
                Iniciar Chat
                <ArrowRight size={18} />
              </a>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// Footer
const Footer = () => {
  return (
    <footer className="py-12 border-t border-white/10" data-testid="footer">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 relative">
              <svg viewBox="0 0 100 100" className="w-full h-full">
                <path
                  d="M50 10 C 80 10, 90 40, 70 60 C 50 80, 20 70, 20 50 C 20 30, 30 10, 50 10"
                  fill="none"
                  stroke="#C0002A"
                  strokeWidth="6"
                  strokeLinecap="round"
                />
              </svg>
            </div>
            <span className="font-heading text-xl tracking-wider text-white">AMBAR ROJO STUDIOS</span>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#C0002A]/20 transition-colors interactive"
              data-testid="social-twitter"
            >
              <Twitter size={18} className="text-white/60" />
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#C0002A]/20 transition-colors interactive"
              data-testid="social-facebook"
            >
              <Facebook size={18} className="text-white/60" />
            </a>
          </div>

          {/* Copyright */}
          <p className="text-white/40 text-sm">
            © 2025 Ambar Rojo Studios. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

// WhatsApp Floating Button
const WhatsAppButton = () => {
  return (
    <motion.a
      href="https://wa.me/529611234567"
      target="_blank"
      rel="noopener noreferrer"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ delay: 2, type: "spring" }}
      className="whatsapp-btn interactive"
      data-testid="whatsapp-floating-btn"
    >
      <svg className="w-7 h-7" viewBox="0 0 24 24" fill="currentColor">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
      </svg>
    </motion.a>
  );
};

// Grain Overlay
const GrainOverlay = () => <div className="grain-overlay" />;

// Main App
function App() {
  return (
    <div className="App bg-[#050508] min-h-screen">
      <CustomCursor />
      <GrainOverlay />
      <Navigation />
      <Hero />
      <About />
      <Services />
      <Portfolio />
      <Stats />
      <Contact />
      <Footer />
      <WhatsAppButton />
    </div>
  );
}

export default App;
