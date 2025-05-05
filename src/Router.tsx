import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { HomePage } from './pages/Home.page';
import { NewStoryPage } from './pages/NewStory.page';
import { NewProject } from './pages/NewProject.page';
import { NewStoryCreation } from './pages/NewStoryCreation.page';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/create/story',
    element: <NewStoryPage />
  },
  {
    path: '/project',
    element: <NewProject/>
  },
  {
    path: '/story',
    element: <NewStoryCreation />
  }
]);

export function Router() {
  return <RouterProvider router={router} />;
}
