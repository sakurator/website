import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route } from 'react-router';
import { Routes } from 'react-router';
import { NuqsAdapter } from 'nuqs/adapters/react-router/v7';
import Index from '@client/pages/Index.js';
import "@sass/App.sass";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Learn from './pages/Learn.js';

const queryClient = new QueryClient();

function App() {
    return (
        <>
            <QueryClientProvider client={queryClient}>
                <NuqsAdapter>
                    <BrowserRouter>
                        <Routes>
                            <Route path="/" element={<Index />} />
                            <Route path="/learn/:alphabet/:slug" element={<Learn />} />
                        </Routes>
                    </BrowserRouter>
                </NuqsAdapter>
            </QueryClientProvider>
        </>
    );
}

const root = createRoot(document.getElementById('app')!);
root.render(<App />);

