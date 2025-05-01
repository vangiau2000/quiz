const URL = `http://localhost:3001`;

export const  get = async (value) => {  
  const response = await fetch(`${URL}/${value}`);
  const data = await response.json();
  return data;
}


export const post = async (value, option) => {
  const response = await fetch(`${URL}/${value}`, {
    method: "POST", // Cần xác định phương thức POST
    headers: {
      "Content-Type": "application/json", // Đặt tiêu đề đúng cách
    },
    body: JSON.stringify(option), // Chuyển object thành JSON
  });

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }
  const data = await response.json();
  return data;
};



export const remove = async (value) => {
  const response = await fetch(`${URL}/${value}`, {
    method: "DELETE"
  });
  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }
  const data = await response.json();
  return data;
};



export const update = async (value, option) => {
  const response = await fetch(`${URL}/${value}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(option),
  });

  if (!response.ok) {
    throw new Error(`Cập nhật thất bại! Status: ${response.status}`);
  }

  return await response.json();
};
