import { Link } from "react-router-dom"
import { useRef, useState, useEffect, useContext } from 'react';
import AuthContext from "../context/AuthProvider";
import axios from '../api/axios';
const LOGIN_URL = '/auth';

const Login = () => {
    const { setAuth } = useContext(AuthContext);
    const userRef = useRef();
    const errRef = useRef();

    const [user, setUser] = useState('');
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        userRef.current.focus();

    }, [])
    useEffect(() => {
        setErrMsg('');
    }, [user, pwd])

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(LOGIN_URL,
                JSON.stringify({ user, pwd }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            console.log(JSON.stringify(response?.data));
            //console.log(JSON.stringify(response));
            const accessToken = response?.data?.accessToken;
            const roles = response?.data?.roles;
            setAuth({ user, pwd, roles, accessToken });
            setUser('');
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
                            <form onSubmit={handleSubmit}>
                                <div className="name">
                                    <label htmlFor="username"></label>
                                    <input
                                        type="text"
                                        id="username"
                                        ref={userRef}
                                        autoComplete="off"
                                        onChange={(e) => setUser(e.target.value)}
                                        value={user}
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
    // export default function Login() { //보존
    //     return (
    //         <Link to="/" style={{ textDecoration: 'none', color: 'inherit', cursor: 'default' }}>
    //             {/* <body>
    //                 <div className="container">
    //                     <img width="450" height="600" src="	https://www.instagram.com/static/images/homepage/phones/home-phones.png/1dc085cdb87d.png"></img>
    //                     <div className="login" >
    //                         <img width="185" height="70" src="./image/pngegg.png"></img>
    //                         <input placeholder="  전화번호, 사용자 이름 또는 이메일" />
    //                         <input placeholder="  비밀번호" /><br></br>
    //                         <button>로그인</button>
    //                     </div>

    //                 </div>
    //             </body> */}

    //         </Link>

    //     )
    // }

