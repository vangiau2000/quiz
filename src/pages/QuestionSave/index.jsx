import { useEffect, useState } from "react";
import { jsPDF } from "jspdf";
import {
  getListQuestion,
  removeQuestionById,
  updateSave,
} from "../../services/quizServices";
import { getCookie } from "../../helpers/cookie";
import { MdOutlineFileDownload } from "react-icons/md";
import { AiOutlineDelete } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { arrayRemove, collection, doc, getDocs, onSnapshot, query, updateDoc, where } from "firebase/firestore";
import { db } from "../../fisebase/config";

function QuestionSave() {
  const [isReload, setReload] = useState();
  const [dataEnd, setDataEnd] = useState();
  const navigate = useNavigate();
  const userID = getCookie("id");

  useEffect(() => {
    const unSnapShot = onSnapshot(collection(db, "questions"), async (querySnapShot) => {
        const q = query(
          collection(db, "questions"),
          where("peopleId", "array-contains", userID) // nếu bạn muốn tìm những user có lớp học ID là 2
        );
        const snapshot = await getDocs(q);
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setDataEnd(data);
    })
  }, []);

  const handleClick = async (item) => {
    const confirmDelete = window.confirm("Bạn có muốn xoá không?");
    console.log(item)
    if (confirmDelete) {
      try {
        const userRef = doc(db, "questions", item.id); // thay "user_id" bằng id của user cần cập nhật
        await updateDoc(userRef, {
          peopleId: arrayRemove(userID),
        });
      } catch (error) {
        console.error("Lỗi khi xoá:", error);
      }
    }
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
        {dataEnd &&
          dataEnd.map((item) => (
            <div className="quest__item">
              <div className="quest__inf">
                <h2 className="quest__name">{item.name}</h2>
                <h3 className="quest__desc">{item.description}</h3>
              </div>
              <div className="quest__button">
                <div
                  className="quest__start"
                  onClick={() => navigate(`/question/${item.id}`)}
                >
                  Làm bài
                </div>
                <div
                  className="quest__down"
                  onClick={() => handleDownLoad(item, item.name)}
                >
                  <MdOutlineFileDownload />
                </div>
                <div
                  className="quest__delete"
                  onClick={() => handleClick(item)}
                >
                  <AiOutlineDelete />
                </div>
              </div>
            </div>
          ))}
      </div>
    </>
  );
}
export default QuestionSave;
