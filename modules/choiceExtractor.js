export async function fetchAndDisplayChoices(attendanceDocID) {
const attendanceDocID = selectAttendance.value;
  if (!attendanceDocID) {
    alert("Please select an attendance record.");
    return;
  }

  const docID = `${attendanceDocID}_groupQB`;
  const docRef = doc(db, "groupingsQuestionBank", docID);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) {
    alert("❌ No questions found for this attendance record.");
    return;
  }

  const questions = docSnap.data().questions;

  const types = new Set();
  const elements = new Set();
  const accounts = new Set();

  questions.forEach(q => {
    const answer = q.answer;
    if (answer?.type) types.add(answer.type);

    if (Array.isArray(answer.effects)) {
      answer.effects.forEach(effect => {
        if (effect.element) elements.add(effect.element);
        if (effect.account) accounts.add(effect.account);
      });
    }
  });

  // Convert sets to sorted arrays
  const sortedTypes = [...types].sort();
  const sortedElements = [...elements].sort();
  const sortedAccounts = [...accounts].sort();

  // Render to gameChoices panel
  const gameChoicesPanel = document.getElementById("gameChoices");
  gameChoicesPanel.innerHTML = `
    <div class="panelHeader">🧩 Choices</div>
    ${renderGroup("Type", sortedTypes)}
    ${renderGroup("Element", sortedElements)}
    ${renderGroup("Account", sortedAccounts)}
  `;
}

function renderGroup(title, items) {
  return `
    <div class="choiceGroup">
      <div class="groupTitle">${title}:</div>
      <ul class="choiceList">
        ${items.map(item => `<li class="choiceItem">${item}</li>`).join("")}
      </ul>
    </div>
  `;
}
function renderGroup(title, items) {
  const half = Math.ceil(items.length / 2);
  const firstColumn = items.slice(0, half);
  const secondColumn = items.slice(half);

  return `
    <div class="choiceGroup">
      <div class="groupTitle">${title}:</div>
      <div class="choiceColumns">
        <ul class="choiceList">
          ${firstColumn.map(item => `<li class="choiceItem">${item}</li>`).join("")}
        </ul>
        <ul class="choiceList">
          ${secondColumn.map(item => `<li class="choiceItem">${item}</li>`).join("")}
        </ul>
      </div>
    </div>
  `;
}

