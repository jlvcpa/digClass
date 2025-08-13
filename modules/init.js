// init.js

import { loadRecentAttendanceRecords } from "./attendanceLoader.js";
import { generateGameViewLink } from "./linkGenerator.js";
import {
  setupChallengeTypeToggle,
  setupStudentPanelToggle,
} from "./uiToggles.js";

// Optional: log for audit trail
console.log(`[INIT] UI bootstrapping started at ${new Date().toISOString()}`);

window.addEventListener("DOMContentLoaded", () => {
  setupChallengeTypeToggle();
  setupStudentPanelToggle();
  loadRecentAttendanceRecords();
  generateGameViewLink();

  console.log(`[INIT] UI initialized with challengeMode: ${window.challengeMode}`);
});