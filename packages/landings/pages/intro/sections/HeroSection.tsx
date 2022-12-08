import React from 'react'
import styled from 'styled-components'

export const HeroSection = () => {
  return (
    <Wrapper>
      <Hero>
        <p>Build the statistics. Improve your business.</p>
      </Hero>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  height: calc(var(--1svh, 1vh) * 100); /* This is the "polyfill" */
  width: 100%;
  position: relative;
  background-color: #ff00ff;

  @media (max-width: 959px) {
    height: initial;
    margin: 0 -20px;
    width: initial;
  }
`

const Hero = styled.div`
  height: calc(var(--1svh, 1vh) * 100); /* This is the "polyfill" */
`
