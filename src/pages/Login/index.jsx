import { useDispatch } from "react-redux";
import { setCookie } from "../../helpers/cookie";
import { getResultGmailPassword } from "../../services/quizServices";
import "./index.scss";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../../actions/accountQuiz";
import { collection, doc, getDoc, getDocs, query, where } from "firebase/firestore";
import { db } from "../../fisebase/config";
function Login() {
  const [notifacate, setNotifacation] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    // const result = await getResultGmailPassword(
    //   e.target[0].value,
    //   e.target[1].value
    // );
    const queryString = query(
      collection(db, "users"),
      where("gmail", "==", e.target[0].value),
      where("password", "==", e.target[1].value)
    );
    const result = await getDocs(queryString)
    if (result.size) {
        // const docRef =  await doc(db, "users", result[0].id);
        const data = result.docs[0].data();
        setCookie("id", result.docs[0].id, 10);
        setCookie("name", data.name, 10);
        setCookie("gmail", data.gmail, 10);
        setCookie("token", data.token, 10);
      navigate("/");
      dispatch(login());
    } else {
      setNotifacation(true);
      setTimeout(() => {
        setNotifacation(false);
      }, 2000);
    }
  };
  return (
    <>
      <div className="login">
        <form onSubmit={handleSubmit}>
          <div className="login__title">Well come!</div>
          <div>
            <label htmlFor="" className="login__name">
              Gmail
            </label>
            <br />
            <input
              type="email"
              placeholder="Your Gmail"
              className="login__input"
              name="gmail"
              required
            />
          </div>
          <div>
            <label htmlFor="" className="login__name">
              Password
            </label>
            <br />
            <input
              type="password"
              placeholder="Your Password"
              className="login__input"
              name="password"
              required
            />
          </div>
          {notifacate ? (
            <div className="login__notifacation">
              *Tài khoản hoặc mật khẩu không chính sát!
            </div>
          ) : (
            ""
          )}
          <button className="login__button">Login</button>
        </form>
      </div>
    </>
  );
}
export default Login;
