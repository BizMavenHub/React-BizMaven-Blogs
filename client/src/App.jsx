import { NavbarComponent, FooterComponent } from "./components/index";

import { BrowserRouter, Switch, Route } from "react-router-dom";

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
        <Switch>
          <Route path="/" exact component={Homepage} />
          <Route path="/sign-up" component={SignUp_page} />
          <Route path="/login" component={Login_page} />
          <Route path="/about-us" component={About_us_page} />
          <Route path="*" component={Homepage} />
        </Switch>
        <FooterComponent />
      </div>
    </BrowserRouter>
  );
}

export default App;
