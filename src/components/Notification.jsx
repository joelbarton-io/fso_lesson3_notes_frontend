/* eslint-disable react/prop-types */
const Notification = ({ message }) => {
  return <>{message ? <div className="error">{message}</div> : null}</>;
};

export default Notification;
