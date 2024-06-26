import {Outlet, useNavigate} from "react-router-dom";
import {useEffect} from "react";

export default function Auth() {
    const navigate = useNavigate()
    useEffect(() => {
        const token = localStorage.getItem("token")
        if (token) navigate('/', {
            replace: true
        })
    }, [navigate])
    return <Outlet/>
}