import { Link } from "react-router-dom";
import style from "./navbar.module.scss";

export default function Navbar() {
    return (
        <div className={style.navbar}>
            <Link to="/">HOME</Link>
            <Link to="ingredients">INGREDIENTS</Link>
        </div>
    )
}