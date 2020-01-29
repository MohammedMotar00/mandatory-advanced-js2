import React, { Component } from 'react'
import axios from 'axios';
import { Helmet } from 'react-helmet';

class Edit extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            description: [],
            title: '',
            director: '',
            rating: '',
            description2: '',
            id: props.id,

            errEdit: false,
            errServer: false
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
        .catch(() => this.setState({errServer: true}))
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
        .catch(() => this.setState({errEdit: true}))
    }

    render() {
        const { description, title,rating, director, description2, errEdit, errServer } = this.state;

        if (errEdit) return <p>OBS fel i servern, återkom senare!</p>

        if (errServer) return <p>OBS filmen är inte tillänglig</p>

        let oldMovieInfo = description.map(info => {
            let data = info.data;

            return (
                <div key={data.id}>
                    <form onSubmit={event => event.preventDefault()}>
                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                            <label style={{ padding: '6rem', fontSize:'2rem' }}>Title:
                                <input 
                                    type="text" 
                                    value={title} 
                                    onChange={this.changeTitle.bind(this)} 
                                    style={{ fontSize: '1.3rem' }} 
                                />
                            </label>

                            <label style={{ padding: '6rem', fontSize:'2rem' }}>Director:
                                <input 
                                    type="text" 
                                    value={director} 
                                    onChange={this.changeDirector.bind(this)} 
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
                                    onChange={this.changeRating.bind(this)} 
                                    style={{ fontSize: '1.3rem' }} 
                                />
                                <p>{rating}</p>
                            </label>
                        </div>

                        <div style={{ marginLeft: '5rem', padding: '3rem' }}>
                            <strong style={{ fontSize: '3rem' }}>Description:</strong> <br/>
                            <textarea 
                                maxLength="300" 
                                style={{ fontSize: '1.8rem' }} 
                                value={description2} 
                                onChange={this.changeDescription.bind(this)} 
                                cols="60" 
                                rows="10"
                            ></textarea>
                            <button 
                                style={{ 
                                        fontSize: '2rem', 
                                        marginLeft: '2rem', 
                                        borderRadius: '20%', 
                                        backgroundColor: 'green' 
                                        }} 
                                type="submit" 
                                onClick={this.saveChanges.bind(this)}>Save changes</button>
                        </div>
                    </form>
                </div>
            )
        })

        return (
            <div>
                <Helmet>
                    <title>Edit page</title>
                </Helmet>
                {oldMovieInfo}
            </div>
        )
    }
}

export default Edit
