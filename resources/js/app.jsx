import React from 'react';
import {HelmetProvider} from "react-helmet-async";
import {createRoot} from 'react-dom/client';
import "./index.css";
import {AppWrapper} from "./common/PageMeta.jsx";
import {ThemeProvider} from "./context/ThemeContext.jsx"
import {RouterProvider} from "react-router-dom";
import router from "./router";

const root = createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <HelmetProvider>
            <ThemeProvider>
                {/*<AppWrapper>*/}
                    <RouterProvider router={router}/>
                {/*</AppWrapper>*/}
            </ThemeProvider>
        </HelmetProvider>
    </React.StrictMode>
);

