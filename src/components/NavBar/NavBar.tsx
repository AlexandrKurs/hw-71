import {NavLink, useLocation} from 'react-router-dom';
import './NavBar.css';

const NavBar = () => {

    const location: { pathname: string } = useLocation();

    return (
        <nav className=" bg-primary">
            <div className="container navbar navbar-expand-xl">
                <div>
                    <NavLink to="/"><span className="navbar-brand mb-0 text-white fs-1">Dishes</span></NavLink>
                </div>

                <div className="ms-auto">
                    <ul className="navbar-nav">
                        {location.pathname === '/admin' ?
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/new-dish">New dish</NavLink>
                            </li>
                            : null
                        }

                        <li className="nav-item">
                            <NavLink className="nav-link" to="/orders">Orders</NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default NavBar;