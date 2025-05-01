import axios from 'axios';

const GEMINI_API_KEY = process.env.REACT_APP_GEMINI_API_KEY;

export const generalBot = async (name, Description, quantity, content) => {
  try {
    const prompt = `Bạn là một AI tạo câu hỏi trắc nghiệm. Dưới đây là thông tin đầu vào:
      - Tên tài liệu: ${name}
      - Mô tả: ${Description}
      - Số lượng câu hỏi: ${parseInt(quantity)}
      - Nội dung tài liệu: ${content}

      🎯 Yêu cầu:
      - Tạo ra chính xác ${parseInt(quantity)} câu hỏi trắc nghiệm.
      - Trả về kết quả **chỉ là một mảng JSON thuần**, không chú thích, không mô tả gì thêm.
      - Mỗi phần tử là một object có định dạng:
      { 
        "id": "1",
        "question": "Câu hỏi",
        "answers": ["Đáp án A", "Đáp án B", "Đáp án C", "Đáp án D"],
        "correctAnswer": 0,
        "explanation": "Giải thích lý do chọn đáp án đúng"
      }

      📌 Chỉ trả về **JSON thuần** theo định dạng trên.
    `;
    
    const requestData = {
      contents: [
        {
          parts: [{ text: prompt }],
        },
      ],
    };

    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`,
      requestData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const aiResponse = response.data.candidates[0]?.content?.parts[0]?.text;

    // Nếu không có kết quả hoặc định dạng không đúng, trả về lỗi
    if (!aiResponse) {
      throw new Error('Không nhận được phản hồi hợp lệ từ Gemini');
    }

    return { aiResponse };

  } catch (error) {
    console.error("Lỗi gọi Gemini:", error.response ? error.response.data : error.message);
    return { error: error.message || 'Có lỗi xảy ra' }; // Trả về lỗi cho việc gọi API
  }
};
