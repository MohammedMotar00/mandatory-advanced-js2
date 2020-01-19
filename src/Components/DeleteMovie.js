import React, { Component } from 'react'
import axios from 'axios';

class DeleteMovie extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            
        }
    }

    componentDidMount() {
        let id = this.props.id;
        axios(`http://3.120.96.16:3001/movies/${id}`)
        .then(res => console.log(res))
    }

    render() {
        return (
            <button>Delete Movie</button>
        )
    }
}

export default DeleteMovie
