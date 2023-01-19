import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded'
import { Button, Chip, Stack, Tooltip, Typography } from '@mui/material'
import { Col, Row } from 'react-grid-system'
import { useNavigate } from 'react-router-dom'

import { ROUTES } from '../../consts/routes'
import { Spacer } from '../primitives'

export const HomePage = () => {
  const navigate = useNavigate()

  return (
    <div>
      <Row>
        <Col xl={12}>
          <Typography variant="h3">
            <b>MOVIE APP</b>
          </Typography>
          <Spacer space={10} />
        </Col>
      </Row>
    </div>
  )
}
