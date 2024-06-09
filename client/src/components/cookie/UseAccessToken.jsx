import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const UseAccessToken = () => {
  const navigate = useNavigate();

  const [hasAccessToken, setHasAccessToken] = useState(true);

  useEffect(() => {
    const token = Cookies.get("access_token");
    if (!token) {
      setHasAccessToken(false);

      const isHasUser = localStorage.getItem("persist:root") ? true : false;

      localStorage.clear();

      if (isHasUser) {
        window.location.reload();
      }

      localStorage.clear();
      navigate("/login");
    }
  }, [navigate]);

  return hasAccessToken;
};

export default UseAccessToken;
