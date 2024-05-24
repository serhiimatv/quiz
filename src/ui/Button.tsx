import { ButtonHTMLAttributes, FC } from "react";

const colorSchema = {
  default:
    "text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-2 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700",
  alternative:
    "py-2.5 px-2 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700",
  green:
    "text-white bg-green-700 hover:bg-green-800 font-medium rounded-lg text-sm px-2 py-2.5 dark:bg-green-600 dark:hover:bg-green-700",
  purple:
    "text-white bg-purple-700 hover:bg-purple-800 font-medium rounded-lg text-sm px-2 py-2.5 dark:bg-purple-600 dark:hover:bg-purple-700",
};

interface IButton extends ButtonHTMLAttributes<HTMLButtonElement> {
  title: string;
  color: "default" | "alternative" | "green" | "purple";
  className?: string;
}

const Button: FC<IButton> = ({ title, color, className, ...props }) => {
  return (
    <button className={colorSchema[color] + " " + className} {...props}>
      {title}
    </button>
  );
};

export default Button;
