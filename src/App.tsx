import { BrowserRouter } from "react-router-dom";
import RootQuiz from "./modules/quiz";

function App() {
  return (
    <>
      <div className="container mx-auto pb-9">
        <BrowserRouter>
          <RootQuiz />
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
