import React, {useEffect, useState} from 'react';
import { LoginButton, Dashboard, LogoutButton } from "@inrupt/solid-ui-react";
function LoginPage() {

    const [idp, setIdp] = useState("https://inrupt.net");
  
  
    return (
  
      <React.Fragment>
        <input type="url" value={idp} onChange={(e) => setIdp(e.target.value)} />
        <LoginButton
  
          oidcIssuer={idp}
  
          redirectUrl={window.location.href}
  
          onError={console.log}
  
        />
        <LogoutButton onError={console.log} />
        {/* <Dashboard /> */}
      </React.Fragment>
  
    );
  
  }
  export default LoginPage;