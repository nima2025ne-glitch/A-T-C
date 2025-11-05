import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Routes, Route, Link } from "react-router-dom";
import { getJobs, addJob, delJob, updateJob } from "./actions";
import ChatPage from "./ChatPage.jsx";
import "./App.css";

function App() {
  const [input, setInput] = useState("");
  const [user, setUser] = useState(null);
  const [editingInput, setEditingInput] = useState("");
  const [editingJob, setEditingJob] = useState(null);
  const jobs = useSelector((state) => state.jobs);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user) dispatch(getJobs(user._id));
  }, [dispatch, user]);

  async function handleLogin(username, password) {
    try {
      const res = await fetch("http://localhost:8000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      if (res.ok) {
        localStorage.setItem("token", data.token);
        setUser(data.user);
        localStorage.setItem("user", JSON.stringify(data.user));
        dispatch(getJobs(data.user._id));
      } else {
        alert(data.message || "خطای ورود ❌");
      }
    } catch (err) {
      alert("اتصال به سرور ممکن نیست 😕");
    }
  }

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  const handleAdd = () => {
    if (input.trim() && user) {
      dispatch(addJob({ name: input, userId: user._id }));
      setInput("");
    } else if (!user) alert("لطفاً ابتدا وارد حساب کاربری شوید ❗");
  };

  const handlupdate = (job) => {
    setEditingJob(job);
    setEditingInput(job.name);
  };

  const handleConfirm = () => {
    if (editingInput.trim()) {
      dispatch(updateJob(editingJob._id, { name: editingInput }));
      setEditingJob(null);
      setEditingInput("");
    }
  };

  const handleCancel = () => {
    setEditingJob(null);
    setEditingInput("");
  };

  let work = "کار های من رو بگیر و با توجه به کار هایم 5 تا سوال از من بپرس و در نهایت برنامه ایی به من بده  که همه چیز سر جای خود باشه و استراحت به اندازه کافی باشه . وروی نمونه .\n\n" 
         + jobs.map(job => job.name).join(", ")
         + "لطفا بدون جدول کشی جواب رو بده مثلا  : [work1 - 12:00] [work2 - 14:00] [work3 - 20:15]";

  console.log(work)
  
  const handleDel = (id) => dispatch(delJob(id));

  const copyToClipboard = () => {
    navigator.clipboard.writeText(work)
      .then(() => {
        alert("متن کپی شد ✅");
      })
      .catch(err => {
        console.error("خطا در کپی:", err);
      });
  };

  return (
    <>


      {/* --- Routing --- */}
      <Routes>
        <Route
          path="/"
          element={
            <div className="main">
              {editingJob && (
                <div
                  className="contain"
                  style={{
                    width: 325,
                    backgroundColor: "aliceblue",
                    border: "1px solid black",
                    borderRadius: 24,
                    padding: 5,
                    margin: 5,
                  }}
                >
                  <h1>کار را ویرایش کنید</h1>
                  <input
                    type="text"
                    value={editingInput}
                    onChange={(e) => setEditingInput(e.target.value)}
                    style={{
                      width: "75%",
                      padding: 5,
                      border: "1px solid black",
                      borderRadius: 24,
                    }}
                  />
                  <div style={{ display: "flex", gap: 5 }}>
                    <button className="btn btn-primery" onClick={handleConfirm}>
                      تایید
                    </button>
                    <button className="btn btn-danger" onClick={handleCancel}>
                      لغو
                    </button>
                  </div>
                </div>
              )}

              {!user ? (
                <div className="login-box">
                  <h2>ورود به حساب</h2>
                  <input id="username" placeholder="نام کاربری" />
                  <input id="password" placeholder="رمز عبور" type="password" />
                  <button
                    onClick={() =>
                      handleLogin(
                        document.getElementById("username").value,
                        document.getElementById("password").value
                      )
                    }
                    className="btn"
                  >
                    ورود
                  </button>
                  <br />
                  <a href="/page/index.html">حساب ندارید؟ یکی بسازید!</a>
                  <a href="page/html/hint.html">راهنما</a>
                </div>
              ) : (
                
                <div className="container">
                  <div className="header">
                    <h1>سلام {user.username} 👋</h1>
                    <button className="logout-btn" onClick={handleLogout}>
                      خروج
                    </button>
                  </div>

                  <div className="input-row">
                    <input
                      type="text"
                      className="input"
                      placeholder="کار جدید..."
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                    />
                    <button onClick={handleAdd} className="btn">
                      افزودن
                    </button>
                  </div>

                  <div className="tasks">
                    {jobs.map((job) => (
                      <div key={job._id} className="work">
                        <span>{job.name}</span>
                        <div>
                          <button
                            onClick={() => handleDel(job._id)}
                            className="btn delet"
                          >
                            حذف
                          </button>
                          <button
                            onClick={() => handlupdate(job)}
                            className="btn edit"
                          >
                            ویرایش
                          </button>
                        </div>
                      </div>
                    ))}
                    <br />
                    <button onClick={copyToClipboard} className="btn btn-primary">کپی</button>
                    <br />
                    
                    <div>      <ul className="nav justify-content-center">
        <li className="nav-item">
          <Link className="nav-link" to="/chat">
            چت 💬
          </Link>
        </li>
      </ul></div>
                  </div>
                </div>
                
              )}
            </div>
          }
          
        />
          
        <Route path="/chat" element={<ChatPage />} />
      </Routes>
      
    </>
  );
}

export default App;
