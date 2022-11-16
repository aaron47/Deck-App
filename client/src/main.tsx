import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { createBrowserRouter, RouterProvider, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import Deck from './Deck';
import Header from './Header';

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
      <div className="page">
        <Header />
        <RouterProvider router={router}></RouterProvider>
      </div>
    </React.StrictMode>
  </QueryClientProvider>
);
