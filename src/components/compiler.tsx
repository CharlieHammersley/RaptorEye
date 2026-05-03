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
            try {
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
            }
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
                        <th>Scouter</th><th>Match</th><th>Team</th><th>Pos</th>
                        <th>S.Auto</th><th>C.Auto</th><th>B.Auto</th>
                        <th>S.Tele</th><th>B.Tele</th><th>D.Tele</th><th>Pens</th>
                        <th>C.Time</th><th>C.Lvl</th>
                        <th>Type</th><th>Drive</th><th>Bump</th><th>Trnch</th>
                        <th>D.Skill</th><th>Def</th><th>Spd</th><th>Stab</th><th>In.Con</th><th>Sc.Con</th>
                        <th>Comments</th>
                    </tr>
                </thead>
                <tbody>
                    {scannedMatches.map(m => (
                        <tr key={m.ts}>
                            <td>{m.n}</td><td>{m.m}</td><td>{m.t}</td><td>{m.p}</td>
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
                        /*
                            t: team,
                            m: matchNumber,
                            tp: teamPosition,
                            sa: scoreAuto,
                            cla: climbLevelAuto,
                            bta: brickTimeAuto,
                            st: scoreTeleop,
                            clt: climbLevelTeleop,
                            ctt: climbTimeTeleop,
                            btt: brickTimeTeleop,
                            dtt: defenseTimeTeleop,
                            p: penalties,
                            ts: Date.now() */
                    ))}
                </tbody>
            </table>
        </div>
    );
}