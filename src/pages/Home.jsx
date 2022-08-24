// import logo from './logo.svg';
import './Home.scoped.css';

const Home = () => {
    return (
        <div className="w3-container">
            <h1>Welcome</h1>
            <a href="https://www.leda-creative.com/"
                target="new"
                style={{ textDecoration: "none" }}
            >
                <span className="w3-tag w3-jumbo w3-yellow" style={{ transform: "rotate(16deg)" }}>L</span>
                {"  "}
                <span className="w3-tag w3-xxxlarge w3-round">E</span>
                {"  "}
                <span className="w3-tag w3-xxxlarge w3-yellow" style={{ transform: "rotate(-12deg)" }}>D</span>
                <span className="w3-tag w3-jumbo" style={{ transform: "rotate(-8deg)" }}>A</span>
            </a>
        </div>
    )
}
//
export default Home
