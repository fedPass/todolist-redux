import React from 'react';

function Login() {
  return (
    <div className="col-md-3 m-auto">
      <form className="mt-5 pt-5">
        <div className="form-group">
          <input type="email" name="email" className="form-control" id="email" aria-describedby="emailHelp" placeholder="Email usata per la registrazione" />
        </div>
        <div className="form-group">
          <input type="password" name="password" className="form-control" id="password" placeholder="Password" />
        </div>
        <div className="form-check">
          <input type="checkbox" name="checkbox" className="form-check-input" id="remember" />
          <label className="form-check-label" htmlFor="remember">
            Remember me
          </label>
        </div>
        <button type="submit" className="btn btn-primary  mt-3">
          Login
        </button>
      </form>
    </div>
  )
}

export default Login