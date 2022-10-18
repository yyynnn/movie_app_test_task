import { Pad, Spacer } from '@heqs-ui/uikit'
import { Paper, Typography } from '@mui/material'
import { Col, Row } from 'react-grid-system'

export const HomePage = () => {
  return (
    <div>
      <Row>
        <Col md={6}>
          <Typography variant="h4">
            <b>Create ticket</b>
          </Typography>
          <Spacer />
          <Row>
            <Col md={12}>
              <Paper>
                <Pad>
                  <Typography variant="h6">Occupational health and safety</Typography>
                </Pad>
              </Paper>
              <Spacer />
            </Col>
            <Col md={12}>
              <Paper>
                <Pad>
                  <Typography variant="h6">Occupational health and safety</Typography>
                </Pad>
              </Paper>
            </Col>
          </Row>
        </Col>
        <Col md={6}>
          <Typography variant="h4">
            <b>Explore</b>
          </Typography>
          <Spacer />
        </Col>
      </Row>
    </div>
  )
}
