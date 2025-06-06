const theme = {
  colors: {
    // ✅ Primary Branding Color — headers, nav, primary buttons
    primary: {
      DEFAULT: '#3A2F2A',       // Rich Coffee Brown — grounding and elegant
      contrast: '#F8F5F2',      // Light Ivory Mist — clean and soft on dark
    },

    // ✅ Accent Color — CTAs, hover states, icons, highlights
    accent: {
      DEFAULT: '#A65A2E',       // Burnt Umber — warm and bold
      hover: '#BF6E3D',         // Light Terracotta — energetic hover
    },

    // ✅ Backgrounds — page, sections, cards
    background: {
      DEFAULT: '#F3EFEB',       // Soft Linen — neutral, calming base
      muted: '#EAE6E1',         // Pale Taupe — alternative section backgrounds
    },

    // ✅ Text Colors — body, titles, descriptions
    text: {
      primary: '#2D2D2D',       // Dark Charcoal — highly readable
      onPrimary: '#F8F5F2',     // Text on primary background
    },

    // ✅ UI Elements — containers, inputs, modals, borders
    ui: {
      base: '#FFFFFF',          // White — for cards and input fields
      border: '#DAD4CE',        // Soft Border — subtle and modern
    },

    // 🎨 Category Highlights — subtly distinct per category
    category: {
      bedroom: '#CDB8A0',       // Sand Dune — cozy and restful
      living: '#A39887',        // Warm Clay — inviting neutral
      office: '#7F8B91',        // Cool Slate — focus and calm
      dining: '#B57C54',        // Spiced Cinnamon — warm and social
      outdoor: '#7A8C5D',       // Sage Green — nature-inspired and fresh
    },
  },

  // Semantic mappings to simplify UI theming
  semanticRoles: {
    navBackground: 'primary.DEFAULT',
    primaryButtonBackground: 'primary.DEFAULT',
    primaryButtonText: 'primary.contrast',
    sectionBackground: 'background.DEFAULT',
    cardBackground: 'background.muted',
    bodyText: 'text.primary',
    footerBackground: 'ui.base',
    inputBackground: 'ui.base',
    inputBorder: 'ui.border',
    hoverEffect: 'accent.hover',
    ctaButton: 'accent.DEFAULT',
    ctaHover: 'accent.hover',
  },
};

export default theme;
