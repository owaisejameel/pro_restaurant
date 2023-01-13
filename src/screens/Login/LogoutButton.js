import React from "react";
import { GoogleLogout } from "react-google-login";
import { useNavigate } from "react-router-dom";

const LogoutButton = () => {
  const clientId =
    "244218418002-j5d2f1j88fc0p1nrjqriuj6k6evpclgr.apps.googleusercontent.com";
  const navigate = useNavigate();

  const onSuccess = (res) => {
    console.log("success:", res);
    navigate("/");
  };
  return (
    <div>
      <GoogleLogout
        clientId={clientId}
        onLogoutSuccess={onSuccess}
        buttonText={"Logout"}
      />
    </div>
  );
};

export default LogoutButton;
