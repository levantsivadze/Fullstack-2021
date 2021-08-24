import React from "react";

export const Title = () => <h1>Web Development Curriculum</h1>;

const Header = ({ course }) => <h2>{course.name}</h2>;

const Part = ({ part }) => {
  return (
    <p>
      {part.name} {part.exercises}
    </p>
  );
};

const Content = ({ course }) => {
  return (
    <div>
      {course.parts.map((part) => (
        <Part key={part.id} part={part} />
      ))}
    </div>
  );
};

const Total = ({ course }) => {
  const total = course.parts.reduce(function (sum, part) {
    return sum + part.exercises;
  }, 0);

  return <h4>Total of {total} exercises</h4>;
};

const Course = ({ course }) => {
  console.log(course);
  return (
    <div>
      <Header key={course.id} course={course} />
      <Content course={course} />
      <Total course={course} />
    </div>
  );
};

export default Course;
