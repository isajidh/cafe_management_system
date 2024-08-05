import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Container } from "@material-ui/core";
import NavBar from "./components/common/NavBar";
import Cafes from "./pages/Cafes";
import Employees from "./pages/Employees";

function App() {
  return (
    <Router>
      <NavBar />
      <Container>
        <Routes>
          <Route path="/cafes" element={<Cafes />} />
          <Route path="/employees" element={<Employees />} />
          <Route index path="/" exact element={<Cafes />} />{" "}
          {/* Default Route */}
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
