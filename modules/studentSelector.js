export async function selectAndAnimateStudents(groupSnaps, attendanceDocID) {
  const selectedStudents = {};
  const studentMetadata = {};
  const animationTasks = [];

  for (let i = 0; i < groupSnaps.length; i++) {
    const snap = groupSnaps[i];
    const groupNum = i + 1;
    const groupID = `group${groupNum}`;
    if (!snap.exists()) continue;

    const groupData = snap.data();
    const students = groupData.students;
    if (!students || students.length === 0) continue;

    const container = document.getElementById(`${groupID}Members`);
    const studentEls = Array.from(container.querySelectorAll(".student"));
    const eligibleEls = studentEls.filter(el => !el.classList.contains("deactivated"));

    const eligibleStudents = students.filter(student =>
      eligibleEls.some(el => el.dataset.fullName === student.fullName)
    );

    let selected = null;
    if (eligibleStudents.length > 0) {
      selected = eligibleStudents[Math.floor(Math.random() * eligibleStudents.length)];
      selectedStudents[groupID] = selected;
      studentMetadata[groupID] = selected;
    }

    // Push animation task
    animationTasks.push({ groupNum, groupID, selected, container, students });
  }

  // 🔁 Retry reset groups and finalize animations
  const animationPromises = animationTasks.map(async ({ groupNum, groupID, selected, container, students }) => {
    let result = await animateAndFinalizeSelection(groupNum, selected);

    if (result.wasReset) {
      const retryEligibleEls = Array.from(container.querySelectorAll(".student"))
        .filter(el => !el.classList.contains("deactivated"));

      const retryEligibleStudents = students.filter(student =>
        retryEligibleEls.some(el => el.dataset.fullName === student.fullName)
      );

      let retrySelected = null;
      if (retryEligibleStudents.length > 0) {
        retrySelected = retryEligibleStudents[Math.floor(Math.random() * retryEligibleStudents.length)];
        selectedStudents[groupID] = retrySelected;
        studentMetadata[groupID] = retrySelected;
      }

      result = await animateAndFinalizeSelection(groupNum, retrySelected);
    }

    return result;
  });

  const finalizedSelections = (await Promise.all(animationPromises)).filter(entry => entry && entry.selected);
  return { finalizedSelections, studentMetadata };
}
