import { createBrowserRouter, Navigate } from "react-router-dom";
import AppLayout from "./layouts/AppLayout";
import ChatUI from "./pages/ChatUI.jsx";
import Login from "./pages/auths/Login";
import Home from "@/pages/Home";


const persistMicrosoftLoginFromUrl = () => {
    const currentUrl = new URL(window.location.href);
    const token = currentUrl.searchParams.get("token");
    const user = currentUrl.searchParams.get("user");

    if (!token) {
        return;
    }

    localStorage.setItem("token", token);

    if (user) {
        localStorage.setItem("user", user);
    }

    currentUrl.searchParams.delete("token");
    currentUrl.searchParams.delete("user");
    window.history.replaceState({}, "", `${currentUrl.pathname}${currentUrl.search}${currentUrl.hash}`);
};

persistMicrosoftLoginFromUrl();

/* check auth tạm thời bằng localStorage */
const isAuthenticated = () => {
    const token = localStorage.getItem("token");
    return !!token;
};

/* Route bảo vệ */
const ProtectedRoute = ({ children }) => {
    if (!isAuthenticated()) {
        return <Navigate to="/login" replace />;
    }
    return children;
};

const router = createBrowserRouter([
    {
        path: "/login",
        element: <Login />,
        handle: {
            title: "Đăng nhập",
        },
    },
    {
        element: (
            <ProtectedRoute>
                <AppLayout />
            </ProtectedRoute>
        ),
        children: [
            {
                path: "/",
                element: <Home />,
                handle: {
                    title: "Chat Scots",
                },
            },
            {
                path: "/c/:id",
                element: <ChatUI />,
                handle: {
                    title: "Chat Scots",
                },
            },
        ],

    },
    {
        path: "*",
        element: <Navigate to="/login" replace />,
    },
]);

export default router;
