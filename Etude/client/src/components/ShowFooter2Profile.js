import React, { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
const ShowProfile = ({ children }) => {
    const location = useLocation();
    const [showProfile, setShowProfile] = useState(false)
    useEffect(() => {
        if(location.pathname.toLowerCase() === '/roster'){
            setShowProfile(true)
        }else{
            setShowProfile(false)
        }
    }, [location])
    return (
        <div>{showProfile && children}</div>
    )
}
export default ShowProfile
