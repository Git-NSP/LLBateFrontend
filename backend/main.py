from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from debate import run_debate, judge_debate

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # allow all (for dev)
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class DebateRequest(BaseModel):
    topic: str
    model1: str = "allam-2-7b"
    model2: str = "llama-3.1-8b-instant"
    rounds: int = 4

@app.get("/")
def getData():
    print("get data")
    return {"Hey!, Explore the backend" : "https://llbatefrontend.onrender.com/docs"}
    return "Hey! This is backend for LLBate. Add '/docs to the url' for exploring routing in fast API(postman <=> Swagger UI) backend"

@app.post("/start-debate")
def start_debate(req: DebateRequest):
    print("debate started between : ", req.model1, req.model2)
    history = run_debate(req.topic, req.rounds, req.model1, req.model2)
    return {"history": history}


@app.post("/judge")
def judge(req: dict):
    print("Being judged")
    result = judge_debate(req["history"])
    return {"result": result}


