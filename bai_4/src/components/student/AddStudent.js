import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addStudent } from "../service/StudentService";

function AddStudent() {
    const [newStudent, setNewStudent] = useState({ name: '', age: '' });
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewStudent({ ...newStudent, [name]: value });
    };

    const handleAddStudent = async (e) => {
        e.preventDefault();
        if (newStudent.name.trim() && newStudent.age > 0) {
            try {
                await addStudent(newStudent);
                setNewStudent({ name: '', age: '' });
                navigate('/students');
            } catch (error) {
                console.error("Error adding student:", error);
                setError("Failed to add student. Please try again.");
            }
        } else {
            setError("Please enter a valid name and age.");
        }
    };

    return (
        <div>
            <h2>Add New Student</h2>
            <form onSubmit={handleAddStudent}>
                <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={newStudent.name}
                    onChange={handleInputChange}
                    required
                />
                <input
                    type="number"
                    name="age"
                    placeholder="Age"
                    value={newStudent.age}
                    onChange={handleInputChange}
                    required
                />
                <button type="submit">Add Student</button>
            </form>
            {error && <p className="error">{error}</p>}
        </div>
    );
}

export default AddStudent;