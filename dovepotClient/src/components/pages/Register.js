import React, {useState, useContext, useEffect} from 'react'
import AuthContext from "../../context/auth/authContext"


const Register = (props) => {
    const[user, setUser] = useState({username: '', display_name:'', password: '', password2: ''});
    const authContext = useContext(AuthContext);
    const {register, isAuthenticated} = authContext;

    useEffect(()=>{
        if(isAuthenticated){
            props.history.push("/");
        }
    }, [isAuthenticated])

    const onSubmit = (e)=>{
        e.preventDefault();
        if(user.password === user.password2)
        {
            register({"username":user.username, "name":user.display_name, "password":user.password});
        }else{
            console.error("passwords does not match");
        }
        
    }

    const onChange = (e) => {
        setUser(
            {
                ...user,
                [e.target.name]: e.target.value
            }
        )
    }

    return (
        <div className="form-container">
            <h1>Account <span className="text-primary">Register</span></h1>
        
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input type="text" className="form-control" name="username" onChange={onChange} required minLength="6" maxLength="12"></input>
                </div>
                <div className="form-group">
                    <label htmlFor="display_name">Display Name</label>
                    <input type="text" className="form-control" name="display_name" onChange={onChange} required></input>
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" className="form-control" name="password" onChange={onChange} required minLength="6"></input>
                </div>
                <div className="form-group">
                    <label htmlFor="password2">Confirm Password</label>
                    <input type="password" className="form-control" name="password2" onChange={onChange} required minLength="6"></input>
                </div>
                <input type="submit" value="Register" className="btn btn-primary" />
            </form>
        </div>
    )
}

export default Register
