import { Link, NavLink, useLocation } from "react-router-dom";
import { URLS } from "assets/data/config";
import { ThemeToggler } from "../ThemeToggler";

export function Navbar() {
  const location = useLocation();

  // Check if the current URL matches either Zapquake or Advance pages
  const isCalculatorActive =
    location.pathname === `${URLS.ZapquakeCalcPage}` ||
    location.pathname === `${URLS.AdvanceCalcPage}`;

  return (
    <>
      <nav className="navbar navbar-expand-lg fixed-top" id="navbar">
        <div className="container-fluid justify-content-start mx-lg-5 px-sm-5 fw-bold">
          <Link
            className="navbar-brand d-flex align-items-center"
            to={URLS.HomePage}
          >
            <div className="brand__logo me-3 d-flex justify-content-center align-items-center">
              <img src="/images/other/logo.webp" alt="Logo"></img>
            </div>
            <div className="brand__text">
              <div className="brand__text--orange">Damage</div>
              <div className="brand__text--yellow">Calculator</div>
            </div>
          </Link>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink
                  className={({ isActive }) =>
                    `nav-link ${isActive ? "active" : ""}`
                  }
                  to={URLS.HomePage}
                >
                  Home
                </NavLink>
              </li>
              <li className="nav-item dropdown">
                <a
                  className={`nav-link dropdown-toggle ${
                    isCalculatorActive ? "active" : ""
                  }`}
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Calculator
                </a>
                <ul className="dropdown-menu">
                  <li>
                    <NavLink
                      className={({ isActive }) =>
                        `dropdown-item ${isActive ? "fw-bold" : ""}`
                      }
                      to={URLS.ZapquakeCalcPage}
                    >
                      Zapquake
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      className={({ isActive }) =>
                        `dropdown-item ${isActive ? "fw-bold" : ""}`
                      }
                      to={URLS.AdvanceCalcPage}
                    >
                      Advance
                    </NavLink>
                  </li>
                </ul>
              </li>
              <li className="nav-item">
                <NavLink
                  className={({ isActive }) =>
                    `nav-link ${isActive ? "active" : ""}`
                  }
                  to={URLS.ChangelogPage}
                >
                  Changelog
                </NavLink>
              </li>
              <li className="nav-item d-sm-none">
                <NavLink
                  className={({ isActive }) =>
                    `nav-link ${isActive ? "active" : ""}`
                  }
                  to={URLS.SettingPage}
                >
                  Setting
                </NavLink>
              </li>
            </ul>
          </div>
          <button
            className="navbar-toggler ms-auto"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <ThemeToggler />
          <Link
            to={URLS.SettingPage}
            className="btn btn--setting border-0 d-none d-sm-block"
          >
            <i className="fa-solid fa-gear fa-2x"></i>
          </Link>
        </div>
      </nav>
    </>
  );
}
