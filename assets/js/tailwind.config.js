tailwind.config = {
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                primary: "#0b0f19",   // Rich Black/Navy
                secondary: "#1a1f2e", // Offset Dark
                gold: {
                    DEFAULT: "#D4AF37", // Metallic Gold
                    light: "#F3E5AB",   // Champagne
                    dark: "#AA8C2C"     // Antique Gold
                },
                white: "#EAEAEA",     // Off-white (easier on eyes)
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
                serif: ['Playfair Display', 'serif'],
                mono: ['Fira Code', 'monospace'],
            },
            letterSpacing: {
                'ultra': '0.35em',
            },
            boxShadow: {
                'glow': '0 0 20px rgba(212, 175, 55, 0.15)',
            }
        }
    }
}