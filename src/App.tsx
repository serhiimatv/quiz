import { createBrowserRouter, RouterProvider } from "react-router-dom";
import QuizList from "./modules/quiz/components/QuizList";
import Topic from "./modules/quiz/components/Topic";
import Quiz from "./modules/quiz/components/Quiz";
import RootQuiz from "./modules/quiz";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootQuiz />,
    children: [
      { path: "/", element: <QuizList /> },
      {
        path: "/create",
        element: <Topic />,
      },
      {
        path: "/quiz/:id",
        element: <Quiz />,
      },
    ],
  },
]);

function App() {
  return (
    <>
      <div className="container mx-auto pb-9">
        <RouterProvider router={router} />
      </div>
    </>
  );
}

export default App;
