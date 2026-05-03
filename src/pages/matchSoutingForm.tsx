import React, { useState } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import './matchScoutingForm.scss'; 

export default function matchScoutForm() {
    const [score, setScore] = useState(0);
    const [team, setTeam] = useState('');
    const updateScore = (val: number) => setScore(prev => Math.max(0, prev + val));

    return (
        <div className="matchScoutForm">
            <h1>Match Scouting</h1>
                <div className="scouting-form">
                    <p>Team Number</p>
                    <input type="number" value={team} onChange={(e) => setTeam(e.target.value)} required />

                    <p>Individual Score: <span>{score}</span></p>
                     <div className="counter-row">
                        <button onClick={() => updateScore(-1)}>-</button>
                        <button onClick={() => updateScore(1)}>+</button>
                    </div>
                    <br />
                    <button>Generate QR Code</button>
                </div>
        </div>
    );
}