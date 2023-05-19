import useActive from "@/hooks/useActive";
import { useEffect } from "react";
import { BsX } from "react-icons/bs";

function PopUp({
  children,
  handlePopUpFalse = () => {},
  expanded = false,
  ...props
}: {
  children?: any;
  handlePopUpFalse: () => void;
  expanded?: boolean;
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


  if (expanded) {
    return (
      <div className="w-full h-screen bg-gray-800/50 fixed top-0 left-0 z-50 text-black grid grid-rows-1 place-items-center p-3">
        <div
          className={`w-full h-full bg-white rounded-md p-4 relative z-50 grid grid-rows-[auto_1fr] grid-cols-[100%] ${
            show ? "animate-zoomIn" : "animate-zoomOut"
          }`}
        >
          <button
            className="block ml-auto text-3xl p-1 border rounded-full outline-none transition-all text-black hover:bg-gray-100 active:bg-gray-500 active:text-white
            sm:text-base"
            onClick={popUpHanddle}
          >
            <BsX />
          </button>
          {children}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-screen bg-gray-800/50 fixed top-0 left-0 z-50 text-black grid grid-rows-1 place-items-center p-3">
      <div
        className={`max-w-lg max-h-[500px] bg-white rounded-md p-4 relative z-50 grid grid-rows-[auto_1fr] grid-cols-[100%] ${
          show ? "animate-zoomIn" : "animate-zoomOut"
        }`}
      >
        <button
          className="block ml-auto text-3xl p-1 border rounded-full outline-none transition-all text-black hover:bg-gray-100 active:bg-gray-500 active:text-white
          sm:text-base"
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
