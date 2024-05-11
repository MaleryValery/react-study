import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/App';
import QuizProvider from './context/QuizProvider';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QuizProvider>
      <App />
    </QuizProvider>
  </React.StrictMode>
);
