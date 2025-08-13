export function renderSelectedQuestion(selectedQuestion, currentInput, timestamp, sessionDocID, sessionFieldID) {
  const panel = document.getElementById("gameQuestion");
  if (!panel) return;

  const { competency = "", topic = "", testType = "", question = "[No question text available]" } = selectedQuestion;

  panel.innerHTML = `
    <div class="questionPrompt">
      <label for="timeLimitInput">⏱️ Time Limit (seconds):</label>
      <input type="number" id="timeLimitInput" min="10" max="600" value="${currentInput}" />
      <div class="timerDisplay"><strong>Remaining Time:</strong> <span id="remainingTime">--</span> seconds</div>
      <strong>Question:</strong><br>
      <div class="questionText">${question}</div>
      <div class="questionMeta">
        <span>Competency: ${competency}</span><br>
        <span>Topic: ${topic}</span><br>
        <span>Test Type: ${testType}</span>
      </div>
      <button id="selectQuestionAndChallengersBtn">⬅️ Select a Question and Challengers</button>
    </div>
  `;
}

export   // Render Questions to allQuestionsList Panel
function renderQuestionsToPanel(questions) {
  const container = document.getElementById("allQuestionsList");
  container.innerHTML = ""; // Clear previous content

  // Create the two-column wrapper
  const columnsWrapper = document.createElement("div");
  columnsWrapper.className = "question-columns";

  // Create left and right column containers
  const leftColumn = document.createElement("div");
  leftColumn.className = "question-column";

  const rightColumn = document.createElement("div");
  rightColumn.className = "question-column";

  // Split questions into two halves
  const midpoint = Math.ceil(questions.length / 2);
  const firstHalf = questions.slice(0, midpoint);
  const secondHalf = questions.slice(midpoint);

  // Render first half into left column
  firstHalf.forEach((q, index) => {
    const div = document.createElement("div");
    div.className = "question-item";
    div.innerHTML = `<strong>Q${index + 1}:</strong> ${q.question || "[No question text]"}<hr>`;
    leftColumn.appendChild(div);
  });

  // Render second half into right column
  secondHalf.forEach((q, index) => {
    const div = document.createElement("div");
    div.className = "question-item";
    div.innerHTML = `<strong>Q${midpoint + index + 1}:</strong> ${q.question || "[No question text]"}<hr>`;
    rightColumn.appendChild(div);
  });

  // Append columns to wrapper, then to container
  columnsWrapper.appendChild(leftColumn);
  columnsWrapper.appendChild(rightColumn);
  container.appendChild(columnsWrapper);

} // End of render questions to allQuestionsList panel

  // 🚀 Initialize
  loadRecentAttendanceRecords();
})();