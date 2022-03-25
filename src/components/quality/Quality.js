import React from 'react';
import { Link } from "react-router-dom";
// import Button from "react-bootstrap/Button";
import 'bootstrap/dist/css/bootstrap.css';

import "../../css/btn.css";
import "../../css/modalAll.css";
import { Container } from 'react-bootstrap';
import vectorNext from '../../img/vectorNext.png';
import { quality } from '../../img/indexImage'

const Quality = () => {

	return (
		<div className="col-lg-9 mx-auto my-5">
			<Container>
				<div className='title'>
					<div>
						<img src={quality} alt="quality" />
					</div>
					<h2 className="title-text colorText text-center ">Quality</h2>
				</div>

				<div className="d-grid gap-4 d-sm-flex justify-content-sm-center">
					<button className="btn">Audit <br /> non-conformity</button>
					<button className="btn">Non-conforming product</button>
					<button className="btn">OTD</button>
				</div>

				<Link to="/"
					className='close'

				><strong >&times;</strong>
				</Link>
				<Link to="/" className='vectorNext'> <img
					src={vectorNext} alt="next"
					className=" d-block mx-auto mb-2 mt-2" />
				</Link>

			</Container >
		</div >
	);
};

export default Quality;