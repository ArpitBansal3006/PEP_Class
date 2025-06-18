import {Link} from "react-router-dom";

function AppLayout({children}){
    return(
        <>
        {/*Header */}
        <div className="container">
            <Link to='/'>Home</Link>
            <Link to="/login">Login</Link>
        </div>
        {children}

        {/* Footer */}
        <div className="container text-center">
            Footer Component
        </div>
        </>
    );
}

export default AppLayout;