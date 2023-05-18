import useActive from "@/hooks/useActive";
import { useState, useEffect } from "react";
import { BsX } from "react-icons/bs";

function PopUp({
  children,
  handlePopUpFalse = () => {},
  ...props
}: {
  children?: any;
  handlePopUpFalse: () => void;
}) {
  // const [show, setShow] = useState(true);
  const { active: show, handleFalse } = useActive(true);

  const popUpHanddle = () => {
    handleFalse();
  };

  useEffect(() => {
    if (!show) {
      setTimeout(() => {
        handlePopUpFalse();
      }, 500);
    }
  }, [handlePopUpFalse, show]);

  return (
    <div className="w-full h-screen bg-gray-800/50 fixed top-0 left-0 z-50 text-black grid place-items-center">
      <div
        className={`max-w-xl max-h-96 bg-white rounded-md p-4 relative z-50 ${
          show ? "animate-zoomIn" : "animate-zoomOut"
        }`}
      >
        <button
          className="block ml-auto p-1 border rounded-full outline-none transition-all text-black hover:bg-gray-100 active:bg-gray-500 active:text-white"
          onClick={popUpHanddle}
        >
          <BsX />
        </button>
        {children}
      </div>
    </div>
  );
}

export default PopUp;
