import "./header.scss";
import React, {useState} from "react";
import { useNavigate } from "react-router-dom";

import darkModeLogo from '../assets/icons/mode-dark-logo.png';
import whiteLogo from '../assets/icons/logo-white.png';

export type Props = Readonly<{}>;
export type State = Readonly<{}>;

export class Header extends React.Component<Props, State> {
		
	public render(): React.ReactNode {
				
			return (
				<div className="header-content">
					<div className="navbar">
						<a href="/home" className="logo" target="blank" rel="noopener roreferrer">
							<img src={whiteLogo} alt=""/>
						</a>
						<h3>RAPTOR Scout</h3>
						<ul>
							<li>Match Scouting</li>
							<li>Pit Scouting</li>
							<li>Insights</li>

						</ul>

						<img src={darkModeLogo} alt="" className="toggle-mode" />
					</div>
				</div>
			);
		
	}
}