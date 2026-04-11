import { useState } from 'react';
import { motion } from 'motion/react';

type Law = 'law1' | 'law2' | 'none';

export function DeMorganLaws() {
  const [selectedLaw, setSelectedLaw] = useState<Law>('none');

  const width = 400;
  const height = 300;
  const radius = 70;

  const circleA = { cx: 140, cy: 150, r: radius };
  const circleB = { cx: 260, cy: 150, r: radius };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 space-y-6">
      <h3 className="text-2xl font-bold text-gray-900">
        드모르간의 법칙 (De Morgan's Laws)
      </h3>

      <div className="bg-gradient-to-r from-purple-50 to-pink-50 border-2 border-purple-300 rounded-lg p-6">
        <p className="text-gray-700 mb-4">
          여집합과 합/교집합의 관계를 나타내는 중요한 법칙입니다.
        </p>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-white rounded-lg p-4">
            <p className="font-bold text-purple-700 mb-2">법칙 1</p>
            <p className="font-mono text-lg text-gray-800">(A ∪ B)ᶜ = Aᶜ ∩ Bᶜ</p>
            <p className="text-sm text-gray-600 mt-2">
              합집합의 여집합 = 각각의 여집합의 교집합
            </p>
          </div>
          <div className="bg-white rounded-lg p-4">
            <p className="font-bold text-pink-700 mb-2">법칙 2</p>
            <p className="font-mono text-lg text-gray-800">(A ∩ B)ᶜ = Aᶜ ∪ Bᶜ</p>
            <p className="text-sm text-gray-600 mt-2">
              교집합의 여집합 = 각각의 여집합의 합집합
            </p>
          </div>
        </div>
      </div>

      {/* Selector */}
      <div className="grid grid-cols-2 gap-3">
        <button
          onClick={() => setSelectedLaw(selectedLaw === 'law1' ? 'none' : 'law1')}
          className={`p-4 rounded-lg border-2 transition-all ${
            selectedLaw === 'law1'
              ? 'bg-purple-500 text-white border-transparent'
              : 'bg-gray-50 border-gray-300 hover:border-gray-400'
          }`}
        >
          <div className="font-bold mb-1">법칙 1</div>
          <div className="text-sm opacity-90 font-mono">(A ∪ B)ᶜ = Aᶜ ∩ Bᶜ</div>
        </button>
        <button
          onClick={() => setSelectedLaw(selectedLaw === 'law2' ? 'none' : 'law2')}
          className={`p-4 rounded-lg border-2 transition-all ${
            selectedLaw === 'law2'
              ? 'bg-pink-500 text-white border-transparent'
              : 'bg-gray-50 border-gray-300 hover:border-gray-400'
          }`}
        >
          <div className="font-bold mb-1">법칙 2</div>
          <div className="text-sm opacity-90 font-mono">(A ∩ B)ᶜ = Aᶜ ∪ Bᶜ</div>
        </button>
      </div>

      {/* Visual Proof */}
      {selectedLaw !== 'none' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid md:grid-cols-2 gap-6"
        >
          {/* Left Side */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="font-bold text-gray-900 mb-3 text-center">
              {selectedLaw === 'law1' ? '(A ∪ B)ᶜ' : '(A ∩ B)ᶜ'}
            </h4>
            <div className="flex justify-center">
              <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
                <defs>
                  {selectedLaw === 'law1' ? (
                    <mask id="mask-left">
                      <rect x="0" y="0" width={width} height={height} fill="white" />
                      <circle cx={circleA.cx} cy={circleA.cy} r={circleA.r} fill="black" />
                      <circle cx={circleB.cx} cy={circleB.cy} r={circleB.r} fill="black" />
                    </mask>
                  ) : (
                    <>
                      <clipPath id="clipA-left">
                        <circle cx={circleA.cx} cy={circleA.cy} r={circleA.r} />
                      </clipPath>
                      <mask id="mask-left">
                        <rect x="0" y="0" width={width} height={height} fill="white" />
                        <circle
                          cx={circleB.cx}
                          cy={circleB.cy}
                          r={circleB.r}
                          clipPath="url(#clipA-left)"
                          fill="black"
                        />
                      </mask>
                    </>
                  )}
                </defs>

                <rect
                  x="20" y="20"
                  width={width - 40}
                  height={height - 40}
                  rx="10"
                  fill="#e0e7ff"
                  stroke="#6366f1"
                  strokeWidth="2"
                />

                <rect
                  x="20" y="20"
                  width={width - 40}
                  height={height - 40}
                  rx="10"
                  fill="#a78bfa"
                  opacity="0.7"
                  mask="url(#mask-left)"
                />

                <circle
                  cx={circleA.cx} cy={circleA.cy} r={circleA.r}
                  fill="none"
                  stroke="#3b82f6"
                  strokeWidth="3"
                />
                <circle
                  cx={circleB.cx} cy={circleB.cy} r={circleB.r}
                  fill="none"
                  stroke="#ef4444"
                  strokeWidth="3"
                />

                <text x={circleA.cx - 40} y={circleA.cy} fontSize="20" fontWeight="bold" fill="#1e40af">A</text>
                <text x={circleB.cx + 30} y={circleB.cy} fontSize="20" fontWeight="bold" fill="#991b1b">B</text>
                <text x="30" y="45" fontSize="14" fontWeight="bold" fill="#4b5563">S</text>
              </svg>
            </div>
          </div>

          {/* Right Side */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="font-bold text-gray-900 mb-3 text-center">
              {selectedLaw === 'law1' ? 'Aᶜ ∩ Bᶜ' : 'Aᶜ ∪ Bᶜ'}
            </h4>
            <div className="flex justify-center">
              <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
                <defs>
                  <mask id="mask-compA">
                    <rect x="0" y="0" width={width} height={height} fill="white" />
                    <circle cx={circleA.cx} cy={circleA.cy} r={circleA.r} fill="black" />
                  </mask>
                  <mask id="mask-compB">
                    <rect x="0" y="0" width={width} height={height} fill="white" />
                    <circle cx={circleB.cx} cy={circleB.cy} r={circleB.r} fill="black" />
                  </mask>
                  {selectedLaw === 'law1' && (
                    <mask id="mask-both">
                      <rect x="0" y="0" width={width} height={height} fill="white" />
                      <circle cx={circleA.cx} cy={circleA.cy} r={circleA.r} fill="black" />
                      <circle cx={circleB.cx} cy={circleB.cy} r={circleB.r} fill="black" />
                    </mask>
                  )}
                </defs>

                <rect
                  x="20" y="20"
                  width={width - 40}
                  height={height - 40}
                  rx="10"
                  fill="#e0e7ff"
                  stroke="#6366f1"
                  strokeWidth="2"
                />

                {selectedLaw === 'law1' ? (
                  <rect
                    x="20" y="20"
                    width={width - 40}
                    height={height - 40}
                    rx="10"
                    fill="#a78bfa"
                    opacity="0.7"
                    mask="url(#mask-both)"
                  />
                ) : (
                  <>
                    <rect
                      x="20" y="20"
                      width={width - 40}
                      height={height - 40}
                      rx="10"
                      fill="#a78bfa"
                      opacity="0.5"
                      mask="url(#mask-compA)"
                    />
                    <rect
                      x="20" y="20"
                      width={width - 40}
                      height={height - 40}
                      rx="10"
                      fill="#a78bfa"
                      opacity="0.5"
                      mask="url(#mask-compB)"
                    />
                  </>
                )}

                <circle
                  cx={circleA.cx} cy={circleA.cy} r={circleA.r}
                  fill="none"
                  stroke="#3b82f6"
                  strokeWidth="3"
                />
                <circle
                  cx={circleB.cx} cy={circleB.cy} r={circleB.r}
                  fill="none"
                  stroke="#ef4444"
                  strokeWidth="3"
                />

                <text x={circleA.cx - 40} y={circleA.cy} fontSize="20" fontWeight="bold" fill="#1e40af">A</text>
                <text x={circleB.cx + 30} y={circleB.cy} fontSize="20" fontWeight="bold" fill="#991b1b">B</text>
                <text x="30" y="45" fontSize="14" fontWeight="bold" fill="#4b5563">S</text>
              </svg>
            </div>
          </div>
        </motion.div>
      )}

      {/* Explanation */}
      {selectedLaw !== 'none' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-indigo-50 border-2 border-indigo-300 rounded-lg p-4"
        >
          <p className="font-bold text-indigo-900 mb-2">해석:</p>
          {selectedLaw === 'law1' ? (
            <p className="text-gray-700">
              "A 또는 B가 일어나지 않는 것"은 "A도 일어나지 않고 B도 일어나지 않는 것"과 같습니다.
              양쪽 다이어그램의 색칠된 영역이 정확히 일치합니다.
            </p>
          ) : (
            <p className="text-gray-700">
              "A와 B가 동시에 일어나지 않는 것"은 "A가 일어나지 않거나 B가 일어나지 않는 것"과 같습니다.
              양쪽 다이어그램의 색칠된 영역이 정확히 일치합니다.
            </p>
          )}
        </motion.div>
      )}

      {/* Examples */}
      <div className="bg-yellow-50 border border-yellow-300 rounded-lg p-4">
        <p className="font-bold text-gray-900 mb-2">💡 실생활 예시</p>
        <div className="space-y-2 text-sm text-gray-700">
          <p>
            <span className="font-bold">법칙 1:</span> "축구를 하거나 농구를 하지 않는다" = "축구도 하지 않고 농구도 하지 않는다"
          </p>
          <p>
            <span className="font-bold">법칙 2:</span> "축구와 농구를 동시에 하지 않는다" = "축구를 하지 않거나 농구를 하지 않는다"
          </p>
        </div>
      </div>
    </div>
  );
}
