import React, { useState } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import './matchScoutingForm.scss'; 

export default function matchScoutingForm() {
    const updateScoreAuto = (val: number) => setScoreAuto(prev => Math.max(0, prev + val));
    const updateScoreTeleop = (val: number) => setScoreTeleop(prev => Math.max(0, prev + val));
    
    // saving data
    const [scoutedData, setScoutedData] = useState<any[]>([]); // all matches compiled
    const saveMatch = () => {
        const newMatch = {
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
            ts: Date.now()
        };
        setScoutedData([...scoutedData, newMatch]);
        //setTeam(''); // reset match specific variables
        //setScore(0);
        //alert("match saved");
    };

    const [step, setStep] = useState('opener');
    
    //prelim info
    const [scouterName, setScouterName] = useState('');
    const [eventID, setEventID] = useState('');
    
    //per match data
    const [matchNumber, setMatch] = useState(0);
    const [teamPosition, setPosition] = useState('');
    const [team, setTeam] = useState('');

    // Auton
    const [scoreAuto, setScoreAuto] = useState(0);
    const [climbLevelAuto, setClimbLevelAuto] = useState(0);
    const [brickTimeAuto, setBrickTimeAuto] = useState(0);
    //const [allianceScoreAuto, setAllianceScoreAuto] = useState(0);

    // Teleop & Endgame
    const [scoreTeleop, setScoreTeleop] = useState(0);
    const [brickTimeTeleop, setBrickTimeTeleop] = useState(0);
    const [defenseTimeTeleop, setDefenseTimeTeleop] = useState(0);
    const [penalties, setPenalties] = useState(0);
    const [climbTimeTeleop, setClimbTimeTeleop] = useState(0);
    const [climbLevelTeleop, setClimbLevelTeleop] = useState(0);

    // Robot Info
    const [robotType, setRobotType] = useState('');
    const [driveTrain, setDriveTrain] = useState('');
    const [overBump, setOverBump] = useState(Boolean);
    const [underTrench, setUnderTrench] = useState(Boolean);

    // Comments
    const [driverSkill, setDriverSkill] = useState(0);
    const [defenseSkill, setDefenseSkill] = useState(0);
    const [robotSpeed, setRobotSpeed] = useState(0);
    const [stability, setStability] = useState(0);
    const [intakeConsistency, setIntakeConsistency] = useState(0);
    const [scoringConsistency, setScoringConsistency] = useState(0);
    const [otherComments, setOtherComments] = useState('');


    if(step == 'opener') {
        return (
            <div className='opener'>
                <h1>The Eye</h1>
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
                    <h3>Scouting Event: {eventID}</h3>
                        <p>{scouterName}</p>
                        <p>Matches Scouted: {scoutedData.length}</p>
                    <hr />
                    
                    <h2>Match Information</h2>
                        <p>Match Number</p> <input type="number" value={matchNumber} onChange={(e) => setMatch(e.target.valueAsNumber)} required />
                        <p>Team Position</p> <select value={teamPosition} onChange={(e) => setPosition(e.target.value)} required>
                            <option value="">Select Team Position</option>
                            <option value={"Red 1"}>Red 1</option>
                            <option value={"Red 2"}>Red 2</option>
                            <option value={"Red 3"}>Red 3</option>
                            <option value={"Blue 1"}>Blue 1</option>
                            <option value={"Blue 2"}>Blue 2</option>
                            <option value={"Blue 3"}>Blue 3</option>
                        </select>

                        <p>Team Number</p> <input type="number" value={team} onChange={(e) => setTeam(e.target.value)} required />
                    <br />

                    <h2>Auton</h2>
                        <p>Individual Auton Score: <span>{scoreAuto}</span></p>
                            <button onClick={() => updateScoreAuto(-1)}>-</button>
                            <button onClick={() => updateScoreAuto(1)}>+</button>
                        <p>Climb Level</p> <input type="number" value={climbLevelAuto} onChange={(e) => setClimbLevelAuto(e.target.valueAsNumber)} required />
                        <p>Brick Time</p> <input type="number" value={brickTimeAuto} onChange={(e) => setBrickTimeAuto(e.target.valueAsNumber)} required />
                    <br />

                    <h2>Teleop</h2>
                        <p>Individual Teleop Score: <span>{scoreTeleop}</span></p>
                            <button onClick={() => updateScoreTeleop(-1)}>-</button>
                            <button onClick={() => updateScoreTeleop(1)}>+</button>
                        <p>Brick Time</p> <input type="number" value={brickTimeTeleop} onChange={(e) => setBrickTimeTeleop(e.target.valueAsNumber)} required />
                        <p>Defense Time</p> <input type="number" value={defenseTimeTeleop} onChange={(e) => setDefenseTimeTeleop(e.target.valueAsNumber)} required />
                        <p>Penalties</p> <input type="number" value={penalties} onChange={(e) => setPenalties(e.target.valueAsNumber)} required />
                    <br />

                    <h2>Endgame</h2>
                        <p>Climb Level</p> <input type="number" value={climbLevelTeleop} onChange={(e) => setClimbLevelTeleop(e.target.valueAsNumber)} required />
                        <p>Climb Time</p> <input type="number" value={climbTimeTeleop} onChange={(e) => setClimbTimeTeleop(e.target.valueAsNumber)} required />
                    <br />

                    <h2>Robot Information</h2>
                        <p>Robot Type</p> <select value={robotType} onChange={(e) => setRobotType(e.target.value)} required>
                            <option value="">Select Robot Type</option>
                            <option value={"Dumper"}>Dumper</option>
                            <option value={"Turret"}>Turret</option>
                            <option value={"Two-Turret"}>Two-Turret</option>
                            <option value={"Single Lane"}>Single Lane</option>
                            <option value={"Multi-Lane"}>Multi-Lane</option>
                        </select>
                        <p>Drive Train</p> <select value={driveTrain} onChange={(e) => setDriveTrain(e.target.value)} required>
                            <option value="">Select Drivetrain</option>
                            <option value={"Swerve"}>Swerve</option>
                            <option value={"Tank"}>Tank</option>
                            <option value={"Other"}>Other</option>
                        </select>
                        <p>Over Bump</p> <input type="checkbox" checked={overBump} onChange={(e) => setOverBump(e.target.checked)} />
                        <p>Under Trench</p> <input type="checkbox" checked={underTrench} onChange={(e) => setUnderTrench(e.target.checked)} />
                    <br />

                    <h2>Comments</h2>
                        <p>Driver Skill</p> <input type="number" min="0" max="10" value={driverSkill} onChange={(e) => setDriverSkill(e.target.valueAsNumber)} required />
                        <p>Defense Skill</p> <input type="number" min="0" max="10" value={defenseSkill} onChange={(e) => setDefenseSkill(e.target.valueAsNumber)} required />
                        <p>Robot Speed</p> <input type="number" min="0" max="10" value={robotSpeed} onChange={(e) => setRobotSpeed(e.target.valueAsNumber)} required />
                        <p>Robot Stability</p> <input type="number" min="0" max="10" value={stability} onChange={(e) => setStability(e.target.valueAsNumber)} required />
                        <p>Intake Consistency</p> <input type="number" min="0" max="10" value={intakeConsistency} onChange={(e) => setIntakeConsistency(e.target.valueAsNumber)} required />
                        <p>Scoring Consistency</p> <input type="number" min="0" max="10" value={scoringConsistency} onChange={(e) => setScoringConsistency(e.target.valueAsNumber)} required />
                        <p>Additional Comments</p> <input type="string" value={otherComments} onChange={(e) => setOtherComments(e.target.value)} required />
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
            <div className='qr-codes'>
                <h1>Compiled Data</h1>
                <p>Matches Scouted: {scoutedData.length}</p>

                <pre>
                    DEBUG DATA: {JSON.stringify({ n: scouterName, e: eventID, m: scoutedData })}
                </pre>

                <div className='qr-code-gallery'>
                    {scoutedData.map((match, index) => (
                    <div key={match.ts} className="qr-item">
                        <h3>Match #{match.m} - Team {match.t}</h3>
                        <QRCodeCanvas 
                            value={JSON.stringify({
                                n: scouterName,
                                e: eventID,
                                ...match
                                })} 
                            size={250} 
                            level="M"
                        />
                        <p>ID: {match.ts}</p>
                    </div>
                    ))}
                </div>
                
                <br />
                <div className="controls">
                    <button onClick={() => setStep('form')}>Back to Scouting</button>
                    <button className="clearData" onClick={() => { if(window.confirm("Clear all?")) setScoutedData([]); }}> Wipe Data</button>
                </div>
            </div>
        );
    }
}