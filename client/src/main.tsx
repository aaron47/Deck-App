import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { createBrowserRouter, RouterProvider, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import Deck from './Deck';

const queryClient = new QueryClient();

const router = createBrowserRouter([
  { path: '/', element: <App /> },
  {
    path: '/deck/:id',
    element: <Deck />,
  },
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <QueryClientProvider client={queryClient}>
    <React.StrictMode>
      <RouterProvider router={router}></RouterProvider>
    </React.StrictMode>
  </QueryClientProvider>
);
