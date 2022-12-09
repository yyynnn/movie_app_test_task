/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-grid-system'
import Drawer from 'react-modern-drawer'
import { getDocument, getWindow } from 'ssr-window'
import styled from 'styled-components'

import { useScrollDirection } from '../../../hooks/useScroll'
import { Flex } from '../../../kit/Flex'
import { Max } from '../../../kit/Max'
import { Pad } from '../../../kit/Pad'
import { Pointer } from '../../../kit/Pointer'
import { Spacer } from '../../../kit/Spacer'
import { Text } from '../../../kit/Text'
import { Visibility } from '../../../kit/Visibility'
import { Button } from '../../common/Button'
import { Logo } from './Logo'

const window = getWindow()
const document = getDocument()

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [navHidden, setNavHidden] = useState(false)
  const {
    isScrolling,
    isScrollingX,
    isScrollingY,
    isScrollingUp,
    isScrollingDown,
    isScrollingLeft,
    isScrollingRight,
    scrollDirection
  } = useScrollDirection()

  const toggleDrawer = () => {
    setIsOpen((prevState) => !prevState)
  }

  const vw = document?.documentElement?.clientWidth

  useEffect(() => {
    if (vw < 901) {
      if (!isOpen) {
        if (scrollDirection === 'DOWN') {
          setNavHidden(true)
        }
        if (scrollDirection === 'UP') {
          setNavHidden(false)
        }
      }
    } else {
      setNavHidden(false)
    }
  }, [scrollDirection, isOpen, vw])

  return (
    <div>
      <FixedNavbar navHidden={navHidden}>
        <Spacer space={20} />
        <Container fluid>
          <Visibility visibleAt={['xs', 'sm', 'md']}>
            <LogoWrapper alignItems="center">
              <Link href={`/`}>
                <Pointer>
                  <Logo />
                </Pointer>
              </Link>
            </LogoWrapper>
          </Visibility>
          <Row id="navbar_main_row" justify="between">
            <Col xs={12} md={12} lg={2}>
              <Visibility visibleAt={['lg', 'xl', 'xxl']}>
                <LogoWrapper alignItems="center">
                  <Link href={`/`}>
                    <Pointer>
                      <Logo />
                    </Pointer>
                  </Link>
                </LogoWrapper>
              </Visibility>
            </Col>
            <Col xs={12} md={12} lg={6}>
              <Visibility visibleAt={['lg', 'xl', 'xxl']}>
                <Flex justifyContent="center" alignItems="center">
                  <button>What is HEQS?</button>
                  <button>Mission and vision</button>
                  <button>Features</button>
                  <button>Pricing</button>
                </Flex>
              </Visibility>
            </Col>
            <Col xs={6} sm={6} md={6} lg={2}>
              <Visibility visibleAt={['lg', 'xl', 'xxl']}>
                <Flex gap={20} alignItems="center" justifyContent="flex-end">
                  <ButtonWrapper>
                    <Link href={`#mainpage_form`}>
                      <Button text={'Get HEQS'} />
                    </Link>
                  </ButtonWrapper>
                </Flex>
              </Visibility>
            </Col>
          </Row>
          <br />
        </Container>

        <Drawer
          open={isOpen}
          onClose={toggleDrawer}
          direction="right"
          size={'100%'}
          duration={150}
          overlayColor="#000"
          overlayOpacity={1}
          style={{ backgroundColor: 'black' }}
          customIdSuffix="drawww-UwU"
        >
          <Pad flexDirection="column" justifyContent="space-between" gap={5}>
            <Flex justifyContent="space-between" alignItems="center">
              <LogoWrapper justifyContent="center" alignItems="center">
                <Link href={`/`}>
                  <Pointer>
                    <Logo />
                  </Pointer>
                </Link>
              </LogoWrapper>
            </Flex>

            <div>
              <div>
                <Flex justifyContent="center">
                  <Link href="https://dion.vc/auth" target="_blank" rel="noopener">
                    <Pointer>
                      <Text text="Войти" color="inverted" />
                    </Pointer>
                  </Link>
                </Flex>
                <Spacer space={12} mobSpace={12} />
              </div>
            </div>
          </Pad>
        </Drawer>
      </FixedNavbar>
    </div>
  )
}

const Navblock = styled(Flex)``

const LogoWrapper = styled(Flex)``

const ButtonWrapper = styled(Flex)`
  max-width: 161px;
`

const FixedNavbar = styled.div<any>`
  left: 0;
  position: fixed;
  width: 100vw;
  backdrop-filter: blur(10px);
  z-index: 3;
  padding: 0 10px;
  transform: translateY(${({ navHidden }) => (navHidden ? '-100px' : '0px')});
  transition: all 300ms ease-in-out;
`
