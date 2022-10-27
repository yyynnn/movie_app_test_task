import styled from '@emotion/styled'
import { Col, Container, Row } from 'react-grid-system'
import { Link, Outlet, useLocation } from 'react-router-dom'

import { ROUTES } from '../../consts/routes'
import { Spacer } from '../../primitives'
import { useAuth } from '../auth/AuthProvider'
import { BreadNav } from '../navigation/BreadNav'
import { Navbar } from '../navigation/Navbar'
import { ThemeSwitcher } from '../themingAndStyling/ThemeSwitcher'

export const GlobalLayout = () => {
  const auth = useAuth()
  const location = useLocation()
  return (
    <>
      {auth.token ? (
        <Navbar />
      ) : (
        <TSwrapper>
          <ThemeSwitcher />
        </TSwrapper>
      )}
      {auth.token ? (
        <Container>
          <Row>
            <Col>
              {location.pathname !== ROUTES.HOME && location.pathname !== ROUTES.ROOT && <BreadNav />}
              <Outlet />
            </Col>
          </Row>
        </Container>
      ) : (
        <OutletWrapper>
          <Outlet />
        </OutletWrapper>
      )}
      <Spacer space={100} />
    </>
  )
}

const TSwrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  padding: 20px;
`

const OutletWrapper = styled.div`
  height: -webkit-fill-available;
  display: flex;
  align-items: center;
  height: calc(100% - 120px);
`
