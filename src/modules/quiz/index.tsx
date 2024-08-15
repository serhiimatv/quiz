import { FC } from "react";
import { Link, Outlet } from "react-router-dom";

const RootQuiz: FC = () => {
  return (
    <>
      <h1 className="mb-6 text-3xl font-bold">Вікторина</h1>
      <div>
        <nav>
          <ul className="flex gap-2">
            <li className="text-lg text-purple-500 underline cursor-pointer">
              <Link to="/">Вибрати вікторину</Link>
            </li>
            <li className="text-lg text-purple-500 underline cursor-pointer">
              <Link to="/create">Створити свою</Link>
            </li>
          </ul>
        </nav>
      </div>
      <Outlet />
    </>
  );
};

export default RootQuiz;
