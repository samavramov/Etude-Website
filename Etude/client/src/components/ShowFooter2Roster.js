import React, { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
const ShowFooter = ({ children }) => {
    const location = useLocation();
    const [showFooter, setShowFooter] = useState(false)
    useEffect(() => {
        if(location.pathname.toLowerCase() === '/'){
            setShowFooter(true)
        }else{
            setShowFooter(false)
        }
    }, [location])
    return (
        <div>{showFooter && children}</div>
    )
}
export default ShowFooter
