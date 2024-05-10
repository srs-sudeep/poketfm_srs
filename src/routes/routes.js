import { Navigate, useRoutes } from 'react-router-dom'

import Page404 from '../pages/Page404'
import AppPage from '../pages/AppPage'
import DashboardLayout from '../layouts/DashboardLayout'
export default function Router() {
  const routes = useRoutes([
    {
      path: '/',
      element: <DashboardLayout />,
      children: [
        { path: '', element: <Navigate to="/app" /> },
        { path: 'app', element: <AppPage /> },
        { path: 'video', element: <AppPage /> },
        { path: 'audio', element: <AppPage /> },
      ],
    },

    // {
    //   path: '/vendor/',
    //   element: <VendorDashboardLayout />,
    //   children: [
    //     { path: '', element: <Navigate to="/vendor/dashboard" /> },
    //     // { path: '', element: <VDashboard /> },
    //     { path: 'dashboard', element: <VDashboard /> },
    //     { path: 'liveService', element: <VLiveService /> },
    //     { path: 'history', element: <VHistory /> },
    //     { path: 'menu', element: <VMenu /> },
    //     { path: 'studentList', element: <VStudentList /> },
    //     { path: 'profile', element: <VProfile /> },
    //   ],
    // },
    // {
    //   path: '/admin',
    //   element: <AdminDashboardLayout />,
    //   children: [
    //     { path: '', element: <Navigate to="/admin/dashboard" /> },
    //     { path: 'dashboard', element: <AdminDashboard /> },
    //     { path: 'studentDetails', element: <AdminStudentDetails /> },
    //     { path: 'galavStudents', element: <GalavStudents /> },
    //     { path: 'kumarStudents', element: <KumarStudents /> },
    //     { path: 'saiStudents', element: <SaiStudents /> },
    //     { path: 'transactionDetails', element: <AdminTransactionDetails /> },
    //     { path: 'kumarTransaction', element: <KumarTransaction /> },
    //     { path: 'galavTransaction', element: <GalavTransaction /> },
    //     { path: 'saiTransaction', element: <SaiTransaction /> },
    //     { path: 'messDetails', element: <AdminMessDetails /> },
    //     { path: 'upload', element: <Upload /> },
    //   ],
    // },
    // {
    //   // element: <SimpleLayout />,
    //   children: [
    //     { element: <Navigate to="/" /> },
    //     { path: '', element: <LoginPage /> },
    //     { path: '/login', element: <LoginPage /> },
    //     // { path: '404', element: <Page404 /> },
    //     // { path: '*', element: <Navigate to="/404" /> },
    //   ],
    // },
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
