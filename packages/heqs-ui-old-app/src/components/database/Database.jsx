import React from 'react'
import { Container } from 'react-bootstrap'
import { database, correctiveactions, ticketsicon } from '../../img/indexImage'
import { Link } from 'react-router-dom'

const Database = () => {
  return (
    <div className="wrap">
      <Container>
        <div className="d-flex gap-3 mt-3 justify-content-sm-center ">
          <img src={database} alt="database" />
          <h1 className="title-header colorTextLightGray title-DB">Database</h1>
        </div>
        <div className="cardHeight d-flex justify-content-sm-around align-items-center m-5">
          <Link to="/tickets">
            <img src={ticketsicon} className="database-icons-tickets" alt="tickets" />
          </Link>
          <Link to="/">
            <img
              src={correctiveactions}
              className="database-icons-corract"
              alt="correctiveactions"
            />
          </Link>
        </div>
        <Link to="/" className="close">
          <strong>&times;</strong>
        </Link>
      </Container>
    </div>
  )
}

export default Database
