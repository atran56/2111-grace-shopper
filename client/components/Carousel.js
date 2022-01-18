import React from "react";
import { connect } from "react-redux";
import { fetchSuperheroes } from "../store/superheroes";

class Carousel extends React.Component {
  componentDidMount() {
    this.props.superheroesData();
  }
  render() {
      console.log(this.props.superheroes)
    return (
        <div className="container mt-2">
            <div className="row">
                <div className="col">
        <div id="carouselExampleCaptions" className="carousel slide" data-bs-ride="carousel">
        <div className="carousel-indicators">
          <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1" />
          <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2" />
          <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3" />
        </div>
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img src="https://cf-images.us-east-1.prod.boltdns.net/v1/static/5359769168001/0a823cb0-01a9-4835-a348-c64187783ccb/d37cb96c-805c-4aa2-9f2f-e62d9eb814c7/1280x720/match/image.jpg" className="d-block w-100" alt="..." />
            <div className="carousel-caption d-none d-md-block">
              <h5>Captain America</h5>
              <a class="btn btn-primary" href="/superheroes/25" role="button">BOOK ME</a>
            </div>
          </div>
          <div className="carousel-item">
            <img src="https://i2.wp.com/stimulatedboredom.com/wp-content/uploads/2015/04/jean_grey_marvel_xmen_superheroes_comics_2560x1440_hd-wallpaper-1899852.jpg?fit=2560%2C1440" className="d-block w-100" alt="..." />
            <div className="carousel-caption d-none d-md-block">
              <h5>Jean Grey</h5>
              <a class="btn btn-primary" href="/superheroes/29" role="button">BOOK ME</a>
            </div>
          </div>
          <div className="carousel-item">
            <img src="https://www.quirkbooks.com/sites/default/files/styles/blog_detail_featured_image/public/u1150/katnis%20everdeen.jpg?itok=nS_M14od" className="d-block w-100" alt="..." />
            <div className="carousel-caption d-none d-md-block">
              <h5>Katniss Everdeen</h5>
              <a class="btn btn-primary" href="/superheroes/4" role="button">BOOK ME</a>
            </div>
          </div>
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true" />
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true" />
          <span className="visually-hidden">Next</span>
        </button>
        </div>

      </div>
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

export default connect(mapState, mapDispatch)(Carousel);
