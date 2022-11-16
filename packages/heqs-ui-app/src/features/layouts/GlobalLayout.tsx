/* eslint-disable no-extra-boolean-cast */
import styled from '@emotion/styled'
import { Col, Container, Row } from 'react-grid-system'
import { Outlet, useLocation } from 'react-router-dom'

import { ROUTES } from '../../consts/routes'
import { useAuth } from '../auth/AuthProvider'
import { BreadNav } from '../navigation/BreadNav'
import { Navbar } from '../navigation/Navbar'
import { Spacer } from '../primitives'
import { ThemeSwitcher } from '../themingAndStyling/ThemeSwitcher'

export const GlobalLayout = () => {
  const auth = useAuth()
  const location = useLocation()

  return (
    <>
      {!!auth.token ? (
        <Container>
          <Row>
            <Col>
              <div>
                <Navbar />
                {location.pathname !== ROUTES.HOME && location.pathname !== ROUTES.ROOT && <BreadNav />}
              </div>
              <Outlet />
            </Col>
          </Row>
        </Container>
      ) : (
        <OutletWrapper>
          <Navbar />

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
  /* display: flex; */
  /* align-items: center; */
  height: calc(100% - 120px);
`
