import React from 'react'
import {withRouter, NavLink} from "react-router-dom"
import {connect} from "react-redux";
import {registerUser, resetErrorMessage, resetOkMessage, setOkMessage} from "../../actions"
import UserForm, {FormStyles, MandatoryInput} from "./UserForm";
import {userConstants} from "../../constants";
import {withStyles} from "@material-ui/styles";
import { Button } from '@material-ui/core';

class CreateAccount extends UserForm {

    constructor(props) {
        super(props)
        this.state = {}
    }

    onSubmit = async (e) => {
        e.preventDefault();
        this.props.resetErrorMessage()
        const {name, email, password} = this.state
        const submitted = true
        this.setState({submitted})
        if (name && email && password) {
            try {
                const action = await this.props.registerUser(name, email, password)
                if ( action.type === userConstants.REGISTER_SUCCESS ) {
                    this.setSession(action)
                    this.props.history.push('/')
                }
            } catch (e) {
                console.log(`Error: ${e}`)
            }
        }
    }

    render() {
        const { submitted, name, email, password } = this.state
        const { classes } = this.props
        return (
            <div>
                <form className={classes.lnkUserForm} onSubmit={this.onSubmit}>
                    <legend>Create Your Account</legend>
                    <MandatoryInput empty={!name} submitted={submitted} onChange={this.onChange} type="text" name="name" placeholder="Full Name"/>
                    <MandatoryInput empty={!email} submitted={submitted} onChange={this.onChange}  type="email" name="email" placeholder="Email Address" />
                    <MandatoryInput empty={!password} submitted={submitted} onChange={this.onChange}  type="password" name="password" placeholder="Password" />
                    <Button type="submit" className={classes.submitButton}>Create Account</Button>
                    <div style={{margin: '10px'}}></div>
                    {this.renderErrorMessage()}
                    {this.renderOkMessage()}
                </form>
                <p className={classes.lnkLegend}>
                    <div style={{display:'inline', paddingRight: '5px'}}>Already have an account?</div>
                    <NavLink to="/login">Sign In</NavLink>
                </p>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    errorMessage: state.errorMessage,
    okMessage: state.okMessage,
})

const styledCreateAccount = withStyles(FormStyles)(CreateAccount)

export default withRouter(connect(mapStateToProps, {
    resetErrorMessage,
    resetOkMessage,
    setOkMessage,
    registerUser
})(styledCreateAccount))




