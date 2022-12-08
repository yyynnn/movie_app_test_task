import 'large-small-dynamic-viewport-units-polyfill'

import { DefaultSeo } from 'next-seo'
import React from 'react'

import { NEXT_SEO } from './intro.seo.config'
import { HeroSection } from './sections/HeroSection'
import { GlobalStyle } from './themeing/GlobalStyle'

const IntroPage = () => {
  return (
    <div>
      <DefaultSeo {...NEXT_SEO} />
      <GlobalStyle />
      <HeroSection />
    </div>
  )
}

export default IntroPage
