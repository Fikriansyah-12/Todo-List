/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ["class"],
    content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	extend: {
  		screens: {
  			xs: '360px'
  		},
  		container: {
  			center: true,
  			padding: {
  				DEFAULT: '1rem',
  				lg: '1.5rem'
  			}
  		},
  		colors: {
  			brand: '#FFC90D',
  			brandSecondary: '#FAE9C5',
  			primaryBg: '#2C2C2C',
  			primaryText: '#F1F1F1',
  			primaryGrey: '#44444F',
			primaryText:'#92929D',
  			disabled: '#666666',
  			secondaryError: '#B54141',
			primaryBlue:'#0062FF',
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
  		boxShadow: {
  			appButton: '0px 0px 10px rgba(241, 241, 241, 0.50)',
  			footer: '0px 0px 10px rgba(241, 241, 241, 0.40)',
  			card: '0px 0px 5px rgba(241, 241, 241, 0.5)',
  			mobileMenu: '0px 0px 15px 0px rgba(255, 201, 13, 0.25)',
  			modal: '0px 0px 25px 0px rgba(255, 201, 13, 0.25)'
  		},
  		fontFamily: {
  			'poppins-b': [
  				'Poppins-Bold'
  			],
			'poppins-r': [
  				'Poppins-Regular'
  			],
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		}
  	}
  },
  plugins: [

],
}


