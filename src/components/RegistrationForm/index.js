import {Component} from 'react'
import './index.css'

class RegistrationForm extends Component {
  state = {
    firstName: '',
    lastName: '',
    isFirstNameEmpty: false,
    isLastNameEmpty: false,
    isFormSubmitted: false,
  }

  handleBlur = fieldName => {
    const fieldValue = this.state[fieldName];
    const isEmpty = fieldValue.trim() === '';

    this.setState(prevState => ({
      [`is${fieldName}Empty`]: isEmpty,
    }));

    if (fieldName === 'firstName' && isEmpty) {
      this.setState({ isLastNameEmpty: false });
    } else if (fieldName === 'lastName' && isEmpty) {
      this.setState({ isFirstNameEmpty: false });
    }
  };

  handleChange = (fieldName, event) => {
    this.setState({ [fieldName]: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault()
    const {firstName, lastName} = this.state

    if (firstName.trim() === '' && lastName.trim() === '') {
      this.setState({
        isFirstNameEmpty: true,
        isLastNameEmpty: true,
        isFormSubmitted: false,
      })
    } else if (firstName.trim() === '') {
      this.setState({
        isFirstNameEmpty: true,
        isLastNameEmpty: false,
        isFormSubmitted: false,
      })
    } else if (lastName.trim() === '') {
      this.setState({
        isFirstNameEmpty: false,
        isLastNameEmpty: true,
        isFormSubmitted: false,
      })
    } else {
      this.setState({
        isFirstNameEmpty: false,
        isLastNameEmpty: false,
        isFormSubmitted: true,
      })
    }
  }

  handleReset = () => {
    this.setState({
      firstName: '',
      lastName: '',
      isFirstNameEmpty: false,
      isLastNameEmpty: false,
      isFormSubmitted: false,
    })
  }

  render() {
    const {
      firstName,
      lastName,
      isFirstNameEmpty,
      isLastNameEmpty,
      isFormSubmitted,
    } = this.state

    return (
      <div className="registration-form-container">
        <h1 className="registration-heading">Registration</h1>
        {isFormSubmitted ? (
          <div className="registration-success-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/success-icon-img.png"
              alt="success"
              className="success-icon"
            />
            <p className="success-message">Submitted Successfully</p>
            <button
              type="button"
              className="submit-another-response-button"
              onClick={this.handleReset}
            >
              Submit Another Response
            </button>
          </div>
        ) : (
          <form className="form-container" onSubmit={this.handleSubmit}>
            <label htmlFor="first-name" className="input-label">
              First Name
            </label>
            <input
              type="text"
              id="first-name"
              className={`input-field ${isFirstNameEmpty ? 'input-error' : ''}`}
              value={firstName}
              onBlur={() => this.handleBlur('firstName')}
              onChange={event => this.handleChange('firstName', event)}
            />
            {isFirstNameEmpty && <p className="error-message">Required</p>}

            <label htmlFor="last-name" className="input-label">
              Last Name
            </label>
            <input
              type="text"
              id="last-name"
              className={`input-field ${isLastNameEmpty ? 'input-error' : ''}`}
              value={lastName}
              onBlur={() => this.handleBlur('lastName')}
              onChange={event => this.handleChange('lastName', event)}
            />
            {isLastNameEmpty && <p className="error-message">Required</p>}
            <button type="submit" className="submit-button">
              Submit
            </button>
          </form>
        )}
      </div>
    )
  }
}

export default RegistrationForm
