import { FC, InputHTMLAttributes } from "react";

interface IInput extends InputHTMLAttributes<HTMLInputElement> {
  placeholder: string;
}

const Input: FC<IInput> = ({ placeholder, ...props }) => {
  return <input type="text" {...props} />;
};
