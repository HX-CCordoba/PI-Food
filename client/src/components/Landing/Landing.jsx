import { Link } from 'react-router-dom';
function Landing() {
    return (
        <div className="landing">
            <h1>Welcome to Henry Food!</h1>
            <h2>  Let's See What We Are Cooking Today...</h2>
            <div>
                <Link to='/home'>
                    <button>GET STARTED!</button>
                </Link>
                <img src="https://media0.giphy.com/media/WRXNJYnmTfaCUsU4Sw/giphy.gif?cid=6c09b95219g84708yc9txii37wc3llykxfml3yulr1formjp&rid=giphy.gif&ct=s" alt="" />
            </div>
        </div>
    )
}

export default Landing;
