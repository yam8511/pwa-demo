import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faLock } from '@fortawesome/free-solid-svg-icons'
import logo from '../assets/LEDA_logo.png'
import './Login.scoped.css';


const Login = (props) => {
    // console.group("====== LOGIN ======")
    // console.log('props => ', props)
    // console.groupEnd()
    const { rerender } = props

    const go = useNavigate()
    const [username, setUsername] = useState('')
    const [passwd, setPasswd] = useState('')
    const login = () => {
        if (username && passwd === 'leda') {
            localStorage.setItem('login', 'Y')
            localStorage.setItem('user', username)
            rerender('/')
            go('/')
        } else {
            window.alert("Please input correct Username/Password")
        }
    }
    const keyEnter = (cb) => {
        return (e) => {
            if (e.key === 'Enter' && e.target.value.trim() !== '') {
                cb(e)
            }
        }
    }

    return (
        <div className="Login">
            <div className="w3-container w3-center">
                <img src={logo} className="App-logo" alt="logo" />

                <div className="w3-row w3-section">
                    <div className="w3-col" style={{ width: "50px" }}>
                        <FontAwesomeIcon className="icon w3-xxlarge" icon={faUser} />
                    </div>
                    <div className="w3-rest">
                        <input
                            className="w3-input w3-border"
                            name="username"
                            type="text"
                            placeholder="Username"
                            required
                            value={username}
                            onChange={(e) => setUsername(e.target.value.trim())}
                            onKeyPress={keyEnter(() => document.getElementsByName('passwd')[0].focus())}
                        />
                    </div>
                </div>

                <div className="w3-row w3-section">
                    <div className="w3-col" style={{ width: "50px" }}>
                        <FontAwesomeIcon className="icon w3-xxlarge" icon={faLock} />
                    </div>
                    <div className="w3-rest">
                        <input
                            className="w3-input w3-border"
                            name="passwd"
                            type="password"
                            placeholder="Password"
                            required
                            value={passwd}
                            onChange={(e) => setPasswd(e.target.value.trim())}
                            onKeyPress={keyEnter(() => login())}
                        />
                    </div>
                </div>

                <button
                    className="w3-section w3-padding"
                    onClick={() => login()}
                >LOGIN</button>
            </div>
        </div>
    )
}

export default Login
