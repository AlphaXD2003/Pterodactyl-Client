import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server:{
    proxy:{
       '/api/application': 'https://panel.how2mc.xyz',
      //'/api/application': 'http://192.168.176.167/',
    }
  }
});
