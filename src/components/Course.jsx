/* eslint-disable react/prop-types */
const Content = ({ course }) => {
  return (
    <ul>
      {course.parts.map(({ name, id, exercises }) => (
        <Part name={name} key={id} exercises={exercises} />
      ))}
    </ul>
  );
};

const Part = ({ name, exercises }) => {
  return (
    <li>
      {name} {exercises}
    </li>
  );
};

const Course = ({ course }) => {
  return (
    <>
      <h1>{course.name}</h1>
      <Content course={course} />
      <b>
        total of {course.parts.reduce((a, c) => a + c.exercises, 0)} exercises
      </b>
    </>
  );
};

export default Course;
