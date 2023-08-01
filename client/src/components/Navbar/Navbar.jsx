import "./Navbar.css";

const Navbar = () => {
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark  " style={{ backgroundColor: "#7386ff" }}>
        <div className="container-fluid">
          <a className="navbar-brand fw-bold ps-4 " href="/">
            ONE CHAT
          </a>
          <a href="/">
            <button className="logout_btn">LOGOUT</button>
          </a>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
