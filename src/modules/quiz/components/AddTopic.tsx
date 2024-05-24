import { FC, useState } from "react";
import { observer } from "mobx-react-lite";
import Button from "../../../ui/Button";
import { QuestionType } from "../models/questiontypecomponents";
import store from "../store/componentsStore";

const AddTopick: FC = observer(() => {
  const [question, setQuestion] = useState("");

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
          onClick={() => {
            store.addQustion(question, "boolean");
            setQuestion("");
          }}
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
        {store.componentsList.map((item) => {
          const Component = QuestionType[item.type];

          return <Component key={item.id} id={item.id} title={item.title} />;
        })}
      </div>
    </>
  );
});

export default AddTopick;
