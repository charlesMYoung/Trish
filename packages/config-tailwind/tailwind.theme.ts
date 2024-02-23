import twPlugin from 'tailwindcss/plugin'

const CusTypography = twPlugin(({ addComponents }) => {
  addComponents({
    '.text-stroke-2': {
      '-webkit-text-stroke':
        '1px hsl(var(--nextui-default-500) / var(--nextui-default-500-opacity,1))',
    },
    '.text-smiSans': {
      fontFamily: 'smileysans,sans-serif',
    },
  })
})

export default CusTypography
