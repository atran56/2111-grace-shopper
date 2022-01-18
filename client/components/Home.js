import React from 'react'
import {connect} from 'react-redux'
import Carousel from "./Carousel"

/**
 * COMPONENT
 */
export const Home = props => {
  const {email} = props

  return (
    <div className="container mt-3">
      <div className="row mt-1">
        <h5>Welcome! You are logged in as: {email}.</h5>
      </div>
      <div className="row mt-1">
        <Carousel />
      </div>
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    email: state.auth.email
  }
}

export default connect(mapState)(Home)
