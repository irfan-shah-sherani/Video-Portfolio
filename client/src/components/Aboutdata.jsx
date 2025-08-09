const aboutData = {
  heading: "About Us",
  text: "Column Five helps SaaS companies carve out a competitive edge and forge meaningful connections through world-class content. We partner with our clients to refine their identity, crystallize their unique perspective, and craft content programs that cultivate engaged communities of loyal fans who are eager to buy long before the first sales conversation.",
  images: [
    "https://images.unsplash.com/photo-1521737604893-d14cc237f11d", 
    "https://images.unsplash.com/photo-1504384308090-c894fdcc538d", 
    "https://images.unsplash.com/photo-1522202176988-66273c2fd55f", 
  ],
};

const AboutUs = () => {
  return (
    <section className="bg-white text-black py-20 px-6 md:px-12">
      <div className="flex flex-col max-w-6xl mx-auto gap-12">
  
        <h2 className="text-4xl font-bold self-start">{aboutData.heading}</h2>

      
        <p className="text-gray-700 leading-relaxed  font-bold text-center max-w-3xl mx-auto">
          {aboutData.text}
        </p>

    
        <div className="flex flex-col md:flex-row gap-6 justify-center items-start">
          <img
            src={aboutData.images[0]}
            alt="Left"
            className="w-full max-w-xs h-67 object-cover shadow-2xl  mx-auto"
          />
          <img
            src={aboutData.images[1]}
            alt="Center"
            className="w-full max-w-xs h-84 object-cover shadow-2xl  mx-auto"
          />
          <img
            src={aboutData.images[2]}
            alt="Right"
            className="w-full max-w-xs h-67 object-cover shadow-2xl  mx-auto"
          />
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
