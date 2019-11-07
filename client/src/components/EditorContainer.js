import React from "react";
import { useSelector, shallowEqual } from "react-redux";
import { UncontrolledTooltip } from "reactstrap";
import Editor from "react-medium-editor";
import "medium-editor/dist/css/medium-editor.css";
import "medium-editor/dist/css/themes/default.css";
import Blockies from 'react-blockies';



const ShowEditorSection = () => {
  const state = useSelector(state => state, shallowEqual);
  const contentDefaultMessage = "Start writing your document here";

  /* When content changes, we send the
current content of the editor to the server. */
  const onEditorStateChange = text => {
    state.clientReducer.client.send(
      JSON.stringify({
        type: "contentchange",
        username: state.logInReducer.username,
        content: text
      })
    );
  };

  return (
    <div className="main-content">
      <div className="row">
        <div className="col-md-7 order-last order-md-first">
          <div className="document-holder">
            <div className="currentusers">
              {Object.entries(state.currentUsersReducer.currentUsers).map(
                (user, index) => (
                  <React.Fragment key={user[1].username + `${index}`}>
                    <span id={`Hi${user[1].username}`} className="userInfo">
                      <Blockies
                        className="account__avatar identicon"
                       // style={{ backgroundColor: user[1].randomcolor }}
                        size={5}
                        scale={8}
                        seed={user[1].username}
                      />
                    </span>
                    <UncontrolledTooltip
                      placement="top"
                      target={`Hi${user[1].username}`}
                    >
                      {user[1].username}
                    </UncontrolledTooltip>
                  </React.Fragment>
                )
              )}
            </div>
            <Editor
              options={{
                placeholder: {
                  text: state.textReducer ? contentDefaultMessage : ""
                },
                toolbar: { buttons: ["bold", "italic", "underline"] }
              }}
              className="body-editor h-75 unique_and_mandatory_class_name"
              text={state.textReducer}
              onChange={onEditorStateChange}
            />
          </div>
        </div>
        <div className="col-md-5 order-first order-md-first">
          <div className="history-holder">
            {/*console.log(state.userActivityReducer) */}
            <ul>
              {Object.entries(state.userActivityReducer.userActivity).map(
                (activity, index) => {
                  return <li key={`activity-${index}`}>{activity[1]}</li>;
                }
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowEditorSection;
