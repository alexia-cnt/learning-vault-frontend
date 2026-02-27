import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/axios";
import { Link } from "react-router-dom";
import "../styles/layout.css";
import { useContext } from "react";
import { SearchContext } from "../context/SearchContext";


function BoardDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [sections, setSections] = useState([]);
  const [newSection, setNewSection] = useState("");
  const [board, setBoard] = useState(null);
  const { searchTerm } = useContext(SearchContext);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/");
      return;
    }

    fetchBoard();
    fetchSections();

  }, [id]);

  const fetchSections = async () => {
    try {
      const res = await api.get(`/sections/${id}`);
      setSections(res.data);
    } catch (error) {
      console.error("Error cargando secciones:", error);
    }
  };

  const fetchBoard = async () => {
    try {
      const res = await api.get(`/boards/${id}`);
      setBoard(res.data);
    }  
    catch (error) {
      console.error("Error cargando tablero:", error);
    }
  };

  const handleCreateSection = async () => {
    if (!newSection.trim()) return;

    try {
      await api.post("/sections", {
        title: newSection,
        boardId: id,
      });

      setNewSection("");
      fetchSections();
    } catch (error) {
      console.error("Error al crear la sección:", error);
    }
  };

  const handleDeleteSection = async (sectionId) => {
    const confirmDelete = window.confirm(
      "¿Seguro que quieres eliminar esta sección? También se eliminarán sus clases."
    );

    if (!confirmDelete) return;

    try {
      await api.delete(`/sections/${sectionId}`);
      fetchSections();
    } 
    catch (error) {
      console.error("Error eliminando sección:", error);
    }
  };

  const filteredSections = sections.filter(section =>
    section.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="app-section-container">
  
      <div>
          <button className="icon-button" onClick={() => navigate(-1)}>
            <i className="bi bi-arrow-left"></i>
          </button>

          <h1 className="page-title">
            {board ? board.title : "Cargando..."}
          </h1>

          <h2>Crear nueva sección</h2>

          <input
              type="text"
              placeholder="Nombre de la sección"
              value={newSection}
              onChange={(e) => setNewSection(e.target.value)}
          />

          <button className="primary-button" onClick={handleCreateSection}>
              Crear
          </button>

          <h2>Secciones</h2>

          {sections.length === 0 ? (
              <p>Aún no hay secciones.</p>
          ) : (
              <ul>
                {filteredSections.map((section) => (
                  <li key={section._id} className="list-item">
                    <Link
                      to={`/sections/${section._id}`}
                      className="item-title"
                    >
                      {section.title}
                    </Link>

                    <div className="item-actions">
                      <i className="bi bi-pencil icon"></i>
                      <i className="bi bi-trash icon delete" onClick={() => handleDeleteSection(section._id)}></i>
                    </div>
                  </li>
                ))}
              </ul>
            )}
      </div>

    </div>
  );
}

export default BoardDetails;