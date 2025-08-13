import { getDoc, doc, setDoc } from "firebase/firestore";
import { db } from "./firebaseConfig.js";

export async function loadValidQuestions(attendanceDocID) {
  const questionBankID = `${attendanceDocID}_groupQB`;
  const qbSnap = await getDoc(doc(db, "groupingsQuestionBank", questionBankID));
  if (!qbSnap.exists()) return null;

  const questions = qbSnap.data().questions || [];
  const usedSnap = await getDoc(doc(db, "games", "usedQuestions"));
  const used = usedSnap.exists() ? usedSnap.data()[attendanceDocID] || [] : [];

  const filtered = questions.filter(q => !used.includes(q.question));
  return { questions: filtered.length ? filtered : questions, used };
}