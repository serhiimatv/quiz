import { FC, useState } from "react";
import { IQuestion } from "../models";
import Button from "../../../ui/Button";
import store from "../store/componentsStore";
import QuestionAnswer from "./QuestionAnswer";

const Question: FC<IQuestion> = ({
  id,
  title,
  choices,
  correctAnswers,
  type,
}) => {
  const [question, setQuestion] = useState(title);
  const [answer, setAnswer] = useState("");
  const [edit, setEdit] = useState(false);

  return (
    <>
      <div className="mt-2 p-1 border-2 rounded-[5px] w-[50%]">
        <div className="flex gap-2">
          {edit ? (
            <>
              <input
                type="text"
                className="border-2 rounded-[10px] pl-1"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
              />
              <Button
                className="ml-auto"
                title="Зберегти"
                color="green"
                onClick={() => {
                  store.editQuestion(id, question.trim());
                  setEdit(!edit);
                }}
              />
            </>
          ) : (
            <>
              <h2 className="font-bold text-3xl underline">{title}</h2>
              <Button
                className="ml-auto"
                title="Редагувати"
                color="green"
                onClick={() => setEdit(!edit)}
              />
              <Button
                title="Видалити"
                color="purple"
                onClick={() => store.removeQuestion(id)}
              />
            </>
          )}
        </div>
        {type !== "boolean" && (
          <div className="mt-2 h-auto flex gap-1">
            <input
              type="text"
              placeholder="Введіть текст відповіді"
              className="border-2 rounded-[10px] pl-1"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
            />
            <Button
              title={"Додати відповідь"}
              color="alternative"
              onClick={() => {
                store.addAnswer(id, answer.trim());
                setAnswer("");
              }}
            />
          </div>
        )}
        <QuestionAnswer
          id={id}
          choices={choices}
          correctAnswers={correctAnswers}
          type={type}
        />
      </div>
    </>
  );
};

export default Question;
