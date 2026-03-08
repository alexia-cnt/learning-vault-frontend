import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/axios";
import "../styles/layout.css";
import "../styles/classes.css"
import { useContext } from "react";
import { SearchContext } from "../context/SearchContext";

function ClassDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { searchTerm } = useContext(SearchContext);

  const [blocks, setBlocks] = useState([]);
  const [newContent, setNewContent] = useState("");
  const [blockType, setBlockType] = useState("text");
  const [classItem, setClassItem] = useState(null);
  const [activeTab, setActiveTab] = useState("todo");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
      return;
    }

    fetchClass();
    fetchBlocks();
  }, [id]);

  const fetchBlocks = async () => {
    try {
      const res = await api.get(`/blocks/${id}`)
      setBlocks(res.data);
    } 
    catch (error) {
      console.error("Error cargando bloques:", error)
    }
  };

  const fetchClass = async () => {
    try {
      const res = await api.get(`/classes/detail/${id}`)
      setClassItem(res.data);
    } 
    catch (error) {
      console.error("Error cargando clase:", error)
    }
  };

  const handleCreateBlock = async () => {
    if (!newContent.trim()) return;

    try {
      await api.post("/blocks", {
        type: blockType,
        content: newContent,
        classId: id,
      });

      setNewContent("");
      fetchBlocks();
    } 
    catch (error) {
      console.error("Error creando bloque:", error)
    }
  };

  const handleDeleteBlock = async (blockId) => {
    const confirmDelete = window.confirm(
      "¿Eliminar esta nota?"
    );

    if (!confirmDelete) return;

    try {
      await api.delete(`/blocks/${blockId}`)
      fetchBlocks();
    } 
    catch (error) {
      console.error("Error eliminando bloque:", error)
    }
  };

  const search = searchTerm.toLowerCase();

  const filteredBlocks = blocks.filter((block) => {
    const content = block.content?.toLowerCase() || "";

    const matchesSearch = content.includes(search);

    const matchesTab =
      activeTab === "todo" ||
      (activeTab === "texto" && block.type === "text") ||
      (activeTab === "imagenes" && block.type === "image") ||
      (activeTab === "videos" && block.type === "link");

    return matchesSearch && matchesTab;
  });

  return (
    <div className="app-section-container">
  
      <div>
        <button className="icon-button" onClick={() => navigate(-1)}>
          <i className="bi bi-arrow-left"></i>
        </button>

        <h1 className="page-title">
          {classItem ? classItem.title : "Cargando..."}
        </h1>

        <h3>Agregar nueva nota</h3>

        <select
          value={blockType}
          onChange={(e) => setBlockType(e.target.value)}
        >
          <option value="text">Texto</option>
          <option value="link">Link</option>
          <option value="image">Imágen (URL)</option>
        </select>

        <br />

        <textarea
          rows="4"
          cols="50"
          placeholder="Escribí el contenido..."
          value={newContent}
          onChange={(e) => setNewContent(e.target.value)}
        />

        <br />

        <button className="primary-button" onClick={handleCreateBlock}>
          Agregar
        </button>

        <div className="section-divider"></div>

        <h3>Notas</h3>

        <div className="tabs-container">
          <button
            className={`tab-item ${activeTab === "todo" ? "active" : ""}`}
            onClick={() => setActiveTab("todo")}
          >
            Todo
          </button>

          <button
            className={`tab-item ${activeTab === "texto" ? "active" : ""}`}
            onClick={() => setActiveTab("texto")}
          >
            Texto
          </button>

          <button
            className={`tab-item ${activeTab === "imagenes" ? "active" : ""}`}
            onClick={() => setActiveTab("imagenes")}
          >
            Imágenes
          </button>

          <button
            className={`tab-item ${activeTab === "videos" ? "active" : ""}`}
            onClick={() => setActiveTab("videos")}
          >
            Videos
          </button>
        </div>

        {blocks.length === 0 ? (
          <p>Aún no hay contenido.</p>
        ) : (
          <div className="notes-grid">
            {filteredBlocks.map((block) => (
              <div key={block._id} className="note-card">

                <div className="note-content">
                  {block.type === "text" && <p>{block.content}</p>}

                  {block.type === "link" && (
                    <a href={block.content} target="_blank" rel="noreferrer">
                      {block.content}
                    </a>
                  )}

                  {block.type === "image" && (
                    <img
                      src={block.content}
                      alt="block"
                    />
                  )}
                </div>

                <div className="note-actions">
                  <i
                    className="bi bi-trash delete-icon"
                    onClick={() => handleDeleteBlock(block._id)}
                  ></i>
                </div>

              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}

export default ClassDetails;