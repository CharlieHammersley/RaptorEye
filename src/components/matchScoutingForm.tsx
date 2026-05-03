import React, { useState } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import './matchScoutingForm.scss'; 


    const initialFormState = {
        // match info
        matchNumber: 0,
        position: '',
        team: 0,
        // auton
        scoreAuto: 0,
        climbLevelAuto: 0,
        brickTimeAuto: 0,
        // teleop/endgame
        scoreTeleop: 0,
        brickTimeTeleop: 0,
        defenseTimeTeleop: 0,
        penalties: 0,
        climbTimeTeleop: 0,
        climbLevelTeleop: 0,
        // robot info
        robotType: '',
        driveTrain: '',
        overBump: false,
        underTrench: false,
        driverSkill: 0,
        defenseSkill: 0,
        robotSpeed: 0,
        stability: 0,
        intakeConsistency: 0,
        scoringConsistency: 0,
        otherComments: '',
    }

    // basic setup for a form
    const FormField = ({label, name, type = "text", value, onChange, options = []}) => (
    <div className='feild-group'>
        <label>{label}</label>
        {type === "select" ? (
            <select name={name} value={value} onChange={onChange}>
                <option value=''>Select...</option>
                {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
            </select>
        ) : (
            <input 
                name={name} 
                type={type} 
                checked={type === 'checkbox' ? !!value : undefined} 
                value={type !== 'checkbox' ? value : undefined} 
                onChange={onChange} 
            />
        )}
    </div>
);
    
export default function matchScoutingForm() {
    // saving data
    const [scoutedData, setScoutedData] = useState<any[]>([]); // all matches compiled
    const saveMatch = () => {
        const newMatch = {
           ... formData,
           ts: Date.now()
        };
        setScoutedData([...scoutedData, newMatch]);
        setFormData(initialFormState); // resets all fields

        alert(`Match #${newMatch.matchNumber} saved`);
    };

    // prelim info
    const [scouterName, setScouterName] = useState('');
    const [eventID, setEventID] = useState('');

    const [step, setStep] = useState('opener');

    const [formData, setFormData] = useState(initialFormState);
    
    const handleChange = (e) => {
        const {name, value, type, checked} = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : (type === 'number' ? Number(value) : value)
        }));
    };

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
                        <FormField label="Match Number" name="matchNumber" type="number" value={formData.matchNumber} onChange={handleChange} />
                        <FormField label="Team Number" name="team" type="number" value={formData.team} onChange={handleChange} />
                        <FormField label="Team Position" name="position" type="select" 
                            options={["Red 1", "Red 2", "Red 3", "Blue 1", "Blue 2", "Blue 3"]} 
                            value={formData.position} onChange={handleChange}/>
                    <br />

                    <h2>Auton</h2>
                        <p>Individual Auton Score: <span>{formData.scoreAuto}</span></p>
                            <button onClick={() => setFormData(p => ({...p, scoreAuto: Math.max(0, p.scoreAuto - 1)}))}>-</button>
                            <button onClick={() => setFormData(p => ({...p, scoreAuto: p.scoreAuto + 1}))}>+</button>
                        <FormField label="Climb Level" name="climbLevelAuto" type="number" value={formData.climbLevelAuto} onChange={handleChange} />
                        <FormField label="Brick Time" name="brickTimeAuto" type="number" value={formData.brickTimeAuto} onChange={handleChange} />
                    <br />

                    <h2>Teleop</h2>
                        <p>Individual Teleop Score: <span>{formData.scoreTeleop}</span></p>
                            <button onClick={() => setFormData(p => ({...p, scoreTeleop: Math.max(0, p.scoreTeleop - 1)}))}>-</button>
                            <button onClick={() => setFormData(p => ({...p, scoreTeleop: p.scoreTeleop + 1}))}>+</button>
                        <FormField label="Brick Time" name="brickTimeTeleop" type="number" value={formData.brickTimeTeleop} onChange={handleChange} />
                        <FormField label="Defense Time" name="defenseTimeTeleop" type="number" value={formData.defenseTimeTeleop} onChange={handleChange} />
                        <FormField label="Penalties" name="penalties" type="number" value={formData.penalties} onChange={handleChange} />
                    <br />

                    <h2>Endgame</h2>
                        <FormField label="Climb Level" name="climbLevelTeleop" type="number" value={formData.climbLevelTeleop} onChange={handleChange} />
                        <FormField label="Climb Time" name="climbTimeTeleop" type="number" value={formData.climbTimeTeleop} onChange={handleChange} />
                    <br />

                    <h2>Robot Information</h2>
                        <FormField label="Robot Type" name="robotType" type="select" 
                            options={["Dumper", "Turret", "Two-Turret", "Single Lane", "Multi-Lane"]} 
                            value={formData.robotType} onChange={handleChange} />
                        
                        <FormField label="Drive Train" name="driveTrain" type="select" 
                            options={["Swerve", "Tank", "Other", "Single Lane", "Multi-Lane"]} 
                            value={formData.driveTrain} onChange={handleChange} />

                        <FormField label="Over Bump" name="overBump" type="checkbox" value={formData.overBump} onChange={handleChange} />
                        <FormField label="Under Trench" name="underTrench" type="checkbox" value={formData.underTrench} onChange={handleChange} />
                    <br />

                    <h2>Comments</h2>
                        <FormField label="Driver Skill" name="driverSkill" type="number" value={formData.driverSkill} onChange={handleChange} />
                        <FormField label="Defense Skill" name="defenseSkill" type="number" value={formData.defenseSkill} onChange={handleChange} />
                        <FormField label="Robot Speed" name="robotSpeed" type="number" value={formData.robotSpeed} onChange={handleChange} />
                        <FormField label="Robot Stability" name="stability" type="number" value={formData.stability} onChange={handleChange} />
                        <FormField label="Intake Consistency" name="intakeConsistency" type="number" value={formData.intakeConsistency} onChange={handleChange} />
                        <FormField label="Scoring Consistency" name="scoringConsistency" type="number" value={formData.scoringConsistency} onChange={handleChange} />
                        <FormField label="Additional Comments" name="otherComments" type="string" value={formData.otherComments} onChange={handleChange} />
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

                <div className='qr-code-gallery'>
                    {scoutedData.map((match) => (
                        <div key={match.ts} className="qr-item">
                            <h3>Match #{match.matchNumber} - Team {match.team}</h3>
                        
                            <QRCodeCanvas 
                                value={JSON.stringify({
                                    n: scouterName,
                                    e: eventID,
                                    m: match.matchNumber,
                                    p: match.position,
                                    t: match.team,
                                    // Auton
                                    sa: match.scoreAuto,
                                    cla: match.climbLevelAuto,
                                    bta: match.brickTimeAuto,
                                    // Teleop
                                    st: match.scoreTeleop,
                                    btt: match.brickTimeTeleop,
                                    dtt: match.defenseTimeTeleop,
                                    pn: match.penalties,
                                    // Endgame
                                    ctt: match.climbTimeTeleop,
                                    clt: match.climbLevelTeleop,
                                    // Robot Info
                                    rt: match.robotType,
                                    dt: match.driveTrain,
                                    ob: match.overBump ? 1 : 0,
                                    ut: match.underTrench ? 1 : 0,
                                    // Skills/Comments
                                    ds: match.driverSkill,
                                    df: match.defenseSkill,
                                    rs: match.robotSpeed,
                                    sy: match.stability,
                                    ic: match.intakeConsistency,
                                    sc: match.scoringConsistency,
                                    c: match.otherComments,
                                    ts: match.ts
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