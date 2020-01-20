import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

import NavLinks from './NavLinks';
import DeleteMovie from './DeleteMovie';

class Main extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            items: [],
            removeMovie: ''
        }
    }

    componentDidMount() {
        axios
            .get('http://3.120.96.16:3001/movies')
        .then(res => {
            let data = res.data;
            this.setState({items: data})
        })
    }

    removeMovie = (id, title, director, rating) => {
        let data = {
            "id": id,
            "title": title,
            "director": director,
            "rating": rating
        }

        axios
            .delete(`http://3.120.96.16:3001/movies/${id}`, data)
        .then(res => console.log(res))
        .catch(err => console.log(err))
    }

    render() {
        const { items } = this.state;
// document.querySelector('#root').chi
        let main = <table>
        <thead>
            <tr>
                <th>Title</th>
                <th>Director</th>
                <th>Rating</th>
            </tr>
        </thead>
        <tbody>
            {items.map(data => (
                <tr key={data.id}>
                    <td>{data.title}</td>
                    <td>{data.director}</td>
                    <td>{data.rating}</td>

                    <td>
                        <button type="submit" onClick={() => this.removeMovie(data.id, data.title, data.director, data.rating)}>Delete movie</button>

                    <Link to={"/edit/" + data.id}>
                        <p>Edit the movie</p>
                    </Link>

                    <Link to={"/details/" + data.id}>
                        <p>Details</p>
                    </Link>
                    </td>
                </tr>
            ))}
        </tbody>
    </table>

        return (
            <div>
                <NavLinks />
                {main}
            </div>
        )
    }
}

export default Main
