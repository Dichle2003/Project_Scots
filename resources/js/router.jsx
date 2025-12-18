import { createBrowserRouter } from "react-router-dom";
import AppLayout from "./layouts/AppLayout";
import Home from "./pages/Home";
import Login from "./pages/auths/Login";

const router = createBrowserRouter([
    {
        element: <AppLayout />, // layout dùng chung
        children: [
            {
                path: "/",
                element: <Home />,
                handle: {
                    title: "Trang chủ",
                },
            },
            {
                path: "/login",
                element: <Login />,
                handle: {
                    title: "Đăng nhập",
                },
            },
        ],
    },
]);

export default router;
