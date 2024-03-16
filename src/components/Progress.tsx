function Progress({
  index,
  points,
  totalScore,
  numQuestions,
  progress,
}: {
  index: number;
  points: number;
  totalScore: number;
  numQuestions: number;
  progress: number;
}) {
  return (
    <header className="progress">
      <progress value={progress} max={numQuestions} />
      <p>
        Question <strong>{index + 1}</strong> / {numQuestions}
      </p>
      <p>
        <strong>{points}</strong> / {totalScore} points
      </p>
    </header>
  );
}

export default Progress;
