import type { Config } from "@react-router/dev/config";

export default {
  // SPA mode for static hosting (GitHub Pages)
  ssr: false,
  future: {
    unstable_optimizeDeps: true,
  },
} satisfies Config;
