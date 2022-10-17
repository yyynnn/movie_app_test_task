import styled from '@emotion/styled'
import { Col, Container, Row } from 'react-grid-system'
import { Link, Outlet } from 'react-router-dom'

import { useAuth } from '../auth/AuthProvider'
import { Navbar } from '../navigation/Navbar'

export const GlobalLayout = () => {
  const auth = useAuth()
  return (
    <>
      <Navbar />
      {auth.token ? (
        <Container>
          <Row>
            <Col>
              <Outlet />
            </Col>
          </Row>
        </Container>
      ) : (
        <OutletWrapper>
          <Outlet />
        </OutletWrapper>
      )}
    </>
  )
}

const OutletWrapper = styled.div`
  height: -webkit-fill-available;
  display: flex;
  align-items: center;
  height: calc(100% - 80px);
`
