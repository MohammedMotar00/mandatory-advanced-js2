import React, { Component } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';

class Details extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            description: []
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
    }

    render() {
        const { description } = this.state;

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
                {movieDescription}
            </div>
        )
    }
}

export default Details
