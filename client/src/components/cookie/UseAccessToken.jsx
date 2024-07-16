import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";

import { deleteUserSuccess } from "../../redux/user/userSlice";

const UseAccessToken = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [hasAccessToken, setHasAccessToken] = useState(true);

  const cookies = Cookies.get();

  useEffect(() => {
    const token = cookies.access_token;

    if (!token) {
      setHasAccessToken(false);
      localStorage.clear();
      dispatch(deleteUserSuccess());
      navigate("/login");
    }
  }, []);

  return hasAccessToken;
};

export default UseAccessToken;
