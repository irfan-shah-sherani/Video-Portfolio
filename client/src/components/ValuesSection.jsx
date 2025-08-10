const valuesData = {
  belief:
    "We believe businesses can shape our world for the better, and they can do it with strong communities of people behind them.",
  explanation:
    "By using the power of story—the last remaining competitive advantage—we help brands meet their lifelong customers, build meaningful relationships, and make good choices for people, profit, and our planet. This work starts within our own company, where we've gathered a talented group of humans who share the values we hold deeply:",
  values: [
    {
      title: "Be Curious",
      description:
        "Lead with questions, listen intently, and learn and teach passionately.",
    },
    {
      title: "Act Courageously",
      description:
        "Think, speak, and act with conviction and common sense.",
    },
    {
      title: "Do Good Work",
      description:
        "Create things that get results, make you proud, and make someone else's day.",
    },
    {
      title: "Embrace Diversity",
      description:
        "Explore unique perspectives that make our ideas and our work better.",
    },
    {
      title: "Be Good to Each Other",
      description:
        "Keep your head up, encourage each other, and enjoy yourself.",
    },
  ],
  conclusion:
    "By creating a community where people feel loved, respected, and challenged, we make Column Five a place of belonging and a source of fulfillment.",
};

const ValuesSection = () => {
  return (
    <section className="bg-black text-white p-6 md:p-30">
      <div className="flex flex-col max-w-6xl mx-auto gap-12">
        <div className="flex flex-col md:flex-row gap-8">
          <p className="text-xl font-semibold md:w-1/2">
            {valuesData.belief}
          </p>
          <p className="text-gray-300 leading-relaxed md:w-1/2">
            {valuesData.explanation}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {valuesData.values.slice(0, 3).map((value, index) => (
            <div
              key={index}
              className="border-t border-gray-600 pt-6"
            >
              <h3 className="text-lg font-bold mb-2">{value.title}</h3>
              <p className="text-gray-400">{value.description}</p>
            </div>
          ))}

          {valuesData.values.slice(3).map((value, index) => (
            <div
              key={index + 3}
              className="border-t border-gray-600 pt-6 md:col-span-1"
            >
              <h3 className="text-lg font-bold mb-2">{value.title}</h3>
              <p className="text-gray-400">{value.description}</p>
            </div>
          ))}
        </div>

        <div>
          <p className="text-center text-gray-300 max-w-3xl mx-auto">
            {valuesData.conclusion}
          </p>
        </div>
      </div>
    </section>
  );
};

export default ValuesSection;
