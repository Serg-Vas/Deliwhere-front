// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
  
// })

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    hmr: {
      protocol: 'ws',               // Ensure WebSocket protocol
      host: 'deliwhere.local',      // Set your custom hostname
      port: 5173,                   // Set the correct port if different
    },
    // proxy: {
    //   '/api': {
    //     target: 'http://localhost:5056',
    //     changeOrigin: true,
    //     rewrite: (path) => path.replace(/^\/api/, '/api')
    //   }
    // }
  },
})