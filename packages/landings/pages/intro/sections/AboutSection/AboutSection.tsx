import React from 'react'
import { Col, Container, Row } from 'react-grid-system'

import { Spacer } from '../../../kit/Spacer'
import { Text } from '../../../kit/Text'

export const AboutSection = () => {
  return (
    <div>
      <Container fluid>
        <Row>
          <Col>
            <Text size={23}>
              HEQS is a SaaS appplication that allows you to improve your operations by
              decisionmaking based on a reliable data.
            </Text>
          </Col>
        </Row>
        <Spacer />
        <Row>
          <Col lg={4}>
            <Text size={23}>
              Our mission - bring the technology into a daily business to improve the processes and
              prevent the accidents happening on operations all over the world.
            </Text>
          </Col>
          <Col lg={4}>
            <Text size={23}>
              Our mission - bring the technology into a daily business to improve the processes and
              prevent the accidents happening on operations all over the world.
            </Text>
          </Col>
          <Col lg={4}>
            <Text size={23}>
              Our mission - bring the technology into a daily business to improve the processes and
              prevent the accidents happening on operations all over the world.
            </Text>
          </Col>
        </Row>
      </Container>
      <Spacer />
    </div>
  )
}
