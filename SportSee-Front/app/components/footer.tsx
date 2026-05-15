import { NavLink, useNavigate } from "react-router";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import "./footer.css";

import IconLogo from "../images/IconLogo.png";


export default function Footer() {
    const authContext = useContext(AuthContext);
    const navigate = useNavigate();
    function handleLogout() {
        authContext?.logout();
        navigate("/");
    }
    return (
        <footer className="footer">
            <section className="footer-left">
            <div className="SportSee-Name">©Sportsee</div>
            <p>Tous droits réservés</p>
            </section>

            <section className="footer-right">
            <p>Conditions générales</p>
            <p>Contact</p>
            <div className="footer-logo">
                <img src={IconLogo} alt="Icon Logo" />
            </div>
            </section>    
        </footer>
    );
}