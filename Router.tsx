import React from 'react';/* skal være på */
import { Routes, Route, BrowserRouter } from 'react-router';
import Layout from './src/components/Layout';

import { AuthProvider } from './src/admin/AuthContext';
import ProtectedRoute from './src/admin/ProtectedRoute';
import AdminLayout from './src/admin/AdminLayout';

import { publicRoutes, adminRoutes } from './RoutesConfig';
/* 

Gå til RoutesConfig.tsx for at lave flere routes

*/

export default function Router() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Layout links={publicRoutes} />}>
            {publicRoutes.map((route) =>
              route.link === "" ? (
                <Route index element={route.component} key="index" />
              ) : (
                <Route path={route.link} element={route.component} key={route.link} />
              )
            )}
          </Route>

          {/* Protected admin routes */}
          <Route path="/admin" element={
            <ProtectedRoute adminOnly>
              <AdminLayout links={adminRoutes} />
            </ProtectedRoute>}
          >
            {adminRoutes.map((route) => (
              <Route path={route.link} element={route.component} key={route.link} />
            ))}
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}
