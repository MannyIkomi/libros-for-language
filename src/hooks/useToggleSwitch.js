import { useState } from "react"

export const useToggleSwitch = (defaultValue = false) => {
  const [isToggled, setToggle] = useState(defaultValue)

  function handleToggle(e) {
    setToggle(!isToggled)
  }

  return [isToggled, handleToggle]
}

export default useToggleSwitch
