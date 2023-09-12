import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import SignUpPage from "./Components/SignUpPage";
import HomePage from "./Components/HomePage";

function App() {
  return (
    <Router>
        <Routes>
          <Route path="/" element={ <SignUpPage/> } />
        </Routes>
        <Routes>
          <Route path="/dashboard" element={<HomePage/>} />
        </Routes>
    </Router>
  );
}

export default App;
