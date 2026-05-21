"use client";

import { useState } from "react";

const DESCRIPTION_LIMIT = 220;

interface ExpandableDescriptionProps {
  text: string;
}

export function ExpandableDescription({ text }: ExpandableDescriptionProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const shouldTruncate = text.length > DESCRIPTION_LIMIT;
  const truncatedText = text
    .slice(0, DESCRIPTION_LIMIT)
    .replace(/\s+\S*$/, "")
    .trimEnd();
  const visibleText =
    shouldTruncate && !isExpanded
      ? `${truncatedText}...`
      : text;

  return (
    <div className="space-y-2">
      <p className="max-w-3xl text-sm leading-7 text-slate-600">{visibleText}</p>
      {shouldTruncate ? (
        <button
          aria-expanded={isExpanded}
          className="text-sm font-semibold text-blue-700 transition hover:text-blue-900"
          onClick={() => setIsExpanded((current) => !current)}
          type="button"
        >
          {isExpanded ? "Ver menos" : "Ver mais"}
        </button>
      ) : null}
    </div>
  );
}
