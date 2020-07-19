import React from 'react'

const Login = () => {
    //Login
    const login = async (formData) => {
        const config = {
            headers:{"ContentType":"application/json"}
        };

        try {
            const res = await axios.post("/perform_login", formData, config);
        } catch (error) {
            console.error(error.message)
        }
    }

    const onSubmit = (e)=>{
        e.preventDefault();
        login();
    }

    return (
        <div className="form-container" onSubmit={onSubmit}>
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
