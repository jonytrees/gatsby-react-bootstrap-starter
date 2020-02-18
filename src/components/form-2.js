import React from "react";
import axios from "axios";



class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mailSent: false,
      error: null,

    };
  }

  handleFormSubmit = e => {
    e.preventDefault();
    axios({
      method: "post",
      url: 'https://objective-morse-c4c69b.netlify.com/api/contact/index.php',
      headers: { "content-type": "application/json" },
      data: this.state
    })
      .then(result => {
        if (result.data.sent) {
          this.setState({
            mailSent: result.data.sent
          });
          this.setState({ error: false });
        } else {
          this.setState({ error: true });
        }
      })
      .catch(error => this.setState({ error: error.message }));
  };

  //handle changing fields

  handleChange = (e, field) => {
    let value = e.target.value;
    let updateValue = {};
    updateValue[field] = value;
    this.setState(updateValue);
  };

  render() {

    return (
      <div className="form-wrapper">
        <h2>Contact Form 2</h2>

        <div>
          <form action="#">
          {/* Name */}
          <label htmlFor="firstName">First name</label>
          <input
                          type="text"
                          name="firstName"
                          placeholder="First name"
                          value={this.state.firstName}
                          onChange={e => this.handleChange(e, 'firstName')}
                          required
                        />

                      <label htmlFor="lastName">Last name</label>
          <input
                          type="text"
                          name="lastName"
                          placeholder="Last name"
                          value={this.state.lastName}
                          onChange={e => this.handleChange(e, 'lastName')}
                          required
                        />


                        {/* Email */}
            <label htmlFor="mail">Email</label>
          <input
                          type="email"
                          name="mail"
                          placeholder="Your@Name.com"
                          value={this.state.email }
                          onChange={e => this.handleChange(e,"email" )}
                          required
                        />


            <input type="submit" onClick={e => this.handleFormSubmit(e)} value="Submit" />

            <div>

              {this.state.mailSent && <div className="success">success</div>}
              {this.state.error && <div className="error">Error</div>}
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default Form;
