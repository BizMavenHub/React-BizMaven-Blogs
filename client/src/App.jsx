import { BrowserRouter, Routes, Route } from "react-router-dom";

import {
  Homepage,
  SignUp_page,
  Login_page,
  About_us_page,
} from "./pages/index";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/sign-up" element={<SignUp_page />} />
        <Route path="/login" element={<Login_page />} />
        <Route path="/about-us" element={<About_us_page />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
