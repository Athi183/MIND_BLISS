import React, { useEffect, useState } from 'react';
import './petal.css';

function PetalAnimation() {
  const [petals, setPetals] = useState([]);

  useEffect(() => {
    const newPetals = Array.from({ length: 15 }, (_, index) => ({
      id: index,
      left: Math.random() * 100,
      delay: Math.random() * 5,
      size: 30 + Math.random() * 30,   // ✅ Each petal size between 30px and 60px
    }));
    setPetals(newPetals);
  }, []);

  return (
    <>
      {petals.map((petal) => (
        <div
          key={petal.id}
          className="petal"
          style={{
            left: `${petal.left}%`,
            animationDelay: `${petal.delay}s`,
            width: `${petal.size}px`,    // ✅ Dynamic size
            height: `${petal.size}px`,
          }}
        ></div>
      ))}
    </>
  );
}

export default PetalAnimation;
