
// import { useEffect, useState } from "react";
// import {
//   collection,
//   getDocs,
//   query,
//   orderBy,
// } from "firebase/firestore";
// import { db } from "../firebase/setup";
// import QuestionCard from "./QuestionCard";
// import { Question, Answer } from "./types";
// import { Link } from "react-router-dom";

// const QUESTIONS_PER_PAGE = 3;

// const StackItUI = () => {
//   const [questions, setQuestions] = useState<Question[]>([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [sortOrder, setSortOrder] = useState("Newest");

//   const fetchQuestions = async () => {
//     try {
//       const questionsRef = collection(db, "questions");
//       const q = sortOrder === "Newest"
//         ? query(questionsRef, orderBy("date", "desc"))
//         : query(questionsRef, orderBy("date", "asc"));

//       const snapshot = await getDocs(q);

//       const questionsData: Question[] = await Promise.all(
//         snapshot.docs.map(async (docSnap) => {
//           const q = docSnap.data();
//           const answersSnapshot = await getDocs(
//             collection(docSnap.ref, "answers")
//           );
//           const answers: Answer[] = answersSnapshot.docs.map((a) => {
//             const d = a.data();
//             return {
//               content: d.content,
//               author: d.author,
//               timestamp: d.timestamp?.toDate().toISOString() || "",
//             };
//           });

//           return {
//             id: docSnap.id,
//             title: q.title,
//             desc: q.desc,
//             tags: q.tags,
//             username: q.username,
//             date: q.date?.toDate().toISOString() || "",
//             answersList: answers,
//           };
//         })
//       );

//       setQuestions(questionsData);
//     } catch (err) {
//       console.error("Error fetching questions with answers:", err);
//     }
//   };

//   useEffect(() => {
//     fetchQuestions();
//   }, [sortOrder]);

//   // Pagination Logic
//   const indexOfLast = currentPage * QUESTIONS_PER_PAGE;
//   const indexOfFirst = indexOfLast - QUESTIONS_PER_PAGE;
//   const currentQuestions = questions.slice(indexOfFirst, indexOfLast);
//   const totalPages = Math.ceil(questions.length / QUESTIONS_PER_PAGE);

//   return (
//     <div className="max-w-6xl mx-auto p-4 w-full">
//       {/* Top Bar */}
//       <div className="flex items-center gap-4 mb-4">
//         <Link to="/ask">
//           <button className="bg-blue-500 text-white px-4 py-2 rounded-full">
//             Ask New Question
//           </button>
//         </Link>

//         <select
//           className="border px-2 py-1 rounded"
//           value={sortOrder}
//           onChange={(e) => {
//             setSortOrder(e.target.value);
//             setCurrentPage(1); // Reset to first page on sort change
//           }}
//         >
//           <option value="Newest">Newest</option>
//           <option value="Oldest">Oldest</option>
//         </select>

//         <button className="border px-2 py-1 rounded">Unanswered</button>

//         <input
//           type="text"
//           placeholder="Search"
//           className="border px-2 py-1 rounded ml-auto"
//         />
//       </div>

//       {/* Render paginated questions */}
//       {currentQuestions.map((q) => (
//         <QuestionCard
//           key={q.id}
//           id={q.id}
//           title={q.title}
//           desc={q.desc}
//           tags={q.tags}
//           username={q.username}
//           answers={q.answersList}
//         />
//       ))}

//       {/* Pagination Controls */}
//       <div className="flex justify-center gap-2 mt-6">
//         {Array.from({ length: totalPages }, (_, i) => (
//           <button
//             key={i + 1}
//             onClick={() => setCurrentPage(i + 1)}
//             className={`px-3 py-1 rounded border ${
//               currentPage === i + 1
//                 ? "bg-blue-600 text-white"
//                 : "bg-white text-blue-600"
//             }`}
//           >
//             {i + 1}
//           </button>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default StackItUI;


import { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  query,
  orderBy,
} from "firebase/firestore";
import { db } from "../firebase/setup";
import QuestionCard from "./QuestionCard";
import { Question, Answer } from "./types";
import { Link } from "react-router-dom";

const QUESTIONS_PER_PAGE = 3;

const StackItUI = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOrder, setSortOrder] = useState("Newest");
  const [showUnanswered, setShowUnanswered] = useState(false);

  const fetchQuestions = async () => {
    try {
      const questionsRef = collection(db, "questions");
      const q = sortOrder === "Newest"
        ? query(questionsRef, orderBy("date", "desc"))
        : query(questionsRef, orderBy("date", "asc"));

      const snapshot = await getDocs(q);

      const questionsData: Question[] = await Promise.all(
        snapshot.docs.map(async (docSnap) => {
          const q = docSnap.data();
          const answersSnapshot = await getDocs(
            collection(docSnap.ref, "answers")
          );
          const answers: Answer[] = answersSnapshot.docs.map((a) => {
            const d = a.data();
            return {
              content: d.content,
              author: d.author,
              timestamp: d.timestamp?.toDate().toISOString() || "",
            };
          });

          return {
            id: docSnap.id,
            title: q.title,
            desc: q.desc,
            tags: q.tags,
            username: q.username,
            date: q.date?.toDate().toISOString() || "",
            answersList: answers,
          };
        })
      );

      // Filter if "Unanswered" is selected
      const filtered = showUnanswered
        ? questionsData.filter((q) => q.answersList.length === 0)
        : questionsData;

      setQuestions(filtered);
    } catch (err) {
      console.error("Error fetching questions with answers:", err);
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, [sortOrder, showUnanswered]);

  // Pagination Logic
  const indexOfLast = currentPage * QUESTIONS_PER_PAGE;
  const indexOfFirst = indexOfLast - QUESTIONS_PER_PAGE;
  const currentQuestions = questions.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(questions.length / QUESTIONS_PER_PAGE);

  return (
    <div className="max-w-6xl mx-auto p-4 w-full">
      {/* Top Bar */}
      <div className="flex items-center gap-4 mb-4">
        <Link to="/ask">
          <button className="bg-blue-500 text-white px-4 py-2 rounded-full">
            Ask New Question
          </button>
        </Link>

        <select
          className="border px-2 py-1 rounded"
          value={sortOrder}
          onChange={(e) => {
            setSortOrder(e.target.value);
            setCurrentPage(1);
          }}
        >
          <option value="Newest">Newest</option>
          <option value="Oldest">Oldest</option>
        </select>

        <button
          onClick={() => {
            setShowUnanswered((prev) => !prev);
            setCurrentPage(1);
          }}
          className={`border px-2 py-1 rounded ${
            showUnanswered ? "bg-blue-600 text-white" : ""
          }`}
        >
          Unanswered
        </button>

        <input
          type="text"
          placeholder="Search"
          className="border px-2 py-1 rounded ml-auto"
        />
      </div>

      {/* Render paginated questions */}
      {currentQuestions.map((q) => (
        <QuestionCard
          key={q.id}
          id={q.id}
          title={q.title}
          desc={q.desc}
          tags={q.tags}
          username={q.username}
          answers={q.answersList}
        />
      ))}

      {/* Pagination Controls */}
      <div className="flex justify-center gap-2 mt-6">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i + 1}
            onClick={() => setCurrentPage(i + 1)}
            className={`px-3 py-1 rounded border ${
              currentPage === i + 1
                ? "bg-blue-600 text-white"
                : "bg-white text-blue-600"
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default StackItUI;
