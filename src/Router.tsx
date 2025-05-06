import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { EditorPage } from './pages/Editor.page';
import { HomePage } from './pages/Home.page';
import { NewProject } from './pages/NewProject.page';
import { NewStoryPage } from './pages/NewStory.page';
import { NewStoryCreation } from './pages/NewStoryCreation.page';
import { ProtectedRoute } from './pages/ProtectedRoute';
import SignInPage from './pages/SignIn.page';
import SignUpPage from './pages/SignUp.page';
import UserTest from './pages/UserTest.Page';

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <HomePage />
      </ProtectedRoute>
    ),
  },
  { path: '/create/story', element: <NewStoryPage /> },
  { path: '/project', element: <NewProject /> },
  { path: '/sign-in/*', element: <SignInPage /> },
  { path: '/sign-up/*', element: <SignUpPage /> },
  {
    path: '/user/test',
    element: (
      <ProtectedRoute>
        <UserTest />
      </ProtectedRoute>
    ),
  },
  {
    path: '/project',
    element: <NewProject />,
  },
  {
    path: '/story',
    element: <NewStoryCreation />,
  },
  {
    path: '/edit',
    element: <EditorPage />,
  },
]);

export function Router() {
  return <RouterProvider router={router} />;
}
