import { getAllStudents,addStudent } from '../service/StudentService';
import { useEffect, useState } from "react";

function ListStudent() {
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchStudents();
    }, []);

    const fetchStudents = async () => {
        setLoading(true);
        try {
            const fetchedStudents = await getAllStudents();
            setStudents(fetchedStudents);
        } catch (error) {
            console.error("Error loading student list:", error);
            setError(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            {loading && <p>Loading...</p>}
            {error && <p>Error loading students: {error.message}</p>}
            {!loading && !error && (
                <table className="table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Age</th>
                        </tr>
                    </thead>
                    <tbody>
                        {students.map((student) => (
                            <tr key={student.id}>
                                <td>{student.name}</td>
                                <td>{student.age}</td>
                            </tr>

                        ))}

                    </tbody>
                </table>
            )}
        </div>
    );
}

export default ListStudent;