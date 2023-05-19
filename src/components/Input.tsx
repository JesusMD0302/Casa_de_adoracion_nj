import { ReactElement } from "react";

interface InputProps {
  type: string;
  labelText: string;
  name: string;
  placeholder?: string;
}

interface TextAreaProps {
  textArea: boolean;
  labelText: string;
  name: string;
  placeholder?: string;
}

function Input(props: {
  type: string;
  labelText: string;
  inputName: string;
  placeholder?: string;
}): ReactElement;
function Input(props: {
  textArea: boolean;
  labelText: string;
  inputName: string;
  placeholder?: string;
}): ReactElement;
function Input(props: any): ReactElement {
  if (props.textArea) {
    return (
      <div className="grid grid-rows-[auto_1fr]">
        <label className="text-sm" htmlFor={props.name}>
          {props.labelText}
        </label>
        <textarea
          name={props.inputName}
          id={props.inputName}
          cols={30}
          rows={6}
          className="border rounded text-xs py-2 px-2 outline-none resize-none"
          placeholder={props.placeholder}
        ></textarea>
      </div>
    );
  }

  return (
    <div className="grid grid-rows-[auto_1fr]">
      <label className="text-sm" htmlFor={props.inputName}>
        {props.labelText}
      </label>
      <input
        type={props.type}
        name={props.inputName}
        id={props.inputName}
        className="border rounded text-xs py-2 px-2 outline-none"
        placeholder={props.placeholder}
      />
    </div>
  );
}

export default Input;
