import { Routes, Route, Navigate } from 'react-router-dom';
import Courses from './pages/Courses/Courses'; 
import CourseDetails from './components/courses/CourseDetails/CourseDetails'; 
import './App.css';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/courses" element={<Courses />} />
        <Route path="/courses/:id" element={<CourseDetails />} />
        <Route path="/" element={<Navigate to="/courses" />} />
      </Routes>
    </div>
  );
}

export default App;