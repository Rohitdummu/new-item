import { Outlet, Navigate } from 'react-router-dom'

const PrivateRoutes = () => {
    return(
        localStorage.getItem("login") ? <Outlet/> : <Navigate to="/signin"/>
    )
}

export default PrivateRoutes