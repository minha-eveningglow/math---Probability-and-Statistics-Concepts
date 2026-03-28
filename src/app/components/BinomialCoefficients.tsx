import { useState } from 'react';
import { motion } from 'motion/react';

export function BinomialCoefficients() {
  const [n, setN] = useState(5);

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

  // Generate coefficients for the row
  const coefficients = Array.from({ length: n + 1 }, (_, r) => ({
    r,
    value: binomialCoeff(n, r),
  }));

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 space-y-6">
      {/* Control */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          n = {n}
        </label>
        <input
          type="range"
          min="1"
          max="10"
          value={n}
          onChange={(e) => setN(Number(e.target.value))}
          className="w-full"
        />
      </div>

      {/* Coefficients Display */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4 text-center">
          (a + b)<sup>{n}</sup>의 계수들
        </h3>
        
        {/* Visual representation */}
        <div className="flex flex-wrap justify-center items-end gap-4 mb-6">
          {coefficients.map((coeff, index) => {
            const maxValue = Math.max(...coefficients.map(c => c.value));
            const height = (coeff.value / maxValue) * 150 + 50;
            
            return (
              <motion.div
                key={index}
                initial={{ height: 0, opacity: 0 }}
                animate={{ height, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                className="flex flex-col items-center"
              >
                <div
                  className="bg-gradient-to-t from-indigo-600 to-purple-500 rounded-t-lg flex items-end justify-center px-4 pb-2"
                  style={{ height: `${height}px`, minWidth: '60px' }}
                >
                  <span className="text-white font-bold text-xl">
                    {coeff.value}
                  </span>
                </div>
                <div className="mt-2 text-center">
                  <div className="text-xs text-gray-600">C({n},{coeff.r})</div>
                  <div className="text-xs text-gray-500 mt-1">
                    a<sup>{n - coeff.r}</sup>b<sup>{coeff.r}</sup>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Symmetry Note */}
        <div className="bg-white rounded-lg p-4 border border-purple-200">
          <p className="text-sm text-gray-700 text-center">
            <span className="font-bold">대칭성:</span> C(n,r) = C(n,n-r)
            <br />
            <span className="text-xs text-gray-600">
              n개 중 r개를 선택하는 것 = n개 중 (n-r)개를 선택하지 않는 것
            </span>
          </p>
        </div>
      </div>

      {/* Table View */}
      <div className="bg-gray-50 rounded-lg p-4">
        <h4 className="font-bold text-gray-900 mb-3 text-sm">계수표</h4>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b-2 border-gray-300">
                <th className="px-3 py-2 text-left">r</th>
                <th className="px-3 py-2 text-left">C({n},r)</th>
                <th className="px-3 py-2 text-left">항</th>
                <th className="px-3 py-2 text-left">의미</th>
              </tr>
            </thead>
            <tbody>
              {coefficients.map((coeff) => (
                <tr key={coeff.r} className="border-b border-gray-200 hover:bg-white">
                  <td className="px-3 py-2 font-mono">{coeff.r}</td>
                  <td className="px-3 py-2 font-bold text-indigo-600">{coeff.value}</td>
                  <td className="px-3 py-2 font-mono">
                    {n - coeff.r > 0 && (
                      <>
                        a
                        {n - coeff.r > 1 && <sup>{n - coeff.r}</sup>}
                      </>
                    )}
                    {coeff.r > 0 && (
                      <>
                        b
                        {coeff.r > 1 && <sup>{coeff.r}</sup>}
                      </>
                    )}
                  </td>
                  <td className="px-3 py-2 text-xs text-gray-600">
                    {n}개 중 b를 {coeff.r}번 선택
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Formula Reminder */}
      <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4">
        <p className="text-sm text-gray-700 text-center">
          <span className="font-bold">계수 공식:</span> C(n,r) = n! / (r! · (n-r)!)
        </p>
      </div>
    </div>
  );
}
