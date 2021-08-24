import React from "react";
import Course, {Title} from './components/Course'

const App = ({courses}) => {
  
  return (
    <div>
      <Title />
      {courses.map(course => 
        <Course key={course.id} course={course} />)}
    </div>
  )
  
}


export default App