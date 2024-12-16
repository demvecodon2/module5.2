import './App.css';
import React from "react";
import {getAll} from "./components/service/studentService";
import ListComponent from "./components/student/ListComponent";
import HeaderComponet from "./components/student/HeaderComponet";
import 'bootstrap/dist/css/bootstrap.min.css';




function App() {
  const list = getAll();
  return(
      <>
        <ListComponent studentsList={list}/>
        <HeaderComponet />
      </>
  )
}
export default App;
