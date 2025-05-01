
import LayOut from "../LayOut"
import Home from "../pages/Home"
import Question from "../pages/Question"
import PrivateRoute from "../PrivateRoute"
import Answer from "../pages/answer"
import Quiz from "../pages/Quiz"
import Login from "../pages/Login"
import Register from "../pages/Register"
import GeneralBot from "../pages/GeneralBot"
import QuestionSave from "../pages/QuestionSave"
import Questionuser from "../pages/QuestionUser"
import Result from "../pages/Result"
import Profile from "../pages/Profile"
export const route = [
  {
    path: "/",
    element: <LayOut/>,
    children : [
      {index: true,
        element: <Home/>
      },
      {
        path: "/login",
        element: <Login/>
      },
      {path: "/register",
        element: <Register/>
      }
      ,
      {
        element:<PrivateRoute/>,
        children : [
          {
            path: "question", 
            element: <Question />,
            children: [
              {index:true,
                element: <GeneralBot/>
              },
              {path:"/question/questionuser",
                element: <Questionuser/>
              },
              {path:"/question/questionsave",
                element: <QuestionSave/>
              }
            ]
           },
           {
            path: "/answer", 
            element: <Answer />
           }, 
           {
            path: "/profile", 
            element: <Profile />
           },
           {
            path: "answer/:id", 
            element: <Result/>
           },
           {
            path: "question/:id", 
            element: <Quiz />
           }
        ]
      }
    ]
  }

]
// NOTE: tách public và private ra, thành 2 phần tử nếu public có layout riêng, và private có layout riên