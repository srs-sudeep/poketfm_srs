import { Navigate, useRoutes } from 'react-router-dom'

import {AppPage,Page404,VideoPage}  from '../pages'
import DashboardLayout from '../layouts/DashboardLayout'
export default function Router() {
  const routes = useRoutes([
    {
      path: '/',
      element: <DashboardLayout />,
      children: [
        { path: '', element: <Navigate to="/" /> },
        { path: '', element: <AppPage /> },
        { path: 'video', element: <VideoPage /> },
      ],
    },
    {
      path: '*',
      children: [
        { path: '404', element: <Page404 /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
  ])

  return routes
}
