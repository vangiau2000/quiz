import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { FaUser } from "react-icons/fa6";
import { FaArrowRightToBracket } from "react-icons/fa6";
import { useSelector, useDispatch } from "react-redux";
import { MdCancel } from "react-icons/md";

import "./index.scss";
import { useState } from "react";
import { logout } from "../actions/accountQuiz";
import { deleteAllCookies, getCookie } from "../helpers/cookie";

function LayOut() {
  const dispatch = useDispatch();
  const [topBar, setTopBar] = useState(false);
  const isLogin = useSelector((state) => state.isLogin);
  const navigate = useNavigate();
  const token = getCookie("token");
  const handleClick = (e) => {
    e.stopPropagation();
    setTopBar(false);
    if (token) {
      deleteAllCookies();
      dispatch(logout());
      navigate("/");
    } else {
      setTopBar(false);
      navigate("/login");
    }
  };
  const handleRegister = (e) => {
    e.stopPropagation();
    setTopBar(false);
    navigate("/register");
  };
  const handleProfile = (e) => {
    e.stopPropagation();
    setTopBar(false);
    navigate("/profile");
    
  };
  return (
    <>
      <header className="header">
        <div className="header--logo">QuizAI</div>
        <div className="header--menu">
          <NavLink to={"/"}>Home</NavLink>
          {token ? (
            <>
              <NavLink to={"/question"}>Question</NavLink>
              <NavLink to={"/answer"}>Answers</NavLink>
            </>
          ) : (
            ""
          )}
        </div>
        <div className="header--user" onClick={() => setTopBar(true)}>
          <FaUser />
          <div
            className={`header__bar ${
              topBar ? "header__bar--show" : "header__bar--hiden"
            }`}
          >
            <div
              className="bar__cancel"
              onClick={(e) => {
                setTopBar(false);
                e.stopPropagation();
              }}
            >
              <MdCancel />
            </div>
            {token && (
              <div className="bar__user">
                <div className="bar__item" onClick={handleProfile}>
                  <div className="bar__icon">
                    <FaUser />
                  </div>
                  <div className="bar__title" >
                    Profile
                  </div>
                </div>
                <div className="bar__item">
                  <div className="bar__icon">
                    <FaUser />
                  </div>
                  <div className="bar__title">History</div>
                </div>
              </div>
            )}
            <div className="bar__account">
              <div className="bar__item" onClick={handleClick}>
                <div className="bar__icon">
                  <FaArrowRightToBracket />
                </div>
                <div className="bar__title">
                  {token ? <div>LogOut</div> : <div>Login</div>}
                </div>
              </div>
              {!token ? (
                <div className="bar__item" onClick={handleRegister}>
                  <div className="bar__icon">
                    <FaArrowRightToBracket />
                  </div>
                  <div className="bar__title">Register</div>
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      </header>
      <main>
        <Outlet />
      </main>
    </>
  );
}
export default LayOut;
