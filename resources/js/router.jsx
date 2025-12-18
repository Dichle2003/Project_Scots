import { createBrowserRouter,Navigate, replace } from "react-router-dom";
import AppLayout from "./layouts/AppLayout";
import Home from "./pages/Home";
import Login from "./pages/auths/Login";
const isAuthenticated = () =>{
    const token = localStorage.getItem('token');
    return token != null && token != "";
}
const ProtectedRoute=({children})=>{
    if(!isAuthenticated()){
        return <Navigate to='/login' replace/>
    }
    return children;
}
const router = createBrowserRouter([
     {
                path: "/login",
                element: <Login />,
                handle: {
                    title: "Đăng nhập",
                },
            },
    {
        element:
      (
          <ProtectedRoute>
            {/* layout dùng chung */}
              <AppLayout />
        </ProtectedRoute>
      ),

        children: [
            {
                path: "/",
                element: isAuthenticated()? <Home />:<Navigate to="/login" replace/>,
                handle: {
                    title: "Trang chủ",
                },
            },

        ],
    },
    {
        path: "*",
        element :<Navigate to='/login' replace/>
    },
]);

export default router;
