import { useLocation, useNavigate, Link } from 'react-router-dom'
import logo from '../assets/LEDA_logo.png'
import './Sidecar.scoped.css'

const Sidecar = (props) => {
    // console.group("====== Sidecar ======")
    // console.log('props => ', props)
    // console.groupEnd()
    const { rerender, sidebarHidden } = props
    const path = useLocation().pathname
    const go = useNavigate()

    const { links } = props;
    const elm = links.map((r, i) =>
        <Link
            to={r.path}
            key={`link_${i + 1}`}
            className={path === r.path ? "w3-bar-item link active" : "w3-bar-item link"}
        >
            {r.text}
        </Link>
    )

    elm.push(
        <span
            key={`link_logout`}
            className='w3-bar-item w3-btn w3-round link w3-border-top'
            onClick={() => {
                window.localStorage.setItem('login', '')
                rerender('/login')
                go('/')
            }}
        >
            Logout
        </span>
    )

    return (
        <div className="w3-card w3-sidebar w3-animate-left w3-light-grey w3-bar-block Sidecar"
            style={{ display: sidebarHidden ? 'none' : 'block' }}
        >
            <a href="https://www.leda-creative.com/"
                target="new"
                style={{ textDecoration: "none" }}
            >
                <img src={logo} className="w3-image w3-padding-small" alt="logo" />
            </a>
            <h3 className='w3-center'>Hi~ {window.localStorage.getItem('user')}</h3>
            {elm}
        </div>
    )
}

export default Sidecar
