import React from "react";
import { Link } from "react-router-dom";
import { Container } from "react-bootstrap";
import { environment } from "../../img/indexImage";
import "../../css/button.css";
import "../../css/modalAll.css";
import "./Environment.css";

const Environment = () => {
	return (
		<div className="col-lg-9 mx-auto  wrap">
			<Container>
				<div className="title">
					<div>
						<img src={environment} alt="health" />
					</div>
					<h2 className="title-text colorTextLightGray text-center ">Environment</h2>
				</div>

				<div className="d-grid gap-4 d-sm-flex justify-content-sm-center btn-wrap">
					<button id="Accident" className="button environment">Accident</button>
					<button id="Nearmiss" className="button environment">Nearmiss</button>
					<button id="Possible_accident" className="button environment">Possible accident</button>
				</div>
				<Link to="/" className="close">
					<strong>&times;</strong>
				</Link>
			</Container>
		</div>
	);
};

export default Environment;
