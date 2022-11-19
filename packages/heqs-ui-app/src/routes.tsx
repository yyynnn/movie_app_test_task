import { ROUTES } from './consts/routes'
import { AllCorrectiveActionsPage } from './features/allCorrectiveActions/AllCorrectiveActionsPage'
import { AllTicketsPage } from './features/allTickets/AllTicketsPage'
import { ExampleFeaturePage } from './features/exampleFeature/ExampleFeaturePage'
import { HomePage } from './features/home/HomePage'
import { ForgotPasswordPage } from './features/login/ForgotPasswordPage'
import { LoginPage } from './features/login/LoginPage'
import { RegPage } from './features/reg/RegPage'
import { TicketConstructor } from './features/ticketConstructor/TicketConstructor'
import { TicketReadOnly } from './features/ticketConstructor/TicketReadOnly'
import { TicketSuccess } from './features/ticketConstructor/TicketSuccess'
import { WorkcentersPage } from './features/workcenters/WorkcentersPage'

export const routes = [
  {
    element: <LoginPage />,
    path: ROUTES.LOGIN,
    privatePage: false,
    featureActive: true
  },
  {
    element: <RegPage />,
    path: ROUTES.REG,
    privatePage: false,
    featureActive: true
  },
  {
    element: <AllCorrectiveActionsPage />,
    path: ROUTES.PERSONAL_TASKS,
    privatePage: true,
    featureActive: true
  },
  {
    element: <WorkcentersPage />,
    path: ROUTES.WORKCENTERS,
    privatePage: true,
    featureActive: true
  },
  {
    element: <ForgotPasswordPage />,
    path: ROUTES.FORGOT_PASSWORD,
    privatePage: false,
    featureActive: true
  },
  {
    element: <AllTicketsPage />,
    path: ROUTES.ALL_TICKETS,
    privatePage: true,
    featureActive: true
  },
  {
    element: <TicketReadOnly />,
    path: ROUTES.TICKET,
    privatePage: true,
    featureActive: true
  },
  {
    element: <AllCorrectiveActionsPage />,
    path: ROUTES.ALL_CORRECTIVE_ACTIONS,
    privatePage: true,
    featureActive: true
  },
  {
    element: <TicketConstructor heading="Accident" hasShortDescription={false} />,
    path: ROUTES.HEALTH_AND_SAFETY_ACCIDENT,
    privatePage: true,
    featureActive: false
  },
  {
    element: <TicketConstructor heading="Nearmiss (Occupational health and safety)" hasShortDescription={false} />,
    path: ROUTES.HEALTH_AND_SAFETY_NEAR_MISS,
    privatePage: true,
    featureActive: true
  },
  {
    element: <TicketConstructor heading="Posible accident" hasShortDescription={false} />,
    path: ROUTES.HEALTH_AND_SAFETY_POSIBLE_ACCIDENT,
    privatePage: true,
    featureActive: false
  },
  {
    element: <div />,
    path: ROUTES.UNDER_CONSTRUCTION,
    privatePage: true,
    featureActive: false
  },
  {
    element: <ExampleFeaturePage />,
    path: '/example',
    privatePage: true,
    featureActive: true
  },
  {
    element: <TicketSuccess />,
    path: ROUTES.TICKET_SUCCESS,
    privatePage: true,
    featureActive: true
  },
  {
    element: <HomePage />,
    path: ROUTES.HOME,
    privatePage: true,
    featureActive: true
  },
  {
    element: <HomePage />,
    path: ROUTES.ROOT,
    privatePage: true,
    featureActive: true
  }
]
