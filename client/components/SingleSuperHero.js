import React from "react";
import { fetchSuperhero } from "../store/singleSuperhero";
import { addToCart } from "../store/cart";
import { connect } from "react-redux";
export class SingleSuperHero extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      days: 0,
      total: 0,
      added: false
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
            <p>
              <b>TOTAL</b>: {this.state.total}
            </p>

            <form className="form-control-sm" onSubmit={this.handleSubmit}>
              <select
                className="form-select"
                value={this.state.days}
                onChange={this.handleChange}
              >
                <option value="0">-SELECT DAY(S)-</option>
                <option value="1">1 day</option>
                <option value="2">2 days</option>
                <option value="3">3 days</option>
                <option value="4">4 days</option>
                <option value="5">5 days</option>
                <option value="6">6 days</option>
                <option value="7">7 days</option>
                <option value="8">8 days</option>
                <option value="9">9 days</option>
                <option value="10">10 days</option>
              </select>

              <input
                className="book btn btn-primary mb-3"
                type="submit"
                value="Book"
              />
              {this.state.added ? <p>{this.props.superhero.name} has been added to your cart!</p> :
              null}
            </form>
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
