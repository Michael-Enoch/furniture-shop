import { useState, useRef, useLayoutEffect, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  FaHandshake,
  FaLeaf,
  FaLightbulb,
  FaMedal,
  FaUsers,
  FaTools,
  FaChevronDown,
  FaHammer,
  FaTree,
  FaRuler,
  FaPaintRoller,
  FaHeart,
  FaQuoteLeft,
  FaFacebook,
  FaInstagram,
  FaPinterest,
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
  FaTimes,
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
import AboutUsSections from "./AboutUsSections";
import theme from "../context/Theme";

gsap.registerPlugin(ScrollTrigger);

const AboutUs = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  // State for modal
  const [selectedArtisan, setSelectedArtisan] = useState(null);
  const [modalType, setModalType] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  // Refs organized by section
  const sectionRefs = {
    hero: useRef(null),
    story: useRef(null),
    values: useRef(null),
    team: useRef(null),
    craftsmanship: useRef(null),
    gallery: useRef(null),
    testimonial: useRef(null),
    footer: useRef(null),
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
    craftsmanshipTitle: useRef(null),
  };

  const modalRef = useRef(null);

  // Modal functions
  const openArtisanModal = (artisan, type) => {
    setSelectedArtisan(artisan);
    setModalType(type);
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
    setSelectedArtisan(null);
    setModalType(null);
  };

  // Data for sections
  const valuesData = [
    {
      icon: <FaTools size={20} />,
      title: "Craftsmanship",
      description:
        "We blend artisanal skill with modern design to create heirloom-quality furniture.",
    },
    {
      icon: <FaLeaf size={22} />,
      title: "Sustainability",
      description:
        "Responsibly sourced materials and eco-friendly practices in every piece.",
    },
    {
      icon: <FaLightbulb size={22} />,
      title: "Innovation",
      description:
        "Pushing boundaries in design while respecting traditional techniques.",
    },
    {
      icon: <FaHeart size={22} />,
      title: "Customer Focus",
      description:
        "Building relationships through exceptional service and personalized solutions.",
    },
    {
      icon: <FaMedal size={22} />,
      title: "Quality",
      description:
        "Uncompromising standards from material selection to final finish.",
    },
    {
      icon: <FaUsers size={22} />,
      title: "Community",
      description:
        "Supporting local artisans and investing in our neighborhoods.",
    },
  ];

  const teamData = [
    {
      name: "Sarah Johnson",
      img: teamSarah,
      position: "Creative Director",
      experience: "12 years",
      quote: "Design is where science and art break even.",
      email: "sarah.johnson@hudsoncraft.com",
      bio: "With a background in industrial design and fine arts, Sarah brings a unique perspective to furniture design that balances form and function.",
    },
    {
      name: "Michael Chen",
      img: teamMichael,
      position: "Lead Designer",
      experience: "8 years",
      quote: "Simplicity is the ultimate sophistication.",
      email: "michael.chen@hudsoncraft.com",
      bio: "Michael specializes in minimalist designs that maximize both aesthetic appeal and practical utility.",
    },
    {
      name: "Elena Rodriguez",
      img: teamElena,
      position: "Master Craftsman",
      experience: "15 years",
      quote: "Wood has a soul - my job is to reveal it.",
      email: "elena.rodriguez@hudsoncraft.com",
      bio: "A third-generation woodworker, Elena preserves traditional techniques while innovating new approaches to joinery.",
    },
    {
      name: "David Wilson",
      img: teamDavid,
      position: "Operations Manager",
      experience: "10 years",
      quote: "Precision in process creates perfection in product.",
      email: "david.wilson@hudsoncraft.com",
      bio: "David ensures our workshop runs with military precision while maintaining our artisanal soul.",
    },
    {
      name: "Olivia Parker",
      img: teamOlivia,
      position: "Customer Experience",
      experience: "7 years",
      quote: "Every client relationship is a new story.",
      email: "olivia.parker@hudsoncraft.com",
      bio: "Olivia builds lasting relationships with our clients, ensuring their vision becomes reality.",
    },
    {
      name: "James Thompson",
      img: teamJames,
      position: "Materials Specialist",
      experience: "9 years",
      quote: "The forest whispers secrets to those who listen.",
      email: "james.thompson@hudsoncraft.com",
      bio: "James travels worldwide to source only the most sustainable and beautiful woods for our creations.",
    },
    {
      name: "Sophia Miller",
      img: teamSophia,
      position: "Marketing Director",
      experience: "6 years",
      quote: "Sharing the beauty of craftsmanship with the world.",
      email: "sophia.miller@hudsoncraft.com",
      bio: "Sophia tells the stories behind our creations and connects with audiences who appreciate true craftsmanship.",
    },
    {
      name: "Benjamin Carter",
      img: teamBenjamin,
      position: "Production Lead",
      experience: "11 years",
      quote: "Quality is never an accident.",
      email: "benjamin.carter@hudsoncraft.com",
      bio: "Benjamin oversees every production detail to ensure each piece meets our exacting standards.",
    },
  ];

  const processData = [
    {
      icon: <FaTree className="text-3xl" />,
      title: "Material Selection",
      description:
        "We source only the finest sustainable hardwoods from certified forests around the world.",
    },
    {
      icon: <FaHammer className="text-3xl" />,
      title: "Wood Curing",
      description:
        "Each plank is cured for 6-12 months to achieve perfect moisture content and stability.",
    },
    {
      icon: <FaTools className="text-3xl" />,
      title: "Artisan Crafting",
      description:
        "Master craftsmen shape each piece using traditional techniques combined with modern precision.",
    },
    {
      icon: <FaRuler className="text-3xl" />,
      title: "Precision Joinery",
      description:
        "Traditional joinery techniques ensure structural integrity that lasts generations.",
    },
    {
      icon: <FaPaintRoller className="text-3xl" />,
      title: "Finishing Touches",
      description:
        "Hand-applied natural finishes that enhance the wood's beauty and provide lasting protection.",
    },
    {
      icon: <FaMedal className="text-3xl" />,
      title: "Quality Inspection",
      description:
        "Every piece undergoes rigorous 12-point inspection before leaving our workshop.",
    },
  ];

  const galleryData = [
    {
      img: "https://images.unsplash.com/photo-1729603369774-23019dbf6c9c?q=80&w=1169&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      title: "Hudson Dining Table",
      description: "Walnut & Leather",
      creator: "Sarah Johnson",
    },
    {
      img: "https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&w=800",
      title: "Modern Lounge Chair",
      description: "Oak & Wool",
      creator: "Michael Chen",
    },
    {
      img: "https://images.unsplash.com/photo-1560976813-060185623241?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      title: "Artisan Bookshelf",
      description: "Cherry Wood",
      creator: "Elena Rodriguez",
    },
    {
      img: "https://images.unsplash.com/photo-1678733405763-ecaf19dbccbe?q=80&w=1140&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      title: "Executive Desk",
      description: "Mahogany & Steel",
      creator: "Benjamin Carter",
    },
    {
      img: "https://images.unsplash.com/photo-1646061142491-fc141798ba14?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      title: "Heritage Bed Frame",
      description: "Reclaimed Oak",
      creator: "James Thompson",
    },
    {
      img: "https://images.unsplash.com/photo-1633435597188-27c1e70f329d?q=80&w=1172&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      title: "Minimalist Console",
      description: "Maple & Brass",
      creator: "Sophia Miller",
    },
  ];

  // Animation setup
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Section animations with ScrollTrigger
      const sections = Object.values(sectionRefs).filter(Boolean);
      sections.forEach((section) => {
        if (section.current) {
          gsap.fromTo(
            section.current,
            { opacity: 0, y: 80 },
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              scrollTrigger: {
                trigger: section.current,
                start: "top bottom-=100",
                toggleActions: "play none none none",
              },
            }
          );
        }
      });

      gsap.fromTo(
        elementRefs.storyText.current,
        { opacity: 0, y: 60, scale: 0.98 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.2,
          scrollTrigger: {
            trigger: elementRefs.storyText.current,
            start: "top bottom-=150",
          },
        }
      );

      // Process items
      elementRefs.processItems.current.forEach((el, index) => {
        if (el) {
          gsap.fromTo(
            el,
            { opacity: 0, y: 60, scale: 0.95 },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.7,
              delay: index * 0.1,
              ease: "back.out(1.7)",
              scrollTrigger: {
                trigger: el,
                start: "top bottom-=180",
              },
            }
          );
        }
      });
    });

    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      className="bg-[#F3EFEB] text-[#2D2D2D] max-w-screen-2xl w-full"
      style={{ fontFamily: theme.fonts.body }}
    >
      <AboutUsSections valuesData={valuesData} />
      {/* Team Section */}
      <section  className="w-full flex flex-col gap-8 items-center justify-center max-w-screen-2xl px-8 py-16 mx-auto"
      style={{background: theme.colors.background.DEFAULT}}
      >
        <div className="w-full text-center flex flex-col items-center justify-center gap-6 max-w-4xl">
          <h2
            className="text-3xl md:text-4xl font-bold"
            style={{
              color: theme.colors.primary.DEFAULT,
              fontFamily: theme.fonts.header,
            }}
          >
            Meet Our Artisans
          </h2>
          <p
            className="text-xl max-w-3xl mx-auto"
            style={{ color: theme.colors.text.primary}}
          >
            The passionate individuals who transform raw materials into works of
            art
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {teamData.map((member, index) => (
            <div
              key={index}
              ref={(el) => (elementRefs.teamMembers.current[index] = el)}
              className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 group relative"
              style={{
                backgroundColor: theme.colors.ui.base,
                borderColor: theme.colors.ui.border,
              }}
            >
              <div className="relative h-60 w-full overflow-hidden cursor-pointer">
                <img
                  src={member.img}
                  alt={member.name}
                  className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h3
                    className="font-bold text-xl transition-colors"
                    style={{ fontFamily: theme.fonts.header, color: theme.colors.primary.contrast }}
                  >
                    {member.name}
                  </h3>
                  <p className="flex items-center" style={{color: theme.colors.text.onPrimary}}>{member.position}</p>
                </div>
              </div>
              <div className="p-4">
                <div className="flex justify-between items-center mb-3">
                  <span
                    className="text-xs text-white px-2 py-1 rounded-full"
                    style={{ backgroundColor: theme.colors.accent.DEFAULT }}
                  >
                    {member.experience}
                  </span>
                  <FaQuoteLeft style={{ color: theme.colors.accent.DEFAULT }} />
                </div>
                <p className="text-sm italic" style={{color: theme.colors.text.primary}}>"{member.quote}"</p>
                <div className="mt-4 flex gap-2">
                  <button
                    onClick={() => openArtisanModal(member, "work")}
                    className="text-xs px-3 py-1 rounded-full transition-colors focus:outline-none focus:ring-1"
                    style={{
                      backgroundColor: theme.colors.background.muted,
                      color: theme.colors.text.primary,
                      fontFamily: theme.fonts.ui,
                      borderColor: theme.colors.ui.border,
                    }}
                    aria-label={`View work by ${member.name}`}
                  >
                    View Work
                  </button>
                  <button
                    onClick={() => openArtisanModal(member, "contact")}
                    className="text-xs border px-3 py-1 rounded-full transition-colors focus:outline-none focus:ring-1"
                    style={{
                      borderColor: theme.colors.primary.DEFAULT,
                      color: theme.colors.primary.DEFAULT,
                      fontFamily: theme.fonts.ui,
                    }}
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
         className="w-full flex flex-col justify-center items-center gap-8 max-w-screen-2xl px-4 sm:px-6 md:px-12 lg:px-16 py-16 mx-auto"
      style={{ background: theme.colors.background.muted, fontFamily: theme.fonts.body }}
      >
          <div className="w-full text-center flex flex-col items-center justify-center gap-6 max-w-4xl">
            <h2
              ref={elementRefs.craftsmanshipTitle}
              className="text-3xl md:text-4xl font-bold"
              style={{
                color: theme.colors.primary.DEFAULT,
                fontFamily: theme.fonts.header,
              }}
            >
              The Hudson Craftsmanship
            </h2>
            <p
              className="text-xl max-w-3xl mx-auto"
              style={{ color: theme.colors.text.primary }}
            >
              Our meticulous process from forest to finished piece
            </p>
          </div>

          <div className="relative w-full">
            <div
              className="absolute left-4 md:left-1/2 top-0 bottom-0 w-1 z-0"
              style={{ backgroundColor: theme.colors.accent.DEFAULT }}
            ></div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-12 gap-x-8 relative z-10">
              {processData.map((step, index) => (
                <div
                  key={index}
                  ref={(el) => (elementRefs.processItems.current[index] = el)}
                  className={`bg-white p-6 rounded-2xl shadow-md border relative ${
                    index % 2 === 0
                      ? "md:mr-auto md:pr-12"
                      : "md:ml-auto md:pl-12"
                  }`}
                  style={{
                    backgroundColor: theme.colors.ui.base,
                    borderColor: theme.colors.ui.border,
                  }}
                >
                  <div
                    className={`absolute top-8 w-6 h-6 rounded-full flex items-center justify-center ${
                      index % 2 === 0
                        ? "md:right-[-52px] right-[-12px]"
                        : "md:left-[-52px] left-[-12px]"
                    }`}
                    style={{ backgroundColor: theme.colors.accent.DEFAULT }}
                  >
                    <div className="w-3 h-3 rounded-full bg-white"></div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div
                      className="text-3xl mt-1"
                      style={{ color: theme.colors.accent.DEFAULT }}
                    >
                      {step.icon}
                    </div>
                    <div>
                      <h3
                        className="text-xl font-bold mb-3"
                        style={{ color: theme.colors.primary.DEFAULT }}
                      >
                        {step.title}
                      </h3>
                      <p style={{ color: theme.colors.text.primary }}>
                        {step.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div
            className="mt-20 max-w-8xl rounded-2xl px-6 py-8"
            style={{ backgroundColor: theme.colors.ui.base, color: theme.colors.text.primary }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="w-full flex flex-col items-center md:items-start">
                <h3
                  className="text-2xl font-bold mb-4 text-center md:text-left"
                  style={{ fontFamily: theme.fonts.header, color: theme.colors.primary.DEFAULT }}
                >
                  Our Workshop Experience
                </h3>
                <p className="mb-3 text-center md:text-left">
                  Visit our 15,000 sq ft workshop in Brooklyn where all our
                  pieces come to life. Each month we host open studio days where
                  you can see our craftsmen at work and even participate in
                  woodworking workshops.
                </p>
                <div className="w-full flex flex-col md:flex-row text-center items-center md:items-start gap-4 mt-6">
                  <button
                    className="flex-1 px-6 py-3 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-opacity-50"
                    style={{
                      fontFamily: theme.fonts.ui,
                      background: theme.colors.primary.DEFAULT,
                      color:theme.colors.primary.contrast
                    }}
                    aria-label="Schedule a workshop tour"
                  >
                    Schedule a Tour
                  </button>
                  <button
                    className="border-1 flex-1 px-6 py-3 text-[#2D2D2D] hover:bg-[#3A2F2A] hover:text-[#F8F5F2] rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-opacity-50"
                    style={{
                      fontFamily: theme.fonts.ui,
                      borderColor: theme.colors.ui.border,
                    }}
                    aria-label="View workshop calendar"
                  >
                    Workshop Calendar
                  </button>
                </div>
              </div>
              <div
                className="px-4 py-6 rounded-xl flex items-center justify-center w-full"
                style={{
                  background: theme.colors.primary.DEFAULT,
                  color: theme.colors.primary.contrast
                }}
              >
                <div className="grid grid-cols-2 gap-4 text-center w-full">
                  <div className="flex flex-col items-center justify-center gap-2">
                    <span className="text-3xl md:text-4xl font-bold">15K</span>
                    <span className="text-[#F8F5F2] text-sm">Square Feet</span>
                  </div>
                   <div className="flex flex-col items-center justify-center spa-2">
                    <span className="text-3xl md:text-4xl font-bold">42</span>
                    <span className="text-[#F8F5F2] text-sm">
                      Master Craftsmen
                    </span>
                  </div>
                  <div className="flex flex-col items-center justify-center gap-2">
                    <span className="text-3xl md:text-4xl font-bold">25+</span>
                    <span className="text-[#F8F5F2] text-sm">
                      Years Experience
                    </span>
                  </div>
                   <div className="flex flex-col items-center justify-center gap-2">
                    <span className="text-3xl md:text-4xl font-bold">4</span>
                    <span className="text-[#F8F5F2] text-sm">Generations</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
      </section>
      {/* Gallery Section */}
      <section
        ref={sectionRefs.gallery}
        className="py-16 px-4 max-w-6xl flex flex-col gap-8 items-center justify-center mx-auto"
        style={{ background: theme.colors.background.DEFAULT, fontFamily: theme.fonts.body }}
      >
        <div className="w-full text-center flex flex-col items-center justify-center gap-6 max-w-4xl">
          <h2
            className="text-3xl md:text-4xl font-bold"
            style={{
              color: theme.colors.primary.DEFAULT,
              fontFamily: theme.fonts.header,
            }}
          >
            Our Signature Pieces
          </h2>
          <p
            className="text-xl max-w-2xl mx-auto"
            style={{ color: theme.colors.text.primary }}
          >
            Timeless designs that define the Hudson aesthetic
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryData.map((item, index) => (
            <div
              key={index}
              className="rounded-xl shadow-md hover:shadow-xl transition-all duration-300 relative group"
            >
              <div className="relative aspect-[4/3] w-full rounded-lg overflow-hidden cursor-pointer">
                <img
                  src={item.img}
                  alt={item.title}
                  className="w-full h-full rounded-lg object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/40" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                <div>
                  <h3 className="font-bold text-xl"
                  style={{color: theme.colors.primary.contrast}}
                  >{item.title}</h3>
                  <p className="text-[#F8F5F2]">{item.description}</p>
                  <p
                    className="text-sm mt-1"
                    style={{ color: theme.colors.primary.contrast }}
                  >
                    By {item.creator}
                  </p>
                </div>
              </div>
              </div>
            </div>
          ))}
        </div>
      </section>
      {/* Testimonial Section */}
      <section
        ref={sectionRefs.testimonial}
         className="py-16 px-4 max-w-screen-2xl flex flex-col gap-8 items-center justify-center mx-auto border-b"
        style={{ backgroundColor: theme.colors.primary.DEFAULT, borderColor: theme.colors.ui.border }}
      >
       <div className="w-full text-center flex flex-col items-center justify-center gap-4 max-w-4xl">
          <div
            className="text-3xl md:text-4xl font-semibold"
            style={{ color: theme.colors.accent.DEFAULT }}
          >
            "
          </div>
          <p
            className="text-lg md:text-2xl italic text-[#F8F5F2]" 
          >
            Our Hudson dining table has become the heart of our home. The
            craftsmanship is exceptional - you can feel the love and attention
            in every detail. It's more than furniture; it's a legacy piece.
          </p>
          <h3
            className="font-bold text-xl"
            style={{ color:theme.colors.primary.contrast }}
          >
            Emily Richardson
          </h3>
          <div style={{ color: theme.colors.accent.DEFAULT }}>
            Hudson Customer since 2018
          </div>
          <div className="flex justify-center items-center space-x-2">
            {[...Array(5)].map((_, i) => (
              <FaQuoteLeft
                key={i}
                className="text-xl"
                style={{ color: `${theme.colors.accent.DEFAULT}30` }}
              />
            ))}
          </div>
        </div>
      </section>
      {/* Artisan Modal */}
      {isModalVisible && selectedArtisan && (
        <div
          ref={modalRef}
          className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4"
          onClick={closeModal}
        >
          <div
            className="bg-white rounded-xl max-w-3xl  w-full max-h-[50vh] custom-scrollbar overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div
              className="sticky top-0 bg-white z-10 p-4 border-b flex justify-between"
              style={{
                borderColor: theme.colors.ui.border,
                fontFamily: theme.fonts.body,
              }}
            >
              <div className="flex flex-col items-start justify-center">
                <h3
                  className="text-2xl font-bold"
                  style={{ color: theme.colors.primary.DEFAULT }}
                >
                  {modalType === "work"
                    ? `${selectedArtisan.name}'s Work`
                    : `Contact ${selectedArtisan.name}`}
                </h3>
                <p style={{ color: theme.colors.text.primary }}>
                  {selectedArtisan.position}
                </p>
              </div>
              <button
                onClick={closeModal}
                className="absolute top-2 right-1  text-gray-400 hover:text-[#A65A2E] transition-colors"
                aria-label="Close modal"
              >
                <FaTimes size={20} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6">
              {modalType === "work" ? (
                // Work Gallery View
                <div className="">
                  <div className="flex flex-col md:flex-row items-start gap-8 mb-8">
                    <div
                      className="w-24 h-24 rounded-full overflow-hidden border-4 flex-shrink-0"
                      style={{ borderColor: theme.colors.accent.DEFAULT }}
                    >
                      <img
                        src={selectedArtisan.img}
                        alt={selectedArtisan.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <p
                        className="text-gray-700 mb-4 italic"
                        style={{ fontFamily: theme.fonts.body }}
                      >
                        "{selectedArtisan.quote}"
                      </p>
                      <p
                        className="text-gray-600"
                        style={{ fontFamily: theme.fonts.body }}
                      >
                        {selectedArtisan.bio}
                      </p>
                    </div>
                  </div>

                  <h4
                    className="text-xl font-bold mb-6 pb-2 border-b"
                    style={{
                      color: theme.colors.primary.DEFAULT,
                      borderColor: theme.colors.accent.DEFAULT,
                      fontFamily: theme.fonts.header,
                    }}
                  >
                    Featured Creations
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                    {galleryData
                      .filter((item) => item.creator === selectedArtisan.name)
                      .map((item, index) => (
                        <div
                          key={index}
                          className="group relative overflow-hidden rounded-xl"
                        >
                          <div className="aspect-[4/3] bg-gray-200 overflow-hidden">
                            <img
                              src={item.img}
                              alt={item.title}
                              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                          </div>
                          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                            <div>
                              <h4
                                className="font-bold text-white"
                                style={{ fontFamily: theme.fonts.body, color: theme.colors.primary.contrast }}
                              >
                                {item.title}
                              </h4>
                              <p
                                className="text-sm"
                                style={{ color: theme.colors.background.muted }}
                              >
                                {item.description}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>

                  <div
                    className="rounded-xl p-6"
                    style={{ backgroundColor: theme.colors.background.muted }}
                  >
                    <h5
                      className="text-lg font-bold mb-3"
                      style={{
                        color: theme.colors.primary.DEFAULT,
                        fontFamily: theme.fonts.header,
                      }}
                    >
                      Design Philosophy
                    </h5>
                    <p
                      className="text-gray-700"
                      style={{ fontFamily: theme.fonts.body }}
                    >
                      {selectedArtisan.name} believes in creating furniture that
                      tells a story. Each piece is designed to evolve with its
                      owner, developing character through years of use while
                      maintaining structural integrity through traditional
                      joinery techniques.
                    </p>
                  </div>
                </div>
              ) : (
                // Contact Form
                <div className="max-w-2xl mx-auto">
                  <div className="flex flex-col md:flex-row items-start gap-8 mb-8">
                    <div
                      className="w-24 h-24 rounded-full overflow-hidden border-4 flex-shrink-0"
                      style={{ borderColor: theme.colors.accent.DEFAULT }}
                    >
                      <img
                        src={selectedArtisan.img}
                        alt={selectedArtisan.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <p
                        className="text-gray-700 mb-4"
                        style={{ fontFamily: theme.fonts.body }}
                      >
                        Contact {selectedArtisan.name} directly about custom
                        commissions, collaborations, or questions about their
                        work.
                      </p>
                      <div
                        className="flex items-center gap-2 text-gray-600 mb-2"
                        style={{ fontFamily: theme.fonts.body }}
                      >
                        <FaEnvelope
                          style={{ color: theme.colors.accent.DEFAULT }}
                        />
                        <span>{selectedArtisan.email}</span>
                      </div>
                      <div
                        className="flex items-center gap-2 text-gray-600"
                        style={{ fontFamily: theme.fonts.body }}
                      >
                        <FaPhone
                          style={{ color: theme.colors.accent.DEFAULT }}
                        />
                        <span>
                          (718) 555-
                          {selectedArtisan.name.split(" ")[0].substring(0, 4)}
                        </span>
                      </div>
                    </div>
                  </div>

                  <form className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <label
                          htmlFor="name"
                          className="block text-gray-700 mb-2"
                          style={{ fontFamily: theme.fonts.ui }}
                        >
                          Your Name
                        </label>
                        <input
                          type="text"
                          id="name"
                          className="w-full px-4 py-3 border rounded-xl focus:ring-2 transition-all"
                          placeholder="John Doe"
                          style={{
                            borderColor: theme.colors.ui.border,
                            fontFamily: theme.fonts.body,
                          }}
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="email"
                          className="block text-gray-700 mb-2"
                          style={{ fontFamily: theme.fonts.ui }}
                        >
                          Your Email
                        </label>
                        <input
                          type="email"
                          id="email"
                          className="w-full px-4 py-3 border rounded-xl focus:ring-2 transition-all"
                          placeholder="john@example.com"
                          style={{
                            borderColor: theme.colors.ui.border,
                            fontFamily: theme.fonts.body,
                          }}
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="subject"
                        className="block text-gray-700 mb-2"
                        style={{ fontFamily: theme.fonts.ui }}
                      >
                        Subject
                      </label>
                      <input
                        type="text"
                        id="subject"
                        className="w-full px-4 py-3 border rounded-xl focus:ring-2 transition-all"
                        placeholder="Regarding a custom commission"
                        defaultValue={`Inquiry for ${selectedArtisan.name}`}
                        style={{
                          borderColor: theme.colors.ui.border,
                          fontFamily: theme.fonts.body,
                        }}
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="message"
                        className="block text-gray-700 mb-2"
                        style={{ fontFamily: theme.fonts.ui }}
                      >
                        Message
                      </label>
                      <textarea
                        id="message"
                        rows="5"
                        className="w-full px-4 py-3 border rounded-xl focus:ring-2 transition-all"
                        placeholder="Your message..."
                        style={{
                          borderColor: theme.colors.ui.border,
                          fontFamily: theme.fonts.body,
                        }}
                      ></textarea>
                    </div>

                    <div className="flex justify-end">
                      <button
                        type="button"
                        onClick={closeModal}
                        className="mr-4 px-6 py-3 border border-gray-300 rounded-xl hover:bg-gray-100 transition-colors"
                        style={{ fontFamily: theme.fonts.ui }}
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-6 py-3 rounded-xl text-white transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2"
                        style={{
                          backgroundColor: theme.colors.primary.DEFAULT,
                          fontFamily: theme.fonts.ui,
                        }}
                      >
                        Send Message
                      </button>
                    </div>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AboutUs;
