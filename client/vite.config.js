import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import envCompatible from "vite-plugin-env-compatible";
import path from "path"
import{ dirname }from "path"
import {readFileSync} from "node:fs";
const __dirname = dirname(import.meta.url);
// const keyPath = path.resolve('/home/nisarg/Documents/Collage stuff/sem5/AT/Eventify/client/localhost-key.pem');
// const certPath = path.resolve('/home/nisarg/Documents/Collage stuff/sem5/AT/Eventify/client/localhost.pem');

// https://vitejs.dev/config/
export default defineConfig({
  envPrefix:"REACT_APP_",
  plugins: [react(),envCompatible()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  // server: {
  //   https: {
  //     key: readFileSync(keyPath),
  //     cert: readFileSync(certPath),
  //   },
  // },

})
