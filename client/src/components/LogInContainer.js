import React, { useRef } from "react";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { setUsername } from "../redux";
import Blockies from 'react-blockies';

const ShowLoginSection = () => {
  const state = useSelector(state => state, shallowEqual);
  const dispatch = useDispatch();
  const inputEl = useRef(null);

  const logInUser = e => {
    const username = inputEl.current.value.replace(/ /g, "");
    const data = username;

    if (!state.websocketReducer.websocketConnected) {
      return e.preventDefault();
    }
    dispatch(setUsername(data));
    state.clientReducer.client.send(
      JSON.stringify({
        username: data,
        type: "userevent"
      })
    );
    e.preventDefault();
  };

  return (
    <div className="account">
      <div className="account__wrapper">
        <div className="account__card">
          <div className="account__profile">
            <Blockies
              className="account__avatar identicon"
              size={10}
              scale={10}
              seed="randomness"
            />
            {!state.websocketReducer.websocketConnected ? (
              <p className="text-center">
                Connecting to server. Please wait...
              </p>
            ) : (
              <>
                <p className="account__name">Hello, user!</p>
                <p className="account__sub">Join to edit the document</p>
              </>
            )}
          </div>

          <form onSubmit={logInUser}>
            <input
              name="username"
              type="text"
              title="No special characters and less than 16 characters"
              pattern="[\sA-Za-z0-9\s]{1,15}"
              ref={inputEl}
              className="form-control"
              required
            />
            <input type="submit" className="btn account__btn" value="Join" />
          </form>
        </div>
      </div>
    </div>
  );
};
export default ShowLoginSection;
