// import { useState } from "react";
// import axios from "axios";

// function App() {
//   const [topic, setTopic] = useState("");
//   const [chat, setChat] = useState([]);
//   const [result, setResult] = useState("");

//   const startDebate = async () => {
//     const res = await axios.post("https://llbatefrontend.onrender.com/start-debate", {
//       topic: topic,
//       rounds: 4,
//     });
//     setChat(res.data.history);
//   };

//   const judge = async () => {
//     const res = await axios.post("https://llbatefrontend.onrender.com/judge", {
//       history: chat,
//     });
//     setResult(res.data.result);
//   };

//   return (
//     <div>
//       <h1>LLM Debate</h1>

//       <input
//         value={topic}
//         onChange={(e) => setTopic(e.target.value)}
//         placeholder="Enter topic"
//       />

//       <button onClick={startDebate}>Start Debate</button>

//       <div>
//         {chat.map((msg, i) => (
//           <p key={i}>
//             <b>{msg.role}:</b> {msg.text}
//           </p>
//         ))}
//       </div>

//       <button onClick={judge}>Judge</button>

//       <h2>{result}</h2>
//     </div>
//   );
// }

// export default App;

// -----------------------------------------------------------------


// import { useState } from "react";
// import axios from "axios";
// import "./App.css";

// function App() {
//   const [topic, setTopic] = useState("");
//   const [chat, setChat] = useState([]);
//   const [result, setResult] = useState("");

//   const startDebate = async () => {
//     const res = await axios.post("https://llbatefrontend.onrender.com/start-debate", {
//       topic,
//       rounds: 4,
//     });

//     setChat(res.data.history);
//     setResult("");
//   };

//   const judge = async () => {
//     const res = await axios.post("https://llbatefrontend.onrender.com/judge", {
//       history: chat,
//     });

//     setResult(res.data.result);
//   };

//   return (
//     <div className="app">
//       <div className="container">
//         {/* Header */}
//         <header className="header">
//           <h1>LLBate</h1>
//           <p>Multi-agent reasoning simulation and adjudication system</p>
//         </header>

//         {/* Controls */}
//         <div className="card">
//           <input
//             value={topic}
//             onChange={(e) => setTopic(e.target.value)}
//             placeholder="Enter debate topic..."
//           />

//           <div className="button-group">
//             <button className="primary-btn" onClick={startDebate}>
//               Start Debate
//             </button>

//             <button className="secondary-btn" onClick={judge}>
//               Judge
//             </button>
//           </div>
//         </div>

//         {/* Debate Feed */}
//         <div className="feed-card">
//           <h2>Debate Transcript</h2>

//           <div className="feed">
//             {chat.length === 0 ? (
//               <p className="placeholder">
//                 Awaiting debate initialization...
//               </p>
//             ) : (
//               chat.map((msg, i) => (
//                 <div
//                   key={i}
//                   className={`message ${
//                     msg.role === "Agent A" ? "agent-a" : "agent-b"
//                   }`}
//                 >
//                   <div className="role">{msg.role}</div>
//                   <div className="text">{msg.text}</div>
//                 </div>
//               ))
//             )}
//           </div>
//         </div>

//         {/* Result */}
//         {result && (
//           <div className="result-card">
//             <h2>Final Verdict</h2>
//             <p>{result}</p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default App;

// -----------------------------------------------------------------------------------


import { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [topic, setTopic] = useState("");
  const [model1, setModel1] = useState("allam-2-7b");
  const [model2, setModel2] = useState("llama-3.1-8b-instant");
  const [chat, setChat] = useState([]);
  const [visibleMessages, setVisibleMessages] = useState(0);
  const [result, setResult] = useState("");

  const startDebate = async () => {
    const res = await axios.post("https://llbatefrontend.onrender.com/start-debate", {
      topic,
      model1,
      model2,
      rounds: 4,
    });

    const history = res.data.history;

    setChat(history);
    setVisibleMessages(0);
    setResult("");

    let i = 0;

    const interval = setInterval(() => {
      i++;
      setVisibleMessages(i);

      if (i >= history.length) clearInterval(interval);
    }, 1800);
  };

  const judge = async () => {
    const res = await axios.post("https://llbatefrontend.onrender.com/judge", {
      history: chat
    });

    setResult(res.data.result);
  };

  const visibleChat = chat.slice(0, visibleMessages);

  return (
    <div className="app">
      <div className="container">
        <header className="header">
          <h1>LLBate</h1>
        </header>

        <div className="controls">
          <input
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="Enter debate topic..."
          />

          <select value={model1} onChange={(e) => setModel1(e.target.value)}>
            <option value="allam-2-7b">Jessica Pearson(allam-2-7b)</option>
            <option value="llama-3.1-8b-instant">Harvey Spectre(llama-3.1-8b-instant)</option>
            <option value="llama-3.3-70b-versatile">Louis Litt(llama-3.3-70b-versatile)</option>
            <option value="qwen/qwen3-32b">Scottie (qwen3-90b)</option>
          </select>

          <select value={model2} onChange={(e) => setModel2(e.target.value)}>
            <option value="qwen/qwen3-32b">Daniel Hardman (qwen/qwen3-32b)</option>
            <option value="llama-3.3-70b-versatile">Travis Tanner (llama-3.3-70b-versatile)</option>
            <option value="meta-llama/llama-4-scout-17b-16e-instruct">Mike Ross(meta-llama/llama-4-scout-17b)</option>
            <option value="llama-3.1-8b-instant">Robert Zane (gemma-4.6-70b-instant)</option>
          </select>

          <div className="buttons">
            <button className="start-btn" onClick={startDebate}>
              Start Debate
            </button>

            <button className="judge-btn" onClick={judge}>
              Judge
            </button>
          </div>
        </div>

        {chat.length > 0 && (
          <div className="debate-grid">
            {/* Chatbot 1 */}
            <div className="agent-panel">
              <h2>Chatbot 1</h2>

              {visibleChat
                .filter((_, i) => i % 2 === 0)
                .map((msg, i) => (
                  <div key={i} className="message a">
                    {msg.text}
                  </div>
                ))}
            </div>

            {/* Chatbot 2 */}
            <div className="agent-panel">
              <h2>Chatbot 2</h2>

              {visibleChat
                .filter((_, i) => i % 2 !== 0)
                .map((msg, i) => (
                  <div key={i} className="message b">
                    {msg.text}
                  </div>
                ))}
            </div>
          </div>
        )}

        {result && (
          <div className="result-box">
            <h2>Final Verdict</h2>
            <p>{result}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;


