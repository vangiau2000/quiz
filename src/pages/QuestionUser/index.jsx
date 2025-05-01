import { useEffect, useState } from "react";
import { jsPDF } from "jspdf";
import { getCookie } from "../../helpers/cookie";
import { MdOutlineFileDownload } from "react-icons/md";
import { AiOutlineDelete } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  onSnapshot,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../../fisebase/config";

function Questionuser() {
  const [questions, setQuestions] = useState([]);
  const id = getCookie("id");
  const navigate = useNavigate();
  const [isReload, setReload] = useState();
  useEffect(() => {
    const fetchApi = async () => {
      const unShot = onSnapshot(
        collection(db, "questions"),
        async (QuerySnapshot) => {
          const data = [];
          const queryString = query(
            collection(db, "questions"),
            where("userID", "==", id)
          );
          const result = await getDocs(queryString);
          result.docs.map((doc) =>
            data.push({
              id: doc.id,
              ...doc.data(),
            })
          );
          setQuestions(data.reverse() || data);
        }
      );
    };
    fetchApi();
  }, [isReload]);
  const handleClick = async (idQuestion) => {
    const confirmDelete = window.confirm("Bạn có muốn xoá không?");
    if (confirmDelete) {
      try {
        // const response = await removeQuestionById(id);
        await deleteDoc(doc(db, "questions", idQuestion));
        // TODO: Cập nhật lại danh sách nếu cần
      } catch (error) {
        console.error("Lỗi khi xoá:", error);
      }
    }
  };
  const handleChange = async (id, e) => {
    const newStatus = e.target.value === "private" ? false : true;
    await updateDoc(doc(db, "questions", id), {public: newStatus })
  };

  const handleDownLoad = (item) => {
    const choise = window.confirm("Bạn có muốn tải về không?");
    if (!choise) return;
    const doc = new jsPDF();
    doc.setFont("Roboto");
    let y = 30;
    doc.setFontSize(16);
    doc.text("ĐỀ TRẮC NGHIỆM", 105, 20, null, null, "center");
    doc.setFontSize(12);
    doc.line(10, 25, 200, 25);
    const ABCD = { 0: "A", 1: "B", 2: "C", 3: "D" };
    // let questionString = "";
    const questions = item?.questions || [];

    questions.forEach((item, index) => {
      // tự động xuống dòng nếu y lớn
      if (y > 270) {
        doc.addPage();
        y = 20;
      }
      // questionString += `${index + 1}. ${item.question}\n`;
      doc.setFont("Roboto", "bold");
      doc.text(`${index + 1}. ${item.question}`, 10, y);
      y += 7;
      doc.setFont("Roboto", "normal");
      item?.answers.forEach((ans, indexAns) => {
        // questionString += `   ${ABCD[indexAns]}. ${ans}\n`;
        doc.text(`   ${ABCD[indexAns]}. ${ans}`, 15, y);
        y += 6;
      });
      y += 4;
    });
    doc.save(`${item.name}.pdf`);
  };
  return (
    <>
      <div className="quest">
        {questions
          ? questions.map((item) => (
              <div className="quest__item">
                <div className="quest__inf">
                  <h2 className="quest__name">{item.name}</h2>
                  <h3 className="quest__desc">{item.description}</h3>
                </div>
                <div className="quest__public">
                  {item.public ? "Public" : "Private"}
                </div>
                <div className="quest__button">
                  <div
                    className="quest__start"
                    onClick={() => navigate(`/question/${item.id}`)}
                  >
                    Làm bài
                  </div>
                  <div className="quest__selectPublic">
                    <select
                      name="status"
                      value={item.public ? "public" : "private"}
                      id=""
                      onChange={(e) => handleChange(item.id, e)}
                    >
                      <option value="public">Public</option>
                      <option value="private">Private</option>
                    </select>
                  </div>
                  <div
                    className="quest__down"
                    onClick={() => handleDownLoad(item, item.name)}
                  >
                    <MdOutlineFileDownload />
                  </div>
                  <div
                    className="quest__delete"
                    onClick={() => handleClick(item.id)}
                  >
                    <AiOutlineDelete />
                  </div>
                </div>
              </div>
            ))
          : ""}
      </div>
    </>
  );
}
export default Questionuser;
