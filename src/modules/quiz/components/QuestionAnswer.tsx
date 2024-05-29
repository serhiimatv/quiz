import { FC } from "react";
import Button from "../../../ui/Button";
import store from "../store/componentsStore";
import { QuestionType } from "../models";
import { observer } from "mobx-react-lite";

interface IProps {
  id: string;
  choices: string[];
  correctAnswers: string[];
  type: QuestionType;
}

const QuestionAnswer: FC<IProps> = observer(
  ({ id, choices, correctAnswers, type }) => {
    return (
      <>
        <fieldset className="mt-3">
          Виберіть{" "}
          {type === "multiple"
            ? "які відповіді будуть правильними"
            : "яка відповідь буде правильною"}{" "}
          :
          {type === "multiple" ? (
            <div className="mt-2">
              {choices.map((item) => {
                const radioId = item + "-" + new Date().getTime();

                return (
                  <div className="mt-2" key={radioId}>
                    <input
                      type="checkbox"
                      id={radioId}
                      name={id}
                      onChange={(e) => {
                        const index = e.target.id.indexOf("-");
                        const title = e.target.id.substring(0, index);

                        store.addMultipleAnswer(id, title);
                      }}
                      checked={
                        correctAnswers.find((answer) => answer === item)
                          ? true
                          : false
                      }
                    />
                    <label className="ml-2" htmlFor={radioId}>
                      {item}
                    </label>
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
                  </div>
                );
              })}
            </div>
          ) : (
            choices.map((item) => {
              const radioId = item + "-" + new Date().getTime();

              return (
                <div key={radioId} className="mt-2">
                  <input
                    type="radio"
                    id={radioId}
                    name={id}
                    checked={item === correctAnswers[0] ? true : false}
                    onChange={(e) => {
                      const index = e.target.id.indexOf("-");
                      const title = e.target.id.substring(0, index);

                      store.changeAnswer(id, title);
                    }}
                  />
                  <label className="ml-2" htmlFor={radioId}>
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
              );
            })
          )}
        </fieldset>
      </>
    );
  }
);

export default QuestionAnswer;
