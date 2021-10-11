import { Link } from 'react-router-dom'
import '../../styles/navbar.css'
export default function Navbar() {
    return (
        <nav>
            <div className="container">
                <ul className="nav-list">
                    <li className="nav-item">
                        <Link to="/posts" exact="true" href="#" className="nav-link gb-hover">
                            <div className="border gradient-blue"></div>
                            Posts
                            <div className="border-bottom"></div>
                        </Link> 
                    </li>
                    <li className="nav-item">
                        <Link to="/profile" href="#" className="nav-link gg-hover">
                            <div className="border gradient-green"></div>
                            <div className="icons">
                                <i className="fas fa-users kurumsal"></i>
                                Profile
                            </div>
                            <div className="border-bottom"></div>
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/login" href="#" className="nav-link gp-hover">
                            <div className="border gradient-purple"></div>
                            Login
                            <div className="border-bottom"></div>
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
    )
}