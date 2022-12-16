import React from 'react'
import { Col, Container, Row } from 'react-grid-system'
import styled from 'styled-components'

import { Flex } from '../../../kit/Flex'
import { Max } from '../../../kit/Max'
import { Spacer } from '../../../kit/Spacer'
import { Text } from '../../../kit/Text'
import { GradientEdge } from '../../common/GradientEdge'

export const AboutSection = () => {
  return (
    <Wrapper>
      <GradientEdge />
      <Container fluid>
        <Row>
          <Col>
            <Flex justifyContent="center" alignItems="center">
              <Max maxWidth={600}>
                <Text size={40} center bold>
                  HEQS is a SaaS appplication that allows you to improve your operations by
                  decisionmaking based on a reliable data
                </Text>
              </Max>
            </Flex>
            <Spacer space={100} />
          </Col>
        </Row>
        <Spacer />
        <Row>
          <Col lg={6}>
            <Flex justifyContent="center" alignItems="center">
              <Max maxWidth={300}>
                <Text size={20} center>
                  Our vision - during 2023-2028 years get the manufacturing companies all over the
                  world familiar with HEQS and improve their processes
                </Text>
              </Max>
            </Flex>
          </Col>
          <Col lg={6}>
            <Flex justifyContent="center" alignItems="center">
              <Max maxWidth={300}>
                <Text size={20} center>
                  Core principle is based on the international Management system standards: ISO
                  9001, ISO 45001 and ISO 14001
                </Text>
              </Max>
            </Flex>
          </Col>
          <Col lg={12}>
            <Flex justifyContent="center" alignItems="center">
              <Max maxWidth={300}>
                <Text size={20} center>
                  Our mission - bring the technology into a daily business to improve the processes
                  and prevent the accidents happening on operations all over the world.
                </Text>
              </Max>
            </Flex>
          </Col>
        </Row>
      </Container>
      <Spacer space={100} />
      <GradientEdge toTop />
    </Wrapper>
  )
}

const Wrapper = styled.div`
  background: #000;
  background-image: radial-gradient(#ffffff30 1px, transparent 0);
  background-size: 40px 40px;
  background-position: -19px -19px;
`
