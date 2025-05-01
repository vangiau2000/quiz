
import "./index.scss";
import { useEffect, useState } from "react";
import { getCookie } from "../../helpers/cookie";
import { MdDeleteOutline } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import FormattedDate from "./date";
import { collection, deleteDoc, doc, getDocs, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../../fisebase/config";
function Answer() {
  const [answer, setAnswer] = useState([]);
  const [question, setQuesion] = useState([]);
  const [isReload, setReload] = useState([]);
  const navigate = useNavigate();
  const id = getCookie("id");
  useEffect(() => {
    const unSnapShot = onSnapshot(collection(db, "answers"), async (quyrySnapshot) => {
        const queryString = query(collection(db, "answers"), where("useID", "==", id))
        const result = await getDocs(queryString)
        const data = result.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }))
        setAnswer(data);
    })

  }, [isReload]);

  useEffect(() => {
    const fetchApi = async () => {
      const result = await getDocs(collection(db, "questions"))
      const data = result.docs.map(doc => ({
        id: doc.id, 
        ...doc.data()
      }))
      setQuesion(data);
    };
    fetchApi();
  }, [answer]);
  const mapNameQuestion = new Map(question.map((item) => [item.id, item.name]));
  const answerEnd = answer.map((item) => {
    return { ...item, name: mapNameQuestion.get(item.questionId) };
  });
  // console.log(question?.name);
  // console.log(answer);
  // console.log(question);
  // console.log(answerEnd);

  const handleClick = async (id) => {
    const confirmDelete = window.confirm("Bạn có muốn xoá không?");
    if (confirmDelete) {
      try {
        await deleteDoc(doc(db, "answers", id))
      } catch (error) {
        console.error("Lỗi khi xoá:", error);
      }
    }
  };
  return (
    <>
      <div className="answer">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Time</th>
              <th>Action</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {answerEnd &&
              answerEnd.map((item) => (
                <tr>
                  <td>
                    <div className="answer__name">{item.name}</div>
                  </td>
                  <td>
                    <td>
                      {item.submittedAt && (
                        <FormattedDate date={item.submittedAt} />
                      )}
                    </td>
                  </td>
                  <td>
                    <button onClick={() => navigate(`/answer/${item.id}`)}>
                      view hisory
                    </button>
                  </td>
                  <td>
                    <div
                      className="answer__icon"
                      onClick={() => handleClick(item.id)}
                    >
                      <MdDeleteOutline />
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
export default Answer;
