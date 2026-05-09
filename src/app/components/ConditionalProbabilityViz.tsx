import { useState } from 'react';
import { motion } from 'motion/react';

type Example = 'glasses' | 'students';

export function ConditionalProbabilityViz() {
  const [example, setExample] = useState<Example>('glasses');
  const [showConditional, setShowConditional] = useState(false);

  return (
    <div className="space-y-6">
      {/* Example Selector */}
      <div className="grid grid-cols-2 gap-3">
        <button
          onClick={() => { setExample('glasses'); setShowConditional(false); }}
          className={`p-3 rounded-lg text-sm font-medium transition-all ${
            example === 'glasses'
              ? 'bg-teal-600 text-white shadow-md'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          예제 1: 안경 쓴 학생
        </button>
        <button
          onClick={() => { setExample('students'); setShowConditional(false); }}
          className={`p-3 rounded-lg text-sm font-medium transition-all ${
            example === 'students'
              ? 'bg-teal-600 text-white shadow-md'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          예제 2: 학년·성별 표
        </button>
      </div>

      <motion.div
        key={example}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {example === 'glasses' ? (
          <GlassesExample showConditional={showConditional} setShowConditional={setShowConditional} />
        ) : (
          <StudentsExample showConditional={showConditional} setShowConditional={setShowConditional} />
        )}
      </motion.div>

      {/* Derivation */}
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-5">
        <h4 className="font-semibold text-gray-900 mb-3">조건부확률식 도출</h4>
        <div className="space-y-2 font-mono text-sm text-gray-800">
          <p>각 근원사건이 일어날 가능성이 모두 같을 때:</p>
          <div className="bg-white border rounded p-3 space-y-1">
            <p>P(B|A) = n(A∩B) / n(A)</p>
            <p className="text-gray-500">분자·분모를 각각 n(S)로 나누면</p>
            <p>{'      = [n(A∩B)/n(S)] / [n(A)/n(S)]'}</p>
            <p className="text-teal-700 font-semibold">{'      = P(A∩B) / P(A)'}</p>
          </div>
          <p className="text-xs text-gray-500 mt-2">
            n(A∩B)/n(A)는 사건 A를 새로운 표본공간으로 생각하고, A 안에서 A∩B가 일어날 확률을 뜻합니다.
          </p>
        </div>
      </div>
    </div>
  );
}

function GlassesExample({ showConditional, setShowConditional }: {
  showConditional: boolean;
  setShowConditional: (v: boolean) => void;
}) {
  return (
    <div className="space-y-4">
      <div className="bg-teal-50 border border-teal-200 rounded-lg p-4 text-sm text-gray-700">
        <p className="font-semibold text-teal-800 mb-2">문제</p>
        <p>어느 고등학교 학생 중에서 안경을 쓴 학생은 전체의 30%, 안경을 쓴 남학생은 전체의 15%이다.</p>
        <p className="mt-1">임의로 한 명을 택하였더니 안경을 쓴 학생이었을 때, 그 학생이 남학생일 확률은?</p>
      </div>

      {/* SVG Visualization */}
      <div className="flex justify-center">
        <svg viewBox="0 0 400 250" className="w-full max-w-md">
          {/* Sample Space S */}
          <motion.rect
            x="20" y="20" width="360" height="210" rx="10"
            fill="#f0fdf4"
            stroke="#86efac"
            strokeWidth="2"
            animate={{
              opacity: showConditional ? 0.3 : 1,
            }}
            transition={{ duration: 0.5 }}
          />
          <text x="30" y="42" fontSize="14" fill="#166534" fontWeight="bold">S (전체 학생)</text>

          {/* Event A: 안경 쓴 학생 (30%) */}
          <motion.ellipse
            cx="180" cy="140" rx="100" ry="70"
            fill="rgba(45, 212, 191, 0.25)"
            stroke="#14b8a6"
            strokeWidth="2"
            animate={{
              rx: showConditional ? 140 : 100,
              ry: showConditional ? 90 : 70,
              cx: showConditional ? 200 : 180,
              cy: showConditional ? 130 : 140,
              fill: showConditional ? 'rgba(45, 212, 191, 0.15)' : 'rgba(45, 212, 191, 0.25)',
            }}
            transition={{ duration: 0.6 }}
          />
          <motion.text
            x={showConditional ? 80 : 100}
            y={showConditional ? 60 : 90}
            fontSize="13"
            fill="#0d9488"
            fontWeight="bold"
            animate={{ opacity: 1 }}
          >
            A (안경) = 30%
          </motion.text>

          {/* Event B ∩ A: 안경 쓴 남학생 (15%) */}
          <motion.ellipse
            cx="220" cy="150" rx="50" ry="40"
            fill="rgba(99, 102, 241, 0.3)"
            stroke="#6366f1"
            strokeWidth="2"
            animate={{
              fill: showConditional ? 'rgba(99, 102, 241, 0.5)' : 'rgba(99, 102, 241, 0.3)',
            }}
            transition={{ duration: 0.5 }}
          />
          <text x="195" y="145" fontSize="12" fill="#4338ca" fontWeight="bold">A∩B</text>
          <text x="195" y="162" fontSize="11" fill="#4338ca">(남학생∩안경)</text>
          <text x="205" y="178" fontSize="11" fill="#4338ca">= 15%</text>

          {/* Labels */}
          <motion.text
            x="120" y="175"
            fontSize="11"
            fill="#0d9488"
            animate={{ opacity: showConditional ? 0.3 : 1 }}
          >
            안경만
          </motion.text>
        </svg>
      </div>

      {/* Toggle Button */}
      <div className="flex justify-center">
        <button
          onClick={() => setShowConditional(!showConditional)}
          className={`px-5 py-2 rounded-lg font-medium transition-all ${
            showConditional
              ? 'bg-indigo-600 text-white'
              : 'bg-teal-600 text-white'
          }`}
        >
          {showConditional ? '전체 표본공간 보기' : '조건부 표본공간으로 축소 →'}
        </button>
      </div>

      {/* Calculation */}
      <div className="bg-white border border-gray-200 rounded-lg p-4">
        <h4 className="font-semibold text-gray-900 mb-2">풀이</h4>
        <div className="font-mono text-sm space-y-1">
          <p>A = 안경을 쓴 학생, B = 남학생</p>
          <p>P(A) = 0.30, P(A∩B) = 0.15</p>
          <div className="bg-teal-50 border border-teal-200 rounded p-2 mt-2">
            <p className="text-teal-800 font-semibold">
              P(B|A) = P(A∩B) / P(A) = 0.15 / 0.30 = <span className="text-lg">0.5</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function StudentsExample({ showConditional, setShowConditional }: {
  showConditional: boolean;
  setShowConditional: (v: boolean) => void;
}) {
  return (
    <div className="space-y-4">
      <div className="bg-teal-50 border border-teal-200 rounded-lg p-4 text-sm text-gray-700">
        <p className="font-semibold text-teal-800 mb-2">문제</p>
        <p>1, 2학년 학생 25명으로 구성된 모임에서 임의로 한 명을 뽑았더니 남학생이었을 때,</p>
        <p>그 학생이 1학년일 확률을 구해 보자.</p>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="mx-auto border-collapse text-sm">
          <thead>
            <tr>
              <th className="border border-gray-300 px-4 py-2 bg-gray-100">(단위: 명)</th>
              <th className="border border-gray-300 px-4 py-2 bg-gray-100">1학년</th>
              <th className="border border-gray-300 px-4 py-2 bg-gray-100">2학년</th>
              <th className="border border-gray-300 px-4 py-2 bg-gray-100 font-bold">합계</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-gray-300 px-4 py-2 bg-gray-50">여학생</td>
              <td className="border border-gray-300 px-4 py-2 text-center">8</td>
              <td className="border border-gray-300 px-4 py-2 text-center">4</td>
              <td className="border border-gray-300 px-4 py-2 text-center font-semibold">12</td>
            </tr>
            <tr className={showConditional ? 'bg-indigo-50' : ''}>
              <td className="border border-gray-300 px-4 py-2 bg-gray-50">남학생</td>
              <td className={`border border-gray-300 px-4 py-2 text-center ${showConditional ? 'bg-indigo-100 font-bold text-indigo-700' : ''}`}>
                6
              </td>
              <td className="border border-gray-300 px-4 py-2 text-center">7</td>
              <td className={`border border-gray-300 px-4 py-2 text-center font-semibold ${showConditional ? 'text-indigo-700' : ''}`}>
                13
              </td>
            </tr>
            <tr>
              <td className="border border-gray-300 px-4 py-2 bg-gray-50 font-bold">합계</td>
              <td className="border border-gray-300 px-4 py-2 text-center font-semibold">14</td>
              <td className="border border-gray-300 px-4 py-2 text-center font-semibold">11</td>
              <td className="border border-gray-300 px-4 py-2 text-center font-bold">25</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Toggle */}
      <div className="flex justify-center">
        <button
          onClick={() => setShowConditional(!showConditional)}
          className={`px-5 py-2 rounded-lg font-medium transition-all ${
            showConditional
              ? 'bg-indigo-600 text-white'
              : 'bg-teal-600 text-white'
          }`}
        >
          {showConditional ? '전체 표본공간 보기' : '남학생(A)으로 표본공간 축소 →'}
        </button>
      </div>

      {/* Calculation */}
      <div className="bg-white border border-gray-200 rounded-lg p-4">
        <h4 className="font-semibold text-gray-900 mb-2">풀이</h4>
        <div className="font-mono text-sm space-y-1">
          <p>S = 25명 중 한 명을 뽑는 사건</p>
          <p>A = 남학생을 뽑는 사건, B = 1학년 학생을 뽑는 사건</p>
          {showConditional ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-indigo-50 border border-indigo-200 rounded p-2 mt-2"
            >
              <p className="text-gray-600 mb-1">남학생 13명 중에서 1학년인 학생의 비율:</p>
              <p className="text-indigo-800 font-semibold">
                P(B|A) = n(A∩B) / n(A) = 6 / 13
              </p>
            </motion.div>
          ) : (
            <div className="bg-teal-50 border border-teal-200 rounded p-2 mt-2">
              <p className="text-gray-600 mb-1">확률 공식 사용:</p>
              <p>P(A) = 13/25, P(A∩B) = 6/25</p>
              <p className="text-teal-800 font-semibold">
                P(B|A) = P(A∩B) / P(A) = (6/25) / (13/25) = 6/13
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
