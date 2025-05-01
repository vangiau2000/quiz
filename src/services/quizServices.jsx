import { get, post, remove, update } from "../utils"

export const getAllQuestion = async () => {
  const data = await get(`questions?public=true`)
  return data
}
export const getQuestionById = async (id) => {
  const data = await get(`questions?id=${id}`)
  return data
}

export const getListQuestion = async () => {
  const data = await get(`questions`)
  return data
}


export const getResultGmailPassword = async (gmail, password) => {
  const data = await get(`users?gmail=${gmail}&password=${password}`)
  return data
}
// export const getResultGmail = async (gmail, password) => {
//   const data = await get(`users?gmail=${gmail}`)
//   return data
// } done

export const addUser = async (option) => {
  const data = await post("users", option)
  return data
}

export const getListQuestionByuserId = async (id) => {
  const data = await get(`questions?userID=${id}`)
  return data
}

export const getListQuestionById = async (id) => {
  const data = await get(`questions?id=${id}`)
  return data
}

export const getAnswer = async (id) => {
  const data = await get(`answers?useID=${id}`)
  return data
}
export const postAnswer = async (option) => {
  const data = await post("answers", option)
  return data
}

export const getAnswerById = async (id) => {
  const data = await get(`answers?id=${id}`)
  return data
}


export const removeAnswerById = async (id) => {
  const data = await remove(`answers/${id}`)
  return data
}

export const removeQuestionById = async (id) => {
  const data = await remove(`questions/${id}`)
  return data
}

export const updateStatus = async (id,option) => {
  const data = await update(`questions/${id}`, option)
  return data
}
export const updateSave = async (id ,option) => {
  console.log(id, option)
  const data = await update(`questions/${id}`, option)
  return data
}

export const postQuestion = async (option) => {
  const data = await post(`questions`, option)
  return data
}






export const getuserById = async (id) => {
  const data = await get(`users/${id}`)
  return data
}

export const updateUser = async (id,option) => {
  const data = await update(`users/${id}`, option)
  return data
}


