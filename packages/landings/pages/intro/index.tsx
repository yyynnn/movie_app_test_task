import 'large-small-dynamic-viewport-units-polyfill'
import '@fontsource/plus-jakarta-sans/index.css'
import '@fontsource/plus-jakarta-sans/latin.css'
import 'react-modern-drawer/dist/index.css'

import { DefaultSeo } from 'next-seo'
import React from 'react'
import { setConfiguration } from 'react-grid-system'

import { BREAKPOINTS } from '../../consts'
import { Navbar } from '../../modules/components/intro/nav/Navbar'
import { AboutSection } from '../../modules/components/intro/sections/AboutSection'
import { CalcSection } from '../../modules/components/intro/sections/CalcSection'
import { ChartSection } from '../../modules/components/intro/sections/ChartSection'
import { FeaturesSection } from '../../modules/components/intro/sections/FeaturesSection'
import { HeroSection } from '../../modules/components/intro/sections/HeroSection'
import { GlobalStyle } from '../../modules/components/intro/theming/GlobalStyle'
import { Spacer } from '../../modules/kit/Spacer'
import { NEXT_SEO } from '../../seo/intro.seo.config'

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
      <AboutSection />
      <ChartSection />
      <CalcSection />
      <FeaturesSection />
      <Spacer space={300} />
    </>
  )
}

export default IntroPage
