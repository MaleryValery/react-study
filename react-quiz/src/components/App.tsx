import MainSection from './MainSection';
import Header from './Header';
import Error from './Error';
import Loader from './Loader';

import { Status } from '../conts';
import StartScreen from './StartScreen';
import Question from './Question';
import NextButton from './NextButton';
import Progress from './Progress';
import FinishScreen from './FinishScreen';
import Timer from './Timer';
import Footer from './Footer';
import { useQuizContext } from '../context/QuizContext';

function App() {
  const { status } = useQuizContext();
  return (
    <div className="app">
      <Header />
      <MainSection>
        {status === Status.loading && <Loader />}
        {status === Status.error && <Error />}
        {status === Status.ready && <StartScreen />}
        {status === Status.active && (
          <>
            <Progress />
            <Question />
            <Footer>
              <Timer />
              <NextButton />
            </Footer>
          </>
        )}
        {status === Status.finish && <FinishScreen />}
      </MainSection>
    </div>
  );
}

export default App;
