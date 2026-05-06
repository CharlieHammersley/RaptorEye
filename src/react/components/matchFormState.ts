export interface MatchFormData {
    matchNumber: number;
    position: string;
    team: number;
    scoreAuto: number;
    climbLevelAuto: number;
    brickTimeAuto: number;
    scoreTeleop: number;
    brickTimeTeleop: number;
    defenseTimeTeleop: number;
    penalties: number;
    climbTimeTeleop: number;
    climbLevelTeleop: number;
    robotType: string;
    driveTrain: string;
    overBump: boolean;
    underTrench: boolean;
    driverSkill: number;
    defenseSkill: number;
    robotSpeed: number;
    stability: number;
    intakeConsistency: number;
    scoringConsistency: number;
    otherComments: string;
}

export const initialFormState: MatchFormData = {
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
};