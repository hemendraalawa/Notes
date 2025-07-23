import axios from "axios";

export default axios.create({
  baseURL: "https://notes-backend-e62d.onrender.com/api",  // apne backend ka url yahan daalein
  headers: { "Content-Type": "application/json" },
});

