import React from "react";
import { fetchSuperhero } from "../store/single_superhero";
import { connect } from "react-redux";
export class SingleSuperHero extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      days: 0,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    console.log("single superhero->", this.props);
    this.props.fetchSuperhero(this.props.match.params);
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  handleSubmit() {
    //Should this be created and submitted in the cart table
  }

  render() {
    console.log("Single SuperHero Rendering PROPS-->", this.props);
    return (
      <div>
        <h1>{this.props.superhero.name}</h1>
        <div>
          <img
            src="https://www.superherodb.com/pictures2/portraits/10/100/829.jpg"
            alt="SuperHero Angel"
          />

          <p>{this.props.superhero.bio}</p>
          <p>{this.props.superhero.cost}</p>
        </div>
        <form>
          <select value={this.state.days} onChange={this.handleChange}>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
          </select>
          <input type="submit" value="BOOK" />
        </form>
      </div>
    );
  }
}

const mapState = (state) => ({
  superhero: state.superhero,
});

const mapDispatch = (dispatch) => ({
  fetchSuperhero: () => dispatch(fetchSuperhero()),
});

export default connect(mapState, mapDispatch)(SingleSuperHero);
