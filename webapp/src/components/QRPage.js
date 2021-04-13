import keypair from 'keypair';
import QRCode from 'react-qr-code';
import { useSession } from "@inrupt/solid-ui-react";
import "../css/QRPage.css";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { manageKeys, setPair } from '../redux/slices/keysSlice';

export default function QRPage() {
  const { session } = useSession();
  const { webId } = session.info;
  const dispatch = useDispatch();
  const status = useSelector(state => state.keys.status);
  const error = useSelector(state => state.keys.error);
  const lePair = useSelector(state => state.keys.pair);
  
  let content;

  useEffect(() => {
    if (status === "idle") {
      dispatch(setPair(keypair({ bits: 1024 })));
      dispatch(manageKeys(session));
    }
  });

  if (status === "loading" || status === "idle") {
    content = (
      <div className="spinner-border centerSpinner" role="status">
        <span className="sr-only">Loading...</span>
      </div>
    );

  } else if (status === "succeeded") {
    const privateKey = lePair.private;
    const vvalue = JSON.stringify({ webId, privateKey });
    content = <div className="centerMe"><QRCode
      level="Q"
      size={512}
      value={ vvalue }
    /></div>;

  } else if (status === "failed") {
    content = <div className="centerMe">{error}</div>;
    console.error(error);
  }

  return <div>{content}</div>;
}