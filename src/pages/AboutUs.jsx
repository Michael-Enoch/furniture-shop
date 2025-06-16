import React, { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { 
  FaHandshake, FaLeaf, FaLightbulb, FaMedal, FaUsers, 
  FaTools, FaChevronDown, FaHammer, FaTree, FaRuler, 
  FaPaintRoller, FaHeart, FaQuoteLeft, FaFacebook, 
  FaInstagram, FaPinterest, FaMapMarkerAlt, FaPhone, FaEnvelope 
} from "react-icons/fa";

// Import team images
import teamSarah from "../assets/images/profile-images/fem1.jpg";
import teamMichael from "../assets/images/profile-images/person1.jpg";
import teamElena from "../assets/images/profile-images/fem2.jpg";
import teamDavid from "../assets/images/profile-images/person2.avif";
import teamOlivia from "../assets/images/profile-images/fem3.jpg";
import teamJames from "../assets/images/profile-images/person3.jpg";
import teamSophia from "../assets/images/profile-images/fem4.jpg";
import teamBenjamin from "../assets/images/profile-images/person4.jpeg";

gsap.registerPlugin(ScrollTrigger);

const AboutUs = () => {
  // Refs organized by section
  const sectionRefs = {
    hero: useRef(null),
    story: useRef(null),
    values: useRef(null),
    team: useRef(null),
    craftsmanship: useRef(null),
    gallery: useRef(null),
    testimonial: useRef(null),
    footer: useRef(null)
  };

  const elementRefs = {
    title: useRef(null),
    subtitle: useRef(null),
    ctaButton: useRef(null),
    scrollIndicator: useRef(null),
    storyImage: useRef(null),
    storyText: useRef(null),
    mission: useRef(null),
    valuesCards: useRef([]),
    teamMembers: useRef([]),
    processItems: useRef([]),
    craftsmanshipTitle: useRef(null)
  };

  // Button hover animations
  const handleButtonHover = (e) => {
    gsap.to(e.target, {
      scale: 1.05,
      backgroundColor: "#2F4F4F",
      color: "#F5F1E9",
      duration: 0.3,
      ease: "power1.out"
    });
  };

  const handleButtonHoverEnd = (e) => {
    gsap.to(e.target, {
      scale: 1,
      backgroundColor: "transparent",
      color: "#2F4F4F",
      duration: 0.3,
      ease: "power1.out"
    });
  };

  // Data for sections
  const valuesData = [
    { icon: <FaTools className="text-3xl" />, title: "Craftsmanship", description: "We blend artisanal skill with modern design to create heirloom-quality furniture." },
    { icon: <FaLeaf className="text-3xl" />, title: "Sustainability", description: "Responsibly sourced materials and eco-friendly practices in every piece." },
    { icon: <FaLightbulb className="text-3xl" />, title: "Innovation", description: "Pushing boundaries in design while respecting traditional techniques." },
    { icon: <FaHeart className="text-3xl" />, title: "Customer Focus", description: "Building relationships through exceptional service and personalized solutions." },
    { icon: <FaMedal className="text-3xl" />, title: "Quality", description: "Uncompromising standards from material selection to final finish." },
    { icon: <FaUsers className="text-3xl" />, title: "Community", description: "Supporting local artisans and investing in our neighborhoods." }
  ];

  const teamData = [
    { name: "Sarah Johnson", img: teamSarah, position: "Creative Director", experience: "12 years", quote: "Design is where science and art break even." },
    { name: "Michael Chen", img: teamMichael, position: "Lead Designer", experience: "8 years", quote: "Simplicity is the ultimate sophistication." },
    { name: "Elena Rodriguez", img: teamElena, position: "Master Craftsman", experience: "15 years", quote: "Wood has a soul - my job is to reveal it." },
    { name: "David Wilson", img: teamDavid, position: "Operations Manager", experience: "10 years", quote: "Precision in process creates perfection in product." },
    { name: "Olivia Parker", img: teamOlivia, position: "Customer Experience", experience: "7 years", quote: "Every client relationship is a new story." },
    { name: "James Thompson", img: teamJames, position: "Materials Specialist", experience: "9 years", quote: "The forest whispers secrets to those who listen." },
    { name: "Sophia Miller", img: teamSophia, position: "Marketing Director", experience: "6 years", quote: "Sharing the beauty of craftsmanship with the world." },
    { name: "Benjamin Carter", img: teamBenjamin, position: "Production Lead", experience: "11 years", quote: "Quality is never an accident." }
  ];
  
  const processData = [
    { icon: <FaTree className="text-3xl" />, title: "Material Selection", description: "We source only the finest sustainable hardwoods from certified forests around the world." },
    { icon: <FaHammer className="text-3xl" />, title: "Wood Curing", description: "Each plank is cured for 6-12 months to achieve perfect moisture content and stability." },
    { icon: <FaTools className="text-3xl" />, title: "Artisan Crafting", description: "Master craftsmen shape each piece using traditional techniques combined with modern precision." },
    { icon: <FaRuler className="text-3xl" />, title: "Precision Joinery", description: "Traditional joinery techniques ensure structural integrity that lasts generations." },
    { icon: <FaPaintRoller className="text-3xl" />, title: "Finishing Touches", description: "Hand-applied natural finishes that enhance the wood's beauty and provide lasting protection." },
    { icon: <FaMedal className="text-3xl" />, title: "Quality Inspection", description: "Every piece undergoes rigorous 12-point inspection before leaving our workshop." }
  ];

  const galleryData = [
    { 
      img: "https://images.unsplash.com/photo-1555043720-0b7161d6a49a?auto=format&fit=crop&w=800", 
      title: "Hudson Dining Table", 
      description: "Walnut & Leather"
    },
    { 
      img: "https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&w=800", 
      title: "Modern Lounge Chair", 
      description: "Oak & Wool"
    },
    { 
      img: "https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&w=800", 
      title: "Artisan Bookshelf", 
      description: "Cherry Wood"
    },
    { 
      img: "https://images.unsplash.com/photo-1567538096630-e0c55bd6354f?auto=format&fit=crop&w=800", 
      title: "Executive Desk", 
      description: "Mahogany & Steel"
    },
    { 
      img: "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&w=800", 
      title: "Heritage Bed Frame", 
      description: "Reclaimed Oak"
    },
    { 
      img: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=800", 
      title: "Minimalist Console", 
      description: "Maple & Brass"
    }
  ];

  // Animation setup
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Hero section animations
      gsap.timeline()
        .fromTo(elementRefs.title.current, 
          { opacity: 0, y: 80 }, 
          { opacity: 1, y: 0, duration: 1.5, ease: "power3.out" }
        )
        .fromTo(elementRefs.subtitle.current, 
          { opacity: 0, y: 50 }, 
          { opacity: 1, y: 0, duration: 1.2, ease: "power3.out" }, 
          "-=1"
        )
        .fromTo(elementRefs.ctaButton.current, 
          { opacity: 0, y: 30 }, 
          { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
          "-=0.8"
        );

      // Scroll indicator animation
      gsap.to(elementRefs.scrollIndicator.current?.querySelector('.bounce'), {
        y: 15,
        repeat: -1,
        yoyo: true,
        duration: 1.2,
        ease: "power1.inOut"
      });

      // Section animations with ScrollTrigger
      const sections = Object.values(sectionRefs).filter(Boolean);
      sections.forEach((section, index) => {
        if (section.current) {
          gsap.fromTo(section.current, 
            { opacity: 0, y: 50 }, 
            { 
              opacity: 1, 
              y: 0, 
              duration: 0.8, 
              scrollTrigger: {
                trigger: section.current,
                start: "top bottom-=100",
                toggleActions: "play none none none"
              }
            }
          );
        }
      });

      // Specific element animations
      // Story section
      gsap.fromTo(elementRefs.storyImage.current, 
        { opacity: 0, x: -80, rotation: -3 }, 
        { 
          opacity: 1, 
          x: 0, 
          rotation: 0,
          duration: 1.2, 
          scrollTrigger: {
            trigger: elementRefs.storyImage.current,
            start: "top bottom-=150",
          }
        }
      );
      
      gsap.fromTo(elementRefs.storyText.current, 
        { opacity: 0, y: 60 }, 
        { 
          opacity: 1, 
          y: 0, 
          duration: 1.2,
          scrollTrigger: {
            trigger: elementRefs.storyText.current,
            start: "top bottom-=150",
          }
        }
      );

      // Values cards
      elementRefs.valuesCards.current.forEach((el, index) => {
        if (el) {
          gsap.fromTo(el, 
            { opacity: 0, y: 60, rotation: -5 }, 
            { 
              opacity: 1, 
              y: 0, 
              rotation: 0,
              duration: 0.7, 
              delay: index * 0.15,
              scrollTrigger: {
                trigger: el,
                start: "top bottom-=180",
              }
            }
          );
        }
      });

      // Team members
      elementRefs.teamMembers.current.forEach((el, index) => {
        if (el) {
          gsap.fromTo(el, 
            { opacity: 0, scale: 0.8 }, 
            { 
              opacity: 1, 
              scale: 1, 
              duration: 0.6, 
              delay: index * 0.1,
              scrollTrigger: {
                trigger: el.parentNode,
                start: "top bottom-=180",
              }
            }
          );
        }
      });

      // Process items
      elementRefs.processItems.current.forEach((el, index) => {
        if (el) {
          gsap.fromTo(el, 
            { opacity: 0, y: 60 }, 
            { 
              opacity: 1, 
              y: 0, 
              duration: 0.7, 
              delay: index * 0.2,
              scrollTrigger: {
                trigger: el,
                start: "top bottom-=180",
              }
            }
          );
        }
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="bg-[#F5F1E9] text-[#333333] overflow-hidden">
      {/* Hero Section */}
      <section 
        ref={sectionRefs.hero}
        className="relative h-[90vh] flex items-center justify-center bg-black"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/70 to-black/90 z-10"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-80"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?auto=format&fit=crop&w=1920')" }}
          aria-label="Furniture workshop background"
        ></div>
        
        <div className="relative z-20 text-center px-4 max-w-4xl">
          <div className="mb-10">
            <div className="w-20 h-1 bg-[#C5A880] mx-auto mb-6"></div>
            <h1 
              ref={elementRefs.title}
              className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-wide"
            >
              Crafting Timeless Spaces
            </h1>
            <div className="w-32 h-1 bg-[#C5A880] mx-auto mt-6"></div>
          </div>
          
          <p 
            ref={elementRefs.subtitle}
            className="text-xl md:text-2xl text-[#E8DFD1] max-w-2xl mx-auto mb-10"
          >
            Blending centuries-old craftsmanship with contemporary design to create furniture that tells a story
          </p>
          
          <button
            ref={elementRefs.ctaButton}
            onMouseEnter={handleButtonHover}
            onMouseLeave={handleButtonHoverEnd}
            className="mt-8 border-2 border-white text-white px-10 py-3 rounded-full font-medium text-lg transition-all duration-300 hover:bg-[#C5A880] hover:border-[#C5A880] focus:outline-none focus:ring-2 focus:ring-[#C5A880] focus:ring-opacity-50"
            aria-label="Explore our furniture collection"
          >
            Explore Our Collection
          </button>
        </div>
        
        <div 
          ref={elementRefs.scrollIndicator}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20 flex flex-col items-center"
        >
          <span className="text-[#E8DFD1] mb-2 text-sm tracking-wider">SCROLL TO DISCOVER</span>
          <div className="bounce w-12 h-12 rounded-full border-2 border-[#C5A880] flex items-center justify-center bg-black/30 backdrop-blur-sm">
            <FaChevronDown className="text-[#C5A880] text-xl animate-pulse" />
          </div>
          <div className="mt-2 w-1 h-10 bg-gradient-to-b from-[#C5A880] to-transparent rounded-full opacity-70"></div>
        </div>
      </section>

      {/* Story Section */}
      <section 
        ref={sectionRefs.story}
        className="py-24 px-4 md:px-8 max-w-6xl mx-auto"
      >
        <div className="flex flex-col md:flex-row items-center gap-16">
          <div 
            ref={elementRefs.storyImage}
            className="w-full md:w-1/2 h-[500px] relative overflow-hidden rounded-2xl shadow-2xl"
          >
            <div 
              className="w-full h-full bg-cover bg-center"
              style={{ backgroundImage: "url('https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=1000')" }}
              aria-label="Our workshop in Brooklyn"
            ></div>
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 text-white">
              <p className="text-sm opacity-80">Our workshop in Brooklyn, NY</p>
            </div>
          </div>
          
          <div 
            ref={elementRefs.storyText}
            className="w-full md:w-1/2"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-[#2F4F4F] mb-6">Our Heritage & Journey</h2>
            <p className="text-lg mb-6 leading-relaxed">
              Founded in 1995 by master craftsman Thomas Hudson, our Brooklyn workshop began as a humble space dedicated to reviving forgotten woodworking techniques. Today, we've grown into an internationally recognized atelier while maintaining our commitment to handcrafted excellence.
            </p>
            <p className="text-lg mb-6 leading-relaxed">
              Each piece we create honors the legacy of traditional craftsmanship while embracing contemporary design principles. We believe furniture should be both functional art and an heirloom for future generations.
            </p>
            <div className="flex flex-wrap gap-4 mt-8">
              <div className="bg-[#2F4F4F] text-white px-4 py-2 rounded-full text-sm">25+ Years Experience</div>
              <div className="bg-[#2F4F4F] text-white px-4 py-2 rounded-full text-sm">Family-Owned</div>
              <div className="bg-[#2F4F4F] text-white px-4 py-2 rounded-full text-sm">Handcrafted</div>
              <div className="bg-[#2F4F4F] text-white px-4 py-2 rounded-full text-sm">Sustainable Materials</div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section 
        ref={sectionRefs.values}
        className="py-24 bg-[#2F4F4F] text-white"
      >
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 
              ref={elementRefs.mission}
              className="text-4xl font-bold"
            >
              Our Guiding Principles
            </h2>
            <p className="text-xl max-w-2xl mx-auto mt-4 text-[#E8DFD1]">
              The values that shape every decision, every design, and every piece we create
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {valuesData.map((value, index) => (
              <div 
                key={index}
                ref={el => elementRefs.valuesCards.current[index] = el}
                className="bg-[#3A5F5F] p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-[#5C3A21]/30"
              >
                <div className="w-16 h-16 rounded-full bg-[#5C3A21] flex items-center justify-center mb-6 text-white">
                  {value.icon}
                </div>
                <h3 className="text-2xl font-bold mb-4">{value.title}</h3>
                <p className="text-[#E8DFD1]">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section 
        ref={sectionRefs.team}
        className="py-24 px-4 max-w-6xl mx-auto"
      >
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-[#2F4F4F] mb-6">Meet Our Artisans</h2>
          <p className="text-xl max-w-2xl mx-auto text-[#5C3A21]">
            The passionate individuals who transform raw materials into works of art
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {teamData.map((member, index) => (
            <div 
              key={index}
              ref={el => elementRefs.teamMembers.current[index] = el}
              className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group relative"
            >
              <div className="h-60 relative overflow-hidden">
                <img 
                  src={member.img} 
                  alt={member.name} 
                  className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                  <h3 className="font-bold text-xl group-hover:text-[#C5A880] transition-colors">{member.name}</h3>
                  <p className="text-[#E8DFD1]">{member.position}</p>
                </div>
              </div>
              <div className="p-4">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-xs bg-[#2F4F4F] text-white px-2 py-1 rounded-full">{member.experience}</span>
                  <FaQuoteLeft className="text-[#C5A880]" />
                </div>
                <p className="text-sm text-gray-600 italic">
                  "{member.quote}"
                </p>
                <div className="mt-4 flex gap-2">
                  <button 
                    className="text-xs bg-[#F5F1E9] text-[#2F4F4F] px-3 py-1 rounded-full hover:bg-[#C5A880] hover:text-white transition-colors focus:outline-none focus:ring-1 focus:ring-[#C5A880]"
                    aria-label={`View work by ${member.name}`}
                  >
                    View Work
                  </button>
                  <button 
                    className="text-xs border border-[#2F4F4F] text-[#2F4F4F] px-3 py-1 rounded-full hover:bg-[#2F4F4F] hover:text-white transition-colors focus:outline-none focus:ring-1 focus:ring-[#C5A880]"
                    aria-label={`Contact ${member.name}`}
                  >
                    Contact
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Craftsmanship Section */}
      <section 
        ref={sectionRefs.craftsmanship}
        className="py-24 bg-gradient-to-b from-[#F5F1E9] to-[#E8DFD1]"
      >
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 
              ref={elementRefs.craftsmanshipTitle}
              className="text-4xl font-bold text-[#2F4F4F] mb-6"
            >
              The Hudson Craftsmanship
            </h2>
            <p className="text-xl max-w-3xl mx-auto text-[#5C3A21]">
              Our meticulous process from forest to finished piece
            </p>
          </div>
          
          <div className="relative">
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-1 bg-[#C5A880] transform md:-translate-x-1/2 z-0"></div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-12 gap-x-8 relative z-10">
              {processData.map((step, index) => (
                <div 
                  key={index}
                  ref={el => elementRefs.processItems.current[index] = el}
                  className={`bg-white p-6 rounded-2xl shadow-md border border-[#E8DFD1] relative ${
                    index % 2 === 0 ? 'md:mr-auto md:pr-12' : 'md:ml-auto md:pl-12'
                  }`}
                >
                  <div className={`absolute top-8 w-6 h-6 rounded-full bg-[#C5A880] flex items-center justify-center ${
                    index % 2 === 0 
                      ? 'md:right-[-52px] right-[-12px]' 
                      : 'md:left-[-52px] left-[-12px]'
                  }`}>
                    <div className="w-3 h-3 rounded-full bg-white"></div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="text-3xl text-[#C5A880] mt-1">
                      {step.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-[#2F4F4F] mb-3">{step.title}</h3>
                      <p className="text-gray-700">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="mt-16 bg-[#2F4F4F] rounded-2xl p-8 text-white">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl font-bold mb-4">Our Workshop Experience</h3>
                <p className="mb-4">
                  Visit our 15,000 sq ft workshop in Brooklyn where all our pieces come to life. 
                  Each month we host open studio days where you can see our craftsmen at work and
                  even participate in woodworking workshops.
                </p>
                <div className="flex flex-wrap gap-4 mt-6">
                  <button 
                    onMouseEnter={handleButtonHover}
                    onMouseLeave={handleButtonHoverEnd}
                    className="border border-white text-white px-6 py-2 rounded-full hover:bg-[#C5A880] hover:border-[#C5A880] transition-colors focus:outline-none focus:ring-2 focus:ring-[#C5A880] focus:ring-opacity-50"
                    aria-label="Schedule a workshop tour"
                  >
                    Schedule a Tour
                  </button>
                  <button 
                    onMouseEnter={handleButtonHover}
                    onMouseLeave={handleButtonHoverEnd}
                    className="border border-[#C5A880] text-[#C5A880] px-6 py-2 rounded-full hover:bg-[#C5A880] hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-[#C5A880] focus:ring-opacity-50"
                    aria-label="View workshop calendar"
                  >
                    Workshop Calendar
                  </button>
                </div>
              </div>
              <div className="h-64 bg-gradient-to-br from-[#3A5F5F] to-[#5C3A21] rounded-xl flex items-center justify-center p-6">
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div className="text-4xl font-bold mb-2">15K</div>
                    <div className="text-[#E8DFD1] text-sm">Square Feet</div>
                  </div>
                  <div>
                    <div className="text-4xl font-bold mb-2">42</div>
                    <div className="text-[#E8DFD1] text-sm">Master Craftsmen</div>
                  </div>
                  <div>
                    <div className="text-4xl font-bold mb-2">25+</div>
                    <div className="text-[#E8DFD1] text-sm">Years Experience</div>
                  </div>
                  <div>
                    <div className="text-4xl font-bold mb-2">4</div>
                    <div className="text-[#E8DFD1] text-sm">Generations</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section 
        ref={sectionRefs.gallery}
        className="py-24 px-4 max-w-6xl mx-auto"
      >
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-[#2F4F4F] mb-6">Our Signature Pieces</h2>
          <p className="text-xl max-w-2xl mx-auto text-[#5C3A21]">
            Timeless designs that define the Hudson aesthetic
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryData.map((item, index) => (
            <div 
              key={index}
              className="aspect-[4/5] rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 relative group"
            >
              <img 
                src={item.img} 
                alt={item.title} 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                <div>
                  <h3 className="font-bold text-white text-xl">{item.title}</h3>
                  <p className="text-[#E8DFD1]">{item.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonial Section */}
      <section 
        ref={sectionRefs.testimonial}
        className="py-24 bg-[#2F4F4F] text-white"
      >
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="text-5xl mb-6 text-[#C5A880]">"</div>
          <p className="text-2xl italic mb-8">
            Our Hudson dining table has become the heart of our home. The craftsmanship is exceptional - 
            you can feel the love and attention in every detail. It's more than furniture; it's a legacy piece.
          </p>
          <div className="font-bold text-xl">Emily Richardson</div>
          <div className="text-[#C5A880]">Hudson Customer since 2018</div>
          <div className="flex justify-center mt-8 space-x-2">
            {[...Array(5)].map((_, i) => (
              <FaQuoteLeft key={i} className="text-[#C5A880]/30 text-xl" />
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
  
    </div>
  );
};

export default AboutUs;