import { Link } from "react-router-dom"

export default function Login() {
    return (
        <Link to="/login">
            <div className="container">
                <div className="left">
                    <img width="380" height="580" src="	https://www.instagram.com/static/images/homepage/phones/home-phones.png/1dc085cdb87d.png"></img>
                </div>
                <div className="login">
                    <img width="185" height="70" src="./image/pngegg.png"></img>
                </div>
            </div>
        </Link>
    )
}