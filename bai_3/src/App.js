import './App.css';
import './index.css';
import {getAllStudent} from './services/studentService'

function App() {

  return (
      <div className="App">
        <h1>Student</h1>
        <table>
          <tr>
            <th>Company</th>
            <th>Contact</th>
            <th>Country</th>
          </tr>
          {getAllStudent().map((student) => (
              <tr>
                <td>{student.company}</td>
                <td>{student.contact}</td>
                <td>{student.country}</td>
              </tr>
          ))}
        </table>
      </div>
  );
}

export default App;