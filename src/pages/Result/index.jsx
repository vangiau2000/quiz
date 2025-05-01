import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BsArrowReturnRight } from "react-icons/bs";
import "./index.scss";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../fisebase/config";
function Result() {
  const param = useParams();
  const [answerDetail, setAnswerDetail] = useState([]);
  const [question, setQuestion] = useState([]);
  const navigate = useNavigate();
  //lấy id của câu trả lời để làm trang chi tiết
  useEffect(() => {
    const fetchApi = async () => {
      // const data = await getAnswerById(param.id)  ;
      const data = await getDoc(doc(db, "answers", param.id));
      setAnswerDetail([{ id: data.id, ...data.data() }] || []);
    };
    fetchApi();
  }, []);

  useEffect(() => {
    const fetchApi = async () => {
      // const data = await getQuestionById(answerDetail[0]?.questionId);
      if (answerDetail.length) {
        const data = await getDoc(doc(db, "questions", answerDetail[0]?.questionId));
        console.log(data.data())
        setQuestion([{ id: data.id, ...data.data() }] || []);
      }
    };
    fetchApi();
  }, [answerDetail]);
  console.log(answerDetail)
  console.log(question)
  const mapAnswer =
    answerDetail.length &&
    new Map(
      answerDetail[0].answers.map((item) => [
        parseInt(item.questionId),
        parseInt(item.answer),
      ])
    );
  const dataEnd = question[0]?.questions.map((item) => ({
    ...item,
    useChoiseAnswer: mapAnswer.get(item.id),
  }));
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("đa submit");
    navigate(`/question/${answerDetail[0]?.questionId}`);
  };
  // console.log(dataEnd);
  return (
    <>
      <div className="qs">
        <h2 className="qs__header">Quiz</h2>
        <form className="qs__form" onSubmit={handleSubmit}>
          {
            <div className="qs__item">
              {dataEnd &&
                dataEnd.map((x, index) => (
                  <div className="qs__answers">
                    <div className="qs__name">
                      {index + 1 + ". "}
                      {x.question}
                    </div>
                    <ol type="A">
                      {x.answers.map((items, itemsIndex) => (
                        <li>
                          <input
                            type="radio"
                            value={itemsIndex}
                            name={x.id}
                            // id={`answer-${index}-${itemsIndex}`}
                          />
                          <label
                            className={`qs__lable ${
                              itemsIndex === x.correctAnswer
                                ? "qs__lable--corect"
                                : itemsIndex === x.useChoiseAnswer
                                ? "qs__lable--wrong"
                                : ""
                            }`}
                            // htmlFor={`answer-${index}-${itemsIndex}`}
                          >
                            {items}
                          </label>
                          {itemsIndex === x.correctAnswer && (
                            <div className="qs__explanation">
                              <BsArrowReturnRight /> {x.explanation}
                            </div>
                          )}
                        </li>
                      ))}
                    </ol>
                  </div>
                ))}
            </div>
          }
          <div className="qs__submit">
            <button type="submit">Làm Lại</button>
          </div>
        </form>
      </div>
    </>
  );
}
export default Result;
