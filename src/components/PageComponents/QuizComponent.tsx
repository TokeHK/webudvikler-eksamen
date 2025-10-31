import React from 'react';
import useDB from '../../hooks/useDB';

interface Answer {
  _id: string;
  text: string;
  isCorrect: boolean;
}

interface Question {
  _id: string;
  question: string;
  image: string;
  releaseDate: string;
  answers: Answer[];
}

interface Quiz {
  feedback: {
    correct: string;
    incorrect: string;
  };
  _id: string;
  questions: Question[];
}

const QuizComponent = () => {
  const { data, loading, error } = useDB<Quiz>("quiz");

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="quiz-container">
      {data && 
        <>
          <h2>Quiz</h2>
          <div className='podcast_page-hero quiz'>
            <img src={`http://localhost:3001/assets/images/quiz.jpg`} alt="quiz img" className='quiz_img'/>
            <div className='podcast_page-info'>
              <p>Lorem ipsum dolor sit amet.</p>
            </div>
          </div>
          <div className="questions">
            <div className='quiz_q'>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci molestiae veritatis minima porro laudantium officia?</p>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores, dolore.</p>
            </div>
            <div className='quiz_q'>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci molestiae veritatis minima porro laudantium officia?</p>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores, dolore.</p>
            </div>
            <div className='quiz_q'>
              <p>{}</p>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci molestiae veritatis minima porro laudantium officia?</p>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores, dolore.</p>
            </div>
          </div>
        </>}
    </div>
  );
};

export default QuizComponent;
