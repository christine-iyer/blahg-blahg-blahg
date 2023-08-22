import React from 'react';
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";

const Trigger = ({ triggerText, buttonRef, showModal }) => {
  return (
    <button
      className="btn btn-lg btn-danger center modal-button"
      ref={buttonRef}
      onClick={showModal}
    >
      <ChatBubbleOutlineIcon />
    </button>
  );
};
export default Trigger;