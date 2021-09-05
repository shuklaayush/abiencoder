import React from "react";
import classnames from "classnames";

import "./Input.css";

interface InputProps {
  className?: string;
  onChange: (e: any) => void;
  type?: string;
  value: string;
  suggestions?: string[];
  placeholder?: string;
  name?: string;
  id?: string;
  invalid?: boolean;
}

const Input: React.FC<InputProps> = ({
  className,
  invalid,
  suggestions,
  ...props
}) => {
  const classNames = classnames(
    "input",
    {
      "input--invalid": invalid,
    },
    className
  );
  return (
    <>
      <input className={classNames} list="suggestions" {...props} />
      {suggestions && (
        <datalist id="suggestions">
          {suggestions.map((name) => (
            <option key={name} value={name} />
          ))}
        </datalist>
      )}
    </>
  );
};

export default Input;
