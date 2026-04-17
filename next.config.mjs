/** @type {import('next').NextConfig} */
import withPWA from 'next-pwa';

const isStorybook = process.env.STORYBOOK === 'true';

const baseConfig = {
  reactStrictMode: false,
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `${process.env.NEXT_PUBLIC_AUTH_URL}/:path*`,
      },
      {
        source: '/api/callback/apple',
        destination: '/api/callback/apple',
      },
    ];
  },
  webpack: (config, { isServer }) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });

    if (isServer) {
      // next server build => ignore msw/browser
      if (Array.isArray(config.resolve.alias)) {
        config.resolve.alias.push({ name: 'msw/browser', alias: false });
      } else {
        config.resolve.alias['msw/browser'] = false;
      }
    } else {
      // browser => ignore msw/node
      if (Array.isArray(config.resolve.alias)) {
        config.resolve.alias.push({ name: 'msw/node', alias: false });
      } else {
        config.resolve.alias['msw/node'] = false;
      }
    }
    return config;
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'healthy-bucket-s3.s3.ap-northeast-2.amazonaws.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'to-be-healthy-bucket.s3.ap-northeast-2.amazonaws.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'cdn.to-be-healthy.shop',
        port: '',
        pathname: '/**',
      },
    ],
    dangerouslyAllowSVG: true,
  },
};

// Storybook 환경: webpack 커스텀 + PWA 모두 제거 (호환성 충돌 방지)
const storybookConfig = {
  reactStrictMode: false,
  images: baseConfig.images,
};

const nextConfig = isStorybook
  ? storybookConfig
  : {
      ...baseConfig,
      ...withPWA({
        dest: 'public',
        register: true,
        skipWaiting: true,
      }),
    };

export default nextConfig;
