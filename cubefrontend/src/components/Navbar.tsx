import { NavLink } from 'react-router-dom';

const Navbar = () => {
  const navStyle = {
    backgroundColor: '#ffffff',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
    padding: '16px 0',
    position: 'sticky',
    top: 0,
    zIndex: 10,
    margin:"10px 0px"
  };

  const ulStyle = {
    listStyle: 'none',
    display: 'flex',
    justifyContent: 'center',
    gap: '40px',
    margin: 0,
    padding: 0,
  };

  const linkStyle = {
    textDecoration: 'none',
    fontSize: '18px',
    fontWeight: 600,
    color: '#333',
    paddingBottom: '4px',
  };

  const activeStyle = {
    color: '#007bff',
    borderBottom: '2px solid #007bff',
  };

  return (
    <nav style={navStyle}>
      <ul style={ulStyle}>
        <li>
          <NavLink
            to="/"
            style={({ isActive }) =>
              isActive ? { ...linkStyle, ...activeStyle } : linkStyle
            }
          >
            Line Chart
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/bar"
            style={({ isActive }) =>
              isActive ? { ...linkStyle, ...activeStyle } : linkStyle
            }
          >
            Bar Chart
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/pie"
            style={({ isActive }) =>
              isActive ? { ...linkStyle, ...activeStyle } : linkStyle
            }
          >
            Pie Chart
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
