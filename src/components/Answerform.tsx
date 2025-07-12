
import account from "../assets/account.png";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { addDoc, collection, getDocs, serverTimestamp } from "firebase/firestore";
import { db, auth } from "../firebase/setup";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Avatar from "react-avatar"
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface Answer {
  content: string;
  author: string;
  timestamp?: any;
}

const stripHtml = (html: string): string => {
  const tmp = document.createElement("div");
  tmp.innerHTML = html;
  return tmp.textContent || tmp.innerText || "";
};

const AnswerForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const data = location.state;

  const [answer, setAnswer] = useState("");
  const [answers, setAnswers] = useState<Answer[]>([]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!answer.trim()) return;

    try {
      const answerRef = collection(db, `questions/${data.id}/answers`);
      await addDoc(answerRef, {
        author: auth?.currentUser?.email || "Anonymous",
        content: answer,
        timestamp: serverTimestamp(),
      });

      //  alert("✅ Answer submitted!");

       toast.success("✅ Answer submitted!", {
      position: "top-center",
      autoClose: 3000,
       });
      
      setAnswer("");
      fetchAnswers(); // refresh
    } catch (error) {
      console.error("Error submitting answer:", error);
    }
  };

  const fetchAnswers = async () => {
    try {
      const answerRef = collection(db, `questions/${data.id}/answers`);
      const snapshot = await getDocs(answerRef);
      const answersArray: Answer[] = snapshot.docs.map((doc) => doc.data() as Answer);
      setAnswers(answersArray);
    } catch (err) {
      console.error("Error fetching answers:", err);
    }
  };

  useEffect(() => {
    fetchAnswers();
  }, [data.id]);

  return (
    <div className="min-h-screen bg-white text-black px-6 py-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-red-700 text-6xl">StackIt</h1>
        <div className="flex items-center gap-4">
          <span className="cursor-pointer">Home</span>
          {auth?.currentUser?.emailVerified ? <Avatar round size="25" className="mt-0.5 ml-2 cursor-pointer" name={auth?.currentUser?.email ?? account}/>
      : <Avatar round size="25" className="mt-0.5 ml-2 cursor-pointer mr-10" src={account}/>}
        </div>
      </div>

      {/* Question Details */}
      <div>
        <div className="text-sm text-blue-600 underline cursor-pointer mb-2">
  Question &gt; {stripHtml(data.desc).slice(0, 30)}...
</div>

        <h2 className="text-xl font-semibold">{data.title}</h2>
        <div className="flex gap-2 mt-2 mb-2">
          {data.tags.map((tag: string, i: number) => (
            <span key={i} className="bg-gray-200 text-xs px-2 py-1 rounded">{tag}</span>
          ))}
        </div>
        <p className="text-gray-700 mb-4" dangerouslySetInnerHTML={{ __html: data.desc }}></p>
        <p className="text-sm text-purple-700 font-medium">{data.username}</p>
      </div>

      {/* All Answers */}
     {/* All Answers Section */}
<div className="mt-8">
  <h3 className="text-lg font-semibold mb-4">Answers</h3>

  {answers.length > 0 ? (
    answers.map((ans, idx) => (
      <div key={idx} className="flex gap-4 items-start mb-6">
        <div className="flex flex-col items-center text-gray-500">
          <button>▲</button>
          <span>{Math.floor(Math.random() * 10)}</span>
          <button>▼</button>
        </div>
        <div className="w-full">
          <p className="font-semibold">Answer {idx + 1}</p>
          <div className="text-gray-700 mt-1" dangerouslySetInnerHTML={{ __html: ans.content }} />
          <p className="mt-2 text-xs text-blue-700 font-medium">{ans.author}</p>
        </div>
      </div>
    ))
  ) : (
    <p className="text-sm text-gray-500 italic">No answers yet. Be the first to contribute!</p>
  )}
</div>


      {/* Submit Your Answer */}
      <div className="mt-10">
        <h3 className="text-lg font-semibold mb-2">Submit Your Answer</h3>
        <ReactQuill
          value={answer}
          onChange={setAnswer}
          theme="snow"
          className="mb-4 bg-white text-black"
        />
        <button
          onClick={handleSubmit}
          className="bg-blue-400 hover:bg-blue-500 text-white px-6 py-2 rounded-md"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default AnswerForm;
