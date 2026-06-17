import { Logo } from "../logo";
import "./header.scss";
import React from "react";

export type Props = Readonly<{}>;
export type State = Readonly<{}>;

export class Header extends React.Component<Props, State> {
    
    public render(): React.ReactNode {
        
        return (
            <header>
                <div className="content">
                    <Logo>Raptors Team 1711</Logo>
                    <a href="/home">Home</a>
                    <a href="/scouting-compiler">Scouting Compiler</a>
                    <a href="/match-scouting">Match Scouting</a>
                </div>
            </header>
        );

    }

}