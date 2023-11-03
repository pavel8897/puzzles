import React, {useState} from 'react';
import './style.css';
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
// import Imgs from './Imgs.jsx';
// import Puzzles from './Puzzles.jsx';
import Puzzle from "./Puzzle.jsx";

function App() {
    const [selectedValue, setSelectedValue] = useState(3);

    const handleSelectedChange = (e) => {
        setSelectedValue(e.target.value);
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
                            <li><Link to={`/puzzle/1/${selectedValue}`}><img src="/img/img1.jpg" /></Link></li>
                            <li><Link to={`/puzzle/2/${selectedValue}`}><img src="/img/img2.jpg" /></Link></li>
                            <li><Link to={`/puzzle/3/${selectedValue}`}><img src="/img/img3.jpg" /></Link></li>
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



