import "./index.scss";
import { useRef } from "react";
import axios from "axios";
import { postQuestion } from "../../services/quizServices";
import { getCookie } from "../../helpers/cookie";
import {useState} from "react"
import { generalBot } from "./generaBot";
import {addDoc, collection}from "firebase/firestore"; 
import { db } from "../../fisebase/config";


function GeneralBot() {
  const formRef = useRef();
  const useID = getCookie("id");
  const [buttonLoading, setButtonLoading] = useState(false)
  const handleSubmit = async (e) => {
    const option = {};
    e.preventDefault();
    setButtonLoading(true)
    for (let i of e.target) {
      if (i.type !== "radio") {
        option[i.name] = i.value;
      } else {
        if (i.checked) {
          option[i.name] = i.value;
        }
      }
    }
    // console.log("dữ liệu của fontend", option);
    // mẹ
    console.log(option)
    const res = await generalBot(option.name, option.Description, option.quantity, option.content)
    console.log(res)
    if (res) {
      const raw = res.aiResponse;
      const cleaned = raw.replace(/```json|```/g, "").trim();
      const data = JSON.parse(cleaned);
      console.log(data);
      data.forEach(item => item.id = parseInt(item.id))
      const optionQuestion = {
        userID: useID,
        name: option.name,
        description: option.Description,
        public: false,
        peopleId: [],
        questions: data
      };
      const response = await addDoc(collection(db, "questions"), optionQuestion)
      if (response) {
        window.alert("Đã tạo thành công");
        setButtonLoading(false)
        formRef.current.reset()
      }
    }
    // ba
    }

  return (
    <>
      <div className="bot">
        <h2 className="bot__headerTitle">Làm việc với AI ai mà làm lại?</h2>
        <form
          ref={formRef}
          action=""
          onSubmit={handleSubmit}
          className="bot__form"
        >
          <div className="bot__inf">
            <label htmlFor="inputname">Document Name?</label>
            <br />
            <input type="text" name="name" id="inputname" required />
          </div>

          <div className="bot__inf">
            <label htmlFor="inputDescription">Description</label>
            <br />
            <input type="text" name="Description" id="inputDescription" required/>
          </div>

          <div className="bot__length">
            <input type="radio" name="quantity" id="length5" value={5} required />
            <label htmlFor="length5">5 Câu</label>

            <input type="radio" name="quantity" id="length10" value={10} required />
            <label htmlFor="length10">10 Câu</label>

            <input type="radio" name="quantity" id="length15" value={15} required />
            <label htmlFor="length15">15 Câu</label>

            <input type="radio" name="quantity" id="length20" value={20} required />
            <label htmlFor="length20">20 Câu</label>
          </div>

          <div className="bot__area">
            <textarea
              name="content"
              id=""
              className="bot__content"
              placeholder="Bạn hãy nhập tài liệu vào đây"
              required
            ></textarea>
          </div>
          <div className="bot__button">
            <button > {buttonLoading ? "Đang tạo..." : "Tạo câu hỏi" }</button>
          </div>
        </form>
      </div>
    </>
  );
}


export default GeneralBot;
