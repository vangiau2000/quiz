import { addDoc, collection, doc, getDoc, getDocs, onSnapshot, setDoc } from "firebase/firestore";
import React from "react";
import { db } from "../fisebase/config";



function Demo() {
  const [dataEnd, setData] = React.useState()
  React.useEffect( () => {
  const fetchApi =  async () =>  {
    // const x = await  setDoc(doc(db, "user", "1"), {
    //   name: "van"
    // })
    // console.log(x)

    const unsub = onSnapshot(collection(db, "user"), (querySnapshot) => {
      console.log(querySnapshot)
      const dataArray = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }))
      console.log(dataArray)
      setData(dataArray)
    })
    // const result = await getDoc(doc(db, "user", "1"))
    // console.log(result.id)
    // console.log(result.data())
    // setData(result.data())
  }
  fetchApi()

  },[])
  return (
    <>
      {
        dataEnd && <div>{dataEnd[0].name}</div>
      }
    </>
  )
}
export default Demo;