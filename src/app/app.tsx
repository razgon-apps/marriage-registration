import { StrictMode } from 'react';

import { QueryClientProvider } from '@tanstack/react-query';
import bridge from '@vkontakte/vk-bridge';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import { Router } from './providers';
import queryClient from './react-query';
import './styles/common.scss';

// Init VK  Mini App
bridge.send('VKWebAppInit');

const root = createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </QueryClientProvider>
  </StrictMode>,
);
