import React, { useEffect, useState } from "react";
import translations from "../translations";
import "./PopupModal.css";

const PopupModal = ({ message, onClose, language }) => {
  const t = translations[language] || translations.en;
  const [petals, setPetals] = useState([]);

  // Generate sakura petals
  useEffect(() => {
    const numPetals = 20;
    const generatedPetals = Array.from({ length: numPetals }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      delay: `${Math.random() * 5}s`,
      duration: `${5 + Math.random() * 5}s`,
      size: `${12 + Math.random() * 8}px`,
    }));
    setPetals(generatedPetals);
  }, []);

  return (
    <div className="popup-overlay">
      <div className="popup-box">
        <h2>🌸 {message} 🌸</h2>
        <button onClick={onClose}>{t.ok}</button>
      </div>
      {petals.map((petal) => (
        <div
          key={petal.id}
          className="sakura-petal"
          style={{
            left: petal.left,
            animationDelay: petal.delay,
            animationDuration: petal.duration,
            width: petal.size,
            height: petal.size,
          }}
        />
      ))}
    </div>
  );
};

export default PopupModal;
