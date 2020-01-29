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
                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                            <p style={{ padding: '6rem', fontSize:'2rem' }}>Title: {data.title}</p>
                            <p style={{ padding: '6rem', fontSize:'2rem' }}>Director: {data.director}</p>
                            <p style={{ padding: '6rem', fontSize:'2rem' }}>Rating: {data.rating}</p>

                            <Link to={"/edit/" + data.id} style={{ padding: '6rem', fontSize:'2rem' }}>
                                <button style={{ 
                                                fontSize: '2rem', 
                                                borderRadius: '20%', 
                                                backgroundColor: 'green' }}>Edit movie</button>
                            </Link>
                        </div>
                    </div>

                    <div style={{ marginLeft: '5rem', padding: '3rem' }}>
                    <strong style={{ fontSize: '3rem' }}>Description:</strong>
                        <p style={{ wordBreak: 'break-all', fontSize: '1.4rem', letterSpacing: '0.04em' }}>{data.description}</p>
                    </div>
                </div>
            )
        })

        return (
            <div style={{ height: '100vh' }}>
                <Helmet>
                    <title>Details page</title>
                </Helmet>
                {movieDescription}
            </div>
        )
    }
}

export default Details
