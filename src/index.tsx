import ReactDOM from 'react-dom/client';
import App from './App';

import { RecoilRoot } from 'recoil';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { HelmetProvider } from 'react-helmet-async';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { BrowserTracing } from '@sentry/tracing';
import * as Sentry from '@sentry/react';

Sentry.init({
  dsn: 'https://b79e7cee968645bba1b6df7c8f42e3f4@o4504794925498368.ingest.sentry.io/4504794937884672',
  integrations: [new BrowserTracing()],
  tracesSampleRate: 0.2,
});

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      cacheTime: 1000 * 60 * 60 * 24, // 24시간
    },
  },
});

root.render(
  <HelmetProvider>
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        <App />
      </QueryClientProvider>
    </RecoilRoot>
  </HelmetProvider>,
);
