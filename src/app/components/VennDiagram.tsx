import { useState } from 'react';
import { motion } from 'motion/react';

type Operation = 'union' | 'intersection' | 'complement-a' | 'complement-b' | 'none';

export function VennDiagram() {
  const [operation, setOperation] = useState<Operation>('none');

  // SVG viewBox dimensions
  const width = 400;
  const height = 300;
  const radius = 80;
  
  // Circle centers
  const circleA = { cx: 150, cy: 150, r: radius };
  const circleB = { cx: 250, cy: 150, r: radius };

  const operations = [
    { 
      id: 'union' as Operation, 
      label: '합사건 (A ∪ B)', 
      description: 'A 또는 B가 일어나는 사건',
      symbol: 'A ∪ B',
      color: 'bg-purple-500'
    },
    { 
      id: 'intersection' as Operation, 
      label: '곱사건 (A ∩ B)', 
      description: 'A와 B가 동시에 일어나는 사건',
      symbol: 'A ∩ B',
      color: 'bg-indigo-500'
    },
    { 
      id: 'complement-a' as Operation, 
      label: '여사건 (Aᶜ)', 
      description: 'A가 일어나지 않는 사건',
      symbol: 'Aᶜ',
      color: 'bg-green-500'
    },
    { 
      id: 'complement-b' as Operation, 
      label: '여사건 (Bᶜ)', 
      description: 'B가 일어나지 않는 사건',
      symbol: 'Bᶜ',
      color: 'bg-cyan-500'
    },
  ];

  const selectedOp = operations.find(op => op.id === operation);

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 space-y-6">
      <h3 className="text-xl font-bold text-gray-900 text-center">
        벤 다이어그램으로 이해하는 사건의 연산
      </h3>

      {/* Operation Selector */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {operations.map((op) => (
          <button
            key={op.id}
            onClick={() => setOperation(operation === op.id ? 'none' : op.id)}
            className={`p-3 rounded-lg border-2 transition-all text-left ${
              operation === op.id
                ? `${op.color} text-white border-transparent`
                : 'bg-gray-50 border-gray-300 hover:border-gray-400 text-gray-900'
            }`}
          >
            <div className="font-bold text-sm mb-1">{op.symbol}</div>
            <div className="text-xs opacity-90">{op.label.split('(')[0].trim()}</div>
          </button>
        ))}
      </div>

      {/* Venn Diagram */}
      <div className="flex justify-center bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg p-8">
        <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
          {/* Sample Space background */}
          <rect 
            x="20" 
            y="20" 
            width={width - 40} 
            height={height - 40} 
            rx="10"
            fill="#f3f4f6"
            stroke="#9ca3af"
            strokeWidth="2"
          />
          
          {/* Sample Space label */}
          <text x="30" y="45" fontSize="16" fontWeight="bold" fill="#4b5563">
            S (표본공간)
          </text>

          {/* Define clip paths for operations */}
          <defs>
            {/* Circle A */}
            <clipPath id="clipA">
              <circle cx={circleA.cx} cy={circleA.cy} r={circleA.r} />
            </clipPath>
            
            {/* Circle B */}
            <clipPath id="clipB">
              <circle cx={circleB.cx} cy={circleB.cy} r={circleB.r} />
            </clipPath>

            {/* Union: A or B */}
            <clipPath id="clipUnion">
              <circle cx={circleA.cx} cy={circleA.cy} r={circleA.r} />
              <circle cx={circleB.cx} cy={circleB.cy} r={circleB.r} />
            </clipPath>

            {/* Complement A */}
            <mask id="maskComplementA">
              <rect x="0" y="0" width={width} height={height} fill="white" />
              <circle cx={circleA.cx} cy={circleA.cy} r={circleA.r} fill="black" />
            </mask>

            {/* Complement B */}
            <mask id="maskComplementB">
              <rect x="0" y="0" width={width} height={height} fill="white" />
              <circle cx={circleB.cx} cy={circleB.cy} r={circleB.r} fill="black" />
            </mask>
          </defs>

          {/* Highlight based on operation */}
          {operation === 'union' && (
            <g>
              <circle cx={circleA.cx} cy={circleA.cy} r={circleA.r} fill="#a78bfa" opacity="0.7" />
              <circle cx={circleB.cx} cy={circleB.cy} r={circleB.r} fill="#a78bfa" opacity="0.7" />
            </g>
          )}

          {operation === 'intersection' && (
            <g>
              <circle cx={circleB.cx} cy={circleB.cy} r={circleB.r} clipPath="url(#clipA)" fill="#818cf8" opacity="0.8" />
            </g>
          )}

          {/* Complement A - fill sample space except A */}
          {operation === 'complement-a' && (
            <rect 
              x="20" 
              y="20" 
              width={width - 40} 
              height={height - 40} 
              rx="10"
              fill="#86efac"
              opacity="0.7"
              mask="url(#maskComplementA)"
            />
          )}

          {/* Complement B - fill sample space except B */}
          {operation === 'complement-b' && (
            <rect 
              x="20" 
              y="20" 
              width={width - 40} 
              height={height - 40} 
              rx="10"
              fill="#67e8f9"
              opacity="0.7"
              mask="url(#maskComplementB)"
            />
          )}

          {/* Circle A */}
          <circle 
            cx={circleA.cx} 
            cy={circleA.cy} 
            r={circleA.r} 
            fill={operation === 'complement-a' ? 'none' : operation === 'none' ? '#93c5fd' : 'none'}
            stroke="#3b82f6"
            strokeWidth="3"
            opacity="0.6"
          />
          
          {/* Circle B */}
          <circle 
            cx={circleB.cx} 
            cy={circleB.cy} 
            r={circleB.r} 
            fill={operation === 'complement-b' ? 'none' : operation === 'none' ? '#fca5a5' : 'none'}
            stroke="#ef4444"
            strokeWidth="3"
            opacity="0.6"
          />

          {/* Labels */}
          <text x={circleA.cx - 40} y={circleA.cy} fontSize="24" fontWeight="bold" fill="#1e40af">
            A
          </text>
          <text x={circleB.cx + 30} y={circleB.cy} fontSize="24" fontWeight="bold" fill="#991b1b">
            B
          </text>
        </svg>
      </div>

      {/* Operation Explanation */}
      {selectedOp && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-indigo-50 to-purple-50 border-2 border-indigo-300 rounded-lg p-6"
        >
          <div className="flex items-center mb-3">
            <div className={`w-4 h-4 rounded ${selectedOp.color} mr-3`}></div>
            <h4 className="font-bold text-gray-900 text-lg">
              {selectedOp.label}
            </h4>
          </div>
          <p className="text-gray-700 mb-4">
            {selectedOp.description}
          </p>

          {/* Detailed explanation */}
          <div className="bg-white rounded-lg p-4 space-y-2 text-sm">
            {operation === 'union' && (
              <>
                <p><span className="font-bold">수식:</span> A ∪ B</p>
                <p><span className="font-bold">확률:</span> P(A ∪ B) = P(A) + P(B) - P(A ∩ B)</p>
                <p className="text-xs text-gray-600">
                  * 교집합을 빼는 이유: 겹치는 부분을 두 번 세지 않기 위해
                </p>
                <p className="text-xs text-gray-600">
                  * 배반 사건이면: P(A ∪ B) = P(A) + P(B)
                </p>
              </>
            )}
            {operation === 'intersection' && (
              <>
                <p><span className="font-bold">수식:</span> A ∩ B</p>
                <p><span className="font-bold">확률:</span> P(A ∩ B)</p>
                <p className="text-xs text-gray-600">
                  * 독립 사건이면: P(A ∩ B) = P(A) × P(B)
                </p>
                <p className="text-xs text-gray-600">
                  * 배반 사건이면: P(A ∩ B) = 0
                </p>
              </>
            )}
            {operation === 'complement-a' && (
              <>
                <p><span className="font-bold">수식:</span> Aᶜ 또는 A'</p>
                <p><span className="font-bold">확률:</span> P(Aᶜ) = 1 - P(A)</p>
                <p className="text-xs text-gray-600">
                  * 전체 확률은 1이므로, A가 일어나지 않을 확률은 1에서 A의 확률을 뺀 값
                </p>
              </>
            )}
            {operation === 'complement-b' && (
              <>
                <p><span className="font-bold">수식:</span> Bᶜ 또는 B'</p>
                <p><span className="font-bold">확률:</span> P(Bᶜ) = 1 - P(B)</p>
                <p className="text-xs text-gray-600">
                  * 전체 확률은 1이므로, B가 일어나지 않을 확률은 1에서 B의 확률을 뺀 값
                </p>
              </>
            )}
          </div>
        </motion.div>
      )}

      {/* Quick Reference */}
      <div className="bg-gray-50 rounded-lg p-4">
        <h4 className="font-bold text-gray-900 mb-3 text-sm">연산 기호 정리</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
          <div className="bg-white rounded p-3">
            <p className="font-bold text-purple-700 mb-1">합집합 (Union)</p>
            <p className="font-mono">A ∪ B</p>
            <p className="text-gray-600 mt-1">또는 (OR)</p>
          </div>
          <div className="bg-white rounded p-3">
            <p className="font-bold text-indigo-700 mb-1">교집합 (Intersection)</p>
            <p className="font-mono">A ∩ B</p>
            <p className="text-gray-600 mt-1">그리고 (AND)</p>
          </div>
          <div className="bg-white rounded p-3">
            <p className="font-bold text-green-700 mb-1">여집합 (Complement)</p>
            <p className="font-mono">Aᶜ 또는 A'</p>
            <p className="text-gray-600 mt-1">아닌 (NOT)</p>
          </div>
        </div>
      </div>
    </div>
  );
}