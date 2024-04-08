import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Homepage, SignUp_page, Login_page } from "./pages/index";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/sign-up" element={<SignUp_page />} />
        <Route path="/login" element={<Login_page />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
