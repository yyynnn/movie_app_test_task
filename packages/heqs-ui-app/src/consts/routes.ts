export const ROUTES = {
  ROOT: '/',
  HOME: '/home',
  LOGIN: '/login',
  PERSONAL_STATS: '/personal_stats',
  ALL_TICKETS: '/all_tickets',
  GLOBAL_KPI: '/global_kpi',
  KPI: '/kpi',
  WORKSTATIONS: '/workstations',
  ALL_CORRECTIVE_ACTIONS: '/all_corrective_actions',
  ENV: {
    ACCIDENT: {
      CREATE: '/env/accident/create'
    },
    NEAR_MISS: {
      CREATE: '/env/miss/create'
    },
    POSIBLE_ACCIDENT: {
      CREATE: '/env/posible_accident/create'
    }
  },
  QUALITY: {
    AUDIT: {
      CREATE: '/quality/audit/create'
    },
    PRODUCT: {
      CREATE: '/quality/product/create'
    },
    OTD: {
      CREATE: '/quality/pootdsible_accident/create'
    }
  },
  HEALTH: {
    ACCIDENT: {
      CREATE: '/health/accident/create'
    },
    NEAR_MISS: {
      CREATE: '/health/miss/create'
    },
    POSIBLE_ACCIDENT: {
      CREATE: '/health/posible_accident/create'
    }
  },

  FORGOT_PASSWORD: '/forgot'
}
