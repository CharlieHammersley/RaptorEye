import React, { useState } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import './matchScoutingForm.scss'; 

export default function matchScoutForm() {
    const updateScore = (val: number) => setScore(prev => Math.max(0, prev + val));
    const [step, setStep] = useState('opener');
    const [scouterName, setScouterName] = useState('');
    const [eventID, setEventID] = useState('');
    const [team, setTeam] = useState('');
    const [score, setScore] = useState(0);

    const [allMatches, setAllMatches] = useState<any[]>([]);

    const saveMatch = () => {
        const newMatch = {
            t: team,
            s: score,
            ts: Date.now()
        };
        setAllMatches([...allMatches, newMatch]);
        setTeam(''); // reset match specific variables
        setScore(0);
        alert("match saved");
    };


    if(step == 'opener') {
        return (
            <div className='opener'>
                <h1>Raptor Eye</h1>
                <p>Scouter Name</p>
                <input value={scouterName} onChange={(e) => setScouterName(e.target.value)} />
                <p>Event ID</p>
                <input value={eventID} onChange={(e) => setEventID(e.target.value)} />
                <br />
                <button onClick={() => setStep('form')}>Start Scouting</button>
            </div>
        );
    }

    if(step == 'form') {
        return (
            <div className="form">
                <h1>Match Scouting</h1>
                    <h3>Scouting: {eventID}</h3>
                    <p>{scouterName}</p>
                    <hr />

                    <p>Team Number</p>
                        <input type="number" value={team} onChange={(e) => setTeam(e.target.value)} required />
                    <br />

                    <p>Individual Score: <span>{score}</span></p>
                        <button onClick={() => updateScore(-1)}>-</button>
                        <button onClick={() => updateScore(1)}>+</button>
                    <br />
                    <button onClick={saveMatch}>Save Match</button>
                    <br />
                    <button onClick={() => setStep('qr-codes')}>Compile Data</button>
                    <button onClick={() => setStep('opener')}>Back to Homepage</button>
            </div>
        );
    }

    if(step == 'qr-codes') {
        return (
            <div className='qr-codes'></div>
        );
    }
}