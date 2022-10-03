import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";




export const NavigationBar = function () {
  const location = useLocation();

  const renderButtons = (pathname) => {
    switch (pathname) {
      case '/':
        return (
          <ul>
            <li><Link to='/login' className="login">Login</Link></li>
            <li><Link to='/registration' className="user">Registration</Link></li>
          </ul>
        );
      case '/login':
        return (
          <ul>
            <li><Link to='/registration' className="user">Registration</Link></li>
          </ul>
        );
      case '/registration':
        return (
          <ul>
            <li><Link to='/login' className="user">Login</Link></li>
          </ul>
        );
      default:
        return (
          <ul>
            <form>
              <input type="text" placeholder='Browse for places here...' class="searchTxt"></input>
              <input type="Submit" value="Goooo" class="searchButton"></input>
            </form>
            <li><Link to='/notifications' class="notification">Notification</Link></li>
            <li><Link to='/Profile' class="user">User</Link></li>
          </ul>
        );
    }
  };

  return (
    <header>
      <div className="all-header-menu">
      {location.pathname === '/' || location.pathname === '/login' || location.pathname === '/registration' ? <Link to='/' className="logo">LeisureGuru</Link> : 
        <Link to='/homepage' className="logo">LeisureGuru</Link>}
        
        <div className="menu">
          {renderButtons(location.pathname)}
        </div>
      </div>
    </header>
  );
}

