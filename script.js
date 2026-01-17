const form = document.querySelector(".note-form");
const message = document.querySelector(".save-message");
const idInput = document.querySelector(".note-id");
const titleInput = document.querySelector(".note-title");
const contentInput = document.querySelector(".note-content");
const notesList = document.querySelector(".notes-list");
const buttons = document.querySelectorAll(".crud-button");
const submitBtn = document.querySelector(".submit-btn");

let currentMode = "create";

/* ---------------- BUTTON MODE HANDLING ---------------- */

buttons.forEach(btn => {
  btn.addEventListener("click", () => {

    //clear the noteslist div
    notesList.innerHTML= "";
    // active state
    buttons.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    currentMode = btn.textContent.toLowerCase();

    // hide all fields
    idInput.style.display = "none";
    titleInput.style.display = "none";
    contentInput.style.display = "none";

    // submit button text according to mode

    if (currentMode === "create" || currentMode === "update") {
      submitBtn.textContent = "Save Note";
    }

    if (currentMode === "view") {
      submitBtn.textContent = "View Note";
    }

    if (currentMode === "delete") {
      submitBtn.textContent = "Delete Note";
    }


    // show fields based on mode
    if (currentMode === "create") {
      titleInput.style.display = "block";
      contentInput.style.display = "block";
    }

    if (currentMode === "view" || currentMode === "delete") {
      idInput.style.display = "block";
    }

    if (currentMode === "update") {
      idInput.style.display = "block";
      titleInput.style.display = "block";
      contentInput.style.display = "block";
    }
  });
});

/* ---------------- FORM SUBMIT HANDLER ---------------- */

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const id = idInput.value.trim();
  const title = titleInput.value.trim();
  const content = contentInput.value.trim();

  // CREATE
  if (currentMode === "create") {
    if (!title || !content) {
      alert("Title and content are required");
      return;
    }

    await fetch("/notes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, content })
    });
  }

  // VIEW
  if (currentMode === "view") {

      if (!id) {
        alert("Enter note ID");
        return;
      }

      const res = await fetch(`/notes/${id}`);

      if (!res.ok) {
        alert("Note not found");
        return;
      }

      const note = await res.json();

      // hide all inputs
      idInput.style.display = "none";
      titleInput.style.display = "none";
      contentInput.style.display = "none";

      // show note in result div
      notesList.innerHTML = `
        <div style="margin-top:10px;padding:10px;border:1px solid #e5e7eb;border-radius:6px;">
          <h3>${note.title}</h3>
          <p>${note.content}</p>
        </div>
      `;

      return; // stop further execution
    }


  // UPDATE
  if (currentMode === "update") {
      if (!id || (!title && !content)) {
        alert("ID and at least one field to update required");
        return;
      }

      const payload = {};
      if (title) payload.title = title;
      if (content) payload.content = content;

      const res = await fetch(`/notes/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (!res.ok) {
        alert("Note not found");
        return;
      }

      // success message handled globally
  }


  // DELETE
  if (currentMode === "delete") {
      const noteID = Number(id);
      if (!noteID) {
        alert("Enter note ID");
        return;
      }

      const res = await fetch(`/notes/${noteID}`, {
        method: "DELETE"
      });

      if (!res.ok) {
        alert("Note not found");
        return;
      }

      // success message handled globally ("Note deleted")
    }


  // success feedback (mode-based)
  if (currentMode === "create" || currentMode === "update") {
    message.textContent = "Note saved";
    message.style.display = "block";
  }

  if (currentMode === "delete") {
    message.textContent = "Note deleted";
    message.style.display = "block";
  }

  if (currentMode !== "view") {
    setTimeout(() => {
      message.style.display = "none";
    }, 2000);
  }


  form.reset();
  contentInput.style.height = "auto";
});


// auto increment of size 
contentInput.addEventListener("input", () => {
  contentInput.style.height = "auto";
  contentInput.style.height = contentInput.scrollHeight + "px";
});
  