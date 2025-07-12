import { Route, Routes } from "react-router-dom"
import Main from "./components/Main"
import Signup from "./components/Signup"
import Answers from "./components/Answers"
import AskQuestion from "./components/AskQuestion";
import AnswerForm from "./components/Answerform";

const App = () => {
  return (
    <>

    <Routes>
      <Route path="/" element={<Signup/>}/>
      <Route path="/main" element={<Main/>} />
      <Route path="/answers" element={<Answers/>}/>
      <Route path="/ask" element={<AskQuestion />} />
      <Route path="/answerform" element={<AnswerForm />} />
      
    </Routes>
    </>
  )
}

export default App
