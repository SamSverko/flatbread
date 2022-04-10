/* eslint-disable @typescript-eslint/no-var-requires */
/** @type {import('next').NextConfig} */

const withPWA = require('next-pwa');
const runtimeCaching = require('next-pwa/cache');

module.exports = withPWA({
    pwa: {
        dest: 'public',
        runtimeCaching,
    },
    reactStrictMode: true,
});
