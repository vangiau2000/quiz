import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./index.scss"
import { getCookie } from "../../helpers/cookie";
import { addDoc, collection, doc, getDoc } from "firebase/firestore";
import { db } from "../../fisebase/config";
function Quiz() {
  const param = useParams();
  const idUser = getCookie("id")
  console.log(param, "param")
  const [questions, setQuestions] = useState([]);
  const navigate = useNavigate()
  useEffect(() => {
    const fetchApi = async () => {
      const x = await getDoc(doc(db, "questions", param.id))
      setQuestions([x.data()]);
    };
    fetchApi();
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault()
    let answers = []
    for (let i of e.target) {
      if (i.checked) {
        console.log(i.name, i.value)
        answers.push({
          questionId: i.name,
            answer: i.value
        })
      }
    }
    const option = {
        useID: idUser,
        questionId: param.id,
        answers: answers,
        submittedAt: new Date().toISOString()
    }
    // const response = await postAnswer(option)
    const response =  await addDoc(collection(db, "answers"), option)
    if (response) {
    navigate(`/answer/${response.id}`)
    }
  }
  return (
    <>
      <div className="qs">
        <h2 className="qs__header">Quiz</h2>
        <form className="qs__form" onSubmit={handleSubmit}>
          {questions &&
            questions.map((item) => (
              <div className="qs__item">
                {/* <div className="qs__title">{item.name}</div>
                <div className="qs__desc">{item.description}</div> */}
                {item.questions &&
                  item.questions.map((x, index) => (
                    <div className="qs__answers">
                      <div className="qs__name">
                        {index + 1 + ". "}{x.question}
                        </div>
                      <ol type="A">
                        {x.answers.map((items, itemsIndex) => (
                          <li>
                            <input type="radio" value={itemsIndex} name={x.id} id={`answer-${index}-${itemsIndex}`} />
                            <label  className="qs__lable" htmlFor={`answer-${index}-${itemsIndex}`} >{items}</label>
                          </li>
                        ))}
                      </ol>
                    </div>
                  ))}
              </div>
            ))}
              <div className="qs__submit">
            <button>Submit</button>
                
              </div>

          </form>
      </div>
    </>
  );
}
export default Quiz;

