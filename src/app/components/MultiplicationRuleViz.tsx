import { useState } from 'react';
import { motion } from 'motion/react';

type Step = 'start' | 'step1' | 'step2' | 'result';

export function MultiplicationRuleViz() {
  const [step, setStep] = useState<Step>('start');

  const whiteBalls = 5;
  const blackBalls = 3;
  const total = whiteBalls + blackBalls;

  const nextStep = () => {
    const order: Step[] = ['start', 'step1', 'step2', 'result'];
    const idx = order.indexOf(step);
    if (idx < order.length - 1) setStep(order[idx + 1]);
  };

  const reset = () => setStep('start');

  return (
    <div className="space-y-6">
      <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 text-sm text-gray-700">
        <p className="font-semibold text-orange-800 mb-2">문제</p>
        <p>흰 공 5개와 검은 공 3개가 들어 있는 주머니에서 임의로 한 개씩 2번 꺼낼 때,</p>
        <p>모두 흰 공이 나올 확률을 구해 보자. (단, 꺼낸 공은 다시 넣지 않는다.)</p>
      </div>

      {/* Ball Visualization */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <div className="flex justify-center mb-4">
          <svg viewBox="0 0 400 120" className="w-full max-w-md">
            {/* Bag outline */}
            <rect x="50" y="10" width="300" height="100" rx="15" fill="#fef3c7" stroke="#f59e0b" strokeWidth="2" />
            <text x="200" y="30" textAnchor="middle" fontSize="12" fill="#92400e" fontWeight="bold">주머니</text>

            {/* White balls */}
            {Array.from({ length: whiteBalls }).map((_, i) => {
              const drawn = (step === 'step1' && i === 0) || (step === 'step2' && i <= 1) || (step === 'result' && i <= 1);
              return (
                <motion.circle
                  key={`w-${i}`}
                  cx={90 + i * 40}
                  cy={65}
                  r="15"
                  fill="white"
                  stroke="#6b7280"
                  strokeWidth="2"
                  animate={{
                    opacity: drawn ? 0.2 : 1,
                    y: drawn ? -20 : 0,
                  }}
                  transition={{ duration: 0.4 }}
                />
              );
            })}

            {/* Black balls */}
            {Array.from({ length: blackBalls }).map((_, i) => (
              <motion.circle
                key={`b-${i}`}
                cx={110 + (whiteBalls + i) * 40 - 60}
                cy={95}
                r="15"
                fill="#374151"
                stroke="#1f2937"
                strokeWidth="2"
              />
            ))}

            {/* Labels */}
            <text x="150" y="50" fontSize="10" fill="#6b7280">흰 공 × {step === 'start' ? 5 : step === 'step1' ? 5 : step === 'step2' ? 4 : 4}</text>
            <text x="270" y="108" fontSize="10" fill="#6b7280">검은 공 × 3</text>
          </svg>
        </div>

        {/* Step Display */}
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-center"
        >
          {step === 'start' && (
            <p className="text-gray-600">주머니에 흰 공 {whiteBalls}개, 검은 공 {blackBalls}개 → 총 {total}개</p>
          )}
          {step === 'step1' && (
            <div className="space-y-2">
              <p className="font-semibold text-blue-700">1단계: 첫 번째 공 꺼내기</p>
              <p className="font-mono">P(A) = P(첫 번째 흰 공) = {whiteBalls}/{total}</p>
              <p className="text-sm text-gray-500">→ 남은 공: 흰 {whiteBalls - 1}개, 검은 {blackBalls}개 (총 {total - 1}개)</p>
            </div>
          )}
          {step === 'step2' && (
            <div className="space-y-2">
              <p className="font-semibold text-purple-700">2단계: 두 번째 공 꺼내기 (첫 번째가 흰 공일 때)</p>
              <p className="font-mono">P(B|A) = P(두 번째 흰 공 | 첫 번째 흰 공) = {whiteBalls - 1}/{total - 1}</p>
              <p className="text-sm text-gray-500">첫 번째에 흰 공이 나왔으므로 흰 공이 하나 줄어듦</p>
            </div>
          )}
          {step === 'result' && (
            <div className="space-y-2">
              <p className="font-semibold text-green-700">결과: 곱셈정리 적용</p>
              <div className="bg-green-50 border border-green-200 rounded-lg p-3 font-mono">
                <p>P(A∩B) = P(A) × P(B|A)</p>
                <p className="text-green-800 font-bold text-lg mt-1">
                  = {whiteBalls}/{total} × {whiteBalls - 1}/{total - 1} = {whiteBalls * (whiteBalls - 1)}/{total * (total - 1)} = 5/14
                </p>
              </div>
            </div>
          )}
        </motion.div>

        {/* Controls */}
        <div className="flex justify-center gap-3 mt-4">
          <button
            onClick={reset}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors text-sm"
          >
            처음으로
          </button>
          <button
            onClick={nextStep}
            disabled={step === 'result'}
            className={`px-5 py-2 rounded-lg font-medium transition-colors text-sm ${
              step === 'result'
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-orange-600 text-white hover:bg-orange-700'
            }`}
          >
            {step === 'start' ? '1단계 →' : step === 'step1' ? '2단계 →' : step === 'step2' ? '결과 보기' : '완료'}
          </button>
        </div>
      </div>

      {/* Four Rules Summary */}
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-5">
        <h4 className="font-semibold text-gray-900 mb-4">확률의 4대 법칙 요약</h4>
        <div className="grid md:grid-cols-2 gap-3">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
            <p className="font-semibold text-blue-800 text-sm mb-1">덧셈정리</p>
            <p className="font-mono text-sm">P(A∪B) = P(A) + P(B) - P(A∩B)</p>
          </div>
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-3">
            <p className="font-semibold text-orange-800 text-sm mb-1">곱셈정리</p>
            <p className="font-mono text-sm">P(A∩B) = P(A)P(B|A) = P(B)P(A|B)</p>
          </div>
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-3">
            <p className="font-semibold text-purple-800 text-sm mb-1">드모르간 & 여사건</p>
            <p className="font-mono text-sm">P(A<sup>c</sup>∩B<sup>c</sup>) = 1 - P(A∪B)</p>
          </div>
          <div className="bg-green-50 border border-green-200 rounded-lg p-3">
            <p className="font-semibold text-green-800 text-sm mb-1">뺄셈정리</p>
            <p className="font-mono text-sm">P(A-B) = P(A) - P(A∩B)</p>
          </div>
        </div>
      </div>
    </div>
  );
}
