import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/axios";
import { Link } from "react-router-dom";
import "../styles/layout.css";


function SectionDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [classes, setClasses] = useState([]);
  const [newClass, setNewClass] = useState("");
  const [section, setSection] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/");
      return;
    }

    fetchSection();
    fetchClasses();
  }, [id]);

  const fetchClasses = async () => {
    try {
      const res = await api.get(`/classes/section/${id}`);
      setClasses(res.data);
    } 
    catch (error) {
      console.error("Error cargando clases:", error)
    }
  };

  const fetchSection = async () => {
    try {
      const res = await api.get(`/sections/detail/${id}`);
      setSection(res.data);
    } 
    catch (error) {
      console.error("Error cargando sección:", error);
    }
  };

  const handleCreateClass = async () => {
    if (!newClass.trim()) return;

    try {
      await api.post("/classes", {
        title: newClass,
        sectionId: id,
      });

      setNewClass("");
      fetchClasses();
    } 
    catch (error) {
      console.error("Error al crear la clase:", error)
    }
  };

  const handleDeleteClass = async (classId) => {
    const confirmDelete = window.confirm(
      "¿Seguro que quieres eliminar esta clase? Se perderán todas sus notas."
    );

    if (!confirmDelete) return;

    try {
      await api.delete(`/classes/${classId}`);
      fetchClasses();
    } 
    catch (error) {
      console.error("Error eliminando clase:", error);
    }
  };

  return (
    <div className="app-section-container">
      
      <div>
          <button className="icon-button" onClick={() => navigate(-1)}>
            <i className="bi bi-arrow-left"></i>
          </button>

          <h1 className="page-title">
            {section ? section.title : "Cargando..."}
          </h1>

          <h2>Crear nueva clase</h2>

          <input
              type="text"
              placeholder="Nombre de la clase"
              value={newClass}
              onChange={(e) => setNewClass(e.target.value)}
          />

          <button className="primary-button" onClick={handleCreateClass}>
              Crear
          </button>

          <h2>Clases</h2>

          {classes.length === 0 ? (
              <p>Aún no hay clases.</p>
          ) : (
              <ul>
              {classes.map((classItem) => (
                  <li key={classItem._id} className="list-item">
                    <Link
                      to={`/classes/${classItem._id}`}
                      className="item-title"
                    >
                      {classItem.title}
                    </Link>

                    <div className="item-actions">
                      <i className="bi bi-pencil icon"></i>
                      <i className="bi bi-trash icon delete" onClick={() => handleDeleteClass(classItem._id)}></i>
                    </div>
                  </li>
                ))}
              </ul>
            )}
      </div>

    </div>
  );
}

export default SectionDetails;