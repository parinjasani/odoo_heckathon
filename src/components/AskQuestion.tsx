import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db, auth } from '../firebase/setup';
import account from "../assets/account.png";
import Avatar from "react-avatar";
import { toast } from 'react-toastify';

const AskQuestion = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState('');
  const [success, setSuccess] = useState(false); // ✅ success message state

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const questionData = {
      title,
      desc: description,
      tags: tags.split(',').map(tag => tag.trim()),
      username: auth?.currentUser?.email || 'Anonymous',
      date: serverTimestamp(),
      answers: [],
    };

    try {
      await addDoc(collection(db, 'questions'), questionData);
      setSuccess(true); // ✅ Show message
      setTimeout(() => {
        navigate('/main'); // ✅ Auto-redirect after 2 seconds
      }, 2000);
    } catch (error) {
      console.error('Error submitting question:', error);
    }
  };

  return (
    <div className="min-h-screen bg-white text-black px-6 py-8">
      <div className="max-w-2xl mx-auto border rounded-xl shadow-md p-6 bg-white">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-red-700 text-6xl font-bold font-serif text-center">StackIt</h1>
          <div className="flex items-center gap-4">
            <span className="cursor-pointer text-lg font-medium">Home</span>
            <span className="text-xl">🔔</span>
            {auth?.currentUser?.emailVerified ? (
              <Avatar
                round
                size="25"
                className="mt-0.5 ml-2 cursor-pointer"
                name={auth?.currentUser?.email ?? account}
              />
            ) : (
              <Avatar round size="25" className="mt-0.5 ml-2 cursor-pointer" src={account} />
            )}
          </div>
        </div>

        {/* ✅ Success message */}
        {success && (
          <div className="mb-4 p-3 text-green-800 bg-green-100 border border-green-300 rounded">
            Question submitted successfully! Redirecting...
          </div>
        )}

        {/* Form */}
        <h2 className="text-xl font-semibold mb-4">Ask Question</h2>
        <form onSubmit={handleSubmit}>
          <label className="block mb-1 font-medium">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 mb-4 rounded-md border"
            placeholder="Enter your question title"
            required
          />

          <label className="block mb-1 font-medium">Description</label>
          <div className="relative mb-4">
            <ReactQuill
              value={description}
              onChange={setDescription}
              className="bg-white"
              theme="snow"
            />
            <span className="absolute right-0 top-0 mt-1 mr-2 text-xs text-gray-400">HT</span>
          </div>

          <label className="block mb-1 font-medium">Tags (comma-separated)</label>
          <input
            type="text"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            className="w-full p-2 mb-6 rounded-md border"
            placeholder="e.g. javascript, react, firebase"
          />

          <button
            type="submit"
            className="w-full py-2 px-4 bg-black text-white rounded-md font-semibold hover:bg-gray-800"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default AskQuestion;
