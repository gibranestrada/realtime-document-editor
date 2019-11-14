import React, { useEffect } from "react";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { w3cwebsocket as W3CWebSocket } from "websocket";
import { Navbar, NavbarBrand } from "reactstrap";
import "./App.css";
import ShowEditorSection from "./components/EditorContainer";
import ShowLoginSection from "./components/LogInContainer";
import { websocket } from "./redux";
import { client } from "./redux";
import { userActivity, currentUsers, text } from "./redux";

const App = () => {
  const dispatch = useDispatch();
  const contentDefaultMessage = ["Start writing your document here"];
  const state = useSelector(state => state, shallowEqual);

  useEffect(() => {
    const clients = new W3CWebSocket(
      "ws://localhost:4000"
    );
    clients.onopen = () => {
      console.log("WebSocket Client Connected");
      dispatch(client({ client: clients }));
      dispatch(websocket({ websocketConnected: true }));
    };
  }, [dispatch]);

  useEffect(() => {
    if (!state.logInReducer) return;
    state.clientReducer.client.onmessage = message => {
      const dataFromServer = JSON.parse(message.data);
      const stateToChange = {};
      if (dataFromServer.type === "userevent") {
        if (dataFromServer.data.editorContent) {
          stateToChange.currentUsers = Object.values(dataFromServer.data.users);
          stateToChange.text = [dataFromServer.data.editorContent];
        } else {
          stateToChange.currentUsers = Object.values(dataFromServer.data.users);
          stateToChange.text = state.textReducer.length
            ? [state.textReducer]
            : contentDefaultMessage;
        }
      } else if (dataFromServer.type === "contentchange") {
        stateToChange.text =
          [dataFromServer.data.editorContent] || contentDefaultMessage;
        return dispatch(text({ ...stateToChange.text }));
      }
      stateToChange.userActivity = dataFromServer.data.userActivity;
      dispatch(currentUsers({ ...stateToChange.currentUsers }));
      dispatch(userActivity({ ...stateToChange.userActivity }));
      dispatch(text({ ...stateToChange.text }));
    };
  });

  return (
    <>
      <Navbar color="light" light>
        {state.logInReducer != null ? (
          <NavbarBrand href="/">Exit document editor</NavbarBrand>
        ) : (
          <NavbarBrand href="/">Real-time document editor</NavbarBrand>
        )}
      </Navbar>
      <div className="container-fluid">
        {state.logInReducer != null ? (
          <ShowEditorSection />
        ) : (
          <ShowLoginSection />
        )}
      </div>
    </>
  );
};

export default App;
