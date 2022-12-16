import React, { type ReactNode, memo } from 'react'
import styled, { css } from 'styled-components'

import { CARET_ICON_CLS, CARET_ICON_TESTID, CLEAR_ICON_TESTID } from '../../constants'
import type { IconRenderer, MouseOrTouchEventHandler } from '../../types'
import { isFunction } from '../../utils'
import ClearIcon from './ClearIcon'
import LoadingDots from './LoadingDots'

type IndicatorIconsProps = Readonly<{
  menuOpen: boolean
  showClear: boolean
  isLoading?: boolean
  isInvalid?: boolean
  isDisabled?: boolean
  loadingNode?: ReactNode
  clearIcon?: IconRenderer
  caretIcon?: IconRenderer
  onClearMouseDown: MouseOrTouchEventHandler
  onCaretMouseDown: MouseOrTouchEventHandler
}>

type CaretProps = Pick<IndicatorIconsProps, 'menuOpen' | 'isInvalid'>

const IndicatorIconsWrapper = styled.div`
  display: flex;
  flex-shrink: 0;
  align-items: center;
  align-self: stretch;
  box-sizing: border-box;
`

const IndicatorIcon = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  box-sizing: border-box;
  color: ${({ theme }) => theme.icon.color};
  padding: ${({ theme }) => theme.icon.padding};

  :hover {
    color: ${({ theme }) => theme.icon.hoverColor};
  }

  ${({ theme }) => theme.icon.css}
`

const Separator = styled.span`
  width: 1px;
  margin: 8px 0;
  align-self: stretch;
  box-sizing: border-box;
  background-color: ${({ theme }) => theme.color.iconSeparator || theme.color.border};
`

const Caret = styled.div<CaretProps>`
  transition: ${({ theme }) => theme.icon.caret.transition};
  border-top: ${({ theme }) => theme.icon.caret.size} dashed;
  border-left: ${({ theme }) => theme.icon.caret.size} solid transparent;
  border-right: ${({ theme }) => theme.icon.caret.size} solid transparent;
  ${({ theme, menuOpen, isInvalid }) =>
    menuOpen &&
    css`
      transform: rotate(180deg);
      color: ${isInvalid ? theme.color.danger : theme.color.caretActive || theme.color.primary};
    `}
`

const IndicatorIcons = memo<IndicatorIconsProps>(
  ({
    menuOpen,
    clearIcon,
    caretIcon,
    isInvalid,
    showClear,
    isLoading,
    isDisabled,
    loadingNode,
    onCaretMouseDown,
    onClearMouseDown
  }) => {
    const iconRendererFn = (renderer: IconRenderer): ReactNode => {
      return isFunction(renderer)
        ? renderer({ menuOpen, isLoading, isInvalid, isDisabled })
        : renderer
    }

    return (
      <IndicatorIconsWrapper>
        {showClear && !isLoading && (
          <IndicatorIcon
            onTouchEnd={onClearMouseDown}
            onMouseDown={onClearMouseDown}
            data-testid={CLEAR_ICON_TESTID}
          >
            {iconRendererFn(clearIcon) || <ClearIcon />}
          </IndicatorIcon>
        )}
        {isLoading && (loadingNode || <LoadingDots />)}
        <Separator />
        <IndicatorIcon
          onTouchEnd={onCaretMouseDown}
          onMouseDown={onCaretMouseDown}
          data-testid={CARET_ICON_TESTID}
        >
          {iconRendererFn(caretIcon) || (
            <Caret
              aria-hidden
              menuOpen={menuOpen}
              isInvalid={isInvalid}
              className={CARET_ICON_CLS}
            />
          )}
        </IndicatorIcon>
      </IndicatorIconsWrapper>
    )
  }
)

IndicatorIcons.displayName = 'IndicatorIcons'

export default IndicatorIcons
