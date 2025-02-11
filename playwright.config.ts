import { defineConfig } from '@playwright/test';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Declare process.env types (Fixes the "Cannot find name 'process'" error)
declare global {
  namespace NodeJS {
    interface ProcessEnv {
      BASE_URL: string;
      EMAIL: string;
      PASSWORD: string;
    }
  }
}

export default defineConfig({
  use: {
    baseURL: process.env.BASE_URL,  // Use BASE_URL from .env
    headless: false,
  },
});
