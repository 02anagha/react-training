import { useEffect, useRef } from "react";

function Input({ label, id, isRef, ...props }) {

  const focusRef = useRef(null)
  useEffect(() => {
    if(isRef === true) {
      focusRef.current.focus()
    }
    
  }, [])

  return (
    <p className="control">
      <label htmlFor={id}>{label}</label>
      {isRef===true && <input id={id} name={id} required {...props} ref={focusRef} />}
      {!isRef && <input id={id} name={id} required {...props} />}      
    </p>
  );
}

export default Input