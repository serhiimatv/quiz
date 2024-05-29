import { FC } from "react";
import Button from "../../../ui/Button";
import store from "../store/componentsStore";
import { QuestionType } from "../models";

interface IProps {
  id: string;
  choices: string[];
  correctAnswers: string[];
  type: QuestionType;
}

const QuestionAnswer: FC<IProps> = ({ id, choices, correctAnswers, type }) => {
  return (
    <>
      <fieldset className="mt-3">
        Виберіть яка відповідь буде правильною:
        {choices.map((item) => (
          <div key={item} className="mt-2">
            <input
              type="radio"
              id={item}
              name="question"
              checked={item === correctAnswers[0] ? true : false}
              onChange={(e) => {
                store.changeAnswer(id, e.target.id);
              }}
            />
            <label className="ml-2" htmlFor={item}>
              {item}
            </label>
            {type !== "boolean" && (
              <Button
                data-answer={item}
                title="Видалити"
                color="purple"
                className="ml-4"
                onClick={(e) => {
                  const answer = (e.target as Element).getAttribute(
                    "data-answer"
                  );
                  if (answer) {
                    store.removeAnswer(id, answer);
                  }
                }}
              />
            )}
          </div>
        ))}
      </fieldset>
    </>
  );
};

export default QuestionAnswer;
