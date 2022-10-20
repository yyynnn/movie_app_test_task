import styled from '@emotion/styled'
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded'
import UploadFileRoundedIcon from '@mui/icons-material/UploadFileRounded'
import { Badge, Breadcrumbs, Button, Divider, FormControl, Icon, IconButton, InputLabel, LinearProgress, MenuItem, Paper, Select, Stack, TextField, Typography } from '@mui/material'
import { TimePicker } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker'
import dayjs, { Dayjs } from 'dayjs'
import React, { useRef, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { Col, Row } from 'react-grid-system'
import { Link } from 'react-router-dom'

import { ROUTES } from '../../consts/routes'
import { Flex, Pad, Spacer } from '../../primitives'
import { LinearProgressBuffer } from '../../primitives/LinearProgressBuffer'

export const TicketConstructor = ({ heading = 'Ticket', hasTime = true, hasDate = true, hasForeman = true, hasDamagedItem = true, hasShortDescription = true, hasComment = true }) => {
  // form
  const [value, setValue] = useState<Dayjs | null>(dayjs(new Date()))
  const [files, setFiles] = useState([])
  const formRef = useRef()

  const { getRootProps, getInputProps, isDragAccept, ...props } = useDropzone({
    onDrop: (acceptedFiles: any) => {
      setFiles(
        acceptedFiles.map((file: any) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file)
          })
        )
      )
    },
    accept: { 'image/*': ['.jpeg', '.png'] },
    multiple: false,
    disabled: false
  })

  const handleChange = (newValue: Dayjs | null) => {
    setValue(newValue)
  }

  const removeAllFiles = (e: any) => {
    e.stopPropagation()

    setFiles([])
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)
    console.log('🐸 Pepe said => handleSubmit => formData', formData.getAll('foreman'))
  }

  const fileReady = !!files[0]
  // const fileReady = true

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <form onSubmit={handleSubmit}>
        <Typography variant="h4">
          <b>{heading}</b>
        </Typography>
        <Breadcrumbs aria-label="breadcrumb">
          <Link color="inherit" to={ROUTES.HOME}>
            Home
          </Link>
          <Typography color="text.primary">{heading}</Typography>
        </Breadcrumbs>
        <Spacer space={50} />

        <Stack direction={{ md: 'column', lg: 'row' }} divider={<Divider orientation="vertical" flexItem />} spacing={{ xs: 1, sm: 1, md: 1, lg: 2 }}>
          {hasDate && <MobileDatePicker label="Date mobile" inputFormat="MM/DD/YYYY" value={value} onChange={handleChange} renderInput={(params) => <TextField {...params} fullWidth />} />}
          {hasTime && <TimePicker label="Time" value={value} onChange={handleChange} renderInput={(params) => <TextField {...params} fullWidth />} />}
          {hasForeman && (
            <FormControl fullWidth>
              <InputLabel id="foreman-label">Foreman</InputLabel>
              <Select labelId="foreman-label" id="foreman" name="foreman" label="Foreman">
                <MenuItem value={'Vasya'}>Vasya</MenuItem>
                <MenuItem value={'Lesha'}>Lesha</MenuItem>
                <MenuItem value={'Cherep'}>Cherep</MenuItem>
              </Select>
            </FormControl>
          )}
          {hasForeman && (
            <FormControl fullWidth>
              <InputLabel id="workcenter-label">Workcenter</InputLabel>
              <Select labelId="workcenter-label" id="workcenter" name="workcenter" label="Workcenter">
                <MenuItem value={'C101'}>C101</MenuItem>
                <MenuItem value={'C911'}>C911</MenuItem>
                <MenuItem value={'C666'}>C666</MenuItem>
              </Select>
            </FormControl>
          )}
          {hasDamagedItem && <TextField name="damagedItem" fullWidth label="Damaged Item" />}
          {hasShortDescription && <TextField name="shortDescription" fullWidth label="Short description" />}
        </Stack>
        <Spacer />

        <Row>
          <Col md={6}>
            <DropzoneWrapper variant="outlined">
              <Pad>
                <Dropzone
                  {...getRootProps({
                    //+ converts true -> 1, false -> 0
                    accepted: +isDragAccept,
                    disabled: false
                  })}
                >
                  <div>
                    <input {...getInputProps()} />
                    {fileReady ? (
                      <div>
                        {(files as any).map((file: any) => (
                          <DropzoneThumb key={file.name}>
                            <LinearProgressBuffer />
                            <IconWrapper>
                              <Button color="error" variant="contained" onClick={removeAllFiles}>
                                <DeleteForeverRoundedIcon />
                              </Button>
                            </IconWrapper>
                            <img src={file.preview} alt={file.name} />
                          </DropzoneThumb>
                        ))}
                      </div>
                    ) : (
                      <Flex justifyContent="center" alignItems="center">
                        <UploadFileRoundedIcon />
                        <Spacer width={10} />
                        <Typography variant="h6">Click or drag to upload</Typography>
                      </Flex>
                    )}
                  </div>
                </Dropzone>
              </Pad>
            </DropzoneWrapper>
            <Spacer />
          </Col>
          <Col md={6}>
            <div>{hasComment && <TextField fullWidth name="comment" label="Comment" multiline rows={16} defaultValue="" />}</div>
            <Spacer />
          </Col>
        </Row>

        <Spacer />
        <Flex justifyContent="center">
          <Button fullWidth size="large" variant="contained" type="submit">
            SUBMIT
          </Button>
        </Flex>
      </form>
    </LocalizationProvider>
  )
}

const DropzoneWrapper = styled(Paper)`
  height: 400px;
  width: 100%;
  border: 1px solid #52729457;

  & > * {
    height: 100%;
  }
`

const Dropzone = styled.div`
  border: 2px dashed #1b426a;
  border-radius: 20px;
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 100%;
  width: 100%;
  cursor: pointer;
`

const IconWrapper = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`

const DropzoneThumb = styled.div`
  position: relative;

  img {
    max-width: 300px;
    width: 100%;
    border-radius: 10px;
    box-shadow: -1px 9px 20px -11px #000;
  }
`
