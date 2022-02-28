import React from "react";
import { fetchSuperhero } from "../store/singleSuperhero";
import { addToCart } from "../store/cart";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { DateRange } from 'react-date-range';
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

  async handleChange(ranges) {
    console.log(ranges)
    const day = 1000 * 60 * 60 * 24;
    const difference = Math.round(ranges.selection.endDate.getTime()-ranges.selection.startDate.getTime())/(day);
    const exactDifference = Number(difference.toFixed(0)) + 1;
    await this.setState({
      startDate: ranges.selection.startDate,
      endDate: ranges.selection.endDate,
      days: exactDifference,
      total: exactDifference * this.props.superhero.superhero.cost
    });
    console.log(this.state, difference)
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
    if (this.props.superhero.loading) {
      return <p>Data is loading...</p>
    }
    const selectionRange = {
      startDate: this.state.startDate,
      endDate: this.state.endDate,
      key: 'selection'
    }
    let bookAlert;
    if(this.state.added) {
      bookAlert = 
      <div className="alert alert-success" role="alert">
        {this.props.superhero.superhero.name} has been added to your cart!
      </div>
    }
    else {
      bookAlert = null
    }
    return (
      <div className="container singleSH">
        <div className="row">
          <h1>
            {this.props.superhero.superhero.name} ({this.props.superhero.superhero.universe})
          </h1>
          <div className="col-6">
            <img
              className="img-single"
              src={this.props.superhero.superhero.image}
              alt={this.props.superhero.superhero.name}
            />
          </div>
          <div className="col-6">
            <p>{this.props.superhero.superhero.bio}</p>
            <p>
              <b>STRENGTHS</b>: {this.props.superhero.superhero.strengths}
            </p>
            <p>
              <b>COST</b>: {this.props.superhero.superhero.cost}
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
                <DateRange ranges={[selectionRange]} minDate={new Date()} rangeColors={["#0c6efd"]} onChange={this.handleChange} />
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
  loading: state.loading
});

const mapDispatch = (dispatch) => ({
  fetchSuperhero: (id) => dispatch(fetchSuperhero(id)),
  addToCart: (item) => dispatch(addToCart(item)),
});

export default connect(mapState, mapDispatch)(SingleSuperHero);
