import React, { useEffect, useState } from 'react';

const Loading: React.FC = () => {
  const [backgroundColor, setBackgroundColor] = useState('red');
  let count = 0;
  const colors = [
    '#0000CD',
    '#FF00FF',
    '#FF4500',
    '#00FF00',
    '#FFFF00',
    '#00FFFF',
    '#0000CD',
    '#800080',
    '#ADFF2F',
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setBackgroundColor(colors[count]);

      if (count < colors.length - 1) {
        count += 1;
      } else {
        count = 0;
      }
    }, 150);

    return () => clearInterval(interval);
  }, []);

  const [rotate, setRotate] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setRotate((prev) => prev + 1.5);
    }, 10);

    return () => clearInterval(interval);
  }, []);

  if (rotate > 359) {
    setRotate(0);
  }

  const pix = 300 + rotate * 2;

  return (
    <div
      style={{
        backgroundColor,
        width: '100vw',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <div
        style={{
          transform: `rotate(${rotate}deg)`,
          marginTop: '100px',
        }}
      >
        <img
          style={{
            width: `${pix}px`,
            height: `${pix}px`,
          }}
          src="/vitalik.png"
          alt="Виталик"
        />
      </div>
    </div>
  );
};

export default Loading;
