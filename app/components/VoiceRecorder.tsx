import React, { useState, useRef } from "react";
import { Mic, StopCircleIcon } from "lucide-react";
interface VoiceRecorderProps {
  onRecordingComplete: (audioInput: {
    data: string;
    type: "audio_input";
  }) => void;
}

const VoiceRecorder: React.FC<VoiceRecorderProps> = ({
  onRecordingComplete,
}) => {
  const [isRecording, setIsRecording] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const mediaRecorder = new MediaRecorder(stream);
    mediaRecorderRef.current = mediaRecorder;
    audioChunksRef.current = [];

    mediaRecorder.ondataavailable = (event) => {
      audioChunksRef.current.push(event.data);
    };

    mediaRecorder.onstop = async () => {
      const audioBlob = new Blob(audioChunksRef.current, {
        type: "audio/webm",
      });
      const reader = new FileReader();
      reader.readAsDataURL(audioBlob);
      reader.onloadend = () => {
        const base64data = reader.result?.toString();
        if (base64data) {
          onRecordingComplete({
            data: base64data,
            type: "audio_input",
          });
        }
      };
    };

    mediaRecorder.start();
    setIsRecording(true);
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  return (
    <button
      className="flex items-center space-x-2 bg-white text-black dark:bg-black dark:text-white"
      onClick={isRecording ? stopRecording : startRecording}
    >
      {isRecording ? (
        <div className="flex flex-row items-center justify-center gap-2">
          <div>Stop recording</div>
          <StopCircleIcon size={16} />
        </div>
      ) : (
        <div className="flex flex-row items-center justify-center gap-2">
          <div>Start recording</div>
          <Mic size={16} />
        </div>
      )}
    </button>
  );
};

export default VoiceRecorder;