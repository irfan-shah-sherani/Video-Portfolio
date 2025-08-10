const valuesData = {
  belief:
    "We believe every brand has a story worth telling.",
  explanation:
    "We craft experiences that turn viewers into loyal followers, and followers into customers. Our team is driven by creativity, strategy, and the belief that powerful storytelling can transform businesses:",
  values: [
    {
      title: "OUR GOAL",
      description:
        "Every frame,every post, every campaign is designed with your goals in mind.",
    },
    {
      title: "Deliver Excellence",
      description:
        "From concept to final edit, we obsess over quality that makes you pround .",
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
    "Wanna Join Our Team. Contact us at <a>trimzoco@gmail.com</a> and provide us your Talent. We are hiring Talented Editors.",
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
