import { setDoc, doc } from "firebase/firestore";
import { db } from "./firebaseConfig.js";

export function startCountdown(startTimestamp, timeLimitSeconds, sessionDocID, sessionFieldID) {
  const displayEl = document.getElementById("remainingTime");
  if (!displayEl) return;

  const interval = setInterval(() => {
    const now = Date.now();
    const elapsed = Math.floor((now - startTimestamp) / 1000);
    const remaining = Math.max(0, timeLimitSeconds - elapsed);
    displayEl.textContent = remaining;

    if (remaining <= 0) {
      clearInterval(interval);
      setTimeout(async () => {
        await setDoc(doc(db, "games", sessionDocID), {
          [sessionFieldID]: { status: "Expired" }
        }, { merge: true });

        if (confirm("⏰ Time's up! Ready to select the next question and challengers?")) {
          window.selectQuestionAndChallengers();
        }
      }, 500);
    }
  }, 1000);
}