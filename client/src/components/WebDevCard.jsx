import React from "react";

const WebDevCard = ({
  companyName = "AvanicSoft",
  logoSrc = "/avanicsoft-logo.png",
  description,
  features = [],
  collaborationNote,
  contactLink = "/contact",
}) => {
  return (
    <div className="bg-white shadow-xl rounded-2xl p-6 max-w-md w-full border border-gray-200 hover:shadow-2xl transition-shadow duration-300">
      <div className="flex items-center gap-4 mb-4">
        <img
          src={logoSrc}
          alt={`${companyName} Logo`}
          className="w-12 h-12 object-contain"
        />
        <h2 className="text-2xl font-bold text-blue-700">{companyName}</h2>
      </div>

      {description && (
        <p className="text-gray-700 mb-3">{description}</p>
      )}

      {collaborationNote && (
        <div className="bg-blue-50 border-l-4 border-blue-400 p-3 rounded mb-4">
          <p className="text-sm text-blue-800">{collaborationNote}</p>
        </div>
      )}

      {features.length > 0 && (
        <ul className="space-y-2 mb-4">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center gap-2 text-gray-600">
              ✅ <span>{feature}</span>
            </li>
          ))}
        </ul>
      )}

      <div className="text-center">
        <a
          href={contactLink}
          className="inline-block bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Contact Us
        </a>
      </div>
    </div>
  );
};

export default WebDevCard;
