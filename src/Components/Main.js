import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet';

class Main extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            items: [],
            removeMovie: '',
            filter: '',

            finished: false
        }
    }

    componentDidMount() {
        axios
            .get('http://3.120.96.16:3001/movies')
        .then(res => {
            let data = res.data;
            this.setState({items: data});
            this.setState({finished: true});
        })
        .catch(() => this.setState({finished: false}));
    }

    removeMovie = (id) => {

        axios
            .delete(`http://3.120.96.16:3001/movies/${id}`)
        .then(res => console.log(res))
    }

    searchMovie = (e) => {
        return this.setState({filter: e.target.value})
    }

    render() {
        const { items, filter, finished } = this.state;

        if(!finished) {
            return (
                <p>Server fel</p>
            )
        }

        let main = <table className="table-main">
        <thead>
            <tr>
                <th>Title</th>
                <th>Director</th>
                <th>Rating</th>
            </tr>
        </thead>
        <tbody>

            {items.filter((sMovie) => {
                let search = filter;

                if (!search) {
                    return sMovie
                } else {
                    if (sMovie.title.toLowerCase().indexOf(search) === -1 && sMovie.director.toLowerCase().indexOf(search) === -1) {
                        return false
                    } else {
                        return true
                    }
                } 
            }).map(data => (
                <tr key={data.id}>
                    <td className="td-main">{data.title}</td>
                    <td className="td-main">{data.director}</td>
                    <td className="td-main">{data.rating}</td>

                    <td className="btn-edit-details">
                        <button type="submit" onClick={() => this.removeMovie(data.id)}>Delete movie</button>

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
                <Helmet>
                    <title>Main page</title>
                </Helmet>

                <div className="div-searchMovie">
                    <input 
                        type="text" 
                        onChange={this.searchMovie.bind(this)}
                        placeholder="Search for movies ..."
                        className="input-searchMovie"
                    />
                </div>
                {main}
            </div>
        )
    }
}

export default Main
