'use client';

import { useState } from 'react';
import PropTypes from 'prop-types';
import { Info } from 'lucide-react';

const InfoButton = ({ text }) => {
  return (
    <div className="relative flex items-center">
      <Tooltip text={text}>
        <button className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition duration-300">
          <Info className="w-5 h-5 text-gray-700" />
        </button>
      </Tooltip>
    </div>
  );
};

InfoButton.propTypes = {
  text: PropTypes.string.isRequired,
};

const Tooltip = ({ text, children }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {children}
      {isHovered && (
        <div className="absolute top-1/2 left-full ml-2 transform -translate-y-1/2 bg-black text-white text-sm py-1 px-2 rounded-md shadow-lg whitespace-nowrap">
          {text}
        </div>
      )}
    </div>
  );
};

Tooltip.propTypes = {
  text: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export { InfoButton };
