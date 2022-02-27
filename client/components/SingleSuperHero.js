import React from "react";
import { fetchSuperhero } from "../store/singleSuperhero";
import { addToCart } from "../store/cart";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { DateRangePicker } from 'react-date-range';
import { Calendar } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file

export class SingleSuperHero extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      days: 0,
      total: 0,
      added: false,
      validUser: true,
      startDate: new Date(),
      endDate: new Date()
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.props.fetchSuperhero(this.props.match.params.id);
  }

  handleChange(e) {
    this.setState({
      days: e.target.value,
      total: e.target.value * this.props.superhero.cost,
    });
  }

  handleSubmit(evt) {
    evt.preventDefault();
      this.props.addToCart({
        superheroId: this.props.superhero.id,
        days: this.state.days,
      });
      this.setState({
        days: 0,
        total: 0,
        added: true
      });
  }

  render() {
    const selectionRange = {
      startDate: this.state.startDate,
      endDate: this.state.endDate,
      key: 'Selection'
    }
    let bookAlert;
    if(this.state.added) {
      bookAlert = 
      <div class="alert alert-success" role="alert">
        {this.props.superhero.name} has been added to your cart!
      </div>
    }
    else {
      bookAlert = null
    }
    return (
      <div className="container singleSH">
        <div className="row">
          <h1>
            {this.props.superhero.name} ({this.props.superhero.universe})
          </h1>
          <div class="col-6">
            <img
              className="img-single"
              src={this.props.superhero.image}
              alt={this.props.superhero.name}
            />
          </div>
          <div class="col-6">
            <p>{this.props.superhero.bio}</p>
            <p>
              <b>STRENGTHS</b>: {this.props.superhero.strengths}
            </p>
            <p>
              <b>COST</b>: {this.props.superhero.cost}
            </p>
            <span >
                <b>TOTAL</b>: {this.state.total} 
              <input
                  className="book btn btn-primary mb-3"
                  id="bookBtn"
                  type="submit"
                  value="Book"
                  onSubmit={this.handleSubmit}
                />
              </span>
              <div>
                <Calendar ranges={[selectionRange]} onChange={this.handleChange} />
              </div>
              {bookAlert}
          </div>
        </div>
      </div>
    );
  }
}

const mapState = (state) => ({
  superhero: state.singleSuperHero,
});

const mapDispatch = (dispatch) => ({
  fetchSuperhero: (id) => dispatch(fetchSuperhero(id)),
  addToCart: (item) => dispatch(addToCart(item)),
});

export default connect(mapState, mapDispatch)(SingleSuperHero);
