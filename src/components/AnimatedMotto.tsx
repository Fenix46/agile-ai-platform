
import React, { useEffect, useState } from 'react';

const mottos = [
  { text: "YouAI Suite: AI Agents Tailored to Your Needs", lang: "en" },
  { text: "YouAI Suite: Agenti AI su Misura per le Tue Esigenze", lang: "it" },
  { text: "YouAI Suite: Agents IA Adaptés à Vos Besoins", lang: "fr" },
  { text: "YouAI Suite: Agentes de IA Adaptados a sus Necesidades", lang: "es" },
  { text: "YouAI Suite: KI-Agenten für Ihre Bedürfnisse", lang: "de" },
  { text: "YouAI Suite: 为您定制的AI代理", lang: "zh" },
  { text: "YouAI Suite: あなたのニーズに合わせたAIエージェント", lang: "ja" },
  { text: "YouAI Suite: Agentes de IA Adaptados às Suas Necessidades", lang: "pt" },
  { text: "YouAI Suite: Agenci AI Dostosowani do Twoich Potrzeb", lang: "pl" },
  { text: "YouAI Suite: AI-Agenten op Maat voor Uw Behoeften", lang: "nl" },
  { text: "YouAI Suite: Πράκτορες AI Προσαρμοσμένοι στις Ανάγκες σας", lang: "el" },
  { text: "YouAI Suite: AI-Agenter Anpassade för Dina Behov", lang: "sv" },
  { text: "YouAI Suite: AI-Agenter Tilpasset Dine Behov", lang: "da" },
  { text: "YouAI Suite: AI-Agenter Tilpasset Dine Behov", lang: "no" },
];

const AnimatedMotto = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % mottos.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-20 flex items-center justify-center">
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight animate-fade-in">
        {mottos[currentIndex].text}
      </h1>
    </div>
  );
};

export default AnimatedMotto;
