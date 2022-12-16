import { getDocument } from 'ssr-window'

const document = getDocument()

export const PAGE_NAMES = {
  HOME_PAGE_NAME: 'Возможности',
  ABOUT_PAGE_NAME: 'О компании',
  TEAM_PAGE_NAME: 'Команда',
  CONTACTS_PAGE_NAME: 'Контакты'
}

export const PAGE_ROUTE_NAMES = {
  HOME_PAGE_NAME: 'home',
  ABOUT_PAGE_NAME: 'company',
  TEAM_PAGE_NAME: 'team',
  CONTACTS_PAGE_NAME: 'contacts'
}

export const HTML_TEXT = {
  CONNECT: 'Оставить заявку'
}

export const MAIN_APP_ID = 'root_app_container'

export const BREAKPOINTS: [
  xs: number,
  sm: number,
  md: number,
  lg: number,
  xl: number,
  xxl: number
] = [576, 800, 960, 1400, 1600, 1999]

export const BREAKPOINTS_NAMES = ['xs', 'sm', 'md', 'lg', 'xl', 'xxl']

export const APP_ENV = document.location.hostname.includes('dev') ? 'DEV_ENV' : 'PROD_ENV'

export const HOST_URL = '/'

export const POST_URL = '/api/marketing-info/'

export const INPUT_HEIGHT = 60
