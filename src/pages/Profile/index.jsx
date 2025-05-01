import { useDispatch } from "react-redux";
import { getCookie, setCookie } from "../../helpers/cookie";
import { getuserById, updateUser } from "../../services/quizServices";
import "./index.scss";
import { useEffect, useRef, useState } from "react";
import { doc, getDoc, onSnapshot, updateDoc } from "firebase/firestore";
import { db } from "../../fisebase/config";
function Profile() {
  const [notifacate, setNotifacation] = useState(false);
  const [user, setUser] = useState([]);
  const userId = getCookie("id");
  const [edit, setEdit] = useState(true);
  const formRef = useRef()
  useEffect(() => {
    const unsubscribe = onSnapshot(doc(db, "users", userId), (docSnap) => {
      if (docSnap.exists()) {
        setUser(docSnap.data());
      } else {
        console.log("No such document!");
      }
      return () => unsubscribe(); 
    });
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(e);
    const option = {
      name: e.target[0].value,
      password: e.target[2].value,
    };
       await updateDoc(doc(db, "users", userId), option);
    const response = getDoc(doc(db, "users", userId))
    if (response) {
      setCookie("name", response.name, 10);
      setCookie("id", 1);
      window.alert("cập nhật thành công!");
      setEdit(true);
    }
  };
  const handleCancel = () => {
    if (!edit) {
      formRef.current.reset()
    }
    setEdit((prev) => !prev)
  }
  return (
    <>
      <div className="login">
        <form onSubmit={handleSubmit} ref={formRef}>
          <div className="login__title">Profile</div>
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
              defaultValue={user.name}
              disabled={edit}
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
              readOnly
              defaultValue={user.gmail}
              disabled={edit}
            />
          </div>
          <div>
            <label htmlFor="" className="login__name">
              Password
            </label>
            <br />
            <input
              // type="password"
              type="text"
              placeholder="Your Password"
              className="login__input"
              name="password"
              required
              defaultValue={user.password}
              disabled={edit}
            />
          </div>
          {notifacate ? (
            <div className="login__notifacation">*Gmail đã tồn tại!</div>
          ) : (
            ""
          )}
          <div
            className="login__cancel"
            onClick={handleCancel}
          >
            {edit ? "EditProfile" : "Cancel"}
          </div>
          <button className="login__button">Cập nhật</button>
        </form>
      </div>
    </>
  );
}
export default Profile;
