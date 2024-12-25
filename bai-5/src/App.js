import React from 'react';
import { Route, Routes } from 'react-router-dom';
import ParamacyCreate from './components/ParamacyCreate';
import ParamacyList from "./components/ParamacyList";

function App() {
    return (
        <Routes>
            <Route path="/" element={<ParamacyList />} />
            <Route path="/create" element={<ParamacyCreate />} />
        </Routes>
    );
}

export default App;