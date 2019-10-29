import React from 'react'
import {connect} from "react-redux"
import {NavLink, withRouter} from "react-router-dom";
import { signIn, resetErrorMessage } from '../../actions'
import UserForm, {FormStyles, MandatoryInput} from "./UserForm";
import {userConstants} from "../../constants";
import { withStyles } from "@material-ui/styles";
import { Button, Container } from '@material-ui/core';

class Login extends UserForm {

    constructor(props) {
        super(props)
        this.state = {}
    }

    onSubmit = async (e) => {
        e.preventDefault();
        this.props.resetErrorMessage()
        const {email, password} = this.state
        const submitted = true
        this.setState({submitted})
        if (email && password) {
            try {
                const action = await this.props.signIn(email, password, ['email', 'password'])
                if ( action.type === userConstants.LOGIN_SUCCESS ) {
                    this.setAccessToken(action)
                    this.props.history.push('/')
                }
            } catch (e) {
                console.log('REJECTED PROMISE', e)
            }

        }
    }

    render() {
        const { submitted, email, password } = this.state
        const { classes } = this.props

        return (
            <Container>
                <div>{this.state.keys}</div>
                <form className={classes.lnkUserForm} onSubmit={this.onSubmit}>
                    <legend>Sign In</legend>
                    <MandatoryInput empty={!email} submitted={submitted} onChange={this.onChange}  type="email" name="email" placeholder="Email Address" />
                    <MandatoryInput empty={!password} submitted={submitted} onChange={this.onChange}  type="password" name="password" placeholder="Password" />
                    <Button type="submit" className={classes.submitButton}>Sign In</Button>
                    <div style={{margin: '10px'}}></div>

                    {this.renderErrorMessage()}
                </form>
                <p className={classes.lnkLegend}>
                    <div style={{display:'inline', paddingRight: '5px'}}>Don't have an account?</div>
                    <NavLink to="/create_account">Create one now</NavLink>
                </p>
            </Container>
        );
    }
}

const mapStateToProps = state => ({
    errorMessage: state.errorMessage,
    user: state.userAuth,
})

const styledLogin = withStyles(FormStyles)(Login)

export default withRouter(connect(mapStateToProps, {
    signIn,
    resetErrorMessage
})(styledLogin))

