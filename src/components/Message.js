import React from "react";
import PropTypes from "prop-types";

function Message({ message }) {
  return (
    <div
      className={`alert alert-${
        message.error ? "danger" : "success"
      } alert-dismissible fade show`}
      role="alert"
    >
      <strong>{message.message}</strong>
      <button
        type="button"
        className="close"
        data-dismiss="alert"
        aria-label="Close"
      >
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
  );
}

Message.propTypes = {
  message: PropTypes.object.isRequired
};

export default Message;
