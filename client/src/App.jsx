import { BrowserRouter, Routes, Route } from "react-router-dom";

import { NavbarComponent, FooterComponent } from "./components/index";
import {
  Homepage,
  SignUp_page,
  Login_page,
  About_us_page,
} from "./pages/index";

function App() {
  return (
    <BrowserRouter>
      <div className="bg-gradient-to-r from-[#11009E] to-[#6528F7] to-[#CF4DCE] min-h-[100vh]">
        <NavbarComponent />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/sign-up" element={<SignUp_page />} />
          <Route path="/login" element={<Login_page />} />
          <Route path="/about-us" element={<About_us_page />} />
        </Routes>
        <FooterComponent />
      </div>
    </BrowserRouter>
  );
}

export default App;
