// uiToggles.js

// Optional: Centralized UI state for debugging or syncing
export const uiState = {
  challengeMode: null,
  studentPanelVisible: true,
};

/**
 * Initializes the challenge type toggle.
 * Syncs UI visibility for group-related panels and stores mode globally.
 */
export function setupChallengeTypeToggle() {
  const select = document.getElementById("challengeType");
  const groupRow = document.querySelector(".group-row");
  const groupSaveShow = document.getElementById("groupSaveShow");

  if (!select) {
    console.warn("Challenge type <select> not found");
    return;
  }

  // Initial state
  uiState.challengeMode = select.value;
  window.challengeMode = select.value;
  updateChallengeUI(select.value, groupRow, groupSaveShow);

  // Listen for changes
  select.addEventListener("change", () => {
    const mode = select.value;
    uiState.challengeMode = mode;
    window.challengeMode = mode;
    updateChallengeUI(mode, groupRow, groupSaveShow);
  });
}

/**
 * Updates visibility of group-related UI elements based on challenge mode.
 */
function updateChallengeUI(mode, groupRow, groupSaveShow) {
  const isGroup = mode === "group";
  if (groupRow) groupRow.style.display = isGroup ? "flex" : "none";
  if (groupSaveShow) groupSaveShow.style.display = isGroup ? "block" : "none";
}

/**
 * Initializes the student panel toggle.
 * Toggles visibility and updates button label and layout class.
 */
export function setupStudentPanelToggle() {
  const toggleBtn = document.getElementById("toggleStudentPanelBtn");
  const panel = document.getElementById("studentPanel");
  const leftColumn = document.querySelector(".left-column");

  if (!toggleBtn || !panel || !leftColumn) {
    console.warn("Student panel toggle elements missing");
    return;
  }

  toggleBtn.addEventListener("click", function () {
    const isHidden = panel.classList.toggle("hidden");
    this.textContent = isHidden ? "<<<<<" : ">>>>>";
    leftColumn.classList.toggle("expanded", isHidden);

    // Optional: track state
    uiState.studentPanelVisible = !isHidden;
    this.setAttribute("aria-expanded", !isHidden);
  });
}