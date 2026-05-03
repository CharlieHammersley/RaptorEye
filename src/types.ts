export interface MatchData {
    //preliminary information
    eventID: string;
    scouterName: string;
    fieldPosition: string; //red 1
    teamNumber: number;
    matchNumber: number;

    //auton
    climbLevelAuto: number;
    climbTimeAuto: number;
    brickTimeAuto: number;
    individualScoreAuto: number;

    //teleop + endgame
    brickTimeTeleop: number;
    defenseTimeTeleop: number;
    individualScoreTeleop: number;
    penaltyPoints: number;
    climbLevelEnd: number;
    climbTimeEnd: number;

    //match info - blue alliance stuff tho?
    allianceScore: number;

    //robot info
    groundIntake?: boolean;
    humanPlayerIntake?: boolean;
    trench?: boolean;
    bump?: boolean;
    passing?: boolean;
    robotType: string;

    //comments
    drivingSkillRating: number;
    defenseSkillRating: number;
    robotSpeed: number;
    robotStability: number;
    intakeConsistency: number;
    scoringConsistency: number;
    otherComments: string;


    //additional info
    timestamp: number;
}