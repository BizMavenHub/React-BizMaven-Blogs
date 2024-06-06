import {
  NavbarComponent,
  FooterComponent,
  PrivateRoute,
  OnlyIsAdminPrivateRoute,
} from "./components/index";

import { BrowserRouter, Routes, Route, redirect } from "react-router-dom";
import { useState, useEffect } from "react";

import Cookies from "js-cookie";

import {
  Homepage,
  SignUp_page,
  Login_page,
  About_us_page,
  Feedback_page,
  Contact_page,
  NotFound_page,
  Blogs_page,
  Dashboard_page,
  Post_page,
  UpdatePost_page,
  CreatePost_page,
} from "./pages/index";

function App() {
  const [hasCookie, setHasCookie] = useState(false);

  useEffect(() => {
    checkCookie();

    if (hasCookie) {
      return;
    }

    localStorage.clear();
    redirect("/login");
  }, []);

  const checkCookie = () => {
    const token = Cookies.get("access_token");

    if (token) {
      setHasCookie(true);
    } else {
      setHasCookie(false);
    }
  };

  return (
    <>
      <BrowserRouter>
        <div className=" min-h-[100vh]">
          <NavbarComponent />
          <Routes>
            <Route path="/" exact element={<Homepage />} />
            <Route path="/sign-up" element={<SignUp_page />} />
            <Route path="/login" element={<Login_page />} />
            <Route path="/about-us" element={<About_us_page />} />
            <Route path="/feedback" element={<Feedback_page />} />
            <Route path="/contact-us" element={<Contact_page />} />
            <Route path="/blogs" element={<Blogs_page />} />

            <Route element={<PrivateRoute />}>
              <Route path="/dashboard" element={<Dashboard_page />} />
            </Route>

            <Route element={<OnlyIsAdminPrivateRoute />}>
              <Route path="/create-post" element={<CreatePost_page />} />
              <Route
                path="/update-post/:postId"
                element={<UpdatePost_page />}
              />
            </Route>

            <Route path="/post/:slug" element={<Post_page />} />

            <Route path="*" element={<NotFound_page />} />
          </Routes>
          <FooterComponent />
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
