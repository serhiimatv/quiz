import { ChangeEvent, FC, useState } from "react";
import { type Question } from "../models";
import Button from "../../../ui/Button";
import { v4 } from "uuid";

interface IProp extends Question {
  rightAnswer: () => void;
  nextQuestion: () => void;
}

const QuizQuestion: FC<IProp> = ({
  question,
  choices,
  correctAnswers,
  type,
  rightAnswer,
  nextQuestion,
}) => {
  const [single, setSingle] = useState<string>("");

  const [multiple, setMultiple] = useState<string[]>([]);

  const singleChoiceHandler = (e: ChangeEvent) => {
    setSingle(e.target.id);
  };

  const multipleChoiceHandler = (e: ChangeEvent) => {
    const addedAnswer = multiple.find((item) => item === e.target.id);
    if (!addedAnswer) {
      setMultiple([...multiple, e.target.id]);
    } else {
      setMultiple(multiple.filter((item) => item !== e.target.id));
    }
  };

  const selectAnswerHandler = () => {
    if (type === "boolean" || type === "single") {
      if (single === correctAnswers[0]) {
        rightAnswer();
      }
    }
    if (type === "multiple") {
      let rightCount = 0;
      multiple.forEach((item) => {
        if (correctAnswers.find((answer) => item === answer)) {
          rightCount = rightCount + 1;
        }
      });
      if (rightCount === correctAnswers.length) {
        rightAnswer();
      }
    }

    nextQuestion();
    setSingle("");
    setMultiple([]);
  };

  return (
    <>
      <div className="flex items-center justify-center mt-12">
        <div className="relative flex flex-col w-full max-w-[48rem] rounded-xl bg-white bg-clip-border text-gray-700 shadow-md">
          <div className="p-6">
            <h4 className="mb-2 block font-sans text-2xl font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased">
              {question}
            </h4>
          </div>
          <div className="p-6 mb-8 block font-sans text-base font-normal leading-relaxed text-gray-700 antialiased">
            <fieldset>
              {type === "boolean" || type === "single"
                ? choices.map((item) => {
                    return (
                      <div key={v4()} className="mt-2">
                        <input
                          type="radio"
                          id={item}
                          name={item}
                          onChange={singleChoiceHandler}
                          checked={single === item}
                        />
                        <label className="ml-2" htmlFor={item}>
                          {item}
                        </label>
                      </div>
                    );
                  })
                : choices.map((item) => {
                    return (
                      <div className="mt-2" key={v4()}>
                        <input
                          type="checkbox"
                          id={item}
                          name={item}
                          onChange={multipleChoiceHandler}
                          checked={Boolean(
                            multiple.find((answer) => answer === item)
                          )}
                        />
                        <label className="ml-2" htmlFor={item}>
                          {item}
                        </label>
                      </div>
                    );
                  })}
              <Button
                title="Вибрати"
                color="purple"
                className="mt-2"
                onClick={selectAnswerHandler}
              />
            </fieldset>
          </div>
        </div>
      </div>
    </>
  );
};

export default QuizQuestion;
