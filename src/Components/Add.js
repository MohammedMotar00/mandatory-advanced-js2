import React, { Component } from 'react'
import axios from 'axios';

class Add extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            title: '',
            director: '',
            rating: '',
            description: ''
        }
    }

    addTitle = e => {
        this.setState({title: e.target.value})
    }

    addDirector = e => {
        this.setState({director: e.target.value})
    }

    addRating = e => {
        this.setState({rating: e.target.value})
    }

    addDescription = e => {
        this.setState({description: e.target.value})
    }

    addMovie = () => {
        let { title, director, rating, description } = this.state;

        let data = {
            "title": title,
            "director": director,
            "rating": rating,
            "description": description
        }

        axios
            .post('http://3.120.96.16:3001/movies', data)
        .then(res => console.log(res))
        .catch(err => console.log(err))
    }


    render() {
        const { title, director, rating, description } = this.state;
        return (
            <div>
                <form onSubmit={event => event.preventDefault()}>
                    <div>
                        <label>Title:</label>
                        <input type="text" value={title} onChange={this.addTitle.bind(this)} />

                        <label>Director:</label>
                        <input type="text" value={director} onChange={this.addDirector.bind(this)} />

                        <label>Rating:</label>
                        <input type="range" min="0.0" max="5.0" value={rating} onChange={this.addRating.bind(this)} />
                    </div>

                    <textarea value={description} onChange={this.addDescription.bind(this)} cols="30" rows="10" placeholder="Write movie description..."></textarea>

                    <button type="submit" onClick={this.addMovie.bind(this)}>Add movie</button>
                </form>
            </div>
        )
    }
}

export default Add
