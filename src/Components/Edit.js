import React, { Component } from 'react'
import axios from 'axios';

class Edit extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            description: [],
            title: '',
            director: '',
            rating: '',
            description2: '',
            id: props.id
        }
    }

    componentDidMount() {
        let id = this.props.id;
        axios(`http://3.120.96.16:3001/movies/${id}`)
        .then(res => {
            this.setState({title: res.data.title});
            this.setState({director: res.data.director});
            this.setState({rating: res.data.rating});
            this.setState({description2: res.data.description});
            // this.setState({id: res.data.id});

            let descrp = this.state.description;
            descrp.push(res);

            this.setState({description: descrp})
        })
    }

    componentWillUpdate() {
        // console.log(this.state.id)
    }

    changeTitle = e => {
        this.setState({title: e.target.value})
    }

    changeDirector = e => {
        this.setState({director: e.target.value})
    }

    changeRating = e => {
        this.setState({rating: e.target.value})
    }

    changeDescription = e => {
        this.setState({description2: e.target.value})
    }

    saveChanges = () => {
        let { title, director, rating, description2, id } = this.state;

        let data = {
                "id": id,
                "title": title,
                "description": description2,
                "director": director,
                "rating": rating
        }

        axios
            .put(`http://3.120.96.16:3001/movies/${id}`, data)
        .then(res => console.log(res))
    }

    render() {
        const { description, title,rating, director, description2 } = this.state;

        let oldMovieInfo = description.map(info => {
            let data = info.data;

            return (
                <div key={data.id}>
                    <form onSubmit={event => event.preventDefault()}>
                        <div>
                            <label>Title:</label>
                            <input type="text" value={title} onChange={this.changeTitle.bind(this)} />

                            <label>Director:</label>
                            <input type="text" value={director} onChange={this.changeDirector.bind(this)} />

                            <label>Rating:</label>
                            <input type="range" min="0.0" max="5" value={rating} onChange={this.changeRating.bind(this)} />
                        </div>
                        <textarea value={description2} onChange={this.changeDescription.bind(this)} cols="30" rows="10"></textarea>

                        <button type="submit" onClick={this.saveChanges.bind(this)}>Save changes</button>
                    </form>
                </div>
            )
        })

        return (
            <div>
                {oldMovieInfo}
            </div>
        )
    }
}

export default Edit
