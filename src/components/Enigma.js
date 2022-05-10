import React from 'react';

const Enigma = () => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      xmlnsXlink='http://www.w3.org/1999/xlink'
      width='554'
      height='554'
      viewBox='0 0 554 554'
    >
      <defs>
        <pattern
          id='pattern'
          width='1'
          height='1'
          patternTransform='translate(1108 1108) rotate(-180)'
          viewBox='0 0 554 554'
        >
          <image
            preserveAspectRatio='none'
            width='554'
            height='554'
          />
        </pattern>
      </defs>
      <rect
        id='enigmaViewBox'
        width='554'
        height='554'
        transform='translate(554 554) rotate(180)'
        fill='url(#pattern)'
      />
    </svg>
  );
};

export default Enigma;