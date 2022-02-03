import { Link, NavLink } from "react-router-dom";
import {useSelector} from 'react-redux';

function Header() {
  const user = useSelector(state=>state.user);
    return (
<nav className="navbar fixed-top navbar-expand-lg navbar-dark bg-dark">
        <Link className="navbar-brand" to="/">React App</Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav">
            { user &&
              <>
                <NavLink className='nav-item nav-link' activeClassName='active' to="/">Home <span className="sr-only">(current)</span></NavLink>
                <NavLink className='nav-item nav-link' activeClassName='active' to="/lists">Lists</NavLink>
              </>
            }
            { !user &&
              <>
                <NavLink className='nav-item nav-link' activeClassName='active' to="/login">Login</NavLink>
                <NavLink className={({ isActive }) => (isActive ? 'nav-item nav-link active' : 'nav-item nav-link')} to="/register">Register</NavLink>
              </>
            }
          </div>
        </div>
      </nav>
    )
}

export default Header
