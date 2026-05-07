import "./header.scss";
import React from "react";

export type Props = Readonly<{}>;
export type State = Readonly<{}>;

export class Header extends React.Component<Props, State> {
		
	public render(): React.ReactNode {
				
			return (
				<div className="header-content">
					<h3>RAPTOR Scout</h3>
					<a href="/scouting-compiler">Compiler</a> <br />
					<a href="/match-scouting">Match Scouting</a> <br />
				</div>
			);
		
	}
}