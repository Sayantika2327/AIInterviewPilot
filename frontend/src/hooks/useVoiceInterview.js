import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

export default function useVoiceInterview() {
  const {
    transcript,
    resetTranscript,
    listening,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  const startListening = () => {
    SpeechRecognition.startListening({
      continuous: false,
      language: "en-US",
    });
  };

  const stopListening = (callback) => {
  SpeechRecognition.stopListening();

  setTimeout(() => {
    if (callback) callback();
  }, 1000);
};

  const speak = (text) => {
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);

    utterance.lang = "en-US";
    utterance.rate = 1;

    window.speechSynthesis.speak(utterance);
  };

  return {
    transcript,
    listening,
    startListening,
    stopListening,
    resetTranscript,
    speak,
    browserSupportsSpeechRecognition,
  };
}