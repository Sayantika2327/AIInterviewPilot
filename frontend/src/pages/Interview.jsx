import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import InterviewHeader from "../components/interview/InterviewHeader";
import AIAvatar from "../components/interview/AIAvatar";
import QuestionCard from "../components/interview/QuestionCard";

import ControlPanel from "../components/interview/ControlPanel";
import ProgressBar from "../components/interview/ProgressBar";
import InterviewTips from "../components/interview/InterviewTips";
import Timer from "../components/interview/Timer";
import useVoiceInterview from "../hooks/useVoiceInterview";
import LiveTranscript from "../components/interview/LiveTranscript";


import {
  startInterview,
  nextQuestion,
  getInterviewReport,
} from "../services/interview";

function Interview() {
  const navigate = useNavigate();

  const {
  transcript,
  listening,
  startListening,
  stopListening,
  resetTranscript,
  speak,
  browserSupportsSpeechRecognition,
} = useVoiceInterview();

  const [interviewId, setInterviewId] = useState(null);

  const [question, setQuestion] = useState("");

  

  const [currentQuestion, setCurrentQuestion] = useState(1);

  const [speaking, setSpeaking] = useState(false);

  const [loading, setLoading] = useState(true);

  const totalQuestions = 10;

  useEffect(() => {
    startInterviewSession();
  }, []);

  useEffect(() => {
  if (!question) return;

  setSpeaking(true);

  speak(question);

  const utterance = new SpeechSynthesisUtterance(question);

  utterance.onend = () => {
    setSpeaking(false);
    startListening();
  };

  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(utterance);

}, [question]);
useEffect(() => {
  return () => {
    stopListening();
    window.speechSynthesis.cancel();
  };
}, []);
useEffect(() => {
  if (!listening && transcript.trim()) {
    submitAnswer();
  }
}, [listening]);

  const startInterviewSession = async () => {
    try {

      const jobDescription =
        localStorage.getItem("jobDescription");

      const data =
        await startInterview(jobDescription);

      setInterviewId(data.interview_id);

      console.log("Started Interview ID:", data.interview_id);

      setQuestion(data.question);


    } catch (err) {

      console.log(err);

    } finally {

      setLoading(false);

    }
  };
  const submitAnswer = async () => {
  if (!transcript.trim()) return;

  try {
    const data = await nextQuestion(
      interviewId,
      transcript
    );

    console.log("Next Question Response:", data);

    if (data.completed) {

      console.log("Navigating with interviewId:", interviewId);

      navigate("/report", {
        state: {
          interviewId,
        },
      });

      return;
    }

    setCurrentQuestion((prev) => prev + 1);

    resetTranscript();

    setQuestion(data.next_question);

  } catch (err) {
    console.log(err);
  }
};

  
  const endInterview = async () => {
     stopListening();
     window.speechSynthesis.cancel();
    try {
      if (interviewId) {
        await getInterviewReport(interviewId);
      }
    } catch (err) {
      console.log(err);
    }

    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-slate-950">

      <div className="max-w-7xl mx-auto px-8 py-8">

        <InterviewHeader
          time={<Timer />}
        />

        <div className="flex flex-col items-center mt-8">

          <AIAvatar
            speaking={speaking}
            listening={listening}
          />

          <div className="mt-10 w-full">

            <QuestionCard
              question={
                loading
                  ? "Preparing your interview..."
                  : question
              }
              currentQuestion={currentQuestion}
              totalQuestions={totalQuestions}
            />

          </div>

          <div className="w-full max-w-4xl">
            <LiveTranscript
              transcript={transcript}
              listening={listening}
            />


          </div>

          <ControlPanel
            onMute={startListening}
            onCamera={() => { }}
            onEnd={endInterview}
            onChat={submitAnswer}
          />


        </div>

        <div className="grid grid-cols-2 gap-8 mt-16">

          <ProgressBar
            currentQuestion={currentQuestion}
            totalQuestions={totalQuestions}
          />

          <InterviewTips />

        </div>

      </div>

    </div>

  );
}

export default Interview;