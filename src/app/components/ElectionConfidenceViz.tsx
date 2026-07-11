import { useState } from 'react';

const Z_TABLE = { 95: 1.96, 99: 2.58 } as const;

function marginOfError(p: number, n: number, z: number) {
  return z * Math.sqrt((p * (1 - p)) / n);
}

export function ElectionConfidenceViz() {
  const [pA, setPA] = useState(43); // 후보 A 출구조사 지지율 (%)
  const [pB, setPB] = useState(41); // 후보 B 출구조사 지지율 (%)
  const [n, setN] = useState(2000); // 출구조사 표본 크기
  const [popN, setPopN] = useState(44000000); // 모집단 크기 (전체 유효유권자 수)
  const [level, setLevel] = useState<95 | 99>(95);

  const z = Z_TABLE[level];
  const meA = marginOfError(pA / 100, n, z) * 100;
  const meB = marginOfError(pB / 100, n, z) * 100;

  const loA = pA - meA;
  const hiA = pA + meA;
  const loB = pB - meB;
  const hiB = pB + meB;

  const overlap = loA <= hiB && loB <= hiA; // 두 신뢰구간이 겹치는가
  const status = overlap ? '경합 (당선 예측 불가)' : pA > pB ? 'A 후보 당선 확실' : 'B 후보 당선 확실';

  const W = 520;
  const H = 140;
  const PAD = { l: 60, r: 20 };
  const pw = W - PAD.l - PAD.r;
  const xMin = 20;
  const xMax = 60;
  const toX = (v: number) => PAD.l + ((v - xMin) / (xMax - xMin)) * pw;

  return (
    <div className="space-y-5">
      {/* 파라미터 */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1">
            A 후보 출구조사 지지율 = {pA}%
          </label>
          <input type="range" min={25} max={55} step={1} value={pA}
            onChange={(e) => setPA(+e.target.value)}
            className="w-full accent-rose-600"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1">
            B 후보 출구조사 지지율 = {pB}%
          </label>
          <input type="range" min={25} max={55} step={1} value={pB}
            onChange={(e) => setPB(+e.target.value)}
            className="w-full accent-blue-600"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1">
            출구조사 표본 크기 n = {n.toLocaleString()}명
          </label>
          <input type="range" min={200} max={20000} step={200} value={n}
            onChange={(e) => setN(+e.target.value)}
            className="w-full accent-gray-600"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1">
            전체 유효 유권자 수 (모집단) N = {popN.toLocaleString()}명
          </label>
          <input type="range" min={1000000} max={44000000} step={1000000} value={popN}
            onChange={(e) => setPopN(+e.target.value)}
            className="w-full accent-gray-400"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1">신뢰도</label>
          <div className="flex gap-2">
            {([95, 99] as const).map((lv) => (
              <button
                key={lv}
                onClick={() => setLevel(lv)}
                className={`flex-1 rounded-lg py-1.5 text-sm font-semibold border transition-colors ${
                  level === lv
                    ? 'bg-gray-800 text-white border-gray-800'
                    : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                }`}
              >
                {lv}%
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 개표방송 스타일 신뢰구간 바 */}
      <div className="bg-gray-900 rounded-xl p-4">
        <svg width={W} height={H} className="mx-auto block">
          {/* A 후보 */}
          <text x={PAD.l - 8} y={38} textAnchor="end" fontSize={12} fill="#fda4af" fontWeight="bold">A</text>
          <line x1={toX(loA)} y1={35} x2={toX(hiA)} y2={35} stroke="#f43f5e" strokeWidth={6} strokeLinecap="round" />
          <circle cx={toX(pA)} cy={35} r={4} fill="#fff" />
          <text x={toX(pA)} y={22} textAnchor="middle" fontSize={11} fill="#fda4af" fontWeight="bold">{pA}%</text>

          {/* B 후보 */}
          <text x={PAD.l - 8} y={78} textAnchor="end" fontSize={12} fill="#93c5fd" fontWeight="bold">B</text>
          <line x1={toX(loB)} y1={75} x2={toX(hiB)} y2={75} stroke="#3b82f6" strokeWidth={6} strokeLinecap="round" />
          <circle cx={toX(pB)} cy={75} r={4} fill="#fff" />
          <text x={toX(pB)} y={62} textAnchor="middle" fontSize={11} fill="#93c5fd" fontWeight="bold">{pB}%</text>

          {/* 눈금 */}
          {[20, 30, 40, 50, 60].map((t) => (
            <g key={t}>
              <line x1={toX(t)} y1={100} x2={toX(t)} y2={105} stroke="#6b7280" strokeWidth={1} />
              <text x={toX(t)} y={118} textAnchor="middle" fontSize={10} fill="#9ca3af">{t}%</text>
            </g>
          ))}
        </svg>
        <div className={`text-center mt-2 py-2 rounded-lg font-bold text-lg ${
          overlap ? 'bg-amber-500/20 text-amber-300' : 'bg-emerald-500/20 text-emerald-300'
        }`}>
          {status}
        </div>
      </div>

      {/* 수치 */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-rose-50 border border-rose-200 rounded-xl p-3 text-center">
          <p className="text-xs text-rose-600 font-semibold">A 후보 신뢰구간</p>
          <p className="font-mono text-sm font-bold text-rose-900 mt-1">
            {loA.toFixed(1)}% ~ {hiA.toFixed(1)}%
          </p>
        </div>
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-3 text-center">
          <p className="text-xs text-blue-600 font-semibold">B 후보 신뢰구간</p>
          <p className="font-mono text-sm font-bold text-blue-900 mt-1">
            {loB.toFixed(1)}% ~ {hiB.toFixed(1)}%
          </p>
        </div>
        <div className="bg-gray-100 border border-gray-200 rounded-xl p-3 text-center">
          <p className="text-xs text-gray-600 font-semibold">표본 비율 n/N</p>
          <p className="font-mono text-sm font-bold text-gray-900 mt-1">
            {((n / popN) * 100).toFixed(3)}%
          </p>
        </div>
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
        <p className="text-sm text-amber-900">
          개표방송에서 지지율을 <strong>"43% ± 3%p"</strong>처럼 오차범위와 같이 보여주는 것도
          이 단원에서 배운 <strong>신뢰구간 x̄ ± z·σ(X̄)</strong>과 같은 구조입니다.
          여기서는 비율 p̂을 다루므로 오차범위가 <span className="font-mono">z·√(p̂(1−p̂)/n)</span>으로
          바뀌지만, 표본이 클수록(n↑) 오차범위가 줄어든다는 원리는 동일합니다.
          두 후보의 신뢰구간이 <strong>겹치지 않아야</strong> 방송사가 "당선 확실"을 표시할 수 있습니다.
        </p>
      </div>

      <div className="bg-sky-50 border border-sky-200 rounded-lg p-4">
        <p className="text-sm text-sky-900">
          <strong>모집단 크기 N을 슬라이더로 바꿔도 신뢰구간이 전혀 변하지 않는 것</strong>을 확인해보세요.
          오차범위 공식 <span className="font-mono">z·√(p̂(1−p̂)/n)</span>에는 N이 등장하지 않기 때문입니다.
          유권자가 100만 명이든 4,400만 명이든, 표본 크기 n만 같으면 오차범위는 동일합니다.
          이것이 출구조사가 <strong>전체 유권자 수와 무관하게</strong> 수천 명 규모의 표본만으로도
          정확한 예측을 할 수 있는 이유입니다. (다만 n이 N에 가까울 정도로 커지는 극단적인 경우엔
          유한모집단 수정계수를 곱해 오차범위를 더 줄일 수 있지만, 실제 출구조사에서는 n≪N이라
          그 효과가 무시할 만큼 작습니다.)
        </p>
      </div>
    </div>
  );
}
