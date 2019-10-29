import PropTypes from "prop-types"
import React, {Component} from 'react'
import { FormGroup, Input, Button, Container } from '@material-ui/core';
import { withStyles } from "@material-ui/styles";

export const FormStyles = theme => ({
    '@global': {
        body: {
            margin: 0,
            padding: 0,
            fontFamily: "proxima-nova",
        }
    },
    lnkUserForm: {
        border: '1px ridge lightgrey',
        margin: [[0, 'auto']],
        padding: 40,
        width: 470,
        '@global': {
            legend: {
                textAlign: 'center',
                fontWeight: 300,
                color: '#444',
                margin: [[0, 'auto']],
                fontSize: 35,
                lineHeight: '38px',
                textTransform: 'none',
                letterSpacing: 0
            },
            input: {
                background: '#fcfcfc',
                border: '2px solid #e7e7e7',
                marginTop: '20px',
                padding: '15px',
                width: '100%',
                display: 'block',
                borderRadius: '3px',
                fontSize: '18px',
                transition: 'opacity 0.4s',
                textAlign: 'left',
                height: 'auto',
            },
            p: {
                margin: [[10, 0, 5, 0]],
                textAlign: 'center',
            },
            a: {
                color: '#0069ff',
                textDecoration: 'none',
            }
        },

    },
    lnkLegend: {
        display: 'block',
        textAlign: 'center',
        margin: [[0, 'auto']],
        padding: 40,
        width: 470,
    },
    submitButton: {
        marginTop: '20px',
        width: '100%',
        color: 'white',
        background: '#15CD72',
        '&:hover' : {
            background: '#0CB863',
        },
        border: 0,
        fontWeight: 400,
        fontSize: 17,
        cursor: 'pointer',
        textTransform: 'none'
    },
    lnkWarning: {
        margin: [[10, 'auto']],
        color: '#ff3b35',
        fontSize: 20,
    },
    lnkSuccess: {
        margin: [[10, 'auto']],
        color: '#2c9925',
        fontSize: 20,
    },

})

class mandatoryInputImpl extends Component {

    render() {
        const {onChange, type, name, placeholder, submitted, empty, classes} = this.props
        return (
            <FormGroup>
                <Input onChange={onChange} type={type} name={name} id={name} placeholder={placeholder} />
                {submitted && empty &&
                <div className={classes.lnkWarning}>{name} is required</div>
                }
            </FormGroup>
        )
    }
}

export const MandatoryInput = withStyles(FormStyles)(mandatoryInputImpl)

export default class UserForm extends Component {

    static propTypes = {
        fullname: PropTypes.string,
        email: PropTypes.string,
        password: PropTypes.string,
        submitted: PropTypes.bool,
        errorMessage: PropTypes.string,
        okMessage: PropTypes.string,
        resetErrorMessage: PropTypes.func.isRequired,
        setOkMessage: PropTypes.func.isRequired,
    }

    onChange = (e) => {
        const {name, value} = e.target
        this.setState({[name]: value});
    }

    onDismissClick = e => {
        this.props.resetErrorMessage()
        e.preventDefault()
    }

    renderErrorMessage() {
        const { errorMessage, classes } = this.props
        if (!errorMessage) {
            return null
        }

        return (
            <Container style={{ textAlign: 'center', border: '1px solid gray', padding: 10 }}>
                <div className={classes.lnkWarning}>{errorMessage}</div>
                <Button variant="outlined" color="primary"  onClick={this.onDismissClick}>
                    Close
                </Button>
            </Container>
        )
    }

    renderOkMessage() {

        const { okMessage, classes } = this.props
        if (!okMessage) {
            return null
        }

        return (
            <Container style={{ textAlign: 'center', border: '1px solid green', padding: 10 }}>
                <div className={classes.lnkSuccess}>{okMessage}</div>
                <Button variant="outlined" color="primary"  onClick={this.onDismissClick}>
                    Close
                </Button>
            </Container>
        )
    }

    setAccessToken(action) {
        const auth_token = action.header['x-auth-token']
        sessionStorage.setItem('x-auth-token', auth_token)
    }

}

