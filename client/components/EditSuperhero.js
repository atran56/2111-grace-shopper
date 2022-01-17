import React from "react";
import { fetchSuperhero } from "../store/singleSuperhero";
import { deleteSuperhero, updateSuperhero } from "../store/superheroes";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class EditSuperhero extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      bio: "",
      image: "",
      cost: "",
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.props.fetchSuperhero(this.props.match.params.id);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.superhero.id !== this.props.superhero.id) {
      this.setState({
        name: this.props.superhero.name || "",
        bio: this.props.superhero.bio || "",
        cost: this.props.superhero.cost || "",
        image: this.props.superhero.image,
      });
    }
  }
  handleChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value,
    });
  }
  handleSubmit(evt) {
    evt.preventDefault();
    this.props.updateSuperhero({ ...this.props.superhero, ...this.state });
  }

  render() {
    const { name, bio, cost } = this.state;
    return (
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
        <label htmlFor="superheroBio" className="form-label">
          Biography
        </label>
        <textarea
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
          style={{ marginRight: "10px", marginLeft: "30%" }}
          type="submit"
          className="btn btn-secondary"
        >
          Save Changes
        </button>
        <button
          style={{ marginRight: "10px" }}
          type="delete"
          className="btn btn-secondary"
          onClick={() => this.props.deleteSuperhero(this.props.match.params.id)}
        >
          Delete
        </button>
        <Link to="/superheroes">
          <button type="button" className="btn btn-outline-secondary">
            Cancel
          </button>
        </Link>
      </form>
    );
  }
}

const mapState = ({ superhero }) => ({
  superhero,
});

const mapDispatch = (dispatch, { history }) => ({
  fetchSuperhero: superheroId => dispatch(fetchSuperhero(superheroId)),
  updateSuperhero: superhero => dispatch(updateSuperhero(superhero, history)),
  deleteSuperhero: superhero => dispatch(deleteSuperhero(superhero, history)),
});

export default connect(mapState, mapDispatch)(EditSuperhero);
