import axios from "axios";

export const getJobs = () => async (dispatch) => {
  try {
    const token = localStorage.getItem("token"); // 👈 اینجا بیار
    const res = await axios.get("http://localhost:8000/api/item", {
      headers: { Authorization: `Bearer ${token}` },
    });
    dispatch({ type: "GET", payload: res.data });
  } catch (err) {
    console.error("❌ خطا در گرفتن کارها:", err.response?.data || err);
  }
};

export const addJob = (jobData) => async (dispatch) => {
  try {
    const token = localStorage.getItem("token"); // 👈 اینجا هم
    const res = await axios.post("http://localhost:8000/api/item", jobData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    dispatch({ type: "ADD", payload: res.data });
  } catch (err) {
    console.error("❌ خطا در افزودن:", err.response?.data || err);
  }
};

export const updateJob = (id, updatedData) => async (dispatch) => {
  try {
    const token = localStorage.getItem("token"); // همون توکن ورود
    const res = await axios.patch(`http://localhost:8000/api/item/${id}`, updatedData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    dispatch({ type: "UPDATE", payload: res.data }); // نوع اکشن UPDATE
  } catch (err) {
    console.error("❌ خطا در ویرایش:", err.response?.data || err);
  }
};


export const delJob = (id) => async (dispatch) => {
  try {
    const token = localStorage.getItem("token"); // 👈 و اینجا هم
    await axios.delete(`http://localhost:8000/api/item/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    dispatch({ type: "DEL", payload: id });
  } catch (err) {
    console.error("❌ خطا در حذف:", err.response?.data || err);
  }
};