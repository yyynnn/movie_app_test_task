import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";

import "../../css/button.css";
import "../../css/modalAll.css";
import "./Health.css";
import { health } from "../../img/indexImage";

const Health = () => {
	return (
		<div className="col-lg-12 mx-auto">
			<div className='wrap'>
				<div className="title">
					<div>
						<img src={health} alt="health" />
					</div>
					<h2 className="title-text colorTextLightGray text-updae ">
						Occupational health and safety
					</h2>
				</div>

				<div className="d-grid gap-4 d-sm-flex justify-content-sm-center btn-wrap">
					<Link className="link" to="/accident">
						<button id="Accident" className="button health">Accident</button>
					</Link>
					<Link className="link" to="/nearmiss">
						<button id="Nearmiss" className="button health">Nearmiss</button>
					</Link>
					<Link className="link" to="/possibleAccident">
						<button id="Possible_accident" className="button health">Possible accident</button>
					</Link>
				</div>
				<Link to="/" className="close">
					<strong>&times;</strong>
				</Link>
			</div>
		</div>
	);
};

export default Health;
