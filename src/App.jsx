import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import BoardDetails from "./pages/BoardDetails";
import SectionDetails from "./pages/SectionDetails";
import ClassDetails from "./pages/ClassDetails";
import HeaderLayout from "./layouts/HeaderLayout";
import { useState, useEffect } from "react";
import Social from "./pages/Social";

function App() {

  const [theme, setTheme] = useState(
    localStorage.getItem("theme") || "dark"
  );

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);


  return (
    <Routes>

      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route element={<HeaderLayout theme={theme} setTheme={setTheme} />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/boards/:id" element={<BoardDetails />} />
        <Route path="/sections/:id" element={<SectionDetails />} />
        <Route path="/classes/:id" element={<ClassDetails />} />
        <Route path="/social" element={<Social />} />
      </Route>

    </Routes>
  );
}

export default App;