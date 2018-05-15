import React, { Component } from 'react';

class Planets extends Component {
    constructor(props) {
        super(props);
        this.state = {
            planets: []
        }
    }

    componentDidMount() {
        // const planetCalls = this.props.planetUrls.map(url => {
        //   return fetch(url).then(response => response.json())
        // });

        Promise.all([
            fetch('https://swapi.co/api/planets/2/')
                .then(response => response.json()),
            fetch('https://swapi.co/api/planets/3/')
                .then(response => response.json()),
            fetch('https://swapi.co/api/planets/1/')
                .then(response => response.json())
        ]).then(planetsFromApi => {
            this.setState((prevState, props) => {
                return {
                    planets: planetsFromApi
                }
            })
        });
    }

    render() {
        console.log(this.state);
        return (
            <ul>
                {this.state.planets.map(planet => {
                    return <li>{planet.name}</li>;
                })}
            </ul>
        )
    }
}

export default Planets;