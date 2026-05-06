import "./header.scss";
import React from "react";

export type Props = Readonly<{}>;
export type State = Readonly<{}>;

export class Header extends React.Component<Props, State> {
    
    public render(): React.ReactNode {
        
        return (
            <p>Header</p>
        );

    }

}