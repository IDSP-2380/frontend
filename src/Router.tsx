import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { HomePage } from './pages/Home.page';
import { NewProject } from './pages/NewProject.page';
import { NewStoryPage } from './pages/NewStory.page';
import SignInPage from './pages/SignIn.page';
import SignUpPage from './pages/SignUp.page';

const router = createBrowserRouter([
  { path: '/', element: <HomePage /> },
  { path: '/create/story', element: <NewStoryPage /> },
  { path: '/project', element: <NewProject /> },
  { path: '/sign-in', element: <SignInPage /> },
  { path: '/sign-up', element: <SignUpPage /> },
]);

export function Router() {
  return <RouterProvider router={router} />;
}
