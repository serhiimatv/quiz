import { FC, useState } from "react";
import { IBooleanQuestion } from "../models";
import Button from "../../../ui/Button";

const BooleanQuestion: FC<IBooleanQuestion> = ({
  id,
  title,
  onRemove,
  onEdit,
}) => {
  const [question, setQuestion] = useState(title);
  const [edit, setEdit] = useState(false);

  return (
    <>
      <div className="mt-2 flex gap-2">
        {edit ? (
          <>
            <input
              type="text"
              className="border-2 rounded-[10px] pl-1"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
            />
            <Button
              title="Зберегти"
              color="green"
              onClick={() => {
                onEdit(id, question);
                setEdit(!edit);
              }}
            />
          </>
        ) : (
          <>
            <h2 className="font-bold text-3xl underline">{title}</h2>
            <Button
              title="Редагувати"
              color="green"
              onClick={() => setEdit(!edit)}
            />
            <Button
              title="Видалити"
              color="purple"
              onClick={() => onRemove(id)}
            />
          </>
        )}
      </div>
    </>
  );
};

export default BooleanQuestion;
