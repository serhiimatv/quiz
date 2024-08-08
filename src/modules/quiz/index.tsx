import { FC } from "react";
import { Link, Route, Routes } from "react-router-dom";
import QuizList from "./components/QuizList";
import Topic from "./components/Topic";

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
      <Routes>
        <Route path="/" element={<QuizList />} />
        <Route path="/create" element={<Topic />} />
      </Routes>
    </>
  );
};

export default RootQuiz;
