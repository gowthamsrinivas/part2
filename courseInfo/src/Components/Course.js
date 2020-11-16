import React from 'react';

const Header = ({courseName}) => (
    <h1>{courseName}</h1>
);

const Part = ({part,exercise}) => {
  return (
    <p>
        {part} {exercise}
    </p>
  );
}
const Content = ({parts}) => {
  return (
      <>
      {
        parts.length? parts.map(part => {
          return <Part key={part.id} part={part.name} exercise={part.exercises}/>
        }):''
      }
      </>
  )
}

const Total = ({parts}) => {
  return (
    <p>Total of  {parts.reduce((acc,element) => {
      return acc+element.exercises;
    },0)} exercises
    </p>
  ) 
}

const Course = ({course}) => {
    return (
      <>
        <Header courseName={course.name}/>
        <Content parts={course.parts} />
        <Total parts={course.parts}/>
      </>
    )
}

export default Course;
