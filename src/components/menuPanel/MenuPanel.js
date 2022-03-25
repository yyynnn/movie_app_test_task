import React from "react";
import { Link } from "react-router-dom";
import listicon from "../../img/Group.svg";


const MenuPanel = () => {

	return (
		<div className="colorBg">
			<div className=" text-center">
				<div className="col-lg-6 mx-auto">
					<Link to="/list">
						<img
							className="d-block mx-auto mb-2 mt-2"
							src={listicon}
							alt="3"
							width="50"
							height="50"
						/>
					</Link>
				</div>
				{/* <Modal show={show} onHide={handleClose}>
					<Modal.Header closeButton>
						<Modal.Title>Modal heading</Modal.Title>
					</Modal.Header>
					<Modal.Body>Woohoo, you reading this text in a modal!</Modal.Body>
					<Modal.Footer>
						<Button variant="secondary" onClick={handleClose}>
							Close
						</Button>
						<Button variant="primary" onClick={handleClose}>
							Save Changes
						</Button>
					</Modal.Footer>
				</Modal> */}
			</div>
		</div>
	);
};

export default MenuPanel;