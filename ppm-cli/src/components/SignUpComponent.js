import React from "react";
import { Link } from "react-router-dom";
class SignUpComponent extends React.Component {
  render() {
    return (
      <form action="action_page.php">
        <div class="container">
          <h1>Sign Up</h1>
          <p>Please fill in this form to create an account.</p>
          <hr />

          <label>
            <b>Email</b>
          </label>
          <br/>
          <input type="text" placeholder="Enter Email" name="email" required />
          <br/>
          <label>
            <b>Password</b><br/>
          </label>
          <br/>
          <input
            type="password"
            placeholder="Enter Password"
            name="psw"
            required
          />
          <br/>

          <label>
            <b>Repeat Password</b>
          </label>
          <br/>
          <input
            type="password"
            placeholder="Repeat Password"
            name="psw-repeat"
            required
          />
          <br/>
          <label>
            <input
              type="checkbox"
              checked="checked"
              name="remember"
              
            />
            Remember me
          </label>
          <br/>

          <p>
            By creating an account you agree to our
            <a href="#" >
              Terms & Privacy
            </a>
            .
          </p>

          <div class="clearfix">
            <button type="button">
              Cancel
            </button>
            <button type="submit">
              Sign Up
            </button>
          </div>
        </div>
      </form>
    );
  }
}
export default SignUpComponent;
