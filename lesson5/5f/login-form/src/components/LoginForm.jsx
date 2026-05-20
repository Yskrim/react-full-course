import { useState } from "react";
import "./LoginForm.css"

export function LoginForm(){
    const [isShownPwd, setIsShownPwd] = useState(false);
    const [pwdInputValue, setPwdInputValue] = useState('');

    return(
        <div className="login-form">
            <div className="cont">
                <input 
                    placeholder="Email"
                    type="text"
                />
            </div>
            <div className="cont">
                <input 
                    placeholder="Password"
                    type={isShownPwd ? "text" : "password"}
                    value={pwdInputValue}
                    onChange={(e)=>{
                        setPwdInputValue(e.target.value);
                    }}
                />
                {pwdInputValue &&
                    <button 
                        onClick={()=>{setIsShownPwd(prev=>!prev)}}
                    >
                        {isShownPwd ? "Hide" : "Show"}
                    </button>
                }
            </div>
            <div className="btn-container">
                <button type="submit">Login</button>
                <button>Sign up</button>
            </div>
        </div>
    )
}