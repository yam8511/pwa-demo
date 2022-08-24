import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
    const go = useNavigate()
    useEffect(() => {
        console.log("NOT FOUND")
        go('/')
    })
    return <div>Redirect to /</div>
}

export default NotFound
