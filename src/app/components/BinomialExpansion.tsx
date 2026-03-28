import { useState } from 'react';
import { motion } from 'motion/react';

export function BinomialExpansion() {
  const [n, setN] = useState(4);
  const [selectedTerm, setSelectedTerm] = useState<number | null>(null);

  // Calculate binomial coefficient C(n, r)
  const binomialCoeff = (n: number, r: number): number => {
    if (r > n) return 0;
    if (r === 0 || r === n) return 1;
    let result = 1;
    for (let i = 1; i <= r; i++) {
      result = result * (n - i + 1) / i;
    }
    return Math.round(result);
  };

  // Generate all terms for (a+b)^n
  const terms = Array.from({ length: n + 1 }, (_, r) => ({
    r,
    coeff: binomialCoeff(n, r),
    aPower: n - r,
    bPower: r,
  }));

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 space-y-6">
      {/* Control */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          지수 n = {n}
        </label>
        <input
          type="range"
          min="1"
          max="7"
          value={n}
          onChange={(e) => {
            setN(Number(e.target.value));
            setSelectedTerm(null);
          }}
          className="w-full"
        />
      </div>

      {/* Expansion Display */}
      <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-lg p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4 text-center">
          (a + b)<sup>{n}</sup> =
        </h3>
        <div className="flex flex-wrap justify-center items-center gap-3">
          {terms.map((term, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => setSelectedTerm(index)}
              className={`cursor-pointer transition-all p-4 rounded-lg ${
                selectedTerm === index
                  ? 'bg-indigo-600 text-white ring-2 ring-indigo-500 scale-110'
                  : 'bg-white text-gray-900 hover:bg-indigo-100'
              }`}
            >
              <div className="text-center">
                <div className="text-sm font-bold mb-1">
                  C({n},{term.r}) = {term.coeff}
                </div>
                <div className="font-mono text-lg">
                  {term.aPower > 0 && (
                    <>
                      a
                      {term.aPower > 1 && <sup>{term.aPower}</sup>}
                    </>
                  )}
                  {term.bPower > 0 && (
                    <>
                      b
                      {term.bPower > 1 && <sup>{term.bPower}</sup>}
                    </>
                  )}
                  {term.aPower === 0 && term.bPower === 0 && '1'}
                </div>
              </div>
              {index < terms.length - 1 && (
                <span className={selectedTerm === index ? 'text-white' : 'text-gray-600'}>
                  {' + '}
                </span>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Selected Term Explanation */}
      {selectedTerm !== null && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-yellow-50 border-2 border-yellow-300 rounded-lg p-6"
        >
          <h4 className="font-bold text-gray-900 mb-3">
            선택된 항 분석
          </h4>
          <div className="space-y-2 text-gray-700">
            <p>
              <span className="font-bold">항:</span>{' '}
              {terms[selectedTerm].aPower > 0 && (
                <>
                  a
                  {terms[selectedTerm].aPower > 1 && <sup>{terms[selectedTerm].aPower}</sup>}
                </>
              )}
              {terms[selectedTerm].bPower > 0 && (
                <>
                  b
                  {terms[selectedTerm].bPower > 1 && <sup>{terms[selectedTerm].bPower}</sup>}
                </>
              )}
              {terms[selectedTerm].aPower === 0 && terms[selectedTerm].bPower === 0 && '1'}
            </p>
            <p>
              <span className="font-bold">계수:</span> C({n}, {terms[selectedTerm].r}) = {terms[selectedTerm].coeff}
            </p>
            <p className="mt-4 p-3 bg-white rounded border border-yellow-400">
              <span className="font-bold text-indigo-700">의미:</span> {n}개의 괄호에서{' '}
              <span className="font-bold text-indigo-600">b를 {terms[selectedTerm].r}번</span> 선택하는 경우의 수
              {terms[selectedTerm].r > 0 && ` (나머지 ${terms[selectedTerm].aPower}번은 a 선택)`}
            </p>
          </div>
        </motion.div>
      )}

      {/* Full Expansion */}
      <div className="bg-gray-50 rounded-lg p-4">
        <h4 className="font-bold text-gray-900 mb-2 text-sm">완전히 전개된 식:</h4>
        <p className="font-mono text-sm text-gray-700 break-words">
          (a + b)<sup>{n}</sup> ={' '}
          {terms.map((term, index) => (
            <span key={index}>
              {term.coeff > 1 && `${term.coeff}·`}
              {term.aPower > 0 && (
                <>
                  a
                  {term.aPower > 1 && <sup>{term.aPower}</sup>}
                </>
              )}
              {term.bPower > 0 && (
                <>
                  b
                  {term.bPower > 1 && <sup>{term.bPower}</sup>}
                </>
              )}
              {term.aPower === 0 && term.bPower === 0 && '1'}
              {index < terms.length - 1 && ' + '}
            </span>
          ))}
        </p>
      </div>
    </div>
  );
}
