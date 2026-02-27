import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import BoardDetails from "./pages/BoardDetails";
import SectionDetails from "./pages/SectionDetails";
import ClassDetails from "./pages/ClassDetails";
import HeaderLayout from "./layouts/HeaderLayout";

function App() {
  return (
    <Routes>

      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route element={<HeaderLayout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/boards/:id" element={<BoardDetails />} />
        <Route path="/sections/:id" element={<SectionDetails />} />
        <Route path="/classes/:id" element={<ClassDetails />} />
      </Route>

    </Routes>
  );
}

export default App;