import { Routes, Route } from 'react-router-dom';
import AccountPage from '../../pages/account-page/account-page';
import HomePage from '../../pages/home-page/home-page';
import IngredientsPage from '../../pages/ingredients-page/ingredients-page';
import LoginPage from '../../pages/login-page/login-page';
import RecipePage from '../../pages/recipe-page/recipe-page';
import RecipesPage from '../../pages/recipes-page/recipes-page';
import SettingsPage from '../../pages/settings-page/settings-page';
import SubscriptionPage from '../../pages/subscription-page/subscription-page';
import ProtectedRoute from '../protected-route/protected-route';

export default function AppRoutes() {
  return (
    <Routes>
      <Route
        path='ingredients'
        element={
          <ProtectedRoute>
            <IngredientsPage />
          </ProtectedRoute>
        }
      ></Route>
      <Route path='/' element={<HomePage />}></Route>
      <Route
        path='recipes'
        element={
          <ProtectedRoute>
            <RecipesPage />
          </ProtectedRoute>
        }
      ></Route>
      <Route
        path='recipe/:id'
        element={
          <ProtectedRoute>
            <RecipePage />
          </ProtectedRoute>
        }
      ></Route>
      <Route
        path='account'
        element={
          <ProtectedRoute>
            <AccountPage />
          </ProtectedRoute>
        }
      ></Route>
      <Route
        path='account/settings'
        element={
          <ProtectedRoute>
            <SettingsPage />
          </ProtectedRoute>
        }
      ></Route>
      <Route path='login' element={<LoginPage />}></Route>
      <Route
        path='subscription'
        element={
          <ProtectedRoute>
            <SubscriptionPage />
          </ProtectedRoute>
        }
      ></Route>
    </Routes>
  );
}
