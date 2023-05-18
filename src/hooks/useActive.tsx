import { useState } from "react";

function useActive(state: boolean = false) {
  const [active, setActive] = useState(state);

  const handleToggle = () => setActive(!active);
  const handleFalse = () => setActive(false);
  const handleTrue = () => setActive(true);

  return { active, handleToggle, handleFalse, handleTrue };
}

export default useActive;