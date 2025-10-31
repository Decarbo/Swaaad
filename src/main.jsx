import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import store, { persistor } from './redux/store';

// Import React Query essentials
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

//  Create a single query client instance
const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false, // prevents refetching when user switches tabs
			retry: 1, // retry once on failure
			staleTime: 5 * 60 * 1000, // data stays "fresh" for 5 minutes
		},
	},
});

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<Provider store={store}>
			<BrowserRouter>
				<PersistGate
					loading={null}
					persistor={persistor}>
					<QueryClientProvider client={queryClient}>
						<App />
					</QueryClientProvider>
				</PersistGate>
			</BrowserRouter>
		</Provider>
	</React.StrictMode>
);
