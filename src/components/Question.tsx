import { QuestionComponentType } from '../types';
import Options from './Options';

function Question({ question, onAnswer, answer }: QuestionComponentType) {
  return (
    <div>
      <h4>{question.question}</h4>
      <div className="options">
        <Options answer={answer} onAnswer={onAnswer} question={question} />
      </div>
    </div>
  );
}

export default Question;
