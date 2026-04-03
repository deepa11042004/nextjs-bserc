/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/auth/student/login",
        destination: "/login",
        permanent: true,
      },
      {
        source: "/auth/student/register",
        destination: "/register",
        permanent: true,
      },
      {
        source: "/auth/admin-login/login",
        destination: "/admin/login",
        permanent: true,
      },
    ];
  },
  output: "standalone",
};

export default nextConfig;
