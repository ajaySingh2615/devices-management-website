/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        sans: [
          "Inter",
          "system-ui",
          "-apple-system",
          "Segoe UI",
          "Roboto",
          "Helvetica",
          "Arial",
          "Apple Color Emoji",
          "Segoe UI Emoji",
          "Segoe UI Symbol",
        ],
        heading: [
          "Manrope",
          "Inter",
          "system-ui",
          "-apple-system",
          "Segoe UI",
          "Roboto",
          "Helvetica",
          "Arial",
        ],
      },
      fontSize: {
        xs: "12px",
        sm: "14px",
        base: "16px",
        lg: "18px",
        xl: "20px",
        "2xl": "24px",
        "3xl": "30px",
        "4xl": "36px",
      },
      lineHeight: {
        tight: "1.15",
        snug: "1.25",
        normal: "1.5",
      },
      letterSpacing: {
        tight: "-0.01em",
        normal: "0",
      },
      borderRadius: {
        base: "14px",
        lg: "16px",
        xl: "20px",
        "2xl": "24px",
      },
      boxShadow: {
        soft: "0 4px 14px rgba(2, 6, 23, 0.06)",
        card: "0 8px 24px rgba(2, 6, 23, 0.08)",
      },
      transitionDuration: {
        DEFAULT: "200ms",
      },
      transitionTimingFunction: {
        smooth: "cubic-bezier(.2,.8,.2,1)",
      },
      colors: {
        // Use CSS variables for theme switching
        surface: {
          background: "var(--color-surface-background)",
          card: "var(--color-surface-card)",
          border: "var(--color-surface-border)",
        },
        text: {
          base: "var(--color-text-base)",
          muted: "var(--color-text-muted)",
          invert: "var(--color-text-invert)",
        },
        brand: {
          base: "var(--color-brand-base)",
          hover: "var(--color-brand-hover)",
          subtle: "var(--color-brand-subtle)",
          ring: "var(--color-brand-ring)",
        },
        accent: {
          base: "var(--color-accent-base)",
          text: "var(--color-accent-text)",
          subtle: "var(--color-accent-subtle)",
        },
        status: {
          success: "var(--color-status-success)",
          info: "var(--color-status-info)",
          danger: "var(--color-status-danger)",
        },
        // Keep standard colors for compatibility
        border: "var(--color-surface-border)",
      },
    },
  },
  plugins: [],
};
