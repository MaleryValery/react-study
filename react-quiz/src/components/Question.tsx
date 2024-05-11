import { useQuizContext } from '../context/QuizContext';
import Options from './Options';

function Question() {
  const { questions, currentQuestion } = useQuizContext();
  return (
    <div>
      <h4>{questions[currentQuestion].question}</h4>
      <div className="options">
        <Options />
      </div>
    </div>
  );
}

export default Question;
