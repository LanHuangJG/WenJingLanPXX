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
import Merchandise from "../pages/admin/merchandise/merchandise.tsx";
import Type from "../pages/admin/merchandise/type.tsx";
import HomeOrder from "../pages/home/homeOrder.tsx";
import Order from "../pages/admin/order/order.tsx";

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
                    },
                    {
                        path: "/order",
                        element: <HomeOrder/>
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
                    },
                    {
                        path: "/admin/merchandise",
                        element: <Merchandise/>
                    },
                    {
                        path: "/admin/merchandise/type",
                        element: <Type/>
                    },
                    {
                        path: "/admin/order",
                        element: <Order/>
                    }
                ]
            }
        ]
    },
]);
export default router;