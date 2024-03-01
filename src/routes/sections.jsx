import { lazy } from 'react';
import { Navigate, useRoutes } from 'react-router-dom';
import DashboardLayout from 'src/layouts/dashboard';
import ProtectedRoute from './components/ProtectedRoute';

export const IndexPage = lazy(() => import('src/pages/app'));
export const BlogPage = lazy(() => import('src/pages/blog'));
export const UserPage = lazy(() => import('src/pages/user'));
export const AppPage = lazy(() => import('src/pages/app'));
export const LoginPage = lazy(() => import('src/pages/login'));
export const CreateAccountPage = lazy(() => import('src/pages/create-account'));
export const FindTransactionsPage = lazy(() => import('src/pages/find-transaction'));
export const ProductsPage = lazy(() => import('src/pages/products'));
export const Page404 = lazy(() => import('src/pages/page-not-found'));
export const SettingsPage = lazy(() => import('src/pages/settings'));

export default function Router() {
 const routes = useRoutes([
    {
      path: '/',
      element: <LoginPage />,
    },
    {
      path: 'app',
      element: <DashboardLayout />,
      children: [
        { path: 'user', element: <ProtectedRoute element={<UserPage />} /> },
        { path: 'products', element: <ProtectedRoute element={<ProductsPage />} /> },
        { path: 'blog', element: <ProtectedRoute element={<BlogPage />} /> },
        { path: 'create-account', element: <ProtectedRoute element={<CreateAccountPage />} /> },
        { path: 'settings', element: <ProtectedRoute element={<SettingsPage />} /> },
        { path: 'transactions/:accountNumber', element: <ProtectedRoute element={<FindTransactionsPage />} /> },
      ],
    },
    {
      path: '404',
      element: <Page404 />,
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
 ]);

 return routes;
}
