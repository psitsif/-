import React, { useState } from "react";
function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

export const Card = React.memo(({ card, index, hovered, setHovered }) => {
  const innerCard = (
    <div
      onMouseEnter={() => setHovered(index)}
      onMouseLeave={() => setHovered(null)}
      className={cn(
        "rounded-2xl relative bg-white overflow-hidden transition-all duration-300 ease-out shadow-sm border border-slate-200/80 cursor-pointer group",
        hovered !== null && hovered !== index && "blur-xs scale-[0.98]",
        "w-full h-64 sm:h-80 md:h-[420px]"
      )}
    >
      <img
        src={card.src}
        alt={card.title}
        className="object-contain transition-transform duration-300 ease-in-out group-hover:scale-105 p-4 sm:p-6 max-h-[70%] w-auto mx-auto mt-8"
      />
      <div
        className={cn(
          "absolute inset-0 bg-slate-900/80 backdrop-blur-xs flex flex-col justify-start py-8 px-6 transition-opacity duration-300",
          hovered === index ? "opacity-100" : "opacity-0"
        )}
      >
        <span className="text-xs font-bold uppercase tracking-widest text-emerald-400 mb-2">
          Partner Initiative {card.number ? `#${card.number}` : ''}
        </span>
        <div className="text-xl md:text-2xl font-bold font-outfit text-white mb-3">
          {card.title}
        </div>
        <div className="text-sm text-slate-200 leading-relaxed mb-4">
          {card.description}
        </div>
        {card.url && (
          <div className="mt-auto inline-flex items-center gap-1.5 text-xs font-bold text-emerald-400 hover:text-emerald-300">
            <span>Visit Official Portal ↗</span>
          </div>
        )}
      </div>
    </div>
  );

  if (card.url) {
    return (
      <a
        href={card.url}
        target="_blank"
        rel="noopener noreferrer"
        title={`Visit ${card.title} official website`}
        className="block"
      >
        {innerCard}
      </a>
    );
  }

  return innerCard;
});

Card.displayName = "Card";

export function FocusCards({ cards }) {
  const [hovered, setHovered] = useState(null);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
      {cards.map((card, index) => (
        <Card
          key={card.title}
          card={card}
          index={index}
          hovered={hovered}
          setHovered={setHovered}
        />
      ))}
    </div>
  );
}
