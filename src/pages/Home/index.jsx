import { CiSearch } from "react-icons/ci";
import "./index.scss";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getAllQuestion, updateSave } from "../../services/quizServices";
import {getCookie} from "../../helpers/cookie.jsx"
import { collection,  getDocs, onSnapshot, where, query, updateDoc, doc } from "firebase/firestore";
import { db } from "../../fisebase/config.js";
function Home() {
  const [keyWordSearch, setQuery] = useState("");
  const [questions, setQuestion] = useState([]);
  const [result, setResult] = useState([]);
  const userId = getCookie("id")
  const [reload, setReload] = useState([])
  useEffect(() => {
    const unSnapShot = onSnapshot(collection(db, "questions"), async (querySnapShot) => {
    const queryString = query(collection(db, "questions"), where("public", "==", true))
    const response = await getDocs(queryString)
    const data = response.docs.map(doc => ({
      id: doc.id, 
      ...doc.data()
    }))
    setResult(data);
    setQuestion(data);
    })
  }, []);
  console.log(questions)
  useEffect(() => {
    if (keyWordSearch.trim() !== "") {
      setResult(
        questions.filter((item) =>
          item.name.toLowerCase().includes(keyWordSearch.toLowerCase())
        )
      );
    } else {
      setResult(questions);
    }
  }, [keyWordSearch, questions, reload]);
  const handleSave = async (item) => {
    console.log("save")
    console.log(item)
      // const option = [...item.peopleId, userId.toString()]
      // const response = await updateSave(item.id, {"peopleId":option})
      // if(response) {
      //   setReload(response)
      //   window.alert("Đã lưu thành công!")
      // }
      const option = [...item.peopleId, userId]
      await updateDoc(doc(db, "questions", item.id), {peopleId: option})
      window.alert("Đã lưu")
  }

  return (
    <>
      <div className="main container">
        <div className="main--title">Tìm kiếm bài làm</div>
        <div className="main--search">
          <span>
            {" "}
            <CiSearch />
          </span>
          <input
            type="text"
            placeholder="Sống để làm gì? "
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="content container">
        <div className="content--title">Bài làm trắc nghiệm.</div>
        <div className="content--box">
          {result ? (
            result.map((item) => (
              <div className="content--item">
                <div className="content--inf">
                  <h3>{item.name}</h3>
                  <p>{item.description}</p>
                </div>
                <div className="content--button">
                  <div className="content--button--start"><Link to={`/question/${item.id}`}>Bắt đầu làm</Link></div>
                 {item.userID !== userId ?  (
                  <div className="content--button--save" onClick={()=> handleSave(item)}>Lưu</div>
                 ) : ("")}
                </div>
              </div>
            ))
          ) : (
            <div>Khong có</div>
          )}
        </div>
      </div>
    </>
  );
}
export default Home;
