import 'large-small-dynamic-viewport-units-polyfill'
import '@fontsource/plus-jakarta-sans/index.css'
import '@fontsource/plus-jakarta-sans/latin.css'
import 'react-modern-drawer/dist/index.css'

import { DefaultSeo } from 'next-seo'
import React from 'react'
import { setConfiguration } from 'react-grid-system'

import { Navbar } from '../../components/intro/nav/Navbar'
import { AboutSection } from '../../components/intro/sections/AboutSection'
import { HeroSection } from '../../components/intro/sections/HeroSection'
import { GlobalStyle } from '../../components/intro/theming/GlobalStyle'
import { BREAKPOINTS } from '../../consts'
import { Spacer } from '../../kit/Spacer'
import { NEXT_SEO } from './intro.seo.config'

setConfiguration({
  gutterWidth: 20,
  breakpoints: BREAKPOINTS,
  containerWidths: [540, 740, 1100, 1280, 1540, 1810]
})

const IntroPage = () => {
  return (
    <>
      <DefaultSeo {...NEXT_SEO} />
      <GlobalStyle />

      <Navbar />
      <HeroSection />
      <Spacer space={100} />
      <AboutSection />
      <Spacer space={300} />
    </>
  )
}

export default IntroPage
