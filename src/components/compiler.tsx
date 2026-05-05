import React, { useState, useEffect, useRef } from 'react';
import './compiler.scss';

export default function BarcodeCompiler() {
    const [scannedMatches, setScannedMatches] = useState<any[]>([]);
    const [rawInput, setRawInput] = useState('');
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const keepFocused = () => inputRef.current?.focus();
        window.addEventListener('click', keepFocused);
        return () => window.removeEventListener('click', keepFocused);
    }, []);

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') { // when it ends scan it sends enter
            handleSubmit
            /*try {
                const data = JSON.parse(rawInput);
                
                // duplicate check
                if (!scannedMatches.some(m => m.ts === data.ts)) {
                    setScannedMatches([...scannedMatches, data]);
                } else {
                    alert("duplicate match");
                }
                
                setRawInput(''); // clear data in prep for next
            } catch (err) {
                alert("scan failed");
                setRawInput('');
            }*/
        }
    };
    
    const [targetSheetId, setTargetSheetId] = useState(''); // if blank it will use the script's default sheet
    const [targetTabName, setTargetTabName] = useState('Sheet2');

    const exportToSheets = async () => {
        const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbz4ggHcnUh3FRP7Nmh4BPxszfPuufo6_TGwg1-LRKNuqUKgY-ctFlrO7ND48-bOawW_/exec";

        const packet = {
            spreadsheetId: targetSheetId, // url id
            targetTab: targetTabName,
            matches: scannedMatches
        };

        try {
            await fetch(SCRIPT_URL, {
                method: "POST",
                mode: "no-cors",
                body: JSON.stringify(packet),
            });
            alert(`data exported to https://docs.google.com/spreadsheets/d/${targetSheetId} on tab ${targetTabName}.`);
        } catch (error) {
            alert("Export failed");
        }
    };

    return (
        <div className="compiler">
            <h1>Barcode Compiler</h1>
            
            <div className="status-box">
                <p><strong>{scannedMatches.length}</strong> Matches Scanned</p>
                <input 
                    ref={inputRef}
                    type="text" 
                    value={rawInput}
                    onChange={(e) => setRawInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Scanner"
                />
            </div>

            <table className="table">
                <thead>
                    <tr>
                        <th>Scouter</th><th>Event</th><th>Match</th><th>Team</th><th>Position</th>
                        <th>Auto Score</th><th>Auto Climb Level</th><th>Auto Brick Time</th>
                        <th>Teleop Score</th><th>Teleop Brick Time</th><th>Teleop Defense Time</th><th>Penalties</th>
                        <th>Climb Time</th><th>Climb Level</th>
                        <th>Robot Type</th><th>Drivetrain</th><th>Over Bump</th><th>Under Trench</th>
                        <th>Driver Skill</th><th>Defense Skill</th><th>Speed</th><th>Stability</th><th>Intake Consistency</th><th>Scoring Consistency</th>
                        <th>Comments</th>
                    </tr>
                </thead>
                <tbody>
                    {scannedMatches.map(m => (
                        <tr key={m.ts}>
                            <td>{m.n}</td><td>{m.e}</td><td>{m.m}</td><td>{m.t}</td><td>{m.p}</td>
                            {/* Auton */}
                            <td>{m.sa}</td><td>{m.cla}</td><td>{m.bta}</td>
                            {/* Teleop */}
                            <td>{m.st}</td><td>{m.btt}</td><td>{m.dtt}</td><td>{m.pn}</td>
                            {/* Endgame */}
                            <td>{m.ctt}</td><td>{m.clt}</td>
                            {/* Robot Info */}
                            <td>{m.rt}</td><td>{m.dt}</td>
                            <td>{m.ob === 1 ? 'Y' : 'N'}</td><td>{m.ut === 1 ? 'Y' : 'N'}</td>
                            {/* Skills */}
                            <td>{m.ds}</td><td>{m.df}</td><td>{m.rs}</td><td>{m.sy}</td><td>{m.ic}</td><td>{m.sc}</td>
                            <td>{m.c}</td>
                        </tr> 
                    ))}
                </tbody>
            </table>

            <div className="controls">
                <button onClick={exportToSheets}>Export to Google Sheets</button>
                <button className="clearData" onClick={() => setScannedMatches([])}>Wipe Data</button>
            </div>
        </div>
    );
}