function stdNormalPDF(z: number): number {
  return (1 / Math.sqrt(2 * Math.PI)) * Math.exp(-0.5 * z * z);
}

export function ConfidenceZDiagram() {
  const W = 560;
  const H = 220;
  const PAD = { l: 30, r: 30, t: 30, b: 30 };
  const pw = W - PAD.l - PAD.r;
  const ph = H - PAD.t - PAD.b;

  const zMin = -3.5;
  const zMax = 3.5;
  const yMax = stdNormalPDF(0) * 1.1;

  const toSvg = (z: number, y: number) => ({
    sx: PAD.l + ((z - zMin) / (zMax - zMin)) * pw,
    sy: PAD.t + (1 - y / yMax) * ph,
  });

  const N = 200;
  const curve = Array.from({ length: N + 1 }, (_, i) => {
    const z = zMin + (i / N) * (zMax - zMin);
    const y = stdNormalPDF(z);
    const { sx, sy } = toSvg(z, y);
    return `${sx},${sy}`;
  }).join(' ');

  const shade = (() => {
    const pts: string[] = [];
    const { sx: slx, sy: baseSy } = toSvg(-1.96, 0);
    pts.push(`${slx},${baseSy}`);
    for (let i = 0; i <= 100; i++) {
      const z = -1.96 + (i / 100) * 3.92;
      const y = stdNormalPDF(z);
      const { sx, sy } = toSvg(z, y);
      pts.push(`${sx},${sy}`);
    }
    const { sx: shx } = toSvg(1.96, 0);
    pts.push(`${shx},${baseSy}`);
    return pts.join(' ');
  })();

  const { sy: baseSy } = toSvg(0, 0);
  const { sx: sxLo } = toSvg(-1.96, 0);
  const { sx: sxHi } = toSvg(1.96, 0);
  const { sx: sx0 } = toSvg(0, 0);

  return (
    <div className="bg-gray-50 rounded-xl p-4">
      <svg width={W} height={H} className="mx-auto block">
        {/* 축 */}
        <line x1={PAD.l} y1={baseSy} x2={W - PAD.r} y2={baseSy} stroke="#9ca3af" strokeWidth={1} />

        {/* 0.95 음영 영역 */}
        <polygon points={shade} fill="#fde68a" fillOpacity={0.7} />

        {/* 종모양 곡선 */}
        <polyline points={curve} fill="none" stroke="#111827" strokeWidth={2} strokeLinejoin="round" />

        {/* -1.96, 1.96 세로선 */}
        <line x1={sxLo} y1={PAD.t} x2={sxLo} y2={baseSy} stroke="#dc2626" strokeWidth={1.5} strokeDasharray="4 3" />
        <line x1={sxHi} y1={PAD.t} x2={sxHi} y2={baseSy} stroke="#dc2626" strokeWidth={1.5} strokeDasharray="4 3" />
        <line x1={sx0} y1={PAD.t} x2={sx0} y2={baseSy} stroke="#6b7280" strokeWidth={1} strokeDasharray="2 2" />

        {/* 라벨 */}
        <text x={sxLo} y={baseSy + 16} textAnchor="middle" fontSize={12} fontWeight="bold" fill="#dc2626">−1.96</text>
        <text x={sxHi} y={baseSy + 16} textAnchor="middle" fontSize={12} fontWeight="bold" fill="#dc2626">1.96</text>
        <text x={sx0} y={baseSy + 16} textAnchor="middle" fontSize={12} fill="#6b7280">O</text>
        <text x={(sxLo + sxHi) / 2} y={PAD.t + 40} textAnchor="middle" fontSize={16} fontWeight="bold" fill="#b45309">
          0.95
        </text>
        <text x={W - PAD.r} y={PAD.t - 10} textAnchor="end" fontSize={13} fontWeight="bold" fill="#111827">Z</text>
      </svg>

      <p className="text-center text-sm text-gray-700 mt-2">
        확률이 0.95인 <strong>Z의 값</strong> → 표준정규분포표에서 P(0 ≤ Z ≤ 1.96) = 0.475이므로
        P(−1.96 ≤ Z ≤ 1.96) = 0.95
      </p>

      <div className="mt-3 bg-white border border-gray-200 rounded-lg p-4 text-center font-mono text-sm md:text-base">
        <span className="inline-block bg-blue-100 text-blue-800 rounded px-2 py-0.5 mr-1">x̄</span>
        −{' '}
        <span className="inline-block bg-rose-100 text-rose-800 rounded px-2 py-0.5 mr-1">1.96</span>
        <span className="inline-block bg-emerald-100 text-emerald-800 rounded px-2 py-0.5">σ/√n</span>
        {' '}≤ m ≤{' '}
        <span className="inline-block bg-blue-100 text-blue-800 rounded px-2 py-0.5 mr-1">x̄</span>
        +{' '}
        <span className="inline-block bg-rose-100 text-rose-800 rounded px-2 py-0.5 mr-1">1.96</span>
        <span className="inline-block bg-emerald-100 text-emerald-800 rounded px-2 py-0.5">σ/√n</span>
      </div>
      <p className="text-center text-sm text-gray-600 mt-2">모평균 m의 신뢰도 95%의 신뢰구간</p>

      <p className="text-center text-xs text-gray-400 mt-3">
        <a
          href="https://ko.wikipedia.org/wiki/%ED%91%9C%EC%A4%80%EC%A0%95%EA%B7%9C%EB%B6%84%ED%8F%AC%ED%91%9C"
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-blue-600"
        >
          표준정규분포표 (위키백과)에서 값 확인하기 →
        </a>
      </p>
    </div>
  );
}
