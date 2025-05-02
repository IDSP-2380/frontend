import React from 'react';
import { ClerkDegraded, ClerkProvider } from '@clerk/clerk-react';
import ReactDOM from 'react-dom/client';
import { MantineProvider } from '@mantine/core';
import App from './App';
import { theme } from './theme';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ClerkProvider publishableKey={import.meta.env.VITE_CLERK_PUBLISHABLE_KEY}>
      <MantineProvider theme={theme}>
        <App />
      </MantineProvider>
    </ClerkProvider>
  </React.StrictMode>
);
