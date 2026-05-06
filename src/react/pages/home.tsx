import "./home.scss";
import React from "react";


export type Props = Readonly<{}>;
export type State = Readonly<{}>;

export class Home extends React.Component<Props, State> {
    
    public render(): React.ReactNode {
    	
    	return (
            <p>Homepage</p>
        );

    }

}