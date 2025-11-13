// import React from 'react'
// import ReactDOMServer from 'react-dom/server'
// import App from './App'

// export function render() {
//   const html = ReactDOMServer.renderToString(
//     <React.StrictMode>
//       <App />
//     </React.StrictMode>
//   )
//   return { html }
// }

// src/entry-server.jsx
// import React from 'react'
// import ReactDOMServer from 'react-dom/server'

// import App from './App'

// export function render(url) {
//   const html = ReactDOMServer.renderToString(
//     <React.StrictMode>
//       <App url={url} />
//     </React.StrictMode>
//   )

//   return { html }
// }
// ======================
// ======================
// ======================
// src/entry-server.jsx
// // src/entry-server.jsx
// import React from "react";
// import { renderToString } from "react-dom/server";
// import App from "./App";
// import { HelmetProvider } from "react-helmet-async";

// export function render(url, manifest) {
//   const helmetContext = {};
//   const appHtml = renderToString(
//     <HelmetProvider context={helmetContext}>
//       <App />
//     </HelmetProvider>
//   );

//   const { helmet } = helmetContext;

//   return {
//     html: appHtml,
//     helmet: {
//       title: helmet.title.toString(),
//       meta: helmet.meta.toString(),
//       link: helmet.link.toString(),
//       script: helmet.script.toString(),
//     },
//   };
// }
// ====================
// src/entry-server.jsx
// src/entry-server.jsx
// import React from "react";
// import { renderToString } from "react-dom/server";
// import { StaticRouter } from "react-router-dom/server";
// import { HelmetProvider } from "react-helmet-async";
// import App from "./App";

// export function render(url, manifest) {
//   const helmetContext = {};

//   const appHtml = renderToString(
//     <HelmetProvider context={helmetContext}>
//       <StaticRouter location={url}>
//         <App />
//       </StaticRouter>
//     </HelmetProvider>
//   );

//   const { helmet } = helmetContext;

//   return {
//     html: appHtml,
//     helmet: {
//       title: helmet?.title?.toString() || "",
//       meta: helmet?.meta?.toString() || "",
//       link: helmet?.link?.toString() || "",
//       script: helmet?.script?.toString() || "",
//     },
//   };
// }
// =========================
// src/entry-server.jsx
import React from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import { HelmetProvider } from "react-helmet-async";
import App from "./App";

export function render(url, manifest) {
  const helmetContext = {};
  const appHtml = renderToString(
    <HelmetProvider context={helmetContext}>
      <StaticRouter location={url}>
        <App />
      </StaticRouter>
    </HelmetProvider>
  );

  const { helmet } = helmetContext;

  return {
    html: appHtml,
    helmet: {
      title: helmet.title.toString(),
      meta: helmet.meta.toString(),
      link: helmet.link.toString(),
      script: helmet.script.toString(),
    },
  };
}
