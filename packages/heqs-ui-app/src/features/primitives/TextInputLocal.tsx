import styled from '@emotion/styled'
import { TextField, TextFieldProps } from '@mui/material'
import React from 'react'

import { Absolute } from './Absolute'
import { Spacer } from './Spacer'

interface Props {
  icon?: any
}

export const TextInputLocal: React.FC<Props & TextFieldProps> = (props) => {
  return (
    <Wrapper>
      <TextField {...props} />
      <Absolute right={0} top={0} alignItems="center" justifyContent="flex-end">
        {props.icon}
        <div>
          <Spacer width={24} />
        </div>
      </Absolute>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  width: 100%;
  position: relative;

  svg {
    fill: #7484ac;
  }

  div.MuiOutlinedInput-root.MuiInputBase-root.MuiInputBase-colorPrimary {
    background-color: #f5f7ff;
    color: #252b5c;
    border-radius: 24px;
    font-size: 24px;
  }

  .MuiOutlinedInput-root.MuiInputBase-root.MuiInputBase-colorPrimary input {
    background-color: #f5f7ff;
    color: #252b5c;
    border-radius: 24px;
    font-size: 24px;
    padding: 35px 24px 13px;
  }
  .MuiOutlinedInput-root.MuiInputBase-root.MuiInputBase-colorPrimary fieldset {
    border: none;
  }

  label.MuiInputLabel-root.MuiInputLabel-formControl {
    color: #7484ac;
    transform: translate(24px, 14px) scale(1);
    font-size: 14px;
  }

  label.MuiInputLabel-root.MuiInputLabel-formControl.Mui-error {
    color: #eb8d8d;
  }
  .MuiOutlinedInput-root.MuiInputBase-root.MuiInputBase-colorPrimary.Mui-error input {
    background-color: #fbe8e8;
    color: #e46161;
  }
`
