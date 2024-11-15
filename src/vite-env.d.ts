/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_WORDPRESS_API_URL: string
  readonly VITE_MEDIUM_API_URL: string
  readonly VITE_GHOST_API_URL: string
  readonly VITE_GHOST_API_KEY: string
  readonly VITE_SQUARE_APP_ID: string
  readonly VITE_SQUARE_LOCATION_ID: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}