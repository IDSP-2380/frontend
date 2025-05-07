import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { HomePage } from './pages/Home.page';
import { NewProject } from './pages/NewProject.page';
import { NewStoryPage } from './pages/NewStory.page';
import { NewStoryCreation } from './pages/NewStoryCreation.page';
import { Story } from './pages/Story.page';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/create/story',
    element: <NewStoryPage />,
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
    path: '/story',
    element: <Story />,
  },
]);

export function Router() {
  return <RouterProvider router={router} />;
}
