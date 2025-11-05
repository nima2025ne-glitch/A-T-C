import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./App.css";

const ChatPage = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const navigate = useNavigate();

  const handleSend = async () => {
  if (!input.trim()) return;

  const userMessage = input;
  setMessages((prev) => [...prev, { text: userMessage, from: "user" }]);
  setInput("");

  // ساخت userId برای حافظه چت
  const userId = localStorage.getItem("chatUserId") || crypto.randomUUID();
  localStorage.setItem("chatUserId", userId);

  try {
    const res = await fetch(
      "https://nimamamamamama.app.n8n.cloud/webhook/chat",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage, userId }),
      }
    );

    let data;
    try {
      data = await res.json(); // مستقیم JSON بخوان
    } catch (e) {
      console.error("JSON parse error:", e);
      data = [];
    }

    // استخراج رشته از خروجی n8n
    let botReply = "پاسخی دریافت نشد 🤖";

    if (Array.isArray(data) && data.length > 0) {
      botReply = data[0]?.output || "پاسخی دریافت نشد 🤖";
    } else if (data?.output) {
      botReply = data.output;
    }

    // اضافه کردن پاسخ به پیام‌ها
    setMessages((prev) => [...prev, { text: botReply, from: "bot" }]);
  } catch (err) {
    console.error("خطا در ارتباط با n8n:", err);
    setMessages((prev) => [
      ...prev,
      { text: "خطایی در سرور رخ داد ❌", from: "bot" },
    ]);
  }
};

  const goBack = () => navigate(-1);

  return (
    <div className="main">
      <div className="container">
        <div className="header">
          <h1>صفحه چت 💬</h1>
          <button className="btn btn-primary" onClick={goBack}>
            برگشت به todo
          </button>
        </div>

        <div className="tasks">
          {messages.map((msg, i) => (
            <div
              key={i}
              className="work"
              style={{
                justifyContent: msg.from === "user" ? "flex-end" : "flex-start",
                backgroundColor: msg.from === "user" ? "#d1e7ff" : "#fff",
                display: "flex",
                borderRadius: 12,
                margin: "5px 0",
                padding: "5px 10px",
              }}
            >
              <span>{msg.text}</span>
            </div>
          ))}
        </div>

        <div className="input-row">
          <input
            className="input"
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="پیامت رو بنویس..."
          />
          <button className="btn" onClick={handleSend}>
            ارسال
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
