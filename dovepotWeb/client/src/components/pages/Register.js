import React from 'react'

const Register = () => {
    return (
        <div className="form-container">
            <h1>Account <span className="text-primary">Register</span></h1>
        
            <form onSubmit>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input type="text" className="form-control" name="name" required></input>
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input type="email" className="form-control" name="email" required></input>
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" className="form-control" name="password" required minLength="6"></input>
                </div>
                <div className="form-group">
                    <label htmlFor="password2">Confirm Password</label>
                    <input type="password" className="form-control" name="password2" required minLength="6"></input>
                </div>
                <input type="submit" value="Register" className="btn btn-primary" />
            </form>
        </div>
    )
}

export default Register
