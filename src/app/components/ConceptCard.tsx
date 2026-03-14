import { Lightbulb } from 'lucide-react';

interface ConceptCardProps {
  title: string;
  description: string;
  formula: string;
  explanation: string;
  example: string;
  color: string;
  note?: string;
}

export function ConceptCard({
  title,
  description,
  formula,
  explanation,
  example,
  color,
  note,
}: ConceptCardProps) {
  return (
    <div className={`${color} border-2 rounded-xl p-6 shadow-md`}>
      <h3 className="text-2xl font-bold text-gray-900 mb-3">{title}</h3>
      <p className="text-gray-700 mb-4">{description}</p>

      <div className="bg-white rounded-lg p-4 mb-4">
        <div className="text-sm text-gray-600 mb-1">공식</div>
        <div className="text-2xl font-bold text-indigo-600 font-mono">{formula}</div>
      </div>

      <div className="space-y-3">
        <div>
          <div className="text-sm font-semibold text-gray-700 mb-1">설명</div>
          <p className="text-gray-600">{explanation}</p>
        </div>

        <div>
          <div className="text-sm font-semibold text-gray-700 mb-1">예시</div>
          <p className="text-gray-600 font-mono text-sm bg-white rounded px-3 py-2">
            {example}
          </p>
        </div>

        {note && (
          <div className="flex items-start bg-yellow-50 border border-yellow-200 rounded-lg p-3">
            <Lightbulb className="w-5 h-5 text-yellow-600 mr-2 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-gray-700">{note}</p>
          </div>
        )}
      </div>
    </div>
  );
}
