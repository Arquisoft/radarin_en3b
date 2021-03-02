import React from 'react';
import { SessionProvider, LoginButton, Dashboard, LogoutButton } from "@inrupt/solid-ui-react";
function ProviderWithHook() {

    const [idp, setIdp] = React.useState("https://inrupt.net");
  
  
    return (
  
      <SessionProvider sessionId="session-provider-example" onError={console.log}>
        <input type="url" value={idp} onChange={(e) => setIdp(e.target.value)} />
        <LoginButton
  
          oidcIssuer={idp}
  
          redirectUrl={window.location.href}
  
          onError={console.log}
  
        />
        <LogoutButton onError={console.log} />
  
  
        <Dashboard />
  
      </SessionProvider>
  
    );
  
  }