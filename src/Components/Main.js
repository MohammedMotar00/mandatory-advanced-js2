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

    sendMovieInfo = (e) => {
        console.log(e.target.parentElement.parentElement.parentElement)
    }

    deleteMovie = (e) => {
        console.log()
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
                        {/* <DeleteMovie /> */}
                        <button type="submit" onClick={this.sendMovieInfo}>Delete movie</button>
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
