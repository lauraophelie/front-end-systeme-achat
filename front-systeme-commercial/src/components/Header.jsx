import { Outlet } from "react-router-dom";
import "../assets/scss/header.scss";
import HorizentalHeader from "./HorizentalHeader";

function Header() {
    return (
      <>
        <div className="header">
            <HorizentalHeader />
        </div>
        <div className="content">
            <Outlet />
        </div>
        <div className="footer">

        </div>
      </>
    )
}

export default Header;