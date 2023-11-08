import React, {useState} from 'react';
import './style.css';
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Puzzle from "./Puzzle.jsx";

function App() {
    const [selectedValue, setSelectedValue] = useState(3);

    const handleSelectedChange = (e) => {
        setSelectedValue(e.target.value);
    }

    const links = [];
    for (let i = 1; i <= 3; i++) {
        links.push(<li key={i}><Link to={`/puzzle/${i}/${selectedValue}`}><img src={`/img/img${i}.jpg`} /></Link></li>);
    }
    
    return (
        <div className='container'>
            <BrowserRouter>
                <div className='mainPage'>
                    <h3>Выберите изображение и сложность</h3>
                    <select name="" id="" value={selectedValue} onChange={handleSelectedChange}>
                        <option value="3">Легко</option>
                        <option value="4">Нормально</option>
                        <option value="5">Сложно</option>
                    </select>
                    <div className="pics">
                        <ul className="pics">
                            {links}
                        </ul>                    
                    </div>
                </div>
                <Routes>
                    <Route path='/puzzle/:id/:val' element={<Puzzle />} />
                </Routes>
            </BrowserRouter>
        </div>
    )
}

export default App;



