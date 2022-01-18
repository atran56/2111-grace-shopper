import React, { Component } from "react";
import { connect } from "react-redux";
import { addSuperhero } from "../store/superheroes";
import { Link } from "react-router-dom";

class AddSuperhero extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      universe: "",
      availability: [],
      strengths: "",
      bio: "",
      cost: "",
      image: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value,
    });
  }

  handleSubmit(evt) {
    evt.preventDefault();
    this.props.createSuperhero({ ...this.state });
  }

  render() {
    const { name, bio, image, cost, universe, strengths } = this.state;

    return (
      <div>
        <form
          className="container"
          style={{ margin: "10px" }}
          onSubmit={this.handleSubmit}
        >
          <label htmlFor="superheroName" className="form-label">
            Superhero Name
          </label>
          <input
            className="form-control"
            name="name"
            id="exampleFormControlInput1"
            onChange={this.handleChange}
            value={name}
          />
          <br />
          <label htmlFor="Universe" className="form-label">
            Universe
          </label>
          <input
            className="form-control"
            name="universe"
            id="exampleFormControlInput1"
            onChange={this.handleChange}
            value={universe}
          />
          <br />
          <label htmlFor="superheroName" className="form-label">
            Strengths
          </label>
          <input
            className="form-control"
            name="strengths"
            id="exampleFormControlInput1"
            onChange={this.handleChange}
            value={strengths}
          />
          <br />
          <label htmlFor="superheroBio" className="form-label">
            Biography
          </label>
          <textarea
            name="bio"
            className="form-control"
            id="exampleFormControlTextarea1"
            rows="3"
            onChange={this.handleChange}
            value={bio}
          ></textarea>

          <br />
          <label htmlFor="superheroName" className="form-label">
            Cost per Day
          </label>
          <input
            className="form-control"
            name="cost"
            id="exampleFormControlInput1"
            onChange={this.handleChange}
            value={cost}
          />
          <br />
          <label htmlFor="formFile" className="form-label">
            Superhero Image
          </label>
          <input className="form-control" type="file" id="formFile" />
          <br />
          <button
            style={{ marginRight: "10px", marginLeft: "45%" }}
            type="submit"
            className="btn btn-secondary"
          >
            Add
          </button>

          <Link to="/superheroes">
            <button type="button" className="btn btn-outline-secondary">
              Cancel
            </button>
          </Link>
        </form>
      </div>
    );
  }
}

const mapDispatch = (dispatch, { history }) => ({
  createSuperhero: superhero => dispatch(addSuperhero(superhero, history)),
});

export default connect(null, mapDispatch)(AddSuperhero);
