import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { EditorPage } from './pages/Editor.page';
import { HomePage } from './pages/Home.page';
import { NewProject } from './pages/NewProject.page';
import { NewStoryPage } from './pages/NewStory.page';
import { NewStoryCreation } from './pages/NewStoryCreation.page';
import { ProtectedRoute } from './pages/ProtectedRoute';
import SignInPage from './pages/SignIn.page';
import SignUpPage from './pages/SignUp.page';
import { StoriesAndDrafts } from './pages/StoriesAndDrafts.page';
import { Story } from './pages/Story.page';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/create/story',
    element: (
      <ProtectedRoute>
        <NewStoryPage />
      </ProtectedRoute>
    ),
  },
  { path: '/project', element: <NewProject /> },
  { path: '/sign-in/*', element: <SignInPage /> },
  { path: '/sign-up/*', element: <SignUpPage /> },
  {
    path: '/project',
    element: <NewProject />,
  },
  {
    path: '/newStoryCreation/:id',
    element: <NewStoryCreation />,
  },
  {
    path: '/edit/:id/:linkId?',
    element: (
      <ProtectedRoute>
        <EditorPage />,
      </ProtectedRoute>
    ),
  },
  {
    path: '/story/:id',
    element: <Story />,
  },
  {
    path: '/stories-and-drafts',
    element: <StoriesAndDrafts />,
  },
]);

export function Router() {
  return <RouterProvider router={router} />;
}
