import React, {useState} from 'react'
import axios from "axios"

const Login = () => {
    const[state, setState] = useState({email: '',
                                       password: '',
                                       hasLoginFailed: false,
                                       showSuccessMessage: false});

    const onChange = (e) => {
        setState(
            {
                ...state,
                [e.target.name]: e.target.value
            }
        )
    }
    //Login
    const login = async (formData) => {
        const config = {
            headers:{"ContentType":"application/json"}
        };

        // try {
        //     const res = await axios.post("/perform_login", formData, config);
        // } catch (error) {
        //     console.error(error.message)
        // }
        if(state.email==='user' && state.password==='user'){
            //AuthenticationService.registerSuccessfulLogin(state.email, state.password)
            setState({...state, showSuccessMessage:true, hasLoginFailed:false})
        }
        else {
             setState({...state, showSuccessMessage:false, hasLoginFailed:true})
        }
    }

    const onSubmit = (e)=>{
        e.preventDefault();
        login(state);
    }

    return (
        <div className="form-container" onSubmit={onSubmit}>
            <h1><span className="text-primary">Login</span></h1>
            
            <form>
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input type="email" className="form-control" name="email" onChange={onChange} required></input>
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
