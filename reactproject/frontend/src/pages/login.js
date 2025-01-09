import React, { Component } from 'react';
import { Form, FormGroup, FormControl, Button, FormLabel } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';

import '../App.css';
import Auth from '../components/auth';
import LoginSucess from './loginSucess';


function PageHeading() {
    return (
        <div className="loginPage">
            <h2>Login Page</h2>
        </div>
    )
}

class LoginPage extends Component {

    constructor(props) {
        super(props);
        this.usernameFm = React.createRef();
        this.passwordFm = React.createRef();
        this.state = {
            status: null,
            id: null,
            message: null
        };
    }

    static contextType = Auth;

    submitHandler() {
        <Redirect to="/loginSucess">
            <LoginSucess
                userId={this.state.id}
                message={this.state.message}
            />
        </Redirect>;
    };

    onClickHandler = event => {
        event.preventDefault();

        const username = this.usernameFm.current.value;
        const password = this.passwordFm.current.value;

        if (username.trim().length === 0 || password.trim().length === 0) {
            return this.setState({
              status: "error",
              message: "Please enter username and password",
              id: 0
            });
          }

        /*
                if (username.trim().length === 0 || password.trim().length === 0) {
                    this.context({
                        status: "error",
                        message: "Please enter username and password",
                        id: 0
                    })
                }
        */
        let requestBody = {
            username: `${username}`,
            password: `${password}`
        }

        fetch('http://localhost:9000/users/login', {
            method: 'POST',
            body: JSON.stringify(requestBody),
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            }
        })
            .then(res => {
                return res.json();
            })
            .then(resData => {
                if (resData.status === "error") {
                    this.setState({
                        status: resData.status,
                        message: resData.error,
                        id: 0
                    });
                }
                else if (resData.status === "ok") {
                    this.setState({
                        status: resData.status,
                        id: resData.id,
                        message: resData.username
                    });
                    this.context.token = resData.token;
                    this.context.id = resData.id;
                }
                console.log("token: " + this.context.token);
            })
            .catch(err => {
                console.log(err);
            });
            
    };

    render() {
        return (
            <div>
                <div>
                    <PageHeading />
                </div>
                <div>
                    <LoginSucess
                        userId={this.state.id}
                        message={this.state.message}
                    />
                </div>
                <Form className="auth-form" onSubmit={this.onClickHandler}>
                    <FormGroup controlId="formUsername" className="text-field" >
                        <FormLabel>Username: </FormLabel>
                        <FormControl type="text" placeholder="Username" ref={this.usernameFm} />
                    </FormGroup>
                    <FormGroup controlId="formPassword" className="text-field">
                        <FormLabel>Password: </FormLabel>
                        <FormControl type="password" placeholder="Password" ref={this.passwordFm} />
                    </FormGroup>
                    <FormGroup controlId="formSubmit">
                        <Button className="submitButton" type="submit">
                            Login
                        </Button>
                    </FormGroup>
                </Form>
            </div>
        )
    }
}

export default LoginPage;