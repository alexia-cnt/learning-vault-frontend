import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import { Link } from "react-router-dom";
import "../styles/layout.css";
import { useContext } from "react";
import { SearchContext } from "../context/SearchContext";

function Dashboard() {
  const navigate = useNavigate();
  const [boards, setBoards] = useState([]);
  const [newBoard, setNewBoard] = useState("");
  const { searchTerm } = useContext(SearchContext);
  const [boardsVisibility, setBoardsVisibility] = useState({});

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/");
      return;
    }

    fetchBoards();
  }, [navigate]);

  const fetchBoards = async () => {
    try {
      const res = await api.get("/boards");
      setBoards(res.data);
    } catch (error) {
      console.error("Error cargando tableros:", error);
    }
  };

  const handleCreateBoard = async () => {
    if (!newBoard.trim()) return;

    try {
      await api.post("/boards", { title: newBoard });
      setNewBoard("");
      fetchBoards();
    } catch (error) {
      console.error("Error al crear un tablero:", error);
    }
  };

  const handleDeleteBoard = async (boardId) => {
    const confirmDelete = window.confirm(
      "¿Seguro que quieres eliminar este tablero? Esta acción no se puede deshacer."
    );

    if (!confirmDelete) return;

    try {
      await api.delete(`/boards/${boardId}`);
      fetchBoards();
    } 
    catch (error) {
      console.error("Error eliminando tablero:", error);
    }
  };

  const filteredBoards = boards.filter(board =>
    board.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleVisibility = (id) => {
    setBoardsVisibility((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  return (
    <div className="app-section-container">
        
        <div>
          <h1 className="dashboard-title">Tableros</h1>

          <h2>Crear nuevo tablero</h2>

          <input
            type="text"
            placeholder="Nombre del tablero"
            value={newBoard}
            onChange={(e) => setNewBoard(e.target.value)}
          />

          <button className="primary-button" onClick={handleCreateBoard}>
            Crear
          </button>

          <h2>Mis tableros</h2>

          {boards.length === 0 ? (
            <p>Aún no tenes tableros.</p>
          ) : (
            <ul>
              {filteredBoards.map((board) => (
                <li key={board._id} className="list-item">
                  <Link to={`/boards/${board._id}`} className="item-title">
                    {board.title}
                  </Link>

                  <div className="item-actions">
                    <i
                      className={`bi ${boardsVisibility[board._id] ? "bi-unlock" : "bi-lock"} visibility-icon`}
                      onClick={() => toggleVisibility(board._id)}
                    ></i>
                    <i className="bi bi-pencil icon"></i>
                    <i className="bi bi-trash icon delete" onClick={() => handleDeleteBoard(board._id)}></i>
                  </div>
              </li>
              ))}
            </ul>
          )}
        </div>

    </div>
  );
}

export default Dashboard;