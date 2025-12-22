import { createBrowserRouter, Navigate } from "react-router-dom";
import AppLayout from "./layouts/AppLayout";
import Home from "./pages/Home";
import Login from "./pages/auths/Login";
import UserList from "@/pages/users/UserList";

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
                    title: "Trang chủ",
                },
            },
            {
                path: "/users",
                element: <UserList />,
                handle: {
                    title: "Trang chủ",
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
