import React from 'react';
import { Link } from "react-router-dom";
// import Button from "react-bootstrap/Button";
import 'bootstrap/dist/css/bootstrap.css';

import "../../css/btn.css";
import "../../css/modalAll.css";
import { Container } from 'react-bootstrap';
import vectorNext from '../../img/vectorNext.png';
import { health } from '../../img/indexImage'


const Nearmiss = () => {
	return (
		<div className="col-lg-9 mx-auto my-5">
			<Container>
				<div className='title'>
					<div>
						<img src={health} alt="health" />
					</div>
					<h2 className="title-text colorText text-center ">Nearmiss</h2>
				</div>

				<div className="d-grid gap-4 d-sm-flex justify-content-sm-center">
					<label htmlFor='one'>TEXT</label>
					<input id='one' name='one' />
					<label htmlFor='two'>TEXT</label>
					<input name='two' />

				</div>


				<Link to="/"
					className='close'
				><strong>&times;</strong>
				</Link>
				<Link to="/health" className='vectorNext'> <img
					src={vectorNext} alt="next"
					className=" d-block mx-auto mb-2 mt-2" />
				</Link>
			</Container >
		</div >
	);
};

export default Nearmiss;