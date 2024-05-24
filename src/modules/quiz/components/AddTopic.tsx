import { FC, useState } from "react";
import Button from "../../../ui/Button";
import BooleanQuestion from "./BooleanQuestion";
import { QuestionComponents } from "../models";
import { v4 } from "uuid";

const questionType = {
  boolean: BooleanQuestion,
  multiple: BooleanQuestion,
  single: BooleanQuestion,
};

const AddTopick: FC = () => {
  const [question, setQuestion] = useState("");

  const [componentsList, setComponentsList] = useState<QuestionComponents[]>(
    []
  );

  const addQustion = (type: "single" | "multiple" | "boolean") => {
    if (question.trim() !== "") {
      setComponentsList([
        ...componentsList,
        {
          id: v4(),
          title: question,
          type: type,
          Component: questionType[type],
        },
      ]);
      setQuestion("");
    }
  };

  const removeQustionHandler = (id: string) => {
    setComponentsList(componentsList.filter((item) => item.id !== id));
  };

  const editQuestionHandler = (id: string, title: string) => {
    setComponentsList(
      componentsList.map((item) => {
        if (item.id === id) {
          item.title = title;
        }
        return item;
      })
    );
  };

  return (
    <>
      <div className="h-auto flex gap-1">
        <input
          type="text"
          placeholder="Введіть текст запитання"
          className="border-2 rounded-[10px] pl-1"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />
        <Button
          title="Додати запитання правда/брехня"
          color="default"
          className="h-auto m-0"
          onClick={() => addQustion("boolean")}
        ></Button>
        <Button
          title="Додати запитання з одною правильною відповіддю"
          color="default"
          className="h-auto m-0"
        ></Button>
        <Button
          title="Додати запитання з дукількома правильними відповіддями"
          color="default"
          className="h-auto m-0"
        ></Button>
      </div>
      <div>
        {componentsList.map((Item) => (
          <Item.Component
            key={Item.id}
            id={Item.id}
            title={Item.title}
            onRemove={removeQustionHandler}
            onEdit={editQuestionHandler}
          />
        ))}
      </div>
    </>
  );
};

export default AddTopick;
