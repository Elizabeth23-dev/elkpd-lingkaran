import type { Config } from "@react-router/dev/config";

export default {
  // SPA mode for static hosting (GitHub Pages)
  ssr: false,
  // Pre-render the root so index.html is generated
  prerender: true,
  future: {
    unstable_optimizeDeps: true,
  },
} satisfies Config;
