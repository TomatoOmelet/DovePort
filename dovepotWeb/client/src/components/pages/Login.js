import React from 'react'

const Login = () => {
    return (
        <div className="form-container">
            <h1><span className="text-primary">Login</span></h1>
            
            <form>
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input type="email" className="form-control" name="email" required></input>
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input type="password" className="form-control" name="password" required></input>
                </div>
                <input type="submit" value="Login" className="btn btn-primary"/>
            </form>
        </div>
    )
}

export default Login
