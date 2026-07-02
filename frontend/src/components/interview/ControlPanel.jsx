function ControlPanel({
  onMute,
  onCamera,
  onEnd,
  onChat,
}) {
  return (
    <div className="flex justify-center gap-4 mt-8">
      <button
        onClick={onMute}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Speak
      </button>

      <button
        onClick={onCamera}
        className="bg-gray-600 text-white px-4 py-2 rounded"
      >
        Camera
      </button>

      <button
        onClick={onChat}
        className="bg-green-600 text-white px-4 py-2 rounded"
      >
        Submit
      </button>

      <button
        onClick={onEnd}
        className="bg-red-600 text-white px-4 py-2 rounded"
      >
        End
      </button>
    </div>
  );
}

export default ControlPanel;