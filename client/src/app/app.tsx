// Uncomment this line to use CSS modules
// import styles from './app.module.css';

import { LoginForm } from '../modules/AuthForm';
import { Routes, Route } from 'react-router-dom';
import Dashboard from '../modules/Dashboard';

import ProtectedRoutes from '../modules/ProtectedRoutes';
import { AppProvider } from '../context/AppContext';

export function App() {
  return (
    <>
      <AppProvider>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoutes>
                <Dashboard />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/login"
            element={
              <ProtectedRoutes>
                <LoginForm />
              </ProtectedRoutes>
            }
          />
        </Routes>
      </AppProvider>
    </>
  );
}

export default App;
