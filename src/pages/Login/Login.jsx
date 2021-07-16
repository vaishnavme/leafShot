import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../../context";
import { errorNotification, successNotification, InputField } from "../../components";
import styles from "./Login.module.css";

export default function Login() {
    const [logInCred, setLoginCred] = useState({});
    const { logInUser } = useAuth();
    const navigate = useNavigate();
    const { state } = useLocation();

    const logInCredsHandler = (e) => {
        const value = e.target.value;
        setLoginCred({
            ...logInCred,
            [e.target.name] : value
        })
    }
    
    const loginHandler = async() => {
        const { success } = await logInUser(logInCred)
        if(success) {
            successNotification("Login Successfull!!")
            navigate(state?.from ? state.from : "/", { replace: true });
        } else {
            errorNotification("Error Ocuured")
        }
        console.log(logInCred)
    }

    return (
        <div className={`${styles.main}`}>
            <div className={`${styles.card} p-2`}>
                <div className={`${styles.header}`}>
                    <h6>Hi there👋</h6>
                    <h4>Welcome Back</h4>
                </div>
                <div className={`${styles.body}`}>
                    <form>
                        <InputField
                            labelName={"Email"}
                            type={"email"}
                            name={"email"}
                            onChangeOperation={logInCredsHandler}
                        />
                        <InputField
                            labelName={"Password"}
                            type={"password"}
                            name={"password"}
                            onChangeOperation={logInCredsHandler}
                        />
                        <button
                            onClick={(e) => loginHandler(e)}
                            className={`btn btn-secondary ${styles.formBtn}`}>
                                Log in
                        </button>
                    </form>
                    <p>Don't have account? <Link className="f-primary" to="/signup">Sign Up</Link> here</p>
                </div>
            </div>
        </div>
    )
}