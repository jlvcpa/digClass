export async function loadAllStudentMetadataToRecordPanel(attendanceDocID) {
  try {
    const sessionDocID = `${attendanceDocID}-gamesessionID`;
    const sessionRef = doc(db, "games", sessionDocID);
    const sessionSnap = await getDoc(sessionRef);

    if (!sessionSnap.exists()) return;

    const sessionData = sessionSnap.data();
    const allRounds = Object.entries(sessionData);
    if (allRounds.length === 0) return;

    const selectedMap = new Map(); // groupKey → Set of fullNames

    // Sort rounds by timestamp descending
    const sortedRounds = allRounds.sort((a, b) => {
      const aTime = parseInt(a[0].split("gamesessionID-")[1]);
      const bTime = parseInt(b[0].split("gamesessionID-")[1]);
      return bTime - aTime;
    });

    sortedRounds.forEach(([sessionFieldID, roundData]) => {
      const students = roundData.students || {};

      Object.entries(students).forEach(([groupKey, student]) => {
        const recordPanelID = `${groupKey}Records`;
        const recordPanel = document.getElementById(recordPanelID);
        if (!recordPanel) return;

        // 📝 Add record entry
        const recordEntry = document.createElement("div");
        recordEntry.className = "recordEntry highlight";
        recordEntry.innerHTML = `🎯 <strong>${student.fullName}</strong> selected for the challenge`;
        recordPanel.insertBefore(recordEntry, recordPanel.firstChild);

        // 🧠 Track selected student
        if (!selectedMap.has(groupKey)) selectedMap.set(groupKey, new Set());
        selectedMap.get(groupKey).add(student.fullName);
      });
    });

    // ✅ Apply deactivation logic once per group
    selectedMap.forEach((selectedNames, groupKey) => {
      const memberPanelID = `${groupKey}Members`;
      const memberPanel = document.getElementById(memberPanelID);
      if (!memberPanel) return;

      const studentEls = Array.from(memberPanel.querySelectorAll(".student"));
      studentEls.forEach(el => {
        const name = el.dataset.fullName;
        if (selectedNames.has(name)) {
          el.classList.add("selected", "deactivated");
          el.classList.remove("faded", "highlight");
        } else {
          el.classList.add("faded");
          el.classList.remove("selected", "highlight");
        }
      });
    });

    console.log(`✅ All past selections applied and deactivated`);
  } catch (error) {
    console.error("❌ Error loading student metadata:", error);
  }
}
