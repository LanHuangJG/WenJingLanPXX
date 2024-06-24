import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.scss'
import {RouterProvider} from "react-router-dom";
import {ConfigProvider} from "antd";
import zhCN from 'antd/locale/zh_CN';
import router from "./router";

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <ConfigProvider locale={zhCN}>
            <RouterProvider router={router}/>
        </ConfigProvider>
    </React.StrictMode>,
)
