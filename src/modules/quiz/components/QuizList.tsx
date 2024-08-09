import { FC, useEffect, useState } from "react";
import { type Topic } from "../models";
import { Link } from "react-router-dom";

const QuizList: FC = () => {
  const [topics, setTopics] = useState<Topic[]>([]);

  useEffect(() => {
    const string = localStorage.getItem("quiz");
    if (string) {
      setTopics(JSON.parse(string));
    }
  }, []);

  return (
    <>
      <div className="mt-7">
        <div className="px-4 sm:px-8 max-w-5xl m-auto">
          <h1 className="text-center font-semibold text-lg">
            Доступні вікторини
          </h1>
          {topics.length === 0 ? (
            <div className="text-lg text-center">
              В даний момент вікторин ще немає:{" "}
              <Link to="/create" className="text-purple-600">
                Додати
              </Link>
            </div>
          ) : (
            <ul className="border border-gray-200 rounded overflow-hidden shadow-md mt-4">
              {topics.map((item) => (
                <Link to={`/quiz/${item.topic}`} key={item.topic}>
                  <li
                    className="px-4 py-2 bg-white hover:bg-sky-100 hover:text-sky-900 border-b last:border-none 
                        border-gray-200 transition-all duration-300 ease-in-out cursor-pointer"
                  >
                    {item.topic}
                  </li>
                </Link>
              ))}
            </ul>
          )}
        </div>
      </div>
    </>
  );
};

export default QuizList;
