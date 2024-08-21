import React, { useState, useEffect } from "react";
import { CookiesProvider } from "react-cookie";

import {
  NavbarComponent,
  FooterComponent,
  PrivateRoute,
  OnlyIsAdminPrivateRoute,
} from "./components/index";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // Ensure BrowserRouter is imported as Router

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
  Career_Page,
  Post_page,
  UpdatePost_page,
  CreatePost_page,
  SearchPage,
  TermCondition,
  PrivacyPolicy,
} from "./pages/index";

import UseAccessToken from "./components/cookie/UseAccessToken";

function App() {
  return (
    <Router>
      <CookiesProvider>
        <div className="min-h-[100vh]">
          <NavbarComponent />
          <AppRoutes />
        </div>
      </CookiesProvider>
    </Router>
  );
}

function AppRoutes() {
  const hasAccessToken = UseAccessToken();

  return (
    <>
      {hasAccessToken && (
        <Routes>
          <Route path="/" element={<Blogs_page />} />
          <Route path="/sign-up" element={<SignUp_page />} />
          <Route path="/login" element={<Login_page />} />
          <Route path="/about-us" element={<About_us_page />} />
          <Route path="/feedback" element={<Feedback_page />} />
          <Route path="/contact-us" element={<Contact_page />} />
          <Route path="/career" element={<Career_Page />} />
          <Route path="/blogs" element={<Blogs_page />} />
          <Route path="/terms-and-conditions" element={<TermCondition />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route element={<PrivateRoute />}>
            <Route path="/dashboard" element={<Dashboard_page />} />
          </Route>
          <Route element={<OnlyIsAdminPrivateRoute />}>
            <Route path="/create-post" element={<CreatePost_page />} />
            <Route path="/update-post/:postId" element={<UpdatePost_page />} />
          </Route>
          <Route path="/post/:slug" element={<Post_page />} />
          <Route path="*" element={<NotFound_page />} />
        </Routes>
      )}

      {!hasAccessToken && (
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/blogs" element={<Blogs_page />} />
          <Route path="/sign-up" element={<SignUp_page />} />
          <Route path="/login" element={<Login_page />} />
          <Route path="/about-us" element={<About_us_page />} />
          <Route path="/feedback" element={<Feedback_page />} />
          <Route path="/terms-and-conditions" element={<TermCondition />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/contact-us" element={<Contact_page />} />
          <Route element={<PrivateRoute />}>
            <Route path="/dashboard" element={<Dashboard_page />} />
          </Route>
          <Route element={<OnlyIsAdminPrivateRoute />}>
            <Route path="/create-post" element={<CreatePost_page />} />
            <Route path="/update-post/:postId" element={<UpdatePost_page />} />
          </Route>
          <Route path="/career" element={<Career_Page />} />
          <Route path="/blogs" element={<Blogs_page />} />
          <Route path="/post/:slug" element={<Post_page />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="*" element={<NotFound_page />} />
        </Routes>
      )}
    </>
  );
}

export default App;
