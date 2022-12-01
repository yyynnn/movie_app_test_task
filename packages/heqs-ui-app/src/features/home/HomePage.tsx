import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded'
import { Button, Chip, Stack, Tooltip, Typography } from '@mui/material'
import { Col, Row } from 'react-grid-system'
import { useNavigate } from 'react-router-dom'

import { ROUTES } from '../../consts/routes'
import { Spacer } from '../primitives'
import { Card } from './Card'

export const HomePage = () => {
  const navigate = useNavigate()

  return (
    <div>
      <Row>
        <Col xl={12}>
          <Typography variant="h3">
            <b>Create a ticket</b>
          </Typography>
          <Spacer space={10} />
          <Row>
            <Col md={6} xl={4}>
              <Card fillHeight heading="Occupational health and safety" bgColor="#0849ff" bgColorDark="#0849ff">
                <Stack direction="column" spacing={1} justifyContent="flex-start" alignItems="flex-start">
                  <Spacer space={32} />
                  <Tooltip title="Already happened, injuries" aria-label="already happened, injuries">
                    <Button variant="contained" endIcon={<ArrowForwardRoundedIcon />} onClick={() => navigate(ROUTES.HEALTH_AND_SAFETY_ACCIDENT)}>
                      Accident
                    </Button>
                  </Tooltip>

                  <Tooltip title="Already happened, no injuries" aria-label="already happened, no injuries">
                    <Button variant="contained" endIcon={<ArrowForwardRoundedIcon />} onClick={() => navigate(ROUTES.HEALTH_AND_SAFETY_NEAR_MISS)}>
                      Nearmiss
                    </Button>
                  </Tooltip>

                  <Tooltip title="Threat, violation" aria-label="threat, violation">
                    <Button variant="contained" endIcon={<ArrowForwardRoundedIcon />} onClick={() => navigate(ROUTES.HEALTH_AND_SAFETY_POSIBLE_ACCIDENT)}>
                      Possible accident
                    </Button>
                  </Tooltip>
                </Stack>
              </Card>
            </Col>

            <Col md={6} xl={4}>
              <Card fillHeight heading="Quality" bgColor="#ff0835" bgColorDark="#ff0835">
                <Stack direction="column" spacing={1} justifyContent="flex-start" alignItems="flex-start">
                  <Spacer space={32} />
                  <Tooltip title="Non-conformity found during  the audit" aria-label="non-conformity found during  the audit">
                    <Button variant="contained" endIcon={<ArrowForwardRoundedIcon />} onClick={() => navigate(ROUTES.UNDER_CONSTRUCTION)}>
                      Audit non-conformity
                    </Button>
                  </Tooltip>

                  <Tooltip title="External/internal customer claim" aria-label="external/internal customer claim">
                    <Button variant="contained" endIcon={<ArrowForwardRoundedIcon />} onClick={() => navigate(ROUTES.UNDER_CONSTRUCTION)}>
                      Non-conforming product
                    </Button>
                  </Tooltip>

                  <Tooltip title="Delivery delays" aria-label="delivery delays">
                    <Button variant="contained" endIcon={<ArrowForwardRoundedIcon />} onClick={() => navigate(ROUTES.UNDER_CONSTRUCTION)}>
                      OTD
                    </Button>
                  </Tooltip>
                </Stack>
              </Card>
            </Col>

            <Col md={12} xl={4}>
              <Card fillHeight heading="Environment" bgColor="#2dcf58" bgColorDark="#2dcf58">
                <Stack direction="column" spacing={1} justifyContent="flex-start" alignItems="flex-start">
                  <Spacer space={32} />
                  <Tooltip title="Already happened, injuries" aria-label="already happened, injuries">
                    <Button variant="contained" endIcon={<ArrowForwardRoundedIcon />} onClick={() => navigate(ROUTES.UNDER_CONSTRUCTION)}>
                      Accident
                    </Button>
                  </Tooltip>

                  <Tooltip title="Already happened, no injuries" aria-label="already happened, no injuries">
                    <Button variant="contained" endIcon={<ArrowForwardRoundedIcon />} onClick={() => navigate(ROUTES.UNDER_CONSTRUCTION)}>
                      Nearmiss
                    </Button>
                  </Tooltip>

                  <Tooltip title="Threat, violation" aria-label="threat, violation">
                    <Button variant="contained" endIcon={<ArrowForwardRoundedIcon />} onClick={() => navigate(ROUTES.UNDER_CONSTRUCTION)}>
                      Possible accident
                    </Button>
                  </Tooltip>
                </Stack>
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>
      <Spacer space={10} />

      <Row>
        <Col xl={12}>
          <Typography variant="h3">
            <b>Databases</b>
          </Typography>
          <Spacer space={10} />
          <Row>
            <Col lg={6}>
              <Card fillHeight heading="All tickets" bgColor="#FF8A00" bgColorDark="#FF8A00">
                <Stack direction="column" spacing={1} justifyContent="flex-start" alignItems="flex-start">
                  <Spacer space={74} />
                  <Button color="error" variant="contained" endIcon={<ArrowForwardRoundedIcon />} onClick={() => navigate(ROUTES.ALL_TICKETS)}>
                    Go
                  </Button>
                </Stack>
              </Card>
            </Col>

            <Col lg={6}>
              <Card fillHeight heading="All corrective actions" bgColor="#FF8A00" bgColorDark="#FF8A00">
                <Stack direction="column" spacing={1} justifyContent="flex-start" alignItems="flex-start">
                  <Spacer space={74} />

                  <Button color="error" variant="contained" endIcon={<ArrowForwardRoundedIcon />} onClick={() => navigate(ROUTES.ALL_CORRECTIVE_ACTIONS)}>
                    Go
                  </Button>
                </Stack>
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>
      <Spacer space={10} />

      <Row>
        <Col lg={12}>
          <Typography variant="h3">
            <b>Explore</b>
          </Typography>
          <Spacer space={10} />
          <Row>
            <Col md={6} xl={3}>
              <Card fillHeight heading="Personal tasks" bgColor="#8100ff" bgColorDark="#8100ff">
                <Stack direction="column" spacing={1} justifyContent="flex-start" alignItems="flex-start">
                  <Button color="primary" variant="contained" endIcon={<ArrowForwardRoundedIcon />} onClick={() => navigate(ROUTES.PERSONAL_TASKS)}>
                    Go
                  </Button>
                </Stack>
              </Card>
            </Col>
            <Col md={6} xl={3}>
              <Card fillHeight={true} heading="Global KPI" bgColor="#8100ff" bgColorDark="#8100ff">
                <Stack direction="column" spacing={1} justifyContent="flex-start" alignItems="flex-start">
                  <Button color="primary" variant="contained" endIcon={<ArrowForwardRoundedIcon />} onClick={() => navigate(ROUTES.GLOBAL_KPI)}>
                    Go
                  </Button>
                </Stack>
              </Card>
            </Col>
            <Col md={6} xl={3}>
              <Card fillHeight={true} heading="KPI" bgColor="#8100ff" bgColorDark="#8100ff">
                <Stack direction="column" spacing={1} justifyContent="flex-start" alignItems="flex-start">
                  <Button color="primary" variant="contained" endIcon={<ArrowForwardRoundedIcon />} onClick={() => navigate(ROUTES.KPI)}>
                    Go
                  </Button>
                </Stack>
              </Card>
            </Col>

            <Col md={6} xl={3}>
              <Card heading="Workcenters" bgColor="#8100ff" bgColorDark="#8100ff">
                <Stack direction="column" spacing={1} justifyContent="flex-start" alignItems="flex-start">
                  <Button color="primary" variant="contained" endIcon={<ArrowForwardRoundedIcon />} onClick={() => navigate(ROUTES.WORKCENTERS)}>
                    Go
                  </Button>
                </Stack>
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  )
}
