import React, { useState, useEffect, useRef } from 'react';

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
                    console.log("captured match");
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
                <p>{scannedMatches.length} Matches Scanned</p>
                {}
                <input 
                    ref={inputRef}
                    type="text" 
                    value={rawInput}
                    onChange={(e) => setRawInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Scan data goes here"
                />
            </div>

            <table className="table">
                <thead>
                    <tr>
                        <th>Team</th>
                        <th>Match</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {scannedMatches.map(m => ( // it kinda breaks when doing qr codes cause it cant recognise the scouter name and event id
                        <tr key={m.ts}>
                            <td>{m.t}</td>
                            <td>{m.m}</td>
                            <td>{m.tp}</td>
                            <td>{m.sa}</td>
                            <td>{m.cla}</td>
                            <td>{m.bta}</td>
                            <td>{m.st}</td>
                            <td>{m.clt}</td>
                            <td>{m.ctt}</td>
                            <td>{m.btt}</td>
                            <td>{m.dtt}</td>
                            <td>{m.p}</td>
                            <td>{m.ts}</td>
                        </tr> 
                        /*t: team,
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