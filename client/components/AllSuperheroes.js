import React from "react";
import { fetchSuperheroes } from "../store/superheroes";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

// import Rating from './Rating';

class AllSuperheroes extends React.Component {
  componentDidMount() {
    this.props.superheroesData();
  }
  render() {
    const _isAdmin = this.props.isAdmin;
    return (
      <div className="album py-5 bg-light">
        <div className="container">
          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
            {this.props.superheroes.map(superhero => {
              return (
                <div className="col" key={superhero.id}>
                  <div className="card shadow-sm" style={{ padding: "10px" }}>
                    <img className="center-block" src={superhero.image}></img>

                    <div className="card-body">
                      <span>{superhero.name}</span>
                      <p className="card-text" style={{ fontSize: "9px" }}>
                        {superhero.bio}
                      </p>
                      <span style={{ fontSize: "10px" }}>
                        Rental Price: ${superhero.cost} / per day
                      </span>

                      {/* If we want to add Rating starts to each Superhero  */}
                      {/* < Rating rating={this.props.superheroes.rating} /> */}
                      <div className="d-flex justify-content-between align-items-center">
                        <div className="btn-group">
                          <Link to={`/superheroes/${superhero.id}`}>
                            <button
                              type="button"
                              className="btn btn-sm btn-outline-secondary"
                            >
                              View
                            </button>
                          </Link>
                          {_isAdmin ? (
                            <Link to={`/superheroes/${superhero.id}/edit`}>
                              <button
                                type="button"
                                className="btn btn-sm btn-outline-secondary"
                              >
                                Edit
                              </button>
                            </Link>
                          ) : null}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
            {_isAdmin ? (
              <Link to={"/add"}>
                <button type="submit" className="add_btn">
                  +
                </button>
              </Link>
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}

const mapState = state => {
  return { superheroes: state.superheroes, isAdmin: state.auth.administrator };
};

const mapDispatch = dispatch => ({
  superheroesData: () => dispatch(fetchSuperheroes()),
});

export default connect(mapState, mapDispatch)(AllSuperheroes);
