import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const UseAccessToken = () => {
  const navigate = useNavigate();

  const [hasAccessToken, setHasAccessToken] = useState(true);

  useEffect(() => {
    const token = Cookies.get("access_token") ? true : false;

    if (token) {
      setHasAccessToken(true);
    } else {
      setHasAccessToken(false);
      clearUserData();
    }
  }, [navigate]);

  return hasAccessToken;
};

function clearUserData() {
  const hasCurrentUser = localStorage.getItem("persist:root") ? true : false;

  if (hasCurrentUser) {
    localStorage.clear();
  } else {
    console.log("No current user found, nothing to clear.");
  }
}

export default UseAccessToken;
