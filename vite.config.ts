import { defineConfig } from 'vite'
import { resolve } from 'path'
import Components from 'unplugin-vue-components/vite'

export default defineConfig({
  plugins: [
    Components({
      include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
      dts: false,
    }),
  ],
  server: {
    allowedHosts: ['.yugasun.com']
  },
})