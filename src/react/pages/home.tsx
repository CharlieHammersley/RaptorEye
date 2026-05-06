import "./home.scss";
import React from "react";
import { Page } from "../components/page-flow/page";


export type Props = Readonly<{}>;
export type State = Readonly<{}>;

export class Home extends React.Component<Props, State> {
    
    public render(): React.ReactNode {
    	
    	return (
            <Page>
                <h1>RAPTORS Scouting</h1>
            </Page>
        );

    }

}