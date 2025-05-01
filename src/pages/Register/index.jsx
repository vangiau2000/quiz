import { useDispatch } from "react-redux";
import { setCookie } from "../../helpers/cookie";
import { addUser, getResultGmail } from "../../services/quizServices";
import "./index.scss";
import { use, useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../../actions/accountQuiz";
import { generateSecureToken } from "../../helpers/generationToken";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db } from "../../fisebase/config";
function Register() {
  const [notifacate, setNotifacation] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const queryString = query(
      collection(db, "users"),
      where("gmail", "==", e.target[1].value)
    );
    const result = await getDocs(queryString);
    if (!result.size) {
      const token = generateSecureToken();
      const option = {
        name: e.target[0].value,
        gmail: e.target[1].value,
        password: e.target[2].value,
        token: token,
      };
      // const data = await addUser(option);
      const response = await addDoc(collection(db, "users"), option);
      const userSnapShot = await getDoc(doc(db, "users", response.id));
      const data = userSnapShot.data();
      setCookie("id", userSnapShot.id, 10);
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
          <div className="login__title">Create your account</div>
          <div>
            <label htmlFor="" className="login__name">
              Name
            </label>
            <br />
            <input
              type="text"
              placeholder="Your Name"
              className="login__input"
              name="name"
              required
            />
          </div>
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
            <div className="login__notifacation">*Gmail đã tồn tại!</div>
          ) : (
            ""
          )}
          <button className="login__button">Register</button>
        </form>
      </div>
    </>
  );
}
export default Register;
