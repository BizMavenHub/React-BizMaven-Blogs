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

    if (!token) {
      setHasAccessToken(false);
      localStorage.clear();
      dispatch(deleteUserSuccess());
      if (Url === "/blogs" || Url === "/dashboard") {
        navigate("/login");
      }
    } else {
      Cookies.set("access_token", token, {
        expires: new Date(new Date().getTime() + 1000 * 60 * 60 * 24 * 30), // 1 month
        secure: true,
        sameSite: "none",
        domain: ".insightloop.blog",
      });
      setHasAccessToken(true);
    }
  }, [cookies]);

  return hasAccessToken;
};

export default UseAccessToken;
