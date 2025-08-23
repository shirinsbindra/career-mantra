import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			fontFamily: {
				'inter': ['Inter', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
				'mono': ['JetBrains Mono', 'Monaco', 'Consolas', 'monospace'],
			},
			fontSize: {
				'xs': ['0.75rem', { lineHeight: '1rem' }],
				'sm': ['0.875rem', { lineHeight: '1.25rem' }],
				'base': ['1rem', { lineHeight: '1.5rem' }],
				'lg': ['1.125rem', { lineHeight: '1.75rem' }],
				'xl': ['1.25rem', { lineHeight: '1.75rem' }],
				'2xl': ['1.5rem', { lineHeight: '2rem' }],
				'3xl': ['1.875rem', { lineHeight: '2.25rem' }],
				'4xl': ['2.25rem', { lineHeight: '2.5rem' }],
				'5xl': ['3rem', { lineHeight: '1' }],
				'6xl': ['3.75rem', { lineHeight: '1' }],
				'7xl': ['4.5rem', { lineHeight: '1' }],
				'8xl': ['6rem', { lineHeight: '1' }],
				'9xl': ['8rem', { lineHeight: '1' }],
			},
			spacing: {
				'18': '4.5rem',
				'88': '22rem',
				'112': '28rem',
				'128': '32rem',
			},
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				surface: {
					DEFAULT: 'hsl(var(--surface))',
					elevated: 'hsl(var(--surface-elevated))',
				},
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))',
					variant: 'hsl(var(--primary-variant))',
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))',
					variant: 'hsl(var(--secondary-variant))',
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				warning: {
					DEFAULT: 'hsl(var(--warning))',
					foreground: 'hsl(var(--warning-foreground))'
				},
				success: {
					DEFAULT: 'hsl(var(--success))',
					foreground: 'hsl(var(--success-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))',
					variant: 'hsl(var(--accent-variant))',
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				// Enhanced Mentra brand colors
				mentra: {
					cyan: 'hsl(var(--mentra-cyan))',
					green: 'hsl(var(--mentra-green))',
					purple: 'hsl(var(--mentra-purple))',
					blue: 'hsl(var(--mentra-blue))',
					orange: 'hsl(var(--mentra-orange))',
					pink: 'hsl(var(--mentra-pink))',
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)',
				'2xl': 'calc(var(--radius) + 4px)',
				'3xl': 'calc(var(--radius) + 8px)',
			},
			backgroundImage: {
				'gradient-primary': 'var(--gradient-primary)',
				'gradient-secondary': 'var(--gradient-secondary)',
				'gradient-accent': 'var(--gradient-accent)',
				'gradient-hero': 'var(--gradient-hero)',
				'mesh': 'var(--gradient-mesh)',
			},
			boxShadow: {
				'sm': 'var(--shadow-sm)',
				'md': 'var(--shadow-md)',
				'lg': 'var(--shadow-lg)',
				'xl': 'var(--shadow-xl)',
				'glow': 'var(--shadow-glow)',
				'glow-strong': 'var(--shadow-glow-strong)',
				'colored': 'var(--shadow-colored)',
			},
			backdropBlur: {
				'xs': '2px',
			},
			keyframes: {
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' }
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' }
				},
				'fade-in': {
					from: { opacity: '0', transform: 'translateY(10px)' },
					to: { opacity: '1', transform: 'translateY(0)' }
				},
				'slide-up': {
					from: { opacity: '0', transform: 'translateY(20px)' },
					to: { opacity: '1', transform: 'translateY(0)' }
				},
				'slide-up-fade': {
					from: { opacity: '0', transform: 'translateY(30px)' },
					to: { opacity: '1', transform: 'translateY(0)' }
				},
				'scale-in': {
					from: { opacity: '0', transform: 'scale(0.9)' },
					to: { opacity: '1', transform: 'scale(1)' }
				},
				'float': {
					'0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
					'33%': { transform: 'translateY(-10px) rotate(1deg)' },
					'66%': { transform: 'translateY(-5px) rotate(-1deg)' }
				},
				'float-delayed': {
					'0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
					'33%': { transform: 'translateY(-15px) rotate(-1deg)' },
					'66%': { transform: 'translateY(-8px) rotate(1deg)' }
				},
				'pulse-glow': {
					'0%, 100%': { boxShadow: '0 0 20px hsl(var(--mentra-cyan) / 0.3)', transform: 'scale(1)' },
					'50%': { boxShadow: '0 0 40px hsl(var(--mentra-cyan) / 0.6)', transform: 'scale(1.02)' }
				},
				'gradient-shift': {
					'0%, 100%': { backgroundPosition: '0% 50%' },
					'50%': { backgroundPosition: '100% 50%' }
				},
				'gradient-text-flow': {
					'0%, 100%': { backgroundPosition: '0% 50%' },
					'50%': { backgroundPosition: '100% 50%' }
				},
				'mesh-shift': {
					'0%, 100%': { 
						backgroundPosition: '0% 0%, 0% 0%, 0% 0%',
						transform: 'scale(1) rotate(0deg)'
					},
					'33%': { 
						backgroundPosition: '30% 30%, 70% 20%, 20% 70%',
						transform: 'scale(1.02) rotate(1deg)'
					},
					'66%': { 
						backgroundPosition: '70% 70%, 20% 80%, 80% 20%',
						transform: 'scale(0.98) rotate(-1deg)'
					}
				},
				'skeleton-shimmer': {
					'0%': { backgroundPosition: '200% 0' },
					'100%': { backgroundPosition: '-200% 0' }
				},
				'bounce-subtle': {
					'0%, 100%': { transform: 'translateY(0)' },
					'50%': { transform: 'translateY(-5px)' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-in': 'fade-in 0.5s ease-out',
				'slide-up': 'slide-up 0.5s ease-out',
				'slide-up-fade': 'slide-up-fade 0.6s ease-out',
				'scale-in': 'scale-in 0.4s ease-out',
				'float': 'float 6s ease-in-out infinite',
				'float-delayed': 'float-delayed 6s ease-in-out infinite',
				'pulse-glow': 'pulse-glow 3s ease-in-out infinite',
				'gradient-shift': 'gradient-shift 6s ease infinite',
				'gradient-text-flow': 'gradient-text-flow 4s ease-in-out infinite',
				'mesh-shift': 'mesh-shift 20s ease-in-out infinite',
				'skeleton-shimmer': 'skeleton-shimmer 1.5s ease-in-out infinite',
				'bounce-subtle': 'bounce-subtle 2s ease-in-out infinite',
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
