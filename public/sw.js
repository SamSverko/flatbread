if(!self.define){let e,s={};const a=(a,n)=>(a=new URL(a+".js",n).href,s[a]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=a,e.onload=s,document.head.appendChild(e)}else e=a,importScripts(a),s()})).then((()=>{let e=s[a];if(!e)throw new Error(`Module ${a} didn’t register its module`);return e})));self.define=(n,i)=>{const c=e||("document"in self?document.currentScript.src:"")||location.href;if(s[c])return;let t={};const r=e=>a(e,c),o={module:{uri:c},exports:t,require:r};s[c]=Promise.all(n.map((e=>o[e]||r(e)))).then((e=>(i(...e),t)))}}define(["./workbox-5afaf374"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/static/chunks/651.cd440d205ca10b23.js",revision:"cd440d205ca10b23"},{url:"/_next/static/chunks/framework-91d7f78b5b4003c8.js",revision:"91d7f78b5b4003c8"},{url:"/_next/static/chunks/main-52610ef6424c4035.js",revision:"52610ef6424c4035"},{url:"/_next/static/chunks/pages/_app-e18e7ee773723cf6.js",revision:"e18e7ee773723cf6"},{url:"/_next/static/chunks/pages/_error-ddb7477254ab31d2.js",revision:"ddb7477254ab31d2"},{url:"/_next/static/chunks/pages/fallback-98506c9b1b931217.js",revision:"98506c9b1b931217"},{url:"/_next/static/chunks/pages/index-56690a2a0d4a9b3e.js",revision:"56690a2a0d4a9b3e"},{url:"/_next/static/chunks/pages/settings-8549095605a0c6d3.js",revision:"8549095605a0c6d3"},{url:"/_next/static/chunks/polyfills-5cd94c89d3acac5f.js",revision:"99442aec5788bccac9b2f0ead2afdd6b"},{url:"/_next/static/chunks/webpack-29fdee36affa8136.js",revision:"29fdee36affa8136"},{url:"/_next/static/css/4bf309caae3cf94a.css",revision:"4bf309caae3cf94a"},{url:"/_next/static/css/a56fbbaaa0217155.css",revision:"a56fbbaaa0217155"},{url:"/_next/static/m0Su1QeFeW1q3xmzFJWib/_buildManifest.js",revision:"559b8a014286c10542fcd719e748a13a"},{url:"/_next/static/m0Su1QeFeW1q3xmzFJWib/_middlewareManifest.js",revision:"fb2823d66b3e778e04a3f681d0d2fb19"},{url:"/_next/static/m0Su1QeFeW1q3xmzFJWib/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/android-chrome-192x192.png",revision:"803fa7bca752019f517c019d6bb8f289"},{url:"/android-chrome-512x512.png",revision:"94e8ae289c760fc327c2d22df87e38f5"},{url:"/apple-touch-icon.png",revision:"6eba3c74e9d3d93ced0819071d5c8241"},{url:"/browserconfig.xml",revision:"8115801629add78887dcce01f1b91162"},{url:"/favicon-16x16.png",revision:"0612d06f6ea37538cc8c7495e650d77a"},{url:"/favicon-32x32.png",revision:"c1ede68482f4a83daab4ec958b249c00"},{url:"/favicon.ico",revision:"26ca23ec6558475cb07cc528bf9846b9"},{url:"/fonts/spartan-bold.ttf",revision:"776b89b486305b310ed0ef920280e780"},{url:"/fonts/spartan-bold.woff",revision:"c0cd055d079590b5031000d79d87a3a7"},{url:"/fonts/spartan-bold.woff2",revision:"d93205a1acb740a4607aef8e2067ff4d"},{url:"/fonts/spartan-medium.ttf",revision:"70e47514b4d4ef63a29073efc07e3847"},{url:"/fonts/spartan-medium.woff",revision:"6b61b69c28a576791b33844ae47ca884"},{url:"/fonts/spartan-medium.woff2",revision:"4a09781e45ed8c91fcfaab9bf5ff77bf"},{url:"/fonts/spartan-regular.ttf",revision:"aceb5bd5ca50c2c944ccf499400c8b1f"},{url:"/fonts/spartan-regular.woff",revision:"e9de9192ad38016f53bdee1fe9902fe3"},{url:"/fonts/spartan-regular.woff2",revision:"6d850b8d4ffe74e3d3181e833c9f1cf8"},{url:"/icons/bx-link-external.svg",revision:"33701e171bf4007d9bd70d48d4f01b06"},{url:"/icons/bxs-bowl-hot.svg",revision:"7e65fc160b0be38598d80ed8b033bd16"},{url:"/icons/bxs-id-card.svg",revision:"73081b4bc6538c81a3e10b141abb531b"},{url:"/icons/bxs-time-five.svg",revision:"5beb3cccc5ca3a92c9bb4d680c2e233a"},{url:"/mstile-150x150.png",revision:"784fcb108cbb622e6b14ecc1d16bf65c"},{url:"/safari-pinned-tab.svg",revision:"077875e26a9f1b0ce9004539b6b800de"},{url:"/service-worker.js",revision:"cf928de9fab082e329a296332cfba158"},{url:"/site.webmanifest",revision:"d8caff770b000b16a39dd886bc98b51c"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:s,event:a,state:n})=>s&&"opaqueredirect"===s.type?new Response(s.body,{status:200,statusText:"OK",headers:s.headers}):s}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const s=e.pathname;return!s.startsWith("/api/auth/")&&!!s.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>!(self.origin===e.origin)),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));