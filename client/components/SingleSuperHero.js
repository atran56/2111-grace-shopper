import React from "react";

export class SingleSuperHero extends React.Component {
  constructor() {
    super();
    this.state = {
      days: 0,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange() {}
  handleSubmit() {}

  render() {
    return (
      <div>
        <h1>(SUPER HERO NAME HERE)</h1>
        <div>
          <img
            src="https://www.superherodb.com/pictures2/portraits/10/100/829.jpg"
            alt="SuperHero Angel"
          />

          <p>(DESCRIPTION HERE)</p>
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
