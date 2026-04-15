import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("/login", "routes/login.tsx"),
  route("/admin", "routes/admin.tsx"),
  route("/materi/:topicId", "routes/materi-pembelajaran.tsx"),
  route("/latihan/:topicId", "routes/soal-latihan.tsx"),
  route("/hasil/:topicId", "routes/hasil-evaluasi.tsx"),
  route("/debug-cloud", "routes/debug-cloud.tsx"),
] satisfies RouteConfig;
