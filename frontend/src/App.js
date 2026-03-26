import { useEffect, useState, useRef } from "react";
import "@/App.css";
import iconoSomos from "./icono-somos.png";
import { motion, useScroll, useTransform } from "framer-motion";
import { 
  Code2, 
  Smartphone, 
  BrainCircuit,
  ArrowRight, 
  MapPin, 
  Phone, 
  Menu, 
  X,
  Twitter,
  Facebook,
  Instagram,
  CheckCircle2,
  Clock,
  Users,
  Award,
  MessageCircle,
  Bot
} from "lucide-react";

// Animation variants for fade-in
const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" },
  transition: { duration: 0.8, ease: [0.4, 0, 0.2, 1] }
};

const staggerContainer = {
  initial: {},
  whileInView: {
    transition: { staggerChildren: 0.15 }
  }
};

const staggerItem = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] } }
};

// Amber Dust Particles Component
const AmberParticles = () => {
  const particles = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    delay: Math.random() * 20,
    duration: 15 + Math.random() * 10,
    size: 3 + Math.random() * 6
  }));

  return (
    <div className="amber-particles">
      {particles.map(p => (
        <div
          key={p.id}
          className="amber-particle"
          style={{
            left: `${p.left}%`,
            width: p.size,
            height: p.size,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`
          }}
        />
      ))}
    </div>
  );
};

// Fireflies Component
const Fireflies = () => {
  const fireflies = Array.from({ length: 8 }, (_, i) => ({
    id: i,
    left: 10 + Math.random() * 80,
    top: 20 + Math.random() * 60,
    delay: Math.random() * 4,
    duration: 3 + Math.random() * 2
  }));

  return (
    <>
      {fireflies.map(f => (
        <div
          key={f.id}
          className="firefly"
          style={{
            left: `${f.left}%`,
            top: `${f.top}%`,
            animationDelay: `${f.delay}s`,
            animationDuration: `${f.duration}s`
          }}
        />
      ))}
    </>
  );
};

// Grain Overlay
const GrainOverlay = () => <div className="grain-overlay" />;

// Navigation
const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Nosotros', href: '#about' },
    { name: 'Servicios', href: '#services' },
    { name: 'Proyectos', href: '#portfolio' },
    { name: 'IA', href: '#ai' },
    { name: '¿Por qué nosotros?', href: '#why-us' }
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled ? 'warm-glass border-b border-[#900024]/10' : ''
      }`}
      data-testid="main-navigation"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <a href="#hero" className="flex items-center gap-3" data-testid="logo-link">
            <img
              src={iconoSomos}
              alt="Ambar Rojo Studios"
              className="logo-glow h-11 w-auto object-contain"
            />
            <span className="font-serif text-2xl tracking-wide text-[#F5F0E8]">Ambar Rojo Studios</span>
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map(link => (
              <a
                key={link.name}
                href={link.href}
                className="nav-link-warm text-sm font-medium tracking-wide"
                data-testid={`nav-${link.name.toLowerCase()}`}
              >
                {link.name}
              </a>
            ))}
            <a
              href="#contact"
              className="btn-amber px-6 py-2.5 rounded-full text-sm font-medium tracking-wide"
              data-testid="nav-cta"
            >
              Contactar
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-[#F5F0E8]"
            data-testid="mobile-menu-toggle"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden warm-glass border-t border-[#900024]/10"
        >
          <div className="px-6 py-8 space-y-6">
            {navLinks.map(link => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block text-lg font-medium text-[#F5F0E8]/70 hover:text-[#F5F0E8] transition-colors"
              >
                {link.name}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="btn-amber block text-center px-6 py-3 rounded-full text-sm font-medium"
            >
              Contactar
            </a>
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
};

// Hero Section
const Hero = () => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 100]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden hero-bg-gradient" data-testid="hero-section">
      {/* Ambient Lights */}
      <div className="ambient-light ambient-light-amber w-[600px] h-[400px] absolute bottom-0 left-1/4 -translate-x-1/2" />
      <div className="ambient-light ambient-light-forest w-[400px] h-[300px] absolute top-1/4 right-0" />
      
      {/* Particles */}
      <AmberParticles />
      <Fireflies />

      {/* Content */}
      <motion.div 
        style={{ y, opacity }}
        className="relative z-10 max-w-5xl mx-auto px-6 md:px-12 text-center"
      >
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-sm md:text-base font-sans font-medium tracking-[0.2em] uppercase text-[#900024] mb-6"
        >
          Desde Tuxtla Gutiérrez, Chiapas
        </motion.p>
        
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-[#F5F0E8] leading-[1.15] mb-8"
        >
          Millones de años formaron el ámbar rojo.<br />
          <span className="text-[#900024]">Nosotros tardamos menos en transformar tu negocio.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-lg md:text-xl text-[#9A8890] font-light max-w-2xl mx-auto mb-12 leading-relaxed"
        >
          Crear y desarrollar experiencias es la meta. Somos un estudio de software 
          e inteligencia artificial con raíces profundas en Chiapas.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <a
            href="#services"
            className="btn-amber inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full text-sm font-semibold tracking-wide"
            data-testid="hero-cta-primary"
          >
            Ver nuestros servicios
            <ArrowRight size={18} />
          </a>
          <a
            href="#contact"
            className="btn-outline-cream inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full text-sm font-medium tracking-wide"
            data-testid="hero-cta-secondary"
          >
            Hablar con un asesor
          </a>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[#9A8890]"
      >
        <span className="text-xs tracking-[0.15em] uppercase font-sans">Descubre más</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-6 h-10 rounded-full border border-[#900024]/30 flex items-start justify-center pt-2"
        >
          <div className="w-1.5 h-3 rounded-full bg-[#900024]" />
        </motion.div>
      </motion.div>
    </section>
  );
};

// About Section
const About = () => {
  return (
    <section id="about" className="py-24 md:py-32 relative textile-pattern" data-testid="about-section">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <motion.div 
          {...fadeInUp}
          className="grid md:grid-cols-2 gap-12 md:gap-20 items-center"
        >
          {/* Image */}
          <div className="relative order-2 md:order-1">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="relative"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#900024]/20 to-[#1A3A2A]/20 rounded-2xl transform rotate-3" />
              <img
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&auto=format&fit=crop&q=80"
                alt="Equipo Ambar Rojo Studios"
                className="relative w-full aspect-[4/5] object-cover rounded-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#141008] via-transparent to-transparent rounded-2xl" />
              
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="absolute -bottom-6 -right-6 warm-glass-card p-6 rounded-2xl"
              >
                <p className="text-[#900024] font-serif text-4xl font-semibold">2025</p>
                <p className="text-[#9A8890] text-sm tracking-wider uppercase font-sans">Certificados</p>
              </motion.div>
            </motion.div>
          </div>

          {/* Content */}
          <div className="order-1 md:order-2">
            <motion.span 
              {...staggerItem}
              className="text-sm font-sans font-medium tracking-[0.2em] uppercase text-[#900024] mb-4 block"
            >
              Sobre Nosotros
            </motion.span>
            <motion.h2 
              {...staggerItem}
              className="font-serif text-4xl md:text-5xl lg:text-6xl text-[#F5F0E8] mb-8 leading-[1.1]"
            >
              Un estudio con alma chiapaneca
            </motion.h2>
            <div className="maya-divider w-24 mb-8" />
            <motion.p 
              {...staggerItem}
              className="text-lg text-[#9A8890] font-light leading-relaxed mb-6"
            >
              Desde <span className="text-[#F5F0E8]">Tuxtla Gutiérrez</span> creamos soluciones de software 
              que combinan la calidez de nuestra tierra con la precisión de la tecnología moderna.
            </motion.p>
            <motion.p 
              {...staggerItem}
              className="text-lg text-[#9A8890] font-light leading-relaxed mb-8"
            >
              Nuestro nombre rinde homenaje al <span className="text-[#900024] font-medium">ámbar rojo</span>, 
              una piedra prehistórica que solo existe en dos lugares del mundo — y uno de ellos es 
              <span className="text-[#F5F0E8]"> Chiapas</span>. Como esa resina milenaria que preserva 
              la vida, nosotros preservamos y transformamos ideas en experiencias digitales duraderas.
            </motion.p>
            <motion.a
              {...staggerItem}
              href="#services"
              className="inline-flex items-center gap-2 text-[#900024] font-medium tracking-wide hover:gap-4 transition-all"
              data-testid="about-cta"
            >
              Conoce nuestros servicios
              <ArrowRight size={18} />
            </motion.a>
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
      title: "Software a la Medida",
      description: "Soluciones empresariales robustas con .NET y PHP, utilizando la metodología PSP. Arquitecturas escalables diseñadas para tu negocio.",
      tags: [".NET", "PHP", "PSP", "Cloud"]
    },
    {
      icon: Smartphone,
      title: "Apps Móviles",
      description: "Aplicaciones nativas para iOS y Android. Experiencias fluidas y rendimiento excepcional que conectan con tus usuarios.",
      tags: ["iOS", "Android", "Native", "UX"]
    },
    {
      icon: BrainCircuit,
      title: "Agentes de IA",
      description: "Automatiza tu empresa o mejora tu servicio al cliente con agentes inteligentes de inteligencia artificial disponibles 24/7.",
      tags: ["IA", "Chatbots", "Automatización", "NLP"]
    }
  ];

  return (
    <section id="services" className="py-24 md:py-32 relative" style={{ background: 'linear-gradient(180deg, #141008 0%, #111006 50%, #141008 100%)' }} data-testid="services-section">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <motion.div {...fadeInUp} className="text-center mb-16">
          <span className="text-sm font-sans font-medium tracking-[0.2em] uppercase text-[#900024] mb-4 block">
            Nuestros Servicios
          </span>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-[#F5F0E8] mb-6">
            ¿Qué podemos hacer por ti?
          </h2>
          <div className="maya-divider w-40 mx-auto" />
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
              className="service-card-warm p-8 rounded-2xl"
              data-testid={`service-card-${index}`}
            >
              {/* Icon */}
              <div className="w-14 h-14 rounded-xl bg-[#900024]/10 flex items-center justify-center mb-6">
                <service.icon className="w-7 h-7 text-[#900024]" />
              </div>

              {/* Title */}
              <h3 className="font-serif text-2xl md:text-3xl text-[#F5F0E8] mb-4">
                {service.title}
              </h3>

              {/* Description */}
              <p className="text-[#9A8890] font-light leading-relaxed mb-6">
                {service.description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {service.tags.map(tag => (
                  <span
                    key={tag}
                    className="text-xs px-3 py-1.5 rounded-full bg-[#900024]/5 border border-[#900024]/10 text-[#900024] tracking-wider"
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

// Why Us Section
const WhyUs = () => {
  const stats = [
    { icon: Clock, value: "10+", label: "Años de experiencia" },
    { icon: CheckCircle2, value: "30+", label: "Proyectos entregados" },
    { icon: Users, value: "40+", label: "Clientes regionales" },
    { icon: Award, value: "100%", label: "Compromiso local" }
  ];

  return (
    <section id="why-us" className="py-24 md:py-32 relative textile-pattern" data-testid="why-us-section">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <motion.div {...fadeInUp} className="text-center mb-16">
          <span className="text-sm font-sans font-medium tracking-[0.2em] uppercase text-[#900024] mb-4 block">
            ¿Por Qué Nosotros?
          </span>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-[#F5F0E8] mb-6">
            Confianza que se construye
          </h2>
          <div className="maya-divider w-40 mx-auto" />
        </motion.div>

        <motion.div 
          variants={staggerContainer}
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              variants={staggerItem}
              className="text-center"
              data-testid={`stat-${index}`}
            >
              <div className="w-12 h-12 rounded-xl bg-[#1A3A2A]/30 flex items-center justify-center mx-auto mb-4">
                <stat.icon className="w-6 h-6 text-[#900024]" />
              </div>
              <p className="stat-number mb-2">{stat.value}</p>
              <p className="text-[#9A8890] text-sm tracking-wider uppercase font-sans">
                {stat.label}
              </p>
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
      category: "App Móvil",
      title: "300 Lugares",
      description: "App nativa para iOS y Android que conecta a los amantes de la botana con los mejores lugares tradicionales de Chiapas.",
      image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&auto=format&fit=crop&q=80",
      badges: ["iOS", "Android"]
    },
    {
      category: "Software a la Medida",
      title: "Sistema de Gestión Empresarial",
      description: "Plataforma web personalizada para control de inventario, ventas y reportes en tiempo real.",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=80",
      badges: [".NET", "PHP"]
    },
    {
      category: "Agente de IA",
      title: "Asistente para Empresas",
      description: "Automatización de procesos internos: gestión de inventario, seguimiento de tareas, reportes automáticos y flujos de trabajo sin intervención humana.",
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&auto=format&fit=crop&q=80",
      badges: ["IA", "Automatización"]
    }
  ];

  return (
    <section id="portfolio" className="py-24 md:py-32 relative" style={{ background: 'linear-gradient(180deg, #141008 0%, #111006 50%, #141008 100%)' }} data-testid="portfolio-section">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <motion.div {...fadeInUp} className="text-center mb-16">
          <span className="text-sm font-sans font-medium tracking-[0.2em] uppercase text-[#900024] mb-4 block">
            Portafolio
          </span>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-[#F5F0E8] mb-6">
            Proyectos que hablan por sí solos
          </h2>
          <div className="maya-divider w-40 mx-auto" />
        </motion.div>

        <motion.div 
          variants={staggerContainer}
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-6 md:gap-8 mb-12"
        >
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              variants={staggerItem}
              className="group relative rounded-2xl overflow-hidden bg-[#2A1820] border border-[#900024]/10 hover:border-[#900024]/40 transition-all duration-500"
              data-testid={`portfolio-card-${index}`}
            >
              {/* Image */}
              <div className="relative aspect-[4/3] overflow-hidden">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                {/* Amber Overlay on Hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#141008] via-[#141008]/60 to-transparent opacity-80" />
                <div className="absolute inset-0 bg-[#900024]/0 group-hover:bg-[#900024]/20 transition-all duration-500" />
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Category Tag */}
                <span className="inline-block text-xs px-3 py-1.5 rounded-full bg-[#900024]/10 border border-[#900024]/20 text-[#900024] tracking-wider uppercase mb-4">
                  {project.category}
                </span>

                {/* Title */}
                <h3 className="font-serif text-2xl text-[#F5F0E8] mb-2">
                  {project.title}
                </h3>

                {/* Description */}
                <p className="text-[#9A8890] font-light text-sm leading-relaxed mb-4">
                  {project.description}
                </p>

                {/* Badges */}
                {project.badges && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.badges.map(badge => (
                      <span
                        key={badge}
                        className="text-xs px-2.5 py-1 rounded-md bg-[#1A3A2A]/30 border border-[#1A3A2A]/40 text-[#F5F0E8] tracking-wide"
                      >
                        {badge}
                      </span>
                    ))}
                  </div>
                )}

                {/* Link */}
                <a 
                  href="#" 
                  className="inline-flex items-center gap-2 text-[#900024] font-medium text-sm tracking-wide hover:gap-3 transition-all group-hover:text-[#FF0040]"
                >
                  Ver proyecto
                  <ArrowRight size={16} />
                </a>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* View All Button */}
        <motion.div {...fadeInUp} className="text-center">
          <a
            href="#"
            className="btn-outline-cream inline-flex items-center gap-3 px-8 py-4 rounded-full text-sm font-medium tracking-wide"
            data-testid="portfolio-view-all"
          >
            Ver todos los proyectos
            <ArrowRight size={18} />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

// AI Highlight Section
const AISection = () => {
  const [activeTab, setActiveTab] = useState('cliente');

  const useCases = {
    cliente: {
      title: "Atención al Cliente",
      features: [
        "Agenda citas automáticamente",
        "Responde preguntas frecuentes 24/7",
        "Nunca pierde un lead"
      ],
      chatMessages: [
        { type: 'user', text: '¿Tienen disponibilidad para mañana a las 3pm?' },
        { type: 'ai', text: '¡Claro! Tenemos disponibilidad mañana a las 3:00 PM. ¿Te gustaría que agende tu cita? Solo necesito tu nombre y número de contacto.' },
        { type: 'user', text: 'Sí, soy María García, 961-123-4567' }
      ]
    },
    interna: {
      title: "Gestión Interna",
      features: [
        "Automatiza procesos repetitivos",
        "Gestiona inventario y seguimiento",
        "Reportes sin intervención humana"
      ],
      chatMessages: [
        { type: 'user', text: '¿Cuál es el estado del inventario de producto A?' },
        { type: 'ai', text: 'El producto A tiene 45 unidades en stock. Basado en las ventas de los últimos 30 días, te recomiendo hacer un pedido de reabastecimiento esta semana.' },
        { type: 'user', text: 'Genera un reporte de ventas del mes' }
      ]
    }
  };

  const currentCase = useCases[activeTab];

  return (
    <section id="ai" className="ai-section py-24 md:py-32 relative" data-testid="ai-section">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <motion.div {...fadeInUp} className="text-center mb-12">
          <span className="text-sm font-sans font-medium tracking-[0.2em] uppercase text-[#900024] mb-4 block">
            Inteligencia Artificial
          </span>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-[#F5F0E8] mb-6">
            Transforma tu negocio con un agente de IA
          </h2>
          <div className="maya-divider w-40 mx-auto" />
        </motion.div>

        {/* Use Case Tabs */}
        <motion.div {...fadeInUp} className="flex justify-center mb-12">
          <div className="inline-flex p-1.5 rounded-full bg-[#2A1820] border border-[#900024]/10">
            <button
              onClick={() => setActiveTab('cliente')}
              className={`px-6 py-3 rounded-full text-sm font-medium tracking-wide transition-all duration-300 ${
                activeTab === 'cliente'
                  ? 'bg-[#900024] text-[#141008]'
                  : 'text-[#9A8890] hover:text-[#F5F0E8]'
              }`}
              data-testid="ai-tab-cliente"
            >
              <MessageCircle className="w-4 h-4 inline-block mr-2" />
              Atención al Cliente
            </button>
            <button
              onClick={() => setActiveTab('interna')}
              className={`px-6 py-3 rounded-full text-sm font-medium tracking-wide transition-all duration-300 ${
                activeTab === 'interna'
                  ? 'bg-[#900024] text-[#141008]'
                  : 'text-[#9A8890] hover:text-[#F5F0E8]'
              }`}
              data-testid="ai-tab-interna"
            >
              <BrainCircuit className="w-4 h-4 inline-block mr-2" />
              Gestión Interna
            </button>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
          {/* Content */}
          <motion.div 
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="font-serif text-3xl md:text-4xl text-[#F5F0E8] mb-6">
              {currentCase.title}
            </h3>
            <div className="maya-divider w-24 mb-8" />
            <ul className="space-y-5 mb-8">
              {currentCase.features.map((item, i) => (
                <li key={i} className="flex items-start gap-4 text-[#F5F0E8]">
                  <div className="w-8 h-8 rounded-lg bg-[#1A3A2A]/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <CheckCircle2 className="w-4 h-4 text-[#900024]" />
                  </div>
                  <span className="text-lg font-light">{item}</span>
                </li>
              ))}
            </ul>
            <a
              href="#contact"
              className="btn-amber inline-flex items-center gap-3 px-8 py-4 rounded-full text-sm font-semibold tracking-wide"
              data-testid="ai-cta"
            >
              Solicitar demo
              <ArrowRight size={18} />
            </a>
          </motion.div>

          {/* Chat Mockup */}
          <motion.div 
            key={`chat-${activeTab}`}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="chat-mockup p-6"
          >
            {/* Chat Header */}
            <div className="flex items-center gap-3 pb-4 border-b border-[#900024]/10 mb-6">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#900024] to-[#1A3A2A] flex items-center justify-center">
                <Bot className="w-5 h-5 text-[#F5F0E8]" />
              </div>
              <div>
                <p className="text-[#F5F0E8] font-medium">
                  {activeTab === 'cliente' ? 'Asistente de Ventas' : 'Asistente Interno'}
                </p>
                <p className="text-xs text-[#1A3A2A]">En línea</p>
              </div>
            </div>

            {/* Chat Messages */}
            <div className="space-y-4">
              {currentCase.chatMessages.map((msg, i) => (
                <div key={i} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`${msg.type === 'user' ? 'chat-bubble-user' : 'chat-bubble-ai'} px-4 py-3 max-w-[85%]`}>
                    <p className={`text-sm ${msg.type === 'user' ? 'font-medium' : ''}`}>{msg.text}</p>
                  </div>
                </div>
              ))}
              <div className="flex justify-start items-end gap-2">
                <div className="chat-bubble-ai px-4 py-3">
                  <div className="flex gap-1">
                    <motion.div 
                      animate={{ opacity: [0.4, 1, 0.4] }}
                      transition={{ duration: 1, repeat: Infinity }}
                      className="w-2 h-2 rounded-full bg-[#900024]"
                    />
                    <motion.div 
                      animate={{ opacity: [0.4, 1, 0.4] }}
                      transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
                      className="w-2 h-2 rounded-full bg-[#900024]"
                    />
                    <motion.div 
                      animate={{ opacity: [0.4, 1, 0.4] }}
                      transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
                      className="w-2 h-2 rounded-full bg-[#900024]"
                    />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// Contact Section
const Contact = () => {
  return (
    <section id="contact" className="py-24 md:py-32 relative contact-warm" data-testid="contact-section">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <motion.div {...fadeInUp} className="grid md:grid-cols-2 gap-12 md:gap-20">
          {/* Left Side */}
          <div>
            <span className="text-sm font-sans font-medium tracking-[0.2em] uppercase text-[#900024] mb-4 block">
              Contacto
            </span>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-[#F5F0E8] mb-8 leading-[1.1]">
              Platiquemos de tu proyecto
            </h2>
            <div className="maya-divider w-24 mb-8" />
            <p className="text-lg text-[#9A8890] font-light leading-relaxed mb-10">
              Estamos listos para escucharte y convertir tus ideas en soluciones 
              digitales extraordinarias. Contáctanos sin compromiso.
            </p>

            {/* Contact Info */}
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#1A3A2A]/20 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5 text-[#900024]" />
                </div>
                <div>
                  <p className="text-[#F5F0E8] font-medium mb-1">Ubicación</p>
                  <p className="text-[#9A8890]">Tuxtla Gutiérrez, Chiapas, México</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#1A3A2A]/20 flex items-center justify-center flex-shrink-0">
                  <Phone className="w-5 h-5 text-[#900024]" />
                </div>
                <div>
                  <p className="text-[#F5F0E8] font-medium mb-1">Teléfono</p>
                  <p className="text-[#9A8890]">+52 961 XXX XXXX</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#1A3A2A]/20 flex items-center justify-center flex-shrink-0">
                  <MessageCircle className="w-5 h-5 text-[#900024]" />
                </div>
                <div>
                  <p className="text-[#F5F0E8] font-medium mb-1">WhatsApp</p>
                  <p className="text-[#9A8890]">Respuesta inmediata</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - CTA Card */}
          <div className="flex items-center justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="warm-glass-card rounded-3xl p-10 text-center w-full max-w-md amber-glow"
            >
              <div className="w-20 h-20 rounded-full bg-[#25D366]/10 flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10" viewBox="0 0 24 24" fill="#25D366">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
              </div>
              <h3 className="font-serif text-3xl text-[#F5F0E8] mb-4">
                Escríbenos
              </h3>
              <p className="text-[#9A8890] mb-8 font-light">
                Respuesta rápida por WhatsApp. Estamos disponibles para ti.
              </p>
              <a
                href="https://wa.me/529612680529"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 bg-[#25D366] hover:bg-[#20BD5A] text-white px-8 py-4 rounded-full font-semibold tracking-wide transition-all duration-300 hover:shadow-[0_0_25px_rgba(37,211,102,0.4)] hover:-translate-y-1 w-full"
                data-testid="whatsapp-cta"
              >
                Iniciar conversación
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
    <footer className="footer-warm py-12" data-testid="footer">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="maya-pattern-border pb-8 mb-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <img
                src={iconoSomos}
                alt="Ambar Rojo Studios"
                className="logo-glow h-9 w-auto object-contain"
              />
              <span className="font-serif text-xl tracking-wide text-[#F5F0E8]">Ambar Rojo Studios</span>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-4">
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-[#F5F0E8]/5 flex items-center justify-center hover:bg-[#900024]/20 transition-colors"
                data-testid="social-twitter"
              >
                <Twitter size={18} className="text-[#9A8890]" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-[#F5F0E8]/5 flex items-center justify-center hover:bg-[#900024]/20 transition-colors"
                data-testid="social-facebook"
              >
                <Facebook size={18} className="text-[#9A8890]" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-[#F5F0E8]/5 flex items-center justify-center hover:bg-[#900024]/20 transition-colors"
                data-testid="social-instagram"
              >
                <Instagram size={18} className="text-[#9A8890]" />
              </a>
            </div>

            {/* Copyright */}
            <p className="text-[#9A8890] text-sm">
              © 2026 Ambar Rojo Studios. Todos los derechos reservados.
            </p>
          </div>
        </div>

        <p className="text-center text-[#9A8890]/50 text-xs tracking-wider uppercase">
          Hecho con orgullo en Chiapas, México
        </p>
      </div>
    </footer>
  );
};

// WhatsApp Floating Button
const WhatsAppButton = () => {
  return (
    <motion.a
      href="https://wa.me/529612680529"
      target="_blank"
      rel="noopener noreferrer"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ delay: 2, type: "spring" }}
      className="whatsapp-btn-warm"
      data-testid="whatsapp-floating-btn"
    >
      <svg className="w-7 h-7" viewBox="0 0 24 24" fill="currentColor">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
      </svg>
    </motion.a>
  );
};

// Main App
function App() {
  return (
    <div className="App min-h-screen" style={{ backgroundColor: '#1C1014' }}>
      <GrainOverlay />
      <Navigation />
      <Hero />
      <About />
      <Services />
      <Portfolio />
      <AISection />
      <WhyUs />
      <Contact />
      <Footer />
      <WhatsAppButton />
    </div>
  );
}

export default App;
