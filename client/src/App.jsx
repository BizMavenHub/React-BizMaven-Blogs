import { NavbarComponent, FooterComponent } from "./components/index";

import { BrowserRouter, Switch, Route } from "react-router-dom";

import {
  Homepage,
  SignUp_page,
  Login_page,
  About_us_page,
  Feedback_page,
  Contact_page,
  NotFound_page,
} from "./pages/index";

function App() {
  return (
    <BrowserRouter>
      <div className=" min-h-[100vh]">
        <NavbarComponent />
        <Switch>
          <Route path="/" exact component={Homepage} />
          <Route path="/sign-up" component={SignUp_page} />
          <Route path="/login" component={Login_page} />
          <Route path="/about-bizmaven-blog" component={About_us_page} />
          <Route path="/feedback" component={Feedback_page} />
          <Route path="/contact-us" component={Contact_page} />
          <Route path="*" component={NotFound_page} />
        </Switch>
        <FooterComponent />
      </div>
    </BrowserRouter>
  );
}

export default App;
