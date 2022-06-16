import { Link } from "react-router-dom"
import { useRef, useState, useEffect, useContext } from 'react';
import AuthContext from "../context/AuthProvider";
import axios from '../api/axios';
const LOGIN_URL = 'user/signin/';

const Login = () => {
    const { setAuth } = useContext(AuthContext);
    const userRef = useRef();
    const errRef = useRef();

    const [email, setEmail] = useState('');
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        userRef.current.focus();

    }, [])
    useEffect(() => {
        setErrMsg('');
    }, [email, pwd])

    const handleSubmit = async (e) => {
        e.preventDefault(); {/*(e)코드를 작동하지 못하게 하는 메서드*/}

        try {
            const response = await axios.post(LOGIN_URL,
                JSON.stringify({ email: email, pwd: pwd }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            console.log(JSON.stringify(response?.data));
            //console.log(JSON.stringify(response));
            const accessToken = response?.data?.accessToken;
            const roles = response?.data?.roles;
            setAuth({ email: email, pwd, roles, accessToken });
            setEmail('');
            setPwd('');
            setSuccess(true);
        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            }
            else if (err.response?.status === 400) {
                setErrMsg('Missing Username or Password');
            }
            else if (err.response?.status === 401) {
                setErrMsg('Unauthorized');
            }
            else {
                setErrMsg('Login Failed');
            }
            errRef.current.focus();
        }
    }
    return (
        <>
            {success ? (
                <section>
                    <h1>You are logged in!</h1>
                    <br />
                    <p>
                        <a href="#">Go to Home</a>
                    </p>
                </section>
            ) : (
                <div className="container">
                    <section>
                        <p ref={errRef} className={errMsg ? "errmsg" :
                            "offscreen"} aria-live="assertive">{errMsg}</p>
                        <img width="185" height="70" src="./image/pngegg.png"></img>
                        <div className="login">
                            <form onSubmit={handleSubmit}> {/*form전송을 하기 전 입력된 데이터의 유효성 체크*/}
                                <div className="name">
                                    <label htmlFor="useremail"></label>
                                    <input
                                        type="text"
                                        id="useremail"
                                        ref={userRef}
                                        autoComplete="off"
                                        onChange={(e) => setEmail(e.target.value)}
                                        value={email}
                                        required
                                        placeholder="사용자 이름 또는 이메일"
                                    />
                                </div>
                                <div className="pwd">
                                    <label htmlFor="password"></label>
                                    <input
                                        type="password"
                                        id="password"
                                        ref={userRef}
                                        autoComplete="off"
                                        onChange={(e) => setPwd(e.target.value)}
                                        value={pwd}
                                        required
                                        placeholder="비밀번호"
                                    />
                                </div>
                                <button>Sign In</button>
                            </form>
                        </div>
                        <p>
                            Need an Account?<br />
                            <span className="line">
                                <a href="#">Sign Up"</a>
                            </span>
                        </p>
                    </section>
                </div>
            )}
        </>
    )
}

export default Login

