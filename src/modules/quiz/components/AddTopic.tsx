import { FC, SyntheticEvent, useState } from "react";
import { observer } from "mobx-react-lite";
import Button from "../../../ui/Button";
import store from "../store/componentsStore";
import Question from "./Question";
import { QuestionType, Topic } from "../models";

const AddTopic: FC = observer(() => {
  const [topicName, setTopicName] = useState("");
  const [question, setQuestion] = useState("");

  const addQuestionHandler = (e: SyntheticEvent<HTMLButtonElement>) => {
    const element = e.target as Element;
    store.addQuestion(question, element.id as QuestionType);
    setQuestion("");
  };

  const saveTopic = () => {
    const quiz = localStorage.getItem("quiz");

    if (quiz) {
      const topics: Topic[] = JSON.parse(quiz);
      topics.push({
        topic: topicName,
        questions: store.questionList,
      });
      localStorage.setItem("quiz", JSON.stringify(topics));
    } else {
      localStorage.setItem(
        "quiz",
        JSON.stringify([
          {
            topic: topicName,
            questions: store.questionList,
          },
        ])
      );
    }

    store.erseQuestion();
  };

  return (
    <>
      <div className="h-10">
        <input
          type="text"
          className="border-2 rounded-[10px] pl-1 h-full w-64"
          placeholder="Введіть назву вікторини"
          value={topicName}
          onChange={(e) => setTopicName(e.target.value)}
        />
        <Button
          title="Зберегти вікторину"
          color="green"
          className="ml-3"
          onClick={saveTopic}
        />
      </div>
      <div className="h-auto flex gap-1 mt-3">
        <input
          type="text"
          placeholder="Введіть текст запитання"
          className="border-2 rounded-[10px] pl-1"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />
        <Button
          id="boolean"
          title="Додати запитання правда/брехня"
          color="default"
          className="h-auto m-0"
          onClick={addQuestionHandler}
        ></Button>
        <Button
          id="single"
          title="Додати запитання з одною правильною відповіддю"
          color="default"
          className="h-auto m-0"
          onClick={addQuestionHandler}
        ></Button>
        <Button
          id="multiple"
          title="Додати запитання з декількома правильними відповідями"
          color="default"
          className="h-auto m-0"
          onClick={addQuestionHandler}
        ></Button>
      </div>
      <div>
        {store.questionList.map((item) => (
          <Question
            key={item.id}
            id={item.id}
            title={item.question}
            choices={item.choices}
            correctAnswers={item.correctAnswers}
            type={item.type}
          />
        ))}
      </div>
    </>
  );
});

export default AddTopic;
