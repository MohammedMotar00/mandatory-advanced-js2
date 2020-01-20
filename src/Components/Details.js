import React, { Component } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';

class Details extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            description: [],
            finished: false
        }
    }

    componentDidMount() {
        let id = this.props.id;
        axios(`http://3.120.96.16:3001/movies/${id}`)
        .then(res => {

            let descrp = this.state.description;
            descrp.push(res);

            this.setState({description: descrp})
        })
        .catch(() => this.setState({finished: true}))
    }

    render() {
        const { description, finished } = this.state;

        if(finished) {
            return <p>Filmen finns ej längre</p>
        }

        let movieDescription = description.map(info => {
            let data = info.data;
            return (
                <div key={data.id}>
                    <div>
                        <p>Title: {data.title}</p>
                        <p>Director: {data.director}</p>
                        <p>Rating: {data.rating}</p>
                        <Link to={"/edit/" + data.id}>
                            <button>Edit movie</button>
                        </Link>
                    </div>
                    <div>
                        <p>Description: {data.description}</p>
                    </div>
                </div>
            )
        })

        return (
            <div>
                <Helmet>
                    <title>Details page</title>
                </Helmet>
                {movieDescription}
            </div>
        )
    }
}

export default Details
