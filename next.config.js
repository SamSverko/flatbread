/* eslint-disable @typescript-eslint/no-var-requires */
/** @type {import('next').NextConfig} */

const withPWA = require('next-pwa');
const runtimeCaching = require('next-pwa/cache');

module.exports = withPWA({
    pwa: {
        dest: 'public',
        disable: process.env.NODE_ENV === 'development',
        register: true,
        runtimeCaching,
        sw: 'service-worker.js',
    },
    reactStrictMode: true,
});
