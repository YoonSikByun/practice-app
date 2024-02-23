import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        hanablue : {
          700 : 'rgb(0, 112, 109)',
          600 : 'rgb(0, 149, 145)',
          500 : 'rgb(0, 164, 162)',
          400 : 'rgb(81, 181, 181)',
          300 : 'rgb(140, 201, 202)',
          200 : 'rgb(195, 226, 225)',
          100 : 'rgb(235, 245, 245)'
        },
        hanared : {
          700 : 'rgb(237, 22, 81)',
          600 : 'rgb(220, 78, 115)',
          500 : 'rgb(241, 159, 181)',
          400 : 'rgb(248, 206, 218)',
          300 : 'rgb(253, 241, 244)',
          200 : 'rgb(127, 127, 127)',
          100 : 'rgb(191, 191, 191)'
        },

        mouseoverclr : 'rgb(253, 241, 244)',
        topclr : { 'back' : 'rgb(235, 245, 245)'},
        tabheadclr : 'rgb(235, 245, 245)',
        borderclr : {
          'light' : 'rgb(81, 181, 181)',
          'bold' : 'rgb(0, 112, 109)',
        },
        cardclr : {
          'back' :'rgb(235, 245, 245)',
          'title' :'rgb(195, 226, 225)',
        },

        nodedg : {
          'toolbar' : {
            'back' : 'rgb(140, 201, 202)',
          },
          'node' : {
            'back' : 'rgb(235, 245, 245)',
          },
          'tabhead' : 'rgb(235, 245, 245)',
          'tabhead-clicked' : 'rgb(195, 226, 225)',
        }
        
      }
    },
  },
  plugins: [],
}
export default config
