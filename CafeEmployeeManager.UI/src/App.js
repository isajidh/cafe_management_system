import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Container } from "@material-ui/core";
import NavBar from "./components/common/NavBar";
import Cafes from "./pages/cafes/Cafes";
import Employees from "./pages/employees/Employees";

function App() {
  return (
    <Router>
      <NavBar />
      <Container>
        <Routes>
          <Route path="/cafes" element={<Cafes />} />
          <Route path="/employees" element={<Employees />} />
          <Route index path="/" exact element={<Cafes />} />{" "}
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
