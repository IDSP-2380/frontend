import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { HomePage } from './pages/Home.page';
import { NewStoryPage } from './pages/NewStory.page';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/create/story',
    element: <NewStoryPage />
  }
]);

export function Router() {
  return <RouterProvider router={router} />;
}
