import {createBrowserRouter} from "react-router-dom";
import App from "../App.tsx";
import Login from "../pages/auth/login.tsx";
import Register from "../pages/auth/register.tsx";
import Auth from "../pages/auth.tsx";
import Home from "../pages/home.tsx";
import Commodity from "../pages/home/commodity.tsx";
import Admin from "../pages/admin.tsx";
import Dashboard from "../pages/admin/dashboard.tsx";
import UserEdit from "../pages/admin/user/userEdit.tsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App/>,
        children: [
            {
                path: "/",
                element: <Auth/>,
                children: [
                    {
                        path: "/login",
                        element: <Login/>
                    }, {
                        path: "/register",
                        element: <Register/>
                    }
                ]
            },
            {
                path: "/",
                element: <Home/>,
                children: [
                    {
                        path: "/",
                        index: true,
                        element: <Commodity/>
                    }
                ]
            },
            {
                path: "/admin",
                element: <Admin/>,
                children: [
                    {
                        path: "/admin/dashboard",
                        element: <Dashboard/>
                    },
                    {
                        path: "/admin/user/edit",
                        element: <UserEdit/>
                    }
                ]
            }
        ]
    },
]);
export default router;