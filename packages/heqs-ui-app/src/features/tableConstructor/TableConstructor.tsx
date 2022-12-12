import styled from '@emotion/styled'
import SearchRoundedIcon from '@mui/icons-material/SearchRounded'
import {
  capitalize,
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  Pagination,
  PaginationItem,
  Select,
  Stack,
  TextField,
  Typography
} from '@mui/material'
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid'
import { number } from 'prop-types'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { ROUTES } from '../../consts/routes'
import { RFCC } from '../../types/react'
import { useDictionaries } from '../dictionaries/DictionariesProvider'
import { Flex, Spacer } from '../primitives'
import { Max } from '../primitives/Max'

const createCols = (
  object: any,
  dictionaries: any
):
  | {
      field: string
      headerName: string
      editable: boolean
      selected: boolean
      width?: number
      minWidth?: number
    }[]
  | [] => {
  const result = !object
    ? []
    : Object.keys(object).map((key) => {
        const letterWidth = 10
        const value = object[key]
        const valueWidth = value?.length ? value?.length * letterWidth : 1
        const minWidth = valueWidth < key.length * letterWidth ? key.length * 10 : valueWidth

        const dictionaryName =
          Object.keys(dictionaries)?.find((d) => {
            return key.includes(d)
          }) || ''
        const dictionary = dictionaries[dictionaryName]

        let translatedName = ''

        if (typeof value === 'number' && !!dictionary?.[value]) {
          const translatedObj = dictionary?.[value]
          console.log('🐸 Pepe said => :Object.keys => translatedObj', translatedObj)
          const translatedKey = Object.keys(translatedObj)[1]
          console.log('🐸 Pepe said => :Object.keys => translatedKey', translatedKey)
          translatedName = translatedObj[translatedKey]
          // console.log('🐸 Pepe said => :Object.keys => dictionary?.[value]', dictionary?.[value])
          // console.log('🐸 Pepe said => :Object.keys => translatedObj', translatedObj)
        }

        // const translatedKey =
        //   typeof translatedObj === 'object' && translatedObj !== null
        //     ? Object.keys(translatedObj)[1]
        //     : ''
        // const translatedValue = translatedObj[translatedKey]
        // console.log('🐸 Pepe said => :Object.keys => translatedValue', translatedValue)
        console.log('🐸 Pepe said => :Object.keys => translatedName', translatedName)

        return {
          field: key,
          headerName: capitalize(key.replaceAll('_', ' ')),
          editable: true,
          selected: true,
          minWidth: minWidth
        }
      })
  return result
}

export const TableConstructor: RFCC<{
  data: any
  isLoading?: boolean
  filters?: any
  setFilters?: any
  page: number
  pageSize: number
  setPageSize: any
  setSorting: any
  sorting: any
  setPage: any
  rowId?: string
}> = ({
  data,
  isLoading,
  page,
  pageSize,
  setPageSize,
  rowId = 'id',
  setPage,
  filters,
  setFilters,
  sorting,
  setSorting,
  ...rest
}) => {
  const navigate = useNavigate()
  const dictionaries = useDictionaries()
  const [searchAttrib, setSearchAttrib] = useState('')
  const [searchString, setSearchString] = useState('')
  const [cols, setCols] = useState<any>([])
  const [count, setCount] = useState(10)

  useEffect(() => {
    if (data?.meta.last_page) {
      setCount(data.meta.last_page)
    }
  }, [data?.meta.last_page])

  useEffect(() => {
    if (data?.data[0] && dictionaries.factories) {
      setCols(createCols(data?.data[0], dictionaries))
    }
  }, [data?.data[0], dictionaries.factories])

  return (
    <div>
      <StyledMax maxWidth={600}>
        <TextField
          variant="outlined"
          fullWidth
          label="Search query"
          value={searchString}
          onChange={(e) => {
            setFilters({
              category: searchAttrib,
              string: e.target.value
            })
            return setSearchString(e.target.value)
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <SearchRoundedIcon />
              </InputAdornment>
            )
          }}
        />
        <Spacer width={10} />
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Col attribute</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={searchAttrib}
            displayEmpty
            label="Col attribute"
            onChange={(e) => {
              setFilters({
                category: e.target.value,
                string: searchString
              })
              return setSearchAttrib(e.target.value)
            }}
          >
            {[...cols, { field: 'any', selected: false, headerName: 'Any' }].map((col, idx) => {
              return (
                <MenuItem key={idx} value={col.field} selected={!!col.selected}>
                  {col.headerName}
                </MenuItem>
              )
            })}
          </Select>
        </FormControl>
      </StyledMax>

      <Spacer />

      <Wrapper flexDirection="column">
        <DataGrid
          density="comfortable"
          hideFooter
          getRowId={(row) => row[rowId]}
          onRowClick={(row) => {
            navigate(ROUTES.TICKET.replace(':id', String(row.id)))
          }}
          headerHeight={70}
          rows={data?.data || []}
          columns={cols}
          loading={isLoading}
          disableVirtualization
          scrollbarSize={1}
          sortModel={sorting}
          onSortModelChange={(newSortModel) => {
            return setSorting(newSortModel)
          }}
        />
        <Spacer />
        <Stack spacing={2}>
          <Pagination
            shape="rounded"
            page={page}
            count={count}
            renderItem={(item) => {
              return <PaginationItem {...item} onClick={() => setPage(item?.page)} />
            }}
          />
        </Stack>
      </Wrapper>
    </div>
  )
}

const StyledMax = styled(Max)`
  padding-top: 10px;
`

const Wrapper = styled(Flex)`
  height: 666px;

  div.MuiDataGrid-root {
    border-radius: 10px !important;
  }

  .div::-webkit-scrollbar-thumb {
    border-radius: 100px;
    border: 5px solid transparent;
    background-clip: content-box;
    background-color: #8070d4;
  }
`
