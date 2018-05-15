import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import { 
  BrowserRouter, Route, Link
} from 'react-router-dom';

const About = () => <p>This is a Star Wars film app</p>;

class FilmDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      film: {}
    };
  }

  componentDidMount() {
    const filmId = this.props.match.params.filmId;
    fetch(`https://swapi.co/api/films/${filmId}/`)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        this.setState((prevState, props) => {
          return { film: data };
        });
      });
    // make API call here and update state
  }

  render() {
    const { title, opening_crawl } = this.state.film;
    // const title = this.state.film.title;
    // const opening_crawl = this.state.film.opening_crawl
    return (
      <div>
        <h2>{title}</h2>
        <p>{opening_crawl}</p>
        <Link to="/about">About</Link>
      </div>
    )
  }
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      films: []
    };
  }

  componentDidMount() {
    fetch('https://swapi.co/api/films')
      .then(response => response.json())
      .then(data => {
        this.setState((prevState, props) => {
          return {
            films: data.results
          };
        });
      })
      .catch(error => console.log(error));
    }
    
  render() {
    console.log('state', this.state);
    return (
      <div className="App">
        {this.state.films.map(film => <p>{film.title}</p>)}
        <BrowserRouter>
          <div>
            <Route path="/about" component={About} />
            <Route path="/films/:filmId" component={FilmDetail} />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
