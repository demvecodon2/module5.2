import { Routes, Route } from 'react-router-dom';
import ListStudent from './components/student/ListStudent';
import AddStudent from './components/student/AddStudent';

function App() {
    return (
        <Routes>
            <Route path="/students" element={<ListStudent />} />
            <Route path="/add-student" element={<AddStudent />} />
        </Routes>
    );
}

export default App;