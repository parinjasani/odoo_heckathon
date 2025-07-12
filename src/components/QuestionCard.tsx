import React from "react";
import { Link } from "react-router-dom";

interface Answer {
  content: string;
  author: string;
  timestamp?: any; // optional, useful for sorting
}

interface Props {
  id: string;
  title: string;
  desc: string;
  tags: string[];
  username: string;
  answers: Answer[];
}

const QuestionCard = ({ id, title, desc, tags, username, answers }: Props) => {
  return (
    <div className="border rounded p-4 mb-4 bg-white shadow-sm">
      {/* Title and username */}
      <div className="flex justify-between items-center mb-2">
        <h2 className="font-semibold text-lg ">{title}</h2>
        <span className="text-sm text-gray-600">{username}</span>
      </div>

      {/* Description */}
      <div
        className="text-sm text-gray-700 mb-2"
        dangerouslySetInnerHTML={{ __html: desc }}
      />

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-2">
        {tags.map((tag, i) => (
          <span key={i} className="bg-gray-200 text-xs px-2 py-1 rounded">
            {tag}
          </span>
        ))}
      </div>

      {/* First Answer if available */}
      {answers.length > 0 && (
        <div className="bg-gray-100 p-2 rounded text-sm italic text-gray-800 mb-2">
          <div dangerouslySetInnerHTML={{ __html: answers[0].content }} />
          <p className="text-right text-xs mt-1">– {answers[0].author}</p>
        </div>
      )}

      {/* Footer: Give Answer + Total Count */}
      <div className="flex justify-between items-center text-sm text-gray-600 mt-2">
        <Link
          to="/answerform"
          state={{
            id,
            title,
            desc,
            tags,
            username,
            answers,
          }}
        >
          <button className="text-blue-600 font-medium hover:underline">
            Give Answer
          </button>
        </Link>
        <span className="border px-2 py-1 rounded text-gray-700">
          {answers.length} answer{answers.length !== 1 && "s"}
        </span>
      </div>
    </div>
  );
};

export default QuestionCard;
