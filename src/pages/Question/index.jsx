import "./index.scss";
import { NavLink, Outlet } from "react-router-dom";
import { MdOutlineSaveAlt } from "react-icons/md";
import { BsPencilSquare } from "react-icons/bs";
import { FaRegStickyNote } from "react-icons/fa";

function Question() {
  return (
    <>
      <div className="question">
        <div className="question__sider">
          <h2 className="question__title">Question</h2>
          <div className="question__button">
            <span>
              <BsPencilSquare />
            </span>
            <NavLink to={"/question"}> Tạo tài liệu</NavLink>
          </div>
          <div className="question__button">
            <span>
              <FaRegStickyNote />
            </span>
            <NavLink to={"/question/questionuser"}>Bài đã tạo</NavLink>
          </div>
          <div className="question__button">
            <span>
              <MdOutlineSaveAlt />
            </span>
            <NavLink to={"/question/questionsave"}>Đã lưu</NavLink>
          </div>
        </div>
        <div className="question__main">
          <Outlet />
        </div>
      </div>
    </>
  );
}
export default Question;
