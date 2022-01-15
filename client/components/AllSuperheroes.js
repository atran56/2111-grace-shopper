import React from "react";
import { fetchSuperheroes } from "../store/superheroes";
import { connect } from "react-redux";

class AllSuperheroes extends React.Component {
  componentDidMount() {
    this.props.superheroesData();
  }
  render() {
    return (
      <div className="outer_container">
        <div className="container" style={{ width: 200, height: 350 }}>
          {this.props.superheroes.map((superhero) => {
            return (
              <div key={superhero.id}>
                <div className="col">
                  <div className="card shadow-sm">
                    <img
                      className="bd-placeholder-img card-img-top"
                      style={{ width: 150, height: 225 }}
                      src={superhero.image}
                    ></img>

                    <div className="card-body">
                      <span>{superhero.name}</span>
                      <p className="card-text">{superhero.bio}</p>
                      <div className="d-flex justify-content-between align-items-center">
                        <div className="btn-group">
                          <button
                            type="button"
                            className="btn btn-sm btn-outline-secondary"
                          >
                            View
                          </button>
                          <button
                            type="button"
                            className="btn btn-sm btn-outline-secondary"
                          >
                            Edit
                          </button>
                        </div>
                        <small className="text-muted">9 mins</small>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

const mapState = (state) => ({
  superheroes: state.superheroes,
});

const mapDispatch = (dispatch) => ({
  superheroesData: () => dispatch(fetchSuperheroes()),
});

export default connect(mapState, mapDispatch)(AllSuperheroes);
