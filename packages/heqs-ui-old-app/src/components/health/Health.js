import React from 'react'
import { Link } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import { health } from '../../img/indexImage'
import PossibleAccident from './PossibleAccident'
import Accident from './Accident'
import Nearmiss from './Nearmiss'
import 'bootstrap/dist/css/bootstrap.css'
import '../../css/button.css'
import '../../css/modalAll.css'
import './Health.css'

const Health = () => {
  return (
    <div className="Main">
      <div className="popup col-lg-12">
        <Container>
          <div className="wrap">
            <div className="title flex justify-content-center">
              <div className="mt-1">
                <img src={health} alt="health" />
              </div>
              <h2 className="title-text colorTextLightGray text-update">
                Occupational health and safety
              </h2>
            </div>
            <div className="d-grid gap-4 d-sm-flex justify-content-sm-center btn-wrap">
              <button
                id="Accident"
                className="button health"
                data-bs-target="#accident"
                data-bs-toggle="modal"
              >
                Accident
              </button>
              <button
                id="Accident"
                className="button health"
                data-bs-target="#nearmiss"
                data-bs-toggle="modal"
              >
                Nearmiss
              </button>
              <button
                id="Possible_accident"
                className="button health"
                data-bs-target="#possibleAccident"
                data-bs-toggle="modal"
              >
                Possible accident
              </button>
            </div>
            <Link to="/" className="close">
              <strong>&times;</strong>
            </Link>
          </div>
          <div
            className="modal fade"
            id="accident"
            tabIndex="-1"
            aria-labelledby="modalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog modal-dialog-centered modal-xl">
              <Container>
                <div className="modal-content modalbgc">
                  <div className="modal-header">
                    <div className="title title-modal">
                      <div className="mt-1">
                        <img src={health} alt="health" />
                      </div>
                      <h2 className="title-text-form title-text colorTextLightGray text-center">
                        Accident
                      </h2>
                    </div>
                    <button
                      type="button"
                      className="btn-close btn-close-modal btn-close-white"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    />
                  </div>
                  <div className="modal-body">
                    <Accident />
                  </div>
                </div>
              </Container>
            </div>
          </div>
          <div
            className="modal fade"
            id="nearmiss"
            tabIndex="-1"
            aria-labelledby="modalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog modal-dialog-centered modal-xl">
              <Container>
                <div className="modal-content modalbgc">
                  <div className="modal-header">
                    <div className="title title-modal">
                      <div className="mt-1">
                        <img src={health} alt="health" />
                      </div>
                      <h2 className="title-text-form title-text colorTextLightGray text-center">
                        Nearmiss
                      </h2>
                    </div>
                    <button
                      type="button"
                      className="btn-close btn-close-modal btn-close-white"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    />
                  </div>
                  <div className="modal-body">
                    <Nearmiss />
                  </div>
                </div>
              </Container>
            </div>
          </div>
          <div
            className="modal fade"
            id="possibleAccident"
            tabIndex="-1"
            aria-labelledby="modalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog modal-dialog-centered modal-xl">
              <Container>
                <div className="modal-content modalbgc">
                  <div className="modal-header">
                    <div className="title title-modal">
                      <div className="mt-1">
                        <img src={health} alt="health" />
                      </div>
                      <h2 className="title-text-form title-text colorTextLightGray text-center">
                        Possible accident
                      </h2>
                    </div>
                    <button
                      type="button"
                      className="btn-close btn-close-modal btn-close-white"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    />
                  </div>
                  <div className="modal-body">
                    <PossibleAccident />
                  </div>
                </div>
              </Container>
            </div>
          </div>
        </Container>
      </div>
    </div>
  )
}

export default Health
