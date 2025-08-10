import React from 'react';

const Formbutton = ({ selected, setSelected }) => {
  return (
    <div className="flex flex-col md:flex-row border-[3px] border-gray-500 rounded-xl select-none w-full max-w-2xl mx-auto gap-2 p-2">
      {['video editing', 'Social Media Package', 'web development'].map((item) => (
        <label
          key={item}
          className="radio flex flex-grow items-center justify-center rounded-lg cursor-pointer"
        >
          <input
            type="radio"
            name="radio"
            value={item}
            className="peer hidden"
            checked={selected === item}
            onChange={() => setSelected(item)}
          />
          <span
            className={`tracking-widest w-full text-center text-sm md:text-base p-2 rounded-lg transition duration-150 ease-in-out
              text-gray-700 
              peer-checked:text-white 
              peer-checked:bg-black 
              ${selected === item ? 'bg-black text-white' : ''}
            `}
          >
            {item.toUpperCase()}
          </span>
        </label>
      ))}
    </div>
  );
};

export default Formbutton;
