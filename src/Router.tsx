import { SignedIn, SignedOut } from '@clerk/clerk-react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { HomePage } from './pages/Home.page';
import { NewProject } from './pages/NewProject.page';
import { NewStoryPage } from './pages/NewStory.page';
import SignInPage from './pages/SignIn.page';
import SignUpPage from './pages/SignUp.page';
import UserTest from './pages/UserTest.Page';

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <SignedIn>
        <HomePage />
      </SignedIn>
    ),
  },
  { path: '/create/story', element: <NewStoryPage /> },
  { path: '/project', element: <NewProject /> },
  { path: '/sign-in/*', element: <SignInPage /> },
  { path: '/sign-up/*', element: <SignUpPage /> },
  { path: '/user/test', element: <UserTest /> },
]);

export function Router() {
  return <RouterProvider router={router} />;
}
