import { type RouteConfig, index, prefix, route } from "@react-router/dev/routes";

const isDev = import.meta.env.MODE === "development";

export default [
  index("routes/home.tsx"),
  route("/materi/:topicId", "routes/materi-pembelajaran.tsx"),
  route("/latihan/:topicId", "routes/soal-latihan.tsx"),
  route("/hasil/:topicId", "routes/hasil-evaluasi.tsx"),
] satisfies RouteConfig;
