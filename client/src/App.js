import React, { Component } from 'react';
import Axios from 'axios';
import {BrowserRouter as Router, Route, Link } from 'react-router-dom';
import OtherPage from './OtherPage';

export default class RouterMain extends Component {
    render(){
        return(
            <Router>
                <div>
                    <header>
                        <h1>Welcome to react</h1>
                        <span style={{margin:'10px'}}><Link to='/'>Home</Link></span>
                        <span><Link to='/otherPage'>otherPage</Link></span>
                    </header>
                </div>
                <div style={{margin: '10px'}}>
                    <Route exact path='/' component={App} />
                    <Route exact path='/otherPage' component={OtherPage} />
                </div>
            </Router>
        )
    }
}

class App extends Component {
    state = {
        text: '',
        values: {},
        seenIndexes: [],
    }

    componentDidMount(){
        this.fetchValues()
        this.fetchIndexes();
    }
    fetchValues = async () => {
        const values = await Axios.get('/api/values/current');
        this.setState({
            values: values.data,
        })
    };

    fetchIndexes = async () => {
        const seenIndexes = await Axios.get('/api/values/all');
        this.setState({
            seenIndexes: seenIndexes.data,
        });
    };

    onTextChange = event => {
        this.setState({
            text: event.target.value,
        });
    }

    renderValues = () => {
        const entries = [];
        for(let key in this.state.values){
            entries.push(
                <div key={key}>for index {key} i calculated {this.state.values[key]}</div>
            );
        }
        return entries.length===0?<div>No values</div>: entries;
    }

    handleSubmit  = event => {
        event.preventDefault();
        Axios.post('/api/values', {
            index: this.state.text
        });
        this.setState({text: ''})
    }
    render(){
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <label>Enter you index:</label>
                    <input type='text' onChange={this.onTextChange} value={this.state.text} placeholder="enter index here < 42" />
                    <button type='submit'>submit</button>
                </form>
                <h3>Indexes i have seen:</h3>
                <div>{this.state.seenIndexes.length===0?<div>No Indexes seen</div>:this.state.seenIndexes.map(({number})=> number).join(',')}</div>

                <h3>calculated values</h3>
                <div>{this.renderValues()}</div>
            </div>
            
        )
    }
}