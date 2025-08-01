import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import CssBaseline from '@mui/material/CssBaseline'
import { BrowserRouter } from 'react-router-dom';
import { FavoritesProvider } from './context/FavoritesContext'; 

const queryClient = new QueryClient()

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
     <BrowserRouter> 
      <QueryClientProvider client={queryClient}>
        <FavoritesProvider>
        <CssBaseline />
        <App />
      </FavoritesProvider>
      </QueryClientProvider>
    </BrowserRouter>
  </React.StrictMode>
);


reportWebVitals();
