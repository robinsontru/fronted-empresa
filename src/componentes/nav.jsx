import { Link } from "react-router-dom";
import "./nav.css";
function Nav() {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/crear">crear</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Nav;
