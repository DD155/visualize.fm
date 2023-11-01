/** @type {import('next').NextConfig} */
const nextConfig = {
    appDir: true,
    serverRuntimeConfig: {
        lfmKey: process.env.LFM_API, // Pass through env variables
    }   
}

module.exports = nextConfig
