import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaHandshake, FaLeaf, FaLightbulb, FaMedal, FaUsers, FaTools, FaChevronDown, FaHammer, FaTree, FaRuler, FaPaintRoller, FaHeart, FaQuoteLeft } from "react-icons/fa";

gsap.registerPlugin(ScrollTrigger);

const AboutUs = () => {
  const heroRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const buttonRef = useRef(null);
  const scrollIndicatorRef = useRef(null);
  const storyImageRef = useRef(null);
  const storyTextRef = useRef(null);
  const missionRef = useRef(null);
  const valuesRefs = useRef([]);
  const teamRefs = useRef([]);
  const craftsmanshipRef = useRef(null);
  const processItemsRef = useRef([]);
  const galleryRef = useRef(null);
  const testimonialRef = useRef(null);
  const footerRef = useRef(null);

  useEffect(() => {
    // Hero section animations
    const heroTl = gsap.timeline();
    heroTl
      .fromTo(titleRef.current, 
        { opacity: 0, y: 80 }, 
        { opacity: 1, y: 0, duration: 1.5, ease: "power3.out" }
      )
      .fromTo(subtitleRef.current, 
        { opacity: 0, y: 50 }, 
        { opacity: 1, y: 0, duration: 1.2, ease: "power3.out" }, 
        "-=1"
      )
      .fromTo(buttonRef.current, 
        { opacity: 0, y: 30 }, 
        { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
        "-=0.8"
      )
      .fromTo(scrollIndicatorRef.current, 
        { opacity: 0, y: 20 }, 
        { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
        "-=0.5"
      );
    
    // Scroll indicator animation
    gsap.to(scrollIndicatorRef.current.querySelector('.bounce'), {
      y: 15,
      repeat: -1,
      yoyo: true,
      duration: 1.2,
      ease: "power1.inOut"
    });

    // Story section animations
    gsap.fromTo(storyImageRef.current, 
      { opacity: 0, x: -80, rotation: -3 }, 
      { 
        opacity: 1, 
        x: 0, 
        rotation: 0,
        duration: 1.2, 
        scrollTrigger: {
          trigger: storyImageRef.current,
          start: "top bottom-=150",
          toggleActions: "play none none none"
        }
      }
    );
    
    gsap.fromTo(storyTextRef.current, 
      { opacity: 0, y: 60 }, 
      { 
        opacity: 1, 
        y: 0, 
        duration: 1.2, 
        stagger: 0.2,
        scrollTrigger: {
          trigger: storyTextRef.current,
          start: "top bottom-=150",
          toggleActions: "play none none none"
        }
      }
    );
    
    // Mission section animation
    gsap.fromTo(missionRef.current, 
      { opacity: 0, y: 50 }, 
      { 
        opacity: 1, 
        y: 0, 
        duration: 0.8, 
        scrollTrigger: {
          trigger: missionRef.current,
          start: "top bottom-=100",
          toggleActions: "play none none none"
        }
      }
    );
    
    // Values cards animations
    valuesRefs.current.forEach((el, index) => {
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
            toggleActions: "play none none none"
          }
        }
      );
    });
    
    // Team members animations
    teamRefs.current.forEach((el, index) => {
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
            toggleActions: "play none none none"
          }
        }
      );
    });
    
    // Craftsmanship section animation
    gsap.fromTo(craftsmanshipRef.current, 
      { opacity: 0, y: 50 }, 
      { 
        opacity: 1, 
        y: 0, 
        duration: 0.8, 
        scrollTrigger: {
          trigger: craftsmanshipRef.current,
          start: "top bottom-=100",
          toggleActions: "play none none none"
        }
      }
    );
    
    // Process items animations
    processItemsRef.current.forEach((el, index) => {
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
            toggleActions: "play none none none"
          }
        }
      );
    });
    
    // Gallery animation
    gsap.fromTo(galleryRef.current, 
      { opacity: 0, y: 50 }, 
      { 
        opacity: 1, 
        y: 0, 
        duration: 1, 
        scrollTrigger: {
          trigger: galleryRef.current,
          start: "top bottom-=150",
          toggleActions: "play none none none"
        }
      }
    );
    
    // Testimonial animation
    gsap.fromTo(testimonialRef.current, 
      { opacity: 0, y: 50 }, 
      { 
        opacity: 1, 
        y: 0, 
        duration: 1, 
        scrollTrigger: {
          trigger: testimonialRef.current,
          start: "top bottom-=150",
          toggleActions: "play none none none"
        }
      }
    );
    
    // Footer animation
    gsap.fromTo(footerRef.current, 
      { opacity: 0, y: 50 }, 
      { 
        opacity: 1, 
        y: 0, 
        duration: 1, 
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top bottom-=200",
          toggleActions: "play none none none"
        }
      }
    );
    
    // Clean up ScrollTriggers
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

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

  // Data for values
  const valuesData = [
    { icon: <FaTools className="text-3xl" />, title: "Craftsmanship", description: "We blend artisanal skill with modern design to create heirloom-quality furniture." },
    { icon: <FaLeaf className="text-3xl" />, title: "Sustainability", description: "Responsibly sourced materials and eco-friendly practices in every piece." },
    { icon: <FaLightbulb className="text-3xl" />, title: "Innovation", description: "Pushing boundaries in design while respecting traditional techniques." },
    { icon: <FaHeart className="text-3xl" />, title: "Customer Focus", description: "Building relationships through exceptional service and personalized solutions." },
    { icon: <FaMedal className="text-3xl" />, title: "Quality", description: "Uncompromising standards from material selection to final finish." },
    { icon: <FaUsers className="text-3xl" />, title: "Community", description: "Supporting local artisans and investing in our neighborhoods." }
  ];

  // Data for team members
  const teamData = [
    { name: "Sarah Johnson", position: "Creative Director", experience: "12 years", quote: "Design is where science and art break even." },
    { name: "Michael Chen", position: "Lead Designer", experience: "8 years", quote: "Simplicity is the ultimate sophistication." },
    { name: "Elena Rodriguez", position: "Master Craftsman", experience: "15 years", quote: "Wood has a soul - my job is to reveal it." },
    { name: "David Wilson", position: "Operations Manager", experience: "10 years", quote: "Precision in process creates perfection in product." },
    { name: "Olivia Parker", position: "Customer Experience", experience: "7 years", quote: "Every client relationship is a new story." },
    { name: "James Thompson", position: "Materials Specialist", experience: "9 years", quote: "The forest whispers secrets to those who listen." },
    { name: "Sophia Miller", position: "Marketing Director", experience: "6 years", quote: "Sharing the beauty of craftsmanship with the world." },
    { name: "Benjamin Carter", position: "Production Lead", experience: "11 years", quote: "Quality is never an accident." }
  ];

  // Craftsmanship process data
  const processData = [
    { icon: <FaTree className="text-3xl" />, title: "Material Selection", description: "We source only the finest sustainable hardwoods from certified forests around the world." },
    { icon: <FaHammer className="text-3xl" />, title: "Wood Curing", description: "Each plank is cured for 6-12 months to achieve perfect moisture content and stability." },
    { icon: <FaTools className="text-3xl" />, title: "Artisan Crafting", description: "Master craftsmen shape each piece using traditional techniques combined with modern precision." },
    { icon: <FaRuler className="text-3xl" />, title: "Precision Joinery", description: "Traditional joinery techniques ensure structural integrity that lasts generations." },
    { icon: <FaPaintRoller className="text-3xl" />, title: "Finishing Touches", description: "Hand-applied natural finishes that enhance the wood's beauty and provide lasting protection." },
    { icon: <FaMedal className="text-3xl" />, title: "Quality Inspection", description: "Every piece undergoes rigorous 12-point inspection before leaving our workshop." }
  ];

  return (
    <div className="bg-[#F5F1E9] text-[#333333] overflow-hidden">
      {/* Hero Section - Full Viewport Height */}
      <div 
        ref={heroRef}
        className="relative h-screen flex items-center justify-center bg-black"
      >
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/70 to-black/90 z-10"></div>
        
        {/* Furniture background */}
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-80"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?auto=format&fit=crop&w=1920')" }}
        ></div>
        
        {/* Content */}
        <div className="relative z-20 text-center px-4 max-w-4xl">
          <div className="mb-10">
            <div className="w-20 h-1 bg-[#C5A880] mx-auto mb-6"></div>
            <h1 
              ref={titleRef}
              className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-wide"
            >
              Crafting Timeless Spaces
            </h1>
            <div className="w-32 h-1 bg-[#C5A880] mx-auto mt-6"></div>
          </div>
          
          <p 
            ref={subtitleRef}
            className="text-xl md:text-2xl text-[#E8DFD1] max-w-2xl mx-auto mb-10"
          >
            Blending centuries-old craftsmanship with contemporary design to create furniture that tells a story
          </p>
          
          <button
            ref={buttonRef}
            onMouseEnter={handleButtonHover}
            onMouseLeave={handleButtonHoverEnd}
            className="mt-8 border-2 border-white text-white px-10 py-3 rounded-full font-medium text-lg transition-all duration-300 hover:bg-[#C5A880] hover:border-[#C5A880]"
          >
            Explore Our Collection
          </button>
        </div>
        
        {/* Enhanced Scroll indicator */}
        <div 
          ref={scrollIndicatorRef}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20 flex flex-col items-center"
        >
          <span className="text-[#E8DFD1] mb-2 text-sm tracking-wider">SCROLL TO DISCOVER</span>
          <div className="bounce w-12 h-12 rounded-full border-2 border-[#C5A880] flex items-center justify-center bg-black/30 backdrop-blur-sm">
            <FaChevronDown className="text-[#C5A880] text-xl animate-pulse" />
          </div>
          <div className="mt-2 w-1 h-10 bg-gradient-to-b from-[#C5A880] to-transparent rounded-full opacity-70"></div>
        </div>
      </div>

      {/* Story Section */}
      <div className="py-24 px-4 md:px-8 max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center gap-16">
          <div 
            ref={storyImageRef}
            className="w-full md:w-1/2 h-[500px] relative overflow-hidden rounded-2xl shadow-2xl"
          >
            <div 
              className="w-full h-full bg-cover bg-center"
              style={{ backgroundImage: "url('https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=1000')" }}
            ></div>
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 text-white">
              <p className="text-sm opacity-80">Our workshop in Brooklyn, NY</p>
            </div>
          </div>
          
          <div 
            ref={storyTextRef}
            className="w-full md:w-1/2"
          >
            <h3 className="text-3xl md:text-4xl font-bold text-[#2F4F4F] mb-6">Our Heritage & Journey</h3>
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
      </div>

      {/* Mission & Values */}
      <div className="py-24 bg-[#2F4F4F] text-white">
        <div className="max-w-6xl mx-auto px-4">
          <h3 
            ref={missionRef}
            className="text-4xl font-bold text-center mb-6"
          >
            Our Guiding Principles
          </h3>
          <p className="text-xl text-center max-w-2xl mx-auto mb-16 text-[#E8DFD1]">
            The values that shape every decision, every design, and every piece we create
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {valuesData.map((value, index) => (
              <div 
                key={index}
                ref={el => valuesRefs.current[index] = el}
                className="bg-[#3A5F5F] p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-[#5C3A21]/30"
              >
                <div className="w-16 h-16 rounded-full bg-[#5C3A21] flex items-center justify-center mb-6 text-white">
                  {value.icon}
                </div>
                <h4 className="text-2xl font-bold mb-4">{value.title}</h4>
                <p className="text-[#E8DFD1]">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Enhanced Meet Our Artisans Section */}
      <div className="py-24 px-4 max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h3 className="text-4xl font-bold text-[#2F4F4F] mb-6">Meet Our Artisans</h3>
          <p className="text-xl max-w-2xl mx-auto text-[#5C3A21]">
            The passionate individuals who transform raw materials into works of art
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {teamData.map((member, index) => (
            <div 
              key={index}
              ref={el => teamRefs.current[index] = el}
              className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group relative"
            >
              <div className="h-60 bg-gradient-to-br from-[#FFF9F0] to-[#E8DFD1] relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-gray-200 border-2 border-dashed rounded-xl w-32 h-32" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                  <h4 className="font-bold text-xl group-hover:text-[#C5A880] transition-colors">{member.name}</h4>
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
                  <button className="text-xs bg-[#F5F1E9] text-[#2F4F4F] px-3 py-1 rounded-full hover:bg-[#C5A880] hover:text-white transition-colors">
                    View Work
                  </button>
                  <button className="text-xs border border-[#2F4F4F] text-[#2F4F4F] px-3 py-1 rounded-full hover:bg-[#2F4F4F] hover:text-white transition-colors">
                    Contact
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Enhanced Hudson Craftsmanship Section */}
      <div className="py-24 bg-gradient-to-b from-[#F5F1E9] to-[#E8DFD1]">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16" ref={craftsmanshipRef}>
            <h3 className="text-4xl font-bold text-[#2F4F4F] mb-6">The Hudson Craftsmanship</h3>
            <p className="text-xl max-w-3xl mx-auto text-[#5C3A21]">
              Our meticulous process from forest to finished piece
            </p>
          </div>
          
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-1 bg-[#C5A880] transform md:-translate-x-1/2 z-0"></div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-12 gap-x-8 relative z-10">
              {processData.map((step, index) => (
                <div 
                  key={index}
                  ref={el => processItemsRef.current[index] = el}
                  className={`bg-white p-6 rounded-2xl shadow-md border border-[#E8DFD1] relative ${
                    index % 2 === 0 ? 'md:mr-auto md:pr-12' : 'md:ml-auto md:pl-12'
                  }`}
                >
                  {/* Timeline dot */}
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
                      <h4 className="text-xl font-bold text-[#2F4F4F] mb-3">{step.title}</h4>
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
                <h4 className="text-2xl font-bold mb-4">Our Workshop Experience</h4>
                <p className="mb-4">
                  Visit our 15,000 sq ft workshop in Brooklyn where all our pieces come to life. 
                  Each month we host open studio days where you can see our craftsmen at work and
                  even participate in woodworking workshops.
                </p>
                <div className="flex gap-4 mt-6">
                  <button 
                    onMouseEnter={handleButtonHover}
                    onMouseLeave={handleButtonHoverEnd}
                    className="border border-white text-white px-6 py-2 rounded-full hover:bg-[#C5A880] hover:border-[#C5A880] transition-colors"
                  >
                    Schedule a Tour
                  </button>
                  <button 
                    onMouseEnter={handleButtonHover}
                    onMouseLeave={handleButtonHoverEnd}
                    className="border border-[#C5A880] text-[#C5A880] px-6 py-2 rounded-full hover:bg-[#C5A880] hover:text-white transition-colors"
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
      </div>

      {/* Gallery Section */}
      <div className="py-24 px-4 max-w-6xl mx-auto" ref={galleryRef}>
        <div className="text-center mb-16">
          <h3 className="text-4xl font-bold text-[#2F4F4F] mb-6">Our Signature Pieces</h3>
          <p className="text-xl max-w-2xl mx-auto text-[#5C3A21]">
            Timeless designs that define the Hudson aesthetic
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, index) => (
            <div 
              key={index}
              className="aspect-[4/5] bg-gradient-to-br from-[#FFF9F0] to-[#E8DFD1] rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 relative group"
            >
              <div className="absolute inset-0 bg-gray-200 border-2 border-dashed rounded-xl" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                <div>
                  <h4 className="font-bold text-white text-xl">Hudson Collection</h4>
                  <p className="text-[#E8DFD1]">Walnut & Leather</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Testimonial Section */}
      <div className="py-24 bg-[#2F4F4F] text-white" ref={testimonialRef}>
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
      </div>

      {/* Footer */}
      <footer 
        ref={footerRef}
        className="bg-[#2F4F4F] text-white pt-16 pb-8"
      >
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 px-6">
          <div>
            <h4 className="text-2xl font-bold mb-6">Hudson's Furniture</h4>
            <p className="text-[#E8DFD1] mb-4">
              Crafting timeless pieces for modern homes since 1995.
            </p>
            <div className="flex gap-4 mt-4">
              {[...Array(3)].map((_, i) => (
                <div 
                  key={i}
                  className="w-10 h-10 rounded-full bg-[#5C3A21] flex items-center justify-center hover:bg-[#C5A880] transition-colors cursor-pointer"
                >
                  <span className="text-xs">fb</span>
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Explore</h4>
            <ul className="space-y-2 text-[#E8DFD1]">
              {["Collections", "Custom Orders", "Showrooms", "Inspiration Gallery", "Care Instructions"].map((item, i) => (
                <li key={i} className="hover:text-[#C5A880] cursor-pointer transition-colors">
                  {item}
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-[#E8DFD1]">
              {["About Us", "Sustainability", "Careers", "Press", "Trade Program"].map((item, i) => (
                <li key={i} className="hover:text-[#C5A880] cursor-pointer transition-colors">
                  {item}
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
            <address className="not-italic text-[#E8DFD1]">
              <p className="mb-2">123 Design Avenue</p>
              <p className="mb-4">New York, NY 10001</p>
              <p className="mb-1">info@hudsons.com</p>
              <p className="mb-6">(212) 555-7890</p>
              <button 
                onMouseEnter={handleButtonHover}
                onMouseLeave={handleButtonHoverEnd}
                className="border border-white text-white px-6 py-2 rounded-full hover:bg-[#C5A880] hover:border-[#C5A880] transition-colors"
              >
                Schedule Consultation
              </button>
            </address>
          </div>
        </div>
        
        <div className="max-w-6xl mx-auto mt-16 pt-8 border-t border-[#5C3A21] text-center text-[#E8DFD1]">
          <p>© 2023 Hudson's Furniture. All rights reserved. Crafted with passion in Brooklyn, NY.</p>
        </div>
      </footer>
    </div>
  );
};

export default AboutUs;