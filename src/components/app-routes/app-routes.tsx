import { Routes, Route } from 'react-router-dom';
import AccountPage from '../../pages/account-page/account-page';
import HomePage from '../../pages/home-page/home-page';
import IngredientsPage from '../../pages/ingredients-page/ingredients-page';
import LoginPage from '../../pages/login-page/login-page';
import RecipePage from '../../pages/recipe-page/recipe-page';
import RecipesPage from '../../pages/recipes-page/recipes-page';
import SettingsPage from '../../pages/settings-page/settings-page';
import SubscriptionPage from '../../pages/subscription-page/subscription-page';
import { ProtectedRoute } from '../../routes/ProtectedRoute';
import TestAuthComponent from '../../contexts/auth/TestAuthComponent';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path='login' element={<LoginPage />} />
      <Route path='test' element={<TestAuthComponent />} />
      <Route path='*' element={<HomePage />} />

      <Route element={<ProtectedRoute />}>
        <Route path='ingredients' element={<IngredientsPage />} />
        <Route path='recipes' element={<RecipesPage />} />
        <Route path='recipe/:id' element={<RecipePage />} />
        <Route path='account' element={<AccountPage />} />
        <Route path='account/settings' element={<SettingsPage />} />
        <Route path='subscription' element={<SubscriptionPage />} />
      </Route>
    </Routes>
  );
}
