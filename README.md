# Katana

![](https://github.com/firebolt55439/katana/blob/master/demo/logo.png)

Katana is a responsive front-end that emulates Netflix's style. The goal of this project is to provide a backend-agnostic front-end for movie & TV discovery & streaming.

More specifically, no matter where your movies are hosted (Google Drive, P2P stream, satellite, etc.) so long as your backend follows the API conventions herein laid out, you can plug-and-play this front-end into your service.

Note that this project is under heavy development, with all interfaces subject to change at any time.

## Some Cool Features
- Responsive and visually appealing interface
- Highly adaptable and extensible
- Source components are modularized
- React best-practices are used (mostly)
- Everything runs client-side, only API being called to is TMDB

## In The Works
- Stable back-end API specification (in progress)
- Example back-end framework in Python (mostly done)
- Source retrieval and rendering from back-end (done!)
- Chromecast and Airplay support

## Building & Running

To build: `npm run build`

To start: `npm run start`

Live-reloading is automatically enabled (can be changed in webpack config). React developer tools for Chrome come highly recommended.

## Current Visual State
![](https://github.com/firebolt55439/katana/blob/master/demo/narrow_home.jpg)
![](https://github.com/firebolt55439/katana/blob/master/demo/middle_browse.jpg)
![](https://github.com/firebolt55439/katana/blob/master/demo/full_header.jpg)

## Tooling Used
- React.js
- Webpack
- Babel
- Axios

## Credits
This project originated as a fork of [AndresXI's fantastic project](https://github.com/AndresXI/Netflix-Clone).

Thanks to TheMovieDB's rock-solid API for, even beside their ridiculously comprehensive database, developer-friendly API design, and great CDN's, their CORS support (a highly underrated feature in my opinion!).
