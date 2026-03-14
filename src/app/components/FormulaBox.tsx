interface FormulaBoxProps {
  title: string;
  content: string;
}

export function FormulaBox({ title, content }: FormulaBoxProps) {
  return (
    <div className="bg-gray-50 border-l-4 border-indigo-500 rounded-lg p-4">
      <div className="font-semibold text-gray-900 mb-1">{title}</div>
      <div className="text-gray-700">{content}</div>
    </div>
  );
}
