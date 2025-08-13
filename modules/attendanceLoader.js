import { getDocs, getDoc, doc, collection } from "firebase/firestore";
import { db } from "./firebaseConfig.js"; // Make sure you have this module

export async function loadRecentAttendanceRecords(selectID = "selectAttendanceRecord") {
  const selectAttendance = document.getElementById(selectID);
  if (!selectAttendance) return;

  const snapshot = await getDocs(collection(db, "attendance"));
  const records = [];

  snapshot.forEach(doc => {
    const [section, date] = doc.id.split("_");
    records.push({ id: doc.id, section, date });
  });

  records.sort((a, b) => new Date(b.date) - new Date(a.date));
  const recent = records.slice(0, 15);

  recent.forEach(record => {
    const option = document.createElement("option");
    option.value = record.id;
    option.textContent = `${record.section} - ${record.date}`;
    selectAttendance.appendChild(option);
  });
}

export async function loadStudents(docId, listID = "studentList") {
  const studentList = document.getElementById(listID);
  if (!studentList) return;

  studentList.innerHTML = "";

  const attendanceDoc = await getDoc(doc(db, "attendance", docId));
  if (!attendanceDoc.exists()) {
    console.error("Attendance record not found:", docId);
    return;
  }

  const data = attendanceDoc.data();
  const students = data.students || [];

  students.forEach(student => {
    const { fullName, status } = student;
    const div = document.createElement("div");
    div.className = `student ${status === "A" ? "inactive" : "active"}`;
    div.textContent = `${fullName} - ${status}`;
    div.dataset.fullName = fullName;
    div.dataset.status = status;
    studentList.appendChild(div);
  });
}