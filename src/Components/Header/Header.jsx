import { Link } from "react-router-dom"
import "./Header.css"

export function Header(){
    return (
        <>
            <header className="header">
                <nav>
                    <Link className="nav-link">Home</Link>
                    <Link className="nav-link">Heroes</Link>
                </nav>
            </header>
        </>
    )
}