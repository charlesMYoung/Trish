import { defineConfig, type Options } from 'tsup'

// eslint-disable-next-line import/no-default-export -- required for tsup
export default defineConfig((options: Options) => ({
  entry: ['src/*.ts'],
  treeshake: true,
  splitting: true,
  format: ['esm'],
  minify: true,
  dts: true,
  clean: true,
  ...options,
}))
