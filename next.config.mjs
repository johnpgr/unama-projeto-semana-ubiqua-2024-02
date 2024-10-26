/**
 * @type{import("next").NextConfig}
 */
const nextConfig = {
  experimental: {
    ppr: true
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
}

export default nextConfig
