import { NavLink, useNavigate } from "react-router";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import Logo from "../images/Logo1.png";
import "./header.css";

export default function Header() {
    const authContext = useContext(AuthContext);
    const navigate = useNavigate();

    function handleLogout() {
        authContext?.logout();
        navigate("/");
    }

    return (
        <header className="header">
            <div className="header__logo">
                <img src={Logo} alt="Logo" />
            </div>
            <nav className="header__nav">
                <NavLink to="/dashboard">Dashboard</NavLink>
                <NavLink to="/profile">Mon profil</NavLink>
                <button onClick={handleLogout}>Se déconnecter</button>
            </nav>
        </header>
    );
}