import React from 'react';
import {HelmetProvider} from "react-helmet-async";
import {createRoot} from 'react-dom/client';
import "antd/dist/reset.css";
import "./index.css";
import {ThemeProvider} from "./context/ThemeContext.jsx"
import {RouterProvider} from "react-router-dom";
import router from "./router";
import {Provider} from "react-redux";
import {store} from "@/store/index";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 5 * 60 * 1000,
            refetchOnWindowFocus: false,
        },
    },
});
const root = createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <HelmetProvider>
            <QueryClientProvider client={queryClient}>
            <ThemeProvider>
                <Provider store={store}>
                    <RouterProvider router={router}/>
                </Provider>
            </ThemeProvider>
            </QueryClientProvider>
        </HelmetProvider>
    </React.StrictMode>
);

