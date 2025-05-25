/** @type {import('next').NextConfig} */

const DuplicatePackageCheckerPlugin = require('duplicate-package-checker-webpack-plugin')
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})
const path = require('path')
const sassUtils = require(__dirname + '/libs/sass-utils')
const sassVars = require(__dirname + '/config/variables.js')
const isDev = process.env.NODE_ENV === 'development'

// const withSerwist = require('@serwist/next').default({
//   swSrc: 'public/service-worker.ts',
//   swDest: 'public/sw.js',
//   register: true,
//   disable: isDev,
//   cacheOnFrontEndNav: true,
//   reloadOnOnline: true,
// })

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    optimizeCss: true,
    nextScriptWorkers: true,
    webVitalsAttribution: ['CLS', 'LCP'],
  },
  compiler: {
    removeConsole: !isDev,
  },
  transpilePackages: [],
  images: {
    // dangerouslyAllowSVG: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.ctfassets.net',
        pathname: '**',
      },
    ],
    contentSecurityPolicy: 'default-src "self"; script-src "none"; sandbox;',
    formats: ['image/avif', 'image/webp'],
  },

  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
    prependData: '@import "styles/import.scss";',
    functions: {
      'get($keys)': function (keys) {
        keys = keys.getValue().split('.')
        let result = sassVars
        for (let i = 0; i < keys.length; i++) {
          result = result[keys[i]]
        }
        result = sassUtils.castToSass(result)

        return result
      },
      'getColors()': function () {
        return sassUtils.castToSass(sassVars.colors)
      },
      'getThemes()': function () {
        return sassUtils.castToSass(sassVars.themes)
      },
    },
  },
  webpack: (config, { isServer, dir }) => {
    config.module.rules.push(
      {
        test: /\.(glsl|vs|fs|vert|frag)$/,
        exclude: /node_modules/,
        use: ['raw-loader', 'glslify-loader'],
      },
      {
        test: /\.(ogg|mp3|wav|mpe?g)$/i,
        exclude: config.exclude,
        use: [
          {
            loader: require.resolve('url-loader'),
            options: {
              limit: config.inlineImageLimit,
              fallback: require.resolve('file-loader'),
              publicPath: `${config.assetPrefix}/_next/static/images/`,
              outputPath: `${isServer ? '../' : ''}static/images/`,
              name: '[name]-[hash].[ext]',
              esModule: config.esModule || false,
            },
          },
        ],
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: '@svgr/webpack',
            options: {
              memo: true,
              dimensions: false,
              svgoConfig: {
                multipass: true,
                plugins: [
                  'removeDimensions',
                  'removeOffCanvasPaths',
                  'reusePaths',
                  'removeElementsByAttr',
                  'removeStyleElement',
                  'removeScriptElement',
                  'prefixIds',
                  'cleanupIDs',
                  {
                    name: 'cleanupNumericValues',
                    params: {
                      floatPrecision: 1,
                    },
                  },
                  {
                    name: 'convertPathData',
                    params: {
                      floatPrecision: 1,
                    },
                  },
                  {
                    name: 'convertTransform',
                    params: {
                      floatPrecision: 1,
                    },
                  },
                  {
                    name: 'cleanupListOfValues',
                    params: {
                      floatPrecision: 1,
                    },
                  },
                ],
              },
            },
          },
        ],
      },
      {
        test: /\.(graphql|gql)$/,
        include: [dir],
        exclude: /node_modules/,
        use: [
          {
            loader: 'graphql-tag/loader',
          },
        ],
      }
    )
    config.plugins.push(
      new DuplicatePackageCheckerPlugin({
        // Also show module that is requiring each duplicate package (default: false)
        verbose: true,
        // Emit errors instead of warnings (default: false)
        emitError: true,
        // Show help message if duplicate packages are found (default: true)
        showHelp: true,
        // Warn also if major versions differ (default: true)
        strict: false,
        /**
         * Exclude instances of packages from the results.
         * If all instances of a package are excluded, or all instances except one,
         * then the package is no longer considered duplicated and won't be emitted as a warning/error.
         * @param {Object} instance
         * @param {string} instance.name The name of the package
         * @param {string} instance.version The version of the package
         * @param {string} instance.path Absolute path to the package
         * @param {?string} instance.issuer Absolute path to the module that requested the package
         * @returns {boolean} true to exclude the instance, false otherwise
         */
        exclude: (instance) => instance.name === 'fbjs',
        // Emit errors (regardless of emitError value) when the specified packages are duplicated (default: [])
        alwaysEmitErrorsFor: ['react', 'react-router'],
      })
    )

    return config
  },
  headers: async () => {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
        ],
      },
    ]
  },
  redirects: async () => {
    return [
      {
        source: '/home',
        destination: '/',
        permanent: true,
      },
    ]
  },
}

module.exports = () => {
  const plugins = [
    withBundleAnalyzer,
    // withSerwist
  ]
  return plugins.reduce((acc, plugin) => plugin(acc), {
    ...nextConfig,
    compress: true,
  })
}
