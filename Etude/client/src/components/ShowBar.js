import React, { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
const ShowBar = ({ children }) => {
    const location = useLocation();
    const [showAppBar, setShowAppBar] = useState(false)
    useEffect(() => {
        if(location.pathname.toLowerCase() === '/login'){
            setShowAppBar(false)
        }else{
            setShowAppBar(true)
        }
    }, [location])
    return (
        <div>{showAppBar && children}</div>
    )
}
export default ShowBar
