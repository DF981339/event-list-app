import Eventlist from "./components/Eventlist";
import Header from "./components/Header";
import Login from "./components/Login";
import Signup from "./components/Signup";
import { Routes, Route } from "react-router-dom";
import { createGlobalStyle } from "styled-components";
import ProtectedRoutes from "./ProtectedRoutes";

function App() {
  return (
    <div>
      <GlobalStyle />
      <Header />
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/signup" element={<Signup />} />
        <Route element={<ProtectedRoutes />}>
          <Route exact path="/eventlist" element={<Eventlist />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }
`;
