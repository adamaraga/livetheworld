// import closeIcon from "../../images/svg/times.svg";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Modal = ({
  children,
  width,
  title,
  // close,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [opened, setOpened] = useState(false);

  const user = useSelector((state) => state.auth.user);
  console.log("user", user);

  const mainShowModal = showModal;

  useEffect(() => {
    if (user) {
      setShowModal(false);
    } else {
      setOpened(true);
      setShowModal(true);
    }
  }, [user]);

  return (
    <div className="modal">
      <div
        className={
          mainShowModal
            ? "modal__con open"
            : opened
            ? "modal__con open close"
            : "modal__con"
        }
      >
        <div className="modal__background">
          <div style={{ width }} className="modal__content">
            <div className="modal__content__main">{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
