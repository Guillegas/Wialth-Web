/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        sage:       '#91A08D',
        cream:      '#E9E4D4',
        offwhite:   '#F2F1ED',
        muted:      '#A3A99D',
        salmon:     '#E1A594',
        sand:       '#F5EFE0',
        'hero-deep':'#3d5239',
        'sage-dk':  '#6b8064',
        'salmon-dk':'#c98e7c',
      },
      fontFamily: {
        h1:   ['"Work Sans"', 'sans-serif'],
        h2:   ['"Hind Vadodara"', 'sans-serif'],
        body: ['Prompt', 'sans-serif'],
      },
      animation: {
        blob1:       'blob1 15s ease-in-out infinite alternate',
        blob2:       'blob2 19s ease-in-out infinite alternate',
        blob3:       'blob3 23s ease-in-out infinite alternate',
        blob4:       'blob4 17s ease-in-out infinite alternate',
        float:       'float 5s ease-in-out infinite',
        dot:         'badgedot 2.4s ease-in-out infinite',
        ticker:      'ticker 28s linear infinite',
        'slide-up':  'slideUp 0.5s cubic-bezier(0.22,1,0.36,1) forwards',
        shimmer:     'shimmer 2.5s linear infinite',
        'bar-grow':  'barGrow 1s cubic-bezier(0.22,1,0.36,1) forwards',
        'count-in':  'countIn 0.4s cubic-bezier(0.22,1,0.36,1) forwards',
        'phone-in':    'phoneIn 1s cubic-bezier(0.22,1,0.36,1) 0.3s both',
        'glow-pulse':  'glowPulse 3s ease-in-out infinite',
        'scroll-arrow':'scrollArrow 1.8s ease-in-out infinite',
      },
      keyframes: {
        blob1:    { to: { transform: 'translate(55px,38px) scale(1.12)' } },
        blob2:    { to: { transform: 'translate(-42px,-28px) scale(0.9)' } },
        blob3:    { to: { transform: 'translate(26px,-36px) scale(1.10)' } },
        blob4:    { to: { transform: 'translate(-20px,-18px) scale(1.08)' } },
        float: {
          '0%,100%': { transform: 'translateY(0)' },
          '50%':     { transform: 'translateY(-10px)' },
        },
        badgedot: {
          '0%,100%': { opacity:'1', transform:'scale(1)',    boxShadow:'0 0 0 0 rgba(225,165,148,.55)' },
          '50%':     { opacity:'.7', transform:'scale(.84)', boxShadow:'0 0 0 5px rgba(225,165,148,0)' },
        },
        ticker: {
          '0%':   { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        slideUp: {
          from: { transform:'translateY(10px)', opacity:'0' },
          to:   { transform:'translateY(0)',    opacity:'1' },
        },
        shimmer: {
          '0%':   { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition:  '200% center' },
        },
        barGrow: {
          from: { transform: 'scaleY(0)', transformOrigin: 'bottom' },
          to:   { transform: 'scaleY(1)', transformOrigin: 'bottom' },
        },
        countIn: {
          from: { transform:'translateY(6px) scale(.85)', opacity:'0' },
          to:   { transform:'translateY(0) scale(1)',     opacity:'1' },
        },
        phoneIn: {
          from: { transform:'translateY(40px)', opacity:'0' },
          to:   { transform:'translateY(0)',    opacity:'1' },
        },
        glowPulse: {
          '0%,100%': { opacity: '.6', transform: 'scale(1)' },
          '50%':     { opacity: '1',  transform: 'scale(1.04)' },
        },
        scrollArrow: {
          '0%,100%': { transform: 'translateY(0)',    opacity: '1'  },
          '50%':     { transform: 'translateY(6px)',  opacity: '.5' },
        },
      },
      screens: { xs: '420px' },
    },
  },
  plugins: [],
}
