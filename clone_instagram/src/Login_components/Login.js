import { Link } from "react-router-dom"

export default function Login() {
    return (
        <Link to="/" style={{ textDecoration: 'none', color: 'inherit', cursor: 'default' }}>
            <div className="container">
                <img width="420" height="600" src="	https://www.instagram.com/static/images/homepage/phones/home-phones.png/1dc085cdb87d.png"></img>
                <div className="title" >
                    <img width="185" height="70" src="./image/pngegg.png"></img>
                </div>
            </div>
        </Link>
    )
}