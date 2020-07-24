import React, {useState, useContext, useEffect} from 'react'
import AuthContext from "../../context/auth/authContext"

const Login = (props) => {
    const[user, setUser] = useState({username: '',
                                       password: ''});
    const authContext = useContext(AuthContext);
    const {login, isAuthenticated} = authContext;

    useEffect(()=>{
        if(isAuthenticated){
            props.history.push("/");
        }
    }, [isAuthenticated])
    
    const onChange = (e) => {
        setUser(
            {
                ...user,
                [e.target.name]: e.target.value
            }
        )
    }

    const onSubmit = (e)=>{
        e.preventDefault();
        login(user);
    }

    return (
        <div className="form-container" onSubmit={onSubmit}>
            <h1><span className="text-primary">Login</span></h1>
            
            <form>
                <div className="form-group">
                    <label htmlFor="username">UserName:</label>
                    <input type="username" className="form-control" name="username" onChange={onChange} required></input>
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input type="password" className="form-control" name="password" onChange={onChange} required></input>
                </div>
                <input type="submit" value="Login" className="btn btn-primary"/>
            </form>
        </div>
    )
}

export default Login
