import "./home.scss";
import React from "react";
import { Page } from "../components/page-flow/page";
import { Logo } from "../components/logo";


export type Props = Readonly<{}>;
export type State = Readonly<{}>;

export class Home extends React.Component<Props, State> {
    
    public render(): React.ReactNode {
    	
    	return (
            <Page name="home">
                <p className="welcome">Welcome to the Raptors Team 1711 scouting app!</p>
            </Page>
        );

    }

}