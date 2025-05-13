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
import UserTest from './pages/UserTest.Page';

// import Test from './pages/Test.page';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
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
    path: '/newStoryCreation',
    element: <NewStoryCreation />,
  },
  {
    path: '/edit',
    element: (
      <ProtectedRoute>
        <EditorPage storyId="681e95296238b0a831ca8317" />,
      </ProtectedRoute>
    ),
  },
  {
    path: '/story',
    element: <Story />,
  },

  {
    path: '/testpage',
    // element: <Test />,
  },
  {
    path: '/stories-and-drafts',
    element: <StoriesAndDrafts />,
  },
]);

export function Router() {
  return <RouterProvider router={router} />;
}
