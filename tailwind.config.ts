import type { Config } from 'tailwindcss'
const plugin = require('tailwindcss/plugin')

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
        animation: {
            text: 'text 2.5s ease infinite',
            fade: 'fadeIn 3s ease-in',
          },
          keyframes: {
            text: {
              '0%, 100%': {
                'background-size': '200% 200%',
                'background-position': 'left center',
              },
              '50%': {
                'background-size': '200% 200%',
                'background-position': 'right center',
              },
            },
            fadeIn: {
                '0%': { 'opacity': '0'},
                '100%': {'opacity': '100'},
            },
        },
        backgroundImage: {
            'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
            'gradient-conic':
            'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
            'search-icon': "url('/search.svg')"
        },
        colors: {
        'main-red': '#d51007',
        },
    },
  },
  plugins: [
    plugin(({ matchUtilities, theme }: { matchUtilities : any, theme : any }) => {
        matchUtilities(
          {
            "animation-delay": (value:string) => {
              return {
                "animation-delay": value,
              };
            },
          },
          {
            values: theme("transitionDelay"),
          }
        );
      }),
  ],
}
export default config
