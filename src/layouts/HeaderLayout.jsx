import { Outlet, useNavigate } from "react-router-dom";
import "../styles/header.css";
import { useContext, useState, useEffect } from "react";
import { SearchContext } from "../context/SearchContext";
import api from "../api/axios";

function HeaderLayout() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const { searchTerm, setSearchTerm } = useContext(SearchContext);

  const [results, setResults] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  useEffect(() => {
    if (!searchTerm.trim()) {
        setResults(null);
        setShowDropdown(false);
        return;
    }

    const fetchResults = async () => {
        try {
            const res = await api.get(`/search?query=${searchTerm}`);
            setResults(res.data);
            setShowDropdown(true);
        } 
        catch (err) {
            console.error(err);
        }
    };

    const timeout = setTimeout(fetchResults, 300);
        return () => clearTimeout(timeout);

    }, [searchTerm]);

  useEffect(() => {
    const handleResize = () => {
        if (window.innerWidth > 768) {
            setMenuOpen(false);
            setSearchOpen(false);
        }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);

  }, []);

  return (
    <div className={`app-container ${(menuOpen || searchOpen) ? "blur-background" : ""}`}>

      <header className={`app-header ${(menuOpen || searchOpen) ? "hidden-header" : ""}`}>
        <button
          className="menu-button"
          onClick={() => {
            if (window.innerWidth <= 768) {
                setSearchOpen(false);
                setMenuOpen(true);
            }
          }}
        >
            <i className="bi bi-list"></i>
        </button>

        <div className={`header-search desktop-search ${showDropdown ? "active" : ""}`}>
            <i className="bi bi-search"></i>
            <input
                type="text"
                placeholder="Buscar tablero, sección o clase"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />

            {showDropdown && results && (
                <div className="search-dropdown">

                {results.boards?.map(board => (
                    <div
                    key={board._id}
                    className="search-item"
                    onClick={() => {
                        navigate(`/boards/${board._id}`);
                        setShowDropdown(false);
                        setSearchTerm("");
                    }}
                    >
                    {board.title}
                    </div>
                ))}

                {results.sections?.map(section => (
                    <div
                    key={section._id}
                    className="search-item"
                    onClick={() => {
                        navigate(`/sections/${section._id}`);
                        setShowDropdown(false);
                        setSearchTerm("");
                    }}
                    >
                    {section.title}
                    </div>
                ))}

                {results.classes?.map(cls => (
                    <div
                    key={cls._id}
                    className="search-item"
                    onClick={() => {
                        navigate(`/classes/${cls._id}`);
                        setShowDropdown(false);
                        setSearchTerm("");
                    }}
                    >
                    {cls.title}
                    </div>
                ))}

                </div>
            )}
        </div>

        <div className="header-right">
            <span className="user-name">{user?.name}</span>
            <div className="user-avatar">
            {user?.name?.charAt(0).toUpperCase()}
            </div>
            <button className="logout-button" onClick={handleLogout}>
                Cerrar sesión
            </button>
        </div>

        <button
          className="mobile-search-button"
          onClick={() => {
            setMenuOpen(false);
            setSearchOpen(true);
          }}
        >
            <i className="bi bi-search"></i>
        </button>

      </header>
        
      {searchOpen && (
        <div className="mobile-search-overlay">

          <div className="mobile-search-container">
            <div className="mobile-search-bar">
                <input
                  type="text"
                  placeholder="Buscar tablero, sección o clase"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  autoFocus
                />

                <button
                  className="mobile-search-close"
                  onClick={() => {
                    setSearchOpen(false);
                    setSearchTerm("");
                    setShowDropdown(false);
                  }}
                >
                    <i className="bi bi-x-lg"></i>
                </button>
            </div>

            {showDropdown && results && (
              <div className="mobile-search-dropdown">

                {results.boards?.map(board => (
                  <div
                    key={board._id}
                    className="search-item"
                    onClick={() => {
                        navigate(`/boards/${board._id}`);
                        setSearchOpen(false);
                        setSearchTerm("");
                        setShowDropdown(false);
                    }}
                  >
                    {board.title}
                  </div>
                ))}

                {results.sections?.map(section => (
                  <div
                    key={section._id}
                    className="search-item"
                    onClick={() => {
                        navigate(`/sections/${section._id}`);
                        setSearchOpen(false);
                        setSearchTerm("");
                        setShowDropdown(false);
                    }}
                  >
                    {section.title}
                  </div>
                ))}

                {results.classes?.map(cls => (
                  <div
                    key={cls._id}
                    className="search-item"
                    onClick={() => {
                        navigate(`/classes/${cls._id}`);
                        setSearchOpen(false);
                        setSearchTerm("");
                        setShowDropdown(false);
                    }}
                  >
                    {cls.title}
                  </div>
                ))}

              </div>
            )}

          </div>

        </div>
      )}

      <div className={`mobile-drawer ${menuOpen ? "open" : ""}`}>

        <div className="drawer-content">
          <button
            className="drawer-close"
            onClick={() => setMenuOpen(false)}
          >
            <i className="bi bi-x-lg"></i>
          </button>

          <div
            className="drawer-item"
            onClick={() => {
              navigate("/dashboard");
              setMenuOpen(false);
            }}
          >
            <i className="bi bi-house"></i>
            <span>Inicio</span>
          </div>

          <div className="drawer-spacer"></div>
          <div className="drawer-user">
            <div className="user-avatar">
              {user?.name?.charAt(0).toUpperCase()}
            </div>
            <span>{user?.name}</span>
          </div>

          <div
            className="drawer-item logout"
            onClick={handleLogout}
          >
            <i className="bi bi-box-arrow-right"></i>
            <span>Cerrar sesión</span>
          </div>
        </div>
      </div>

      <main className="app-content">
        <Outlet />
      </main>

    </div>
  );
}

export default HeaderLayout;