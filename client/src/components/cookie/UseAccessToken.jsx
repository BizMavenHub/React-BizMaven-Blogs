import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";

import { deleteUserSuccess } from "../../redux/user/userSlice";

const UseAccessToken = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [hasAccessToken, setHasAccessToken] = useState(true);

  const cookies = Cookies.get();

  useEffect(() => {
    const token = cookies.access_token;
    const Url = location.pathname;

    console.log(token ? "true" : "false");

    if (!token) {
      setHasAccessToken(false);
      localStorage.clear();
      dispatch(deleteUserSuccess());
      if (Url === "/blogs" || Url === "/dashboard") {
        navigate("/login");
      }
    } else {
      setHasAccessToken(true);
    }
  }, []);

  return hasAccessToken;
};

export default UseAccessToken;
