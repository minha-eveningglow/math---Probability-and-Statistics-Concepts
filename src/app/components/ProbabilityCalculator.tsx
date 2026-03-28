import { useState } from 'react';
import { motion } from 'motion/react';

export function ProbabilityCalculator() {
  const [example, setExample] = useState<'dice' | 'cards' | 'custom'>('dice');

  const examples = {
    dice: {
      title: '주사위 던지기',
      sampleSpace: '{1, 2, 3, 4, 5, 6}',
      sampleSpaceSize: 6,
      eventA: {
        name: 'A: 짝수가 나옴',
        elements: '{2, 4, 6}',
        size: 3,
        prob: '3/6 = 1/2',
      },
      eventB: {
        name: 'B: 3 이하가 나옴',
        elements: '{1, 2, 3}',
        size: 3,
        prob: '3/6 = 1/2',
      },
      union: {
        elements: '{1, 2, 3, 4, 6}',
        size: 5,
        prob: '5/6',
        calculation: 'P(A) + P(B) - P(A∩B) = 3/6 + 3/6 - 1/6 = 5/6',
      },
      intersection: {
        elements: '{2}',
        size: 1,
        prob: '1/6',
      },
    },
    cards: {
      title: '카드 한 장 뽑기',
      sampleSpace: '52장의 카드',
      sampleSpaceSize: 52,
      eventA: {
        name: 'A: 하트',
        elements: '13장',
        size: 13,
        prob: '13/52 = 1/4',
      },
      eventB: {
        name: 'B: 그림 카드 (J,Q,K)',
        elements: '12장',
        size: 12,
        prob: '12/52 = 3/13',
      },
      union: {
        elements: '하트 또는 그림카드',
        size: 22,
        prob: '22/52 = 11/26',
        calculation: 'P(A) + P(B) - P(A∩B) = 13/52 + 12/52 - 3/52 = 22/52',
      },
      intersection: {
        elements: '하트 그림카드 (♥J, ♥Q, ♥K)',
        size: 3,
        prob: '3/52',
      },
    },
  };

  const current = examples[example];

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 space-y-6">
      <h3 className="text-xl font-bold text-gray-900 text-center">
        확률 계산 연습
      </h3>

      {/* Example Selector */}
      <div className="grid grid-cols-2 gap-4">
        <button
          onClick={() => setExample('dice')}
          className={`p-4 rounded-lg border-2 transition-all ${
            example === 'dice'
              ? 'bg-indigo-500 text-white border-indigo-600'
              : 'bg-gray-50 border-gray-300 hover:border-indigo-400 text-gray-900'
          }`}
        >
          <div className="text-2xl mb-1">🎲</div>
          <div className="font-bold">주사위</div>
        </button>

        <button
          onClick={() => setExample('cards')}
          className={`p-4 rounded-lg border-2 transition-all ${
            example === 'cards'
              ? 'bg-indigo-500 text-white border-indigo-600'
              : 'bg-gray-50 border-gray-300 hover:border-indigo-400 text-gray-900'
          }`}
        >
          <div className="text-2xl mb-1">🃏</div>
          <div className="font-bold">카드</div>
        </button>
      </div>

      {/* Example Content */}
      <motion.div
        key={example}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-4"
      >
        {/* Sample Space */}
        <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg p-4 border border-gray-300">
          <h4 className="font-bold text-gray-900 mb-2">표본공간 (S)</h4>
          <p className="text-sm text-gray-700">
            {current.title}: {current.sampleSpace}
          </p>
          <p className="text-xs text-gray-600 mt-1">
            전체 경우의 수: {current.sampleSpaceSize}
          </p>
        </div>

        {/* Events */}
        <div className="grid md:grid-cols-2 gap-4">
          {/* Event A */}
          <div className="bg-blue-50 border-2 border-blue-300 rounded-lg p-4">
            <h4 className="font-bold text-blue-900 mb-2">{current.eventA.name}</h4>
            <div className="space-y-1 text-sm">
              <p><span className="font-bold">원소:</span> {current.eventA.elements}</p>
              <p><span className="font-bold">개수:</span> {current.eventA.size}</p>
              <p className="text-lg font-bold text-blue-700 mt-2">
                P(A) = {current.eventA.prob}
              </p>
            </div>
          </div>

          {/* Event B */}
          <div className="bg-red-50 border-2 border-red-300 rounded-lg p-4">
            <h4 className="font-bold text-red-900 mb-2">{current.eventB.name}</h4>
            <div className="space-y-1 text-sm">
              <p><span className="font-bold">원소:</span> {current.eventB.elements}</p>
              <p><span className="font-bold">개수:</span> {current.eventB.size}</p>
              <p className="text-lg font-bold text-red-700 mt-2">
                P(B) = {current.eventB.prob}
              </p>
            </div>
          </div>
        </div>

        {/* Operations */}
        <div className="space-y-4">
          {/* Union */}
          <div className="bg-purple-50 border-2 border-purple-300 rounded-lg p-4">
            <h4 className="font-bold text-purple-900 mb-3">
              합사건 (A ∪ B): A 또는 B가 일어남
            </h4>
            <div className="space-y-2 text-sm">
              <p><span className="font-bold">원소:</span> {current.union.elements}</p>
              <p><span className="font-bold">개수:</span> {current.union.size}</p>
              <div className="bg-white rounded p-3 mt-2">
                <p className="font-bold text-purple-700 mb-1">계산:</p>
                <p className="font-mono text-xs">{current.union.calculation}</p>
              </div>
              <p className="text-lg font-bold text-purple-700 mt-2">
                P(A ∪ B) = {current.union.prob}
              </p>
            </div>
          </div>

          {/* Intersection */}
          <div className="bg-indigo-50 border-2 border-indigo-300 rounded-lg p-4">
            <h4 className="font-bold text-indigo-900 mb-3">
              곱사건 (A ∩ B): A와 B가 동시에 일어남
            </h4>
            <div className="space-y-2 text-sm">
              <p><span className="font-bold">원소:</span> {current.intersection.elements}</p>
              <p><span className="font-bold">개수:</span> {current.intersection.size}</p>
              <p className="text-lg font-bold text-indigo-700 mt-2">
                P(A ∩ B) = {current.intersection.prob}
              </p>
            </div>
          </div>

          {/* Complements */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-green-50 border-2 border-green-300 rounded-lg p-4">
              <h4 className="font-bold text-green-900 mb-2">여사건 Aᶜ</h4>
              <div className="space-y-1 text-sm">
                <p>A가 일어나지 않는 사건</p>
                <p className="text-lg font-bold text-green-700 mt-2">
                  P(Aᶜ) = 1 - P(A)
                </p>
                <p className="text-sm">
                  = 1 - {current.eventA.prob}
                </p>
              </div>
            </div>

            <div className="bg-cyan-50 border-2 border-cyan-300 rounded-lg p-4">
              <h4 className="font-bold text-cyan-900 mb-2">여사건 Bᶜ</h4>
              <div className="space-y-1 text-sm">
                <p>B가 일어나지 않는 사건</p>
                <p className="text-lg font-bold text-cyan-700 mt-2">
                  P(Bᶜ) = 1 - P(B)
                </p>
                <p className="text-sm">
                  = 1 - {current.eventB.prob}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Summary */}
        <div className="bg-yellow-50 border border-yellow-300 rounded-lg p-4">
          <h4 className="font-bold text-gray-900 mb-2">확률 공식 요약</h4>
          <div className="space-y-1 text-sm font-mono">
            <p>• P(A ∪ B) = P(A) + P(B) - P(A ∩ B)</p>
            <p>• P(Aᶜ) = 1 - P(A)</p>
            <p>• 0 ≤ P(A) ≤ 1</p>
            <p>• P(S) = 1 (전체 확률)</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
