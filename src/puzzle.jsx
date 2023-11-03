import React from 'react';
import Script from './script.jsx';

function Puzzle() {
    return(
        <>
            <button className="reset">Resset</button>
            <div className='canvas'></div>
            <button className='back'>Back</button>
            <Script />
        </>
    )
}

export default Puzzle;

