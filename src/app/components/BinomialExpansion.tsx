import { useState } from 'react';
import { motion } from 'motion/react';

export function BinomialExpansion() {
  const [n, setN] = useState(4);

  // Calculate binomial coefficients
  const coefficients: number[] = [];
  for (let k = 0; k <= n; k++) {
    coefficients.push(combination(n, k));
  }

  // Generate expansion terms
  const terms = coefficients.map((coef, k) => {
    const aExp = n - k;
    const bExp = k;
    
    let term = '';
    if (coef > 1) term += coef;
    if (aExp > 0) {
      term += 'a';
      if (aExp > 1) term += `^${aExp}`;
    }
    if (bExp > 0) {
      term += 'b';
      if (bExp > 1) term += `^${bExp}`;
    }
    if (term === '') term = '1';
    
    return { term, coef, k, aExp, bExp };
  });

  return (
    <div className="space-y-6">
      {/* Control */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          지수 (n): {n}
        </label>
        <input
          type="range"
          min="2"
          max="8"
          value={n}
          onChange={(e) => setN(Number(e.target.value))}
          className="w-full"
        />
      </div>

      {/* Expansion Display */}
      <div className="bg-gradient-to-r from-purple-50 to-pink-50 border-2 border-purple-200 rounded-lg p-6">
        <div className="text-center mb-4">
          <span className="text-2xl font-bold text-gray-900">
            (a + b)<sup>{n}</sup> =
          </span>
        </div>
        <div className="flex flex-wrap justify-center items-center gap-2 text-lg">
          {terms.map((item, index) => (
            <motion.div
              key={index}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center"
            >
              {index > 0 && <span className="mx-2 text-gray-500">+</span>}
              <div className="bg-white rounded-lg px-4 py-2 border-2 border-purple-300 shadow-sm">
                <div className="font-mono font-semibold text-gray-900">{item.term}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Coefficient Explanation */}
      <div className="bg-white rounded-lg border-2 border-indigo-200 p-6">
        <h4 className="font-bold text-gray-900 mb-4">계수의 조합론적 의미</h4>
        <div className="space-y-3">
          {terms.map((item, index) => (
            <div key={index} className="flex items-center justify-between bg-gray-50 rounded-lg p-3">
              <div className="font-mono text-sm">
                <span className="font-bold text-indigo-600">{item.term}</span>의 계수
              </div>
              <div className="text-sm text-gray-700">
                = ₙC<sub>{item.k}</sub> = {item.coef}
              </div>
              <div className="text-xs text-gray-500 italic">
                ({n}개 중 b를 {item.k}개 선택)
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Insight */}
      <div className="bg-gradient-to-r from-yellow-50 to-amber-50 border-2 border-yellow-300 rounded-lg p-4">
        <h4 className="font-semibold text-gray-900 mb-2">💡 핵심 통찰</h4>
        <p className="text-sm text-gray-700">
          (a+b)ⁿ = (a+b)(a+b)...(a+b) ({n}개)를 전개할 때, 
          각 괄호에서 <span className="font-semibold">a 또는 b를 하나씩 선택</span>해야 합니다.
        </p>
        <p className="text-sm text-gray-700 mt-2">
          aⁿ⁻ʳbʳ 항을 만들려면 → {n}개의 괄호 중에서 <span className="font-semibold text-indigo-700">b를 r개 선택</span>
          → 이것은 조합 <span className="font-mono font-bold">ₙCᵣ</span>과 정확히 같습니다!
        </p>
        <p className="text-sm text-purple-700 font-semibold mt-3">
          이렇게 <span className="underline">세기(Counting)가 대수(Algebra)가 됩니다.</span>
        </p>
      </div>
    </div>
  );
}

function combination(n: number, r: number): number {
  if (r > n) return 0;
  if (r === 0 || r === n) return 1;
  
  let result = 1;
  for (let i = 0; i < r; i++) {
    result *= (n - i);
    result /= (i + 1);
  }
  return Math.round(result);
}
