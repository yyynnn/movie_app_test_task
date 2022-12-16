import { useMemo } from 'react'

import { FilterMatchEnum, FUNCTIONS } from '../constants'
import type {
  MenuOption,
  OptionData,
  OptionDisabledCallback,
  OptionFilterCallback,
  OptionLabelCallback,
  OptionValueCallback,
  SelectedOption
} from '../types'
import { isBoolean, trimAndFormatFilterStr } from '../utils'
import useCallbackRef from './useCallbackRef'

/**
 * Parse options to array of MenuOptions and perform filtering (if applicable).
 */
const useMenuOptions = (
  options: OptionData[],
  debouncedInputValue: string,
  filterMatchFrom: FilterMatchEnum,
  selectedOption: SelectedOption[],
  getOptionValue: OptionValueCallback,
  getOptionLabel: OptionLabelCallback,
  getIsOptionDisabled?: OptionDisabledCallback,
  getFilterOptionString?: OptionFilterCallback,
  filterIgnoreCase = false,
  filterIgnoreAccents = false,
  isMulti = false,
  async = false,
  hideSelectedOptions?: boolean
): MenuOption[] => {
  const getIsOptionDisabledFn = useCallbackRef(getIsOptionDisabled || FUNCTIONS.isOptionDisabled)
  const getFilterOptionStringFn = useCallbackRef(getFilterOptionString || FUNCTIONS.optionFilter)
  const hideSelectedOptsOrDefault = isBoolean(hideSelectedOptions) ? hideSelectedOptions : isMulti
  const searchValue = !async ? debouncedInputValue : ''

  const menuOptions = useMemo<MenuOption[]>(() => {
    const selectedValues = selectedOption.map((x) => x.value)
    const isFilterMatchAny = filterMatchFrom === FilterMatchEnum.ANY
    const matchVal = trimAndFormatFilterStr(searchValue, filterIgnoreCase, filterIgnoreAccents)

    const isOptionFilterMatch = (option: MenuOption): boolean => {
      if (!matchVal) return true
      const filterVal = getFilterOptionStringFn(option)
      const normalFilterVal = trimAndFormatFilterStr(
        filterVal,
        filterIgnoreCase,
        filterIgnoreAccents
      )
      return isFilterMatchAny
        ? normalFilterVal.includes(matchVal)
        : normalFilterVal.startsWith(matchVal)
    }

    const parseMenuOption = (data: OptionData): MenuOption | undefined => {
      const value = getOptionValue(data)
      const label = getOptionLabel(data)
      const isDisabled = getIsOptionDisabledFn(data)
      const isSelected = selectedValues.includes(value)
      const menuOption: MenuOption = { data, value, label, isDisabled, isSelected }
      return !isOptionFilterMatch(menuOption) || (hideSelectedOptsOrDefault && isSelected)
        ? undefined
        : menuOption
    }

    return options.reduce((acc: MenuOption[], data: OptionData) => {
      const menuOption = parseMenuOption(data)
      menuOption && acc.push(menuOption)
      return acc
    }, [])
  }, [
    options,
    searchValue,
    getOptionValue,
    getOptionLabel,
    selectedOption,
    filterMatchFrom,
    filterIgnoreCase,
    filterIgnoreAccents,
    getIsOptionDisabledFn,
    getFilterOptionStringFn,
    hideSelectedOptsOrDefault
  ])

  return menuOptions
}

export default useMenuOptions
