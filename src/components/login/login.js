import React from 'react';
import { Link } from 'react-router';


export default class Login extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
               <p>Please choose a repository from the list below.</p>
               <ul>
                   <li><Link to="/game">Game</Link></li>
               </ul>
           </div>
        );
    }
}

Login.propTypes = {};
