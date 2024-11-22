function Navbar() {
  
    return (
        <>
            <nav className="navbar navbar-expand-lg fixed-top" id="navbar">
                <div className="container-fluid justify-content-start mx-lg-5 px-sm-5 fw-bold">
                    <a className="navbar-brand d-flex align-items-center" href="/html/">
                        <div className="brand__logo me-3 d-flex justify-content-center align-items-center">
                            <img src="/images/other/logo.webp" alt="Logo"></img>
                        </div>
                        <div className="brand__text">
                            <div className="brand__text--orange">Damage</div>
                            <div className="brand__text--yellow">Calculator</div>
                        </div>
                    </a>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <a className="nav-link active" aria-current="page" href="/html/">Home</a>
                            </li>
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false">Calculator</a>
                                <ul className="dropdown-menu">
                                    <li><a className="dropdown-item" href="/html/zapquake-calculator.html">Zapquake</a></li>
                                    <li><a className="dropdown-item" href="/html/advance-calculator.html">Advance</a></li>
                                </ul>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" aria-current="page" href="/html/changelog.html">Changelog</a>
                            </li>
                            <li className="nav-item d-sm-none">
                                <a className="nav-link" aria-current="page" href="/html/setting.html">Setting</a>
                            </li>
                        </ul>
                    </div>
                    <button className="navbar-toggler ms-auto" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>    
                    <button id="toggleTheme" className="btn btn--toggle-theme">
                        <i className="fa-solid fa-sun fa-2x d-none" id="lightModeIcon"></i>
                        <i className="fa-solid fa-moon fa-2x" id="darkModeIcon"></i>
                    </button>
                    <a href="/html/setting.html" className="btn btn--setting border-0 d-none d-sm-block">
                        <i className="fa-solid fa-gear fa-2x"></i>
                    </a>
                </div>
            </nav>
        </>
    );
}

export default Navbar;