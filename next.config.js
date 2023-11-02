/** @type {import('next').NextConfig} */
const nextConfig = {
    appDir: true,
    serverRuntimeConfig: {
        lfmKey: process.env.LFM_API, // Pass through env variables
    },
    images: {
        domains: ['lastfm.freetls.fastly.net'],
    }   
}

module.exports = nextConfig
