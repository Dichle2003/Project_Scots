import React from 'react';
import {HelmetProvider} from "react-helmet-async";
import {createRoot} from 'react-dom/client';
import "./index.css";
import "antd/dist/reset.css";
import {ThemeProvider} from "./context/ThemeContext.jsx"
import {RouterProvider} from "react-router-dom";
import router from "./router";

const root = createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <HelmetProvider>
            <ThemeProvider>
                <RouterProvider router={router}/>
            </ThemeProvider>
        </HelmetProvider>
    </React.StrictMode>
);

