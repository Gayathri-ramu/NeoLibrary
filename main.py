from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from fastapi.responses import JSONResponse

app = FastAPI()

# Enable CORS to allow frontend JS to call backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # For development only. Change this in production!
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

# ---------- Feedback ----------
FEEDBACK_FILE = "feedback.txt"

class Feedback(BaseModel):
    name: str
    email: str
    message: str

@app.post("/submit-feedback/")
async def submit_feedback(feedback: Feedback):
    try:
        with open(FEEDBACK_FILE, "a", encoding="utf-8") as f:
            f.write(f"Name: {feedback.name}\nEmail: {feedback.email}\nMessage: {feedback.message}\n---\n")
        return {"status": "success"}
    except Exception as e:
        return JSONResponse(status_code=500, content={"status": "error", "message": str(e)})

# ---------- Borrow ----------
BORROW_FILE = "borrowed.txt"

class BorrowRequest(BaseModel):
    member_id: str
    book_id: str

@app.post("/borrow/")
async def borrow_book(request: BorrowRequest):
    try:
        with open(BORROW_FILE, "a", encoding="utf-8") as f:
            f.write(f"MemberID: {request.member_id}, BookID: {request.book_id}\n")
        return {"message": "Book borrowed successfully"}
    except Exception as e:
        return JSONResponse(status_code=500, content={"error": str(e)})
