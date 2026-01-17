# QuickNotes 📝

QuickNotes is a full-stack note-taking application built using Node.js, Express, and vanilla JavaScript.  
It supports complete CRUD operations with a simple, mode-based UI and persistent storage using a JSON file.

This project focuses on understanding REST APIs, frontend–backend integration, and real Git/GitHub workflow, without using any frontend framework.

---

## 🚀 Features

- Create notes with title and content  
- View notes by ID  
- Update existing notes (partial updates supported)  
- Delete notes by ID  
- Mode-based UI (Create / View / Update / Delete)  
- Persistent storage using `NOTES.json`  
- Clean separation of frontend and backend  

---

## 🛠️ Tech Stack

**Frontend**
- HTML
- CSS
- Vanilla JavaScript

**Backend**
- Node.js
- Express.js
- File system (JSON storage)

**Project Structure**
 QuickNotes/
├─ frontend/
│ ├─ index.html
│ ├─ script.js
│ └─ styles.css
│
├─ backend/
│ ├─ server.js
│ ├─ package.json
│ ├─ package-lock.json
│ └─ NOTES.json
│
└─ .gitignore


---

## ⚙️ How to Run Locally

### 1️⃣ Clone the repository
```bash
git clone https://github.com/durgeshkhushlani/QuickNotes.git
cd QuickNotes/backend
```
Install Dependencies

npm install

Start the server

node server.js

Open in browser 

http://localhost:3000

**Future Improvements**

View / delete notes by title

Database integration (MongoDB / PostgreSQL)

Authentication

Better UI & animations

Deployment (Render / Railway)

**Author**
Durgesh Khushlani
## 📂 Project Structure

