import os
from dotenv import load_dotenv
from langchain_groq import ChatGroq
from langchain_core.messages import HumanMessage

load_dotenv()


def run_debate(topic, rounds, model_choice1, model_choice2):
    model1 = ChatGroq(
            api_key=os.getenv("GROQ_API_KEY"),
            model_name=model_choice1,
            temperature=0.1
    )

    model2 = ChatGroq(
            api_key=os.getenv("GROQ_API_KEY"),
            model_name=model_choice2,
            temperature=0.6
    )
    
    history = []
    message = f"{topic}."

    for i in range(rounds):
        model1_reply = model1.invoke([HumanMessage(content=f"You are AGAINST the message : {message}. Keep the argument in less than 2 sentences.")]).content
        history.append({"role": "chatbot1", "text": model1_reply})
        
        model2_reply = model2.invoke([HumanMessage(content=f"You are Against the message : {model1_reply}. Keep the argument in less than 2 sentences.")]).content
        history.append({"role": "chatbot2", "text": model2_reply})

        message = model2_reply

    return history


def judge_debate(history):
    combined = "\n".join([f"{h['role']}: {h['text']}" for h in history])

    judge = ChatGroq(
        api_key=os.getenv("GROQ_API_KEY"),
        model_name="qwen/qwen3-32b",
        temperature=0.9
    )

    result = judge.invoke(
        f"Analyze this debate. Decide winner (Chatbot1 or Chatbot2). Finally give an output in 3 lines as a conclusion.:\n{combined}"
    ).content

    return result

