import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded'
import { Button, Chip, Stack, Typography } from '@mui/material'
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
        <Col lg={6}>
          <Typography variant="h3">
            <b>Create ticket</b>
          </Typography>
          <Spacer space={30} />
          <Row>
            <Col xl={12}>
              <Card fillHeight heading="Occupational health and safety" bgColor="#fff" bgColorDark="#0849ff">
                <Stack direction="column" spacing={1} justifyContent="flex-start" alignItems="flex-start">
                  <Spacer space={32} />
                  <Button variant="contained" endIcon={<ArrowForwardRoundedIcon />} onClick={() => navigate(ROUTES.HEALTH_AND_SAFETY_ACCIDENT)}>
                    Accident
                  </Button>
                  <Button variant="contained" endIcon={<ArrowForwardRoundedIcon />} onClick={() => navigate(ROUTES.HEALTH_AND_SAFETY_NEAR_MISS)}>
                    Nearmiss
                  </Button>
                  <Button variant="contained" endIcon={<ArrowForwardRoundedIcon />} onClick={() => navigate(ROUTES.HEALTH_AND_SAFETY_POSIBLE_ACCIDENT)}>
                    Possible accident
                  </Button>
                </Stack>
              </Card>
            </Col>
          </Row>
        </Col>

        <Col lg={6}>
          <Typography variant="h3">
            <b>Database</b>
          </Typography>
          <Spacer space={30} />
          <Row>
            <Col md={6} xl={6}>
              <Card heading="All tickets" bgColor="#FF8A00" bgColorDark="#FF8A00">
                <Stack direction="column" spacing={1} justifyContent="flex-start" alignItems="flex-start">
                  <Spacer space={84} />
                  <Button color="warning" variant="contained" endIcon={<ArrowForwardRoundedIcon />} onClick={() => navigate(ROUTES.ALL_TICKETS)}>
                    Go
                  </Button>
                </Stack>
              </Card>
            </Col>
            <Col md={6} xl={6}>
              <Card heading="All corrective actions" bgColor="#ff606d" bgColorDark="#ff606d">
                <Stack direction="column" spacing={1} justifyContent="flex-start" alignItems="flex-start">
                  <Spacer space={84} />
                  <Button color="error" variant="contained" endIcon={<ArrowForwardRoundedIcon />} onClick={() => navigate(ROUTES.ALL_CORRECTIVE_ACTIONS)}>
                    Go
                  </Button>
                </Stack>
              </Card>
            </Col>
          </Row>
        </Col>

        <Col lg={12}>
          <Typography variant="h3">
            <b>Explore</b>
          </Typography>
          <Spacer space={30} />
          <Row>
            <Col md={6} xl={3}>
              <Card fillHeight heading="Personal stats" bgColor="#005fff" bgColorDark="#005fff">
                <Stack direction="column" spacing={1} justifyContent="flex-start" alignItems="flex-start">
                  <Button color="primary" variant="contained" endIcon={<ArrowForwardRoundedIcon />} onClick={() => navigate(ROUTES.PERSONAL_STATS)}>
                    Go
                  </Button>
                </Stack>
              </Card>
            </Col>
            <Col md={6} xl={3}>
              <Card fillHeight={true} heading="Global KPI" bgColor="#005fff" bgColorDark="#005fff">
                <Stack direction="column" spacing={1} justifyContent="flex-start" alignItems="flex-start">
                  <Button color="primary" variant="contained" endIcon={<ArrowForwardRoundedIcon />} onClick={() => navigate(ROUTES.GLOBAL_KPI)}>
                    Go
                  </Button>
                </Stack>
              </Card>
            </Col>
            <Col md={6} xl={3}>
              <Card fillHeight={true} heading="KPI" bgColor="#005fff" bgColorDark="#005fff">
                <Stack direction="column" spacing={1} justifyContent="flex-start" alignItems="flex-start">
                  <Button color="primary" variant="contained" endIcon={<ArrowForwardRoundedIcon />} onClick={() => navigate(ROUTES.KPI)}>
                    Go
                  </Button>
                </Stack>
              </Card>
            </Col>

            <Col md={6} xl={3}>
              <Card heading="Workcenters" bgColor="#005fff" bgColorDark="#005fff">
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

// {/* <Col xl={12}>
//           <Card heading="Enviornment" bgColor="#fff" bgColorDark="#0849ff">
//             <Stack direction="column" spacing={1} justifyContent="flex-start" alignItems="flex-start">
//               <Button variant="contained" endIcon={<ArrowForwardRoundedIcon />} onClick={() => navigate(ROUTES.ENV.ACCIDENT.CREATE)}>
//                 Accident
//               </Button>
//               <Button variant="contained" endIcon={<ArrowForwardRoundedIcon />} onClick={() => navigate(ROUTES.HEALTH.NEAR_MISS.CREATE)}>
//                 Nearmiss
//               </Button>
//               <Button variant="contained" endIcon={<ArrowForwardRoundedIcon />} onClick={() => navigate(ROUTES.HEALTH.POSIBLE_ACCIDENT.CREATE)}>
//                 Possible accident
//               </Button>
//             </Stack>
//           </Card>
//         </Col> */}
//         {/* <Col>
//           <Card heading="Quality" bgColor="#fff" bgColorDark="#0849ff">
//             <Stack direction="column" spacing={1} justifyContent="flex-start" alignItems="flex-start">
//               <Button variant="contained" endIcon={<ArrowForwardRoundedIcon />} onClick={() => navigate(ROUTES.QUALITY.AUDIT.CREATE)}>
//                 Audit non-conformity
//               </Button>
//               <Button variant="contained" endIcon={<ArrowForwardRoundedIcon />} onClick={() => navigate(ROUTES.QUALITY.PRODUCT.CREATE)}>
//                 Non-conforming product
//               </Button>
//               <Button variant="contained" endIcon={<ArrowForwardRoundedIcon />} onClick={() => navigate(ROUTES.QUALITY.OTD.CREATE)}>
//                 OTD
//               </Button>
//             </Stack>
//           </Card>
//         </Col> */}
