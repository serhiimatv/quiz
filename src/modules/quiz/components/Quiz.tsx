import { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { type Topic } from "../models";
import QuizQuestion from "./QuizQuestion";

const Quiz: FC = () => {
  const quiz = localStorage.getItem("quiz");
  const params = useParams();

  const [topic, setTopic] = useState<Topic>();

  const [questionCount, setQuestionCount] = useState(0);

  const [score, setScore] = useState(0);

  const rightAnswer = () => {
    setScore(score + 1);
  };

  const nextQuestion = () => {
    if (topic) {
      setQuestionCount(questionCount + 1);
    }
  };

  useEffect(() => {
    if (quiz) {
      const existTopics: Topic[] = JSON.parse(quiz);

      const neededTopic = existTopics.find((item) => item.topic === params.id);

      if (neededTopic) {
        setTopic(neededTopic);
      }
    }
  }, []);

  return (
    <>
      {topic === undefined && <div>такої вікторини не існує</div>}
      {topic && (
        <>
          <div>Вікторина: {topic.topic}</div>
          {topic.questions.length > questionCount ? (
            <QuizQuestion
              {...topic.questions[questionCount]}
              rightAnswer={rightAnswer}
              nextQuestion={nextQuestion}
            />
          ) : (
            <div className="flex items-center justify-center mt-12">
              <div className="relative flex flex-col w-full max-w-[48rem] rounded-xl bg-white bg-clip-border text-gray-700 shadow-md">
                <div className="p-6">
                  <h4 className="mb-2 block font-sans text-2xl text-center font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased">
                    Ви відповіли на {score} из {topic?.questions.length} питань
                  </h4>
                </div>
              </div>
            </div>
          )}
        </>
      )}
      {/* {questionCount >= topic?.questions.length && (
        <div className="flex items-center justify-center mt-12">
          <div className="relative flex flex-col w-full max-w-[48rem] rounded-xl bg-white bg-clip-border text-gray-700 shadow-md">
            <div className="p-6">
              <h4 className="mb-2 block font-sans text-2xl text-center font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased">
                Ви відповіли на {score} из {topic?.questions.length} питань
              </h4>
            </div>
          </div>
        </div>
      )} */}
    </>
  );
};

export default Quiz;
