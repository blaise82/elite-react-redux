import React, { Component } from 'react';
import { connect } from "react-redux";
import { loginAction } from './redux/actions/loginAction';
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      emailError: '',
      passwordError: '',
      emailErrorStatus: false,
      passwordErrorStatus: false,
    };
  }

  validate = () => {
    let isError = false;
    const errors = {
      emailError: '',
      passwordError: '',
      emailErrorStatus: false,
      passwordErrorStatus: false,
    };

    if (this.state.email.indexOf('@') === -1) {
      isError = true;
      errors.emailErrorStatus = true;
      errors.emailError = 'Provide a valid email';
    }
    if (this.state.password.length == 0) {
      isError = true;
      errors.passwordErrorStatus = true;
      errors.passwordError = 'Provide a password';
    }
    this.setState({
      ...this.state,
      ...errors,
    });
    return isError;
  };

  onSubmit = async (e) => {
    e.preventDefault();
    const error = this.validate();
    if (!error) {
      const data = {
        email: this.state.email,
        password: this.state.password
      }
      await this.props.loginAction(data)
    } 
  };

  change = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <div>
        <p style={{color: "green", display: this.props.loginState.loading}} className="loading">loading.....</p>
        <form onSubmit={(e) => this.onSubmit(e)} className="form">
          <h1>Sign in</h1> <br />
          <span style={{color: "red"}}>{ this.props.loginState.error}</span> <br/>
          <label htmlFor="">Email</label>
          <br />
          <input
            type="email"
            name="email"
            aria-label="email"
            placeholder="email"
            onChange={(e) => this.change(e)}
          />
          <br/>
            <span style={{color: "red"}}>{ this.state.emailError}</span>
          <br /> <br />
          <label htmlFor="">Password</label> <br />
          <input
            type="password"
            name="password"
            aria-label="password"
            placeholder="password"
            onChange={(e) => this.change(e)}
          />
          <br/>
          <span style={{color: "red"}}>{ this.state.passwordError}</span>
          <br />
          <input type="submit" value="LOGIN" aria-label="login" />
        </form>
      </div>
    );
  }
}


const mapStateToProps = (state) => {
  return {
    loginState: state.login
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    loginAction: (data) => dispatch(loginAction(data))
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(App);
