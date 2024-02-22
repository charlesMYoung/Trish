/** @type {import('prettier').Config & import('prettier-plugin-tailwindcss').PluginOptions} */
const config = {
  plugins: ['prettier-plugin-tailwindcss', 'prettier-plugin-organize-imports'],
  tailwindFunctions: ['classNames', 'clsx', 'twMerge', 'class'],
  tabWidth: 2,
  useTabs: false,
  singleQuote: true,
  trailingComma: 'es5',
  semi: false,
}

export default config
