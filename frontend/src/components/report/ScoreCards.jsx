function ScoreCards({
  overall,
  technical,
  communication,
  confidence,
  problemSolving,
}) {
  const cards = [
    {
      title: "Overall",
      value: overall,
      color: "text-green-400",
    },
    {
      title: "Technical",
      value: technical,
      color: "text-blue-400",
    },
    {
      title: "Communication",
      value: communication,
      color: "text-purple-400",
    },
    {
      title: "Confidence",
      value: confidence,
      color: "text-yellow-400",
    },
    {
      title: "Problem Solving",
      value: problemSolving,
      color: "text-pink-400",
    },
  ];

  return (
    <div className="grid md:grid-cols-5 gap-6">

      {cards.map((card) => (

        <div
          key={card.title}
          className="bg-slate-900 border border-slate-800 rounded-2xl p-6"
        >

          <p className="text-slate-400">
            {card.title}
          </p>

          <h2
            className={`text-4xl font-bold mt-3 ${card.color}`}
          >
            {card.value}%
          </h2>

        </div>

      ))}

    </div>
  );
}

export default ScoreCards;