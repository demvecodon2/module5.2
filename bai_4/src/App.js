import logo from './logo.svg';
import './App.css';

function App() {
  return (
      <div className="container">
        <div className="card">
          <div className="card--header"/>
          <img
              className="avatar"
              src="https://i.pinimg.com/474x/de/3d/5b/de3d5b954b575d72f9d7c178b232ce87.jpg"
              alt="avatar"
          />
          <div className="card--body">
            <div>
              <p className="text-header">Hello</p>
              <p className="text-sub"> Donec in ipsum euismod, ullamcorper neque nec,
                condimentum dolor. Nulla facilisi. Sed non felis a neque tincidunt feugiat vel
                vel nunc. Curabitur non enim vel ipsum gravida hendrerit. Nulla facilisi. Donec in


              </p>
              <button className="btn third">FOLLOW</button>
            </div>
          </div>
        </div>
      </div>
  );
}

export default App;
