import React, { Component } from 'react'
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import { Helmet } from 'react-helmet';

class Add extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            title: '',
            director: '',
            rating: '',
            description: '',

            finished: false,
            catchErr: false
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

    addMovie = (e) => {
        let { title, director, rating, description } = this.state;

        let data = {
            "title": title,
            "director": director,
            "rating": rating,
            "description": description
        }

        axios
            .post('http://3.120.96.16:3001/movies', data)
        .then(() => this.setState({finished: true}))
        .catch(() => this.setState({catchErr: true}))
    }


    render() {
        const { catchErr ,finished ,title, director, rating, description } = this.state;

        if (finished) {
            return <Redirect to="/"/>
        }

        if (catchErr) {
            return <p>Kan inte adda flera filmer, antigen så är det fel på servern eller så är det redan upp till 20 filmer addade  OSB max 20 filmer kan addas</p>
        }

        return (
            <div>
                <Helmet>
                    <title>Add page</title>
                </Helmet>
                <form onSubmit={e => e.preventDefault()}>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <label style={{ padding: '6rem', fontSize:'2rem' }}>Title:
                            <input 
                                type="text" 
                                minLength="1" 
                                maxLength="40" 
                                value={title} 
                                onChange={this.addTitle.bind(this)} 
                                style={{ fontSize: '1.3rem' }}
                            />
                        </label>

                        <label style={{ padding: '6rem', fontSize:'2rem' }}>Director:
                            <input 
                                type="text"
                                minLength="1" 
                                maxLength="40" 
                                value={director} 
                                onChange={this.addDirector.bind(this)} 
                                style={{ fontSize: '1.3rem' }} 
                            />
                        </label>

                        <label style={{ padding: '6rem', fontSize:'2rem' }}>Rating:
                            <input 
                                type="range" 
                                min="0.0" 
                                step="0.1" 
                                max="5.0" 
                                value={rating} 
                                onChange={this.addRating.bind(this)} 
                                style={{ fontSize: '1.3rem' }} 
                            />
                            <p>{rating}</p>
                        </label>
                    </div>

                    <div style={{ marginLeft: '5rem', padding: '3rem' }}>
                    <textarea 
                        value={description}
                        onChange={this.addDescription.bind(this)}
                        minLength="1" maxLength="300"
                        cols="60" rows="10"
                        style={{ fontSize: '1.8rem' }}
                        placeholder="Write movie description..."></textarea>

                        <button 
                            type="submit" 
                            onClick={this.addMovie.bind(this)} 
                            style={{ 
                                    fontSize: '2rem', 
                                    marginLeft: '2rem', 
                                    borderRadius: '20%', 
                                    backgroundColor: 'green' 
                                    }}>Add movie</button>
                    </div>
                </form>
            </div>
        )
    }
}

export default Add
