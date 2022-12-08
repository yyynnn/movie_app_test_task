import React from 'react'
import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
  p {
      margin: 0;
      padding: 0;
  }

  html, body {
  font-family: 'Plus Jakarta Sans', Helvetica, Arial, sans-serif !important;
  background-color: inherit !important;
  color: inherit !important;
  font-size: 16px;
  font-weight: 400;
  font-synthesis: none;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  -webkit-text-size-adjust: 100%;
  margin: 0;
  min-height: calc(var(--1svh, 1vh) * 100); /* This is the "polyfill" */

}

* {
  font-family: 'Plus Jakarta Sans', Helvetica, Arial, sans-serif !important;
}

  a {
      color: white;
      text-decoration: none; /* no underline */
      cursor: pointer;
  }

  * {
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      box-sizing: border-box;
  }
`
