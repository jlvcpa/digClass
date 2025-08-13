export function generateGameViewLink() {
  const select = document.getElementById("selectAttendanceRecord");
  const selectedDocId = select?.value;
  if (!selectedDocId) return alert("Please select an attendance record.");

  const baseUrl = "https://jlvcpa.github.io/dev.page/studentsGameView.html";
  const link = `${baseUrl}?attendanceRecord=${encodeURIComponent(selectedDocId)}`;

  const anchor = document.getElementById("gameViewLink");
  anchor.href = link;
  anchor.style.display = "inline-block";
  anchor.textContent = `Open Game View for ${selectedDocId}`;
}