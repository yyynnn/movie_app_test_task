/* eslint-disable no-extra-boolean-cast */
import styled from '@emotion/styled'
import { Col, Container, Row } from 'react-grid-system'
import { Outlet, useLocation } from 'react-router-dom'

import { ROUTES } from '../../consts/routes'
import { Spacer } from '../primitives'

export const GlobalLayout = () => {
  const location = useLocation()

  return (
    <>
      {
        <Container>
          <Row>
            <Col>
              <Outlet />
            </Col>
          </Row>
        </Container>
      }
      <Spacer space={100} />
    </>
  )
}
