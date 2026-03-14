import { Calculator, Youtube } from 'lucide-react';
import { ConceptCard } from '../components/ConceptCard';
import { FormulaBox } from '../components/FormulaBox';

export function Permutation() {
  const concepts = [
    {
      title: '원순열 (Circular Permutation)',
      description: '서로 다른 n개를 원형으로 배열할 때, 회전하여 일치하는 것은 하나로 봅니다.',
      formula: '(n-1)!',
      explanation: 'n개를 일렬로 나열하는 경우(n!)에서 회전 대칭(n가지)을 제거',
      example: '5명이 원탁에 앉는 경우의 수 = (5-1)! = 24',
      color: 'bg-blue-50 border-blue-200',
    },
    {
      title: '다각형 배열',
      description: '원순열의 확장으로, 기준이 되는 서로 다른 자리의 개수를 고려합니다.',
      formula: '(n-1)! × k',
      explanation: 'k는 기준 위치의 개수 (예: 목걸이는 뒤집기 가능하므로 2로 나눔)',
      example: '5개의 구슬로 목걸이 만들기 = (5-1)! ÷ 2 = 12',
      color: 'bg-cyan-50 border-cyan-200',
    },
    {
      title: '중복순열',
      description: '서로 다른 n개에서 중복을 허용하여 r개를 택해 일렬로 나열합니다.',
      formula: 'nʳ (ₙΠᵣ)',
      explanation: '각 위치마다 n가지 선택이 가능하고, 이것이 r번 반복',
      example: '3가지 색으로 4칸 칠하기 = 3⁴ = 81',
      color: 'bg-indigo-50 border-indigo-200',
      note: '함수의 개수를 구할 때 유용: A→B 함수의 개수 = |B|^|A|',
    },
    {
      title: '같은 것이 있는 순열',
      description: 'n개 중 똑같은 것이 섞여 있을 때 나열하는 방법입니다.',
      formula: 'n! ÷ (p! × q! × ... × r!)',
      explanation: 'p, q, r은 각각 같은 것들의 개수',
      example: 'MISSISSIPPI 배열 = 11! ÷ (4! × 4! × 2!)',
      color: 'bg-violet-50 border-violet-200',
      note: '최단 거리 문제: 가로(p)와 세로(q) 이동을 나열하는 것과 동일',
    },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">순열의 세 가지 변주</h1>
        <p className="text-lg text-gray-600">
          배열(순서)의 관점에서 경우의 수를 해석합니다. 순서가 중요한 상황에서 사용됩니다.
        </p>
      </div>

      {/* Reference Video */}
      <div className="mb-8 bg-gradient-to-r from-red-50 to-pink-50 border-2 border-red-200 rounded-xl p-6">
        <div className="flex items-start">
          <Youtube className="w-6 h-6 text-red-600 mr-3 flex-shrink-0 mt-1" />
          <div className="flex-1">
            <h3 className="text-lg font-bold text-gray-900 mb-2">참고 동영상: 원순열</h3>
            <p className="text-sm text-gray-600 mb-3">
              원순열의 개념을 더 깊이 이해하고 싶다면 아래 영상을 참고하세요.
            </p>
            <a
              href="https://www.youtube.com/watch?v=RWew3lc-i_s"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              <Youtube className="w-5 h-5 mr-2" />
              YouTube에서 보기
            </a>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        {concepts.map((concept, index) => (
          <ConceptCard key={index} {...concept} />
        ))}
      </div>

      {/* Interactive Calculator Section */}
      <div className="mt-12 bg-white rounded-xl shadow-lg p-8">
        <div className="flex items-center mb-6">
          <Calculator className="w-6 h-6 text-indigo-600 mr-2" />
          <h2 className="text-2xl font-bold text-gray-900">핵심 포인트</h2>
        </div>
        <div className="space-y-4">
          <FormulaBox
            title="순열 vs 중복순열"
            content="순열(ₙPᵣ): 뽑은 후 다시 넣지 않음 / 중복순열(ₙΠᵣ): 뽑은 후 다시 넣음"
          />
          <FormulaBox
            title="원순열의 직관"
            content="일렬 배열에서 한 사람을 기준으로 고정하면 나머지 (n-1)명만 배열하면 됨"
          />
          <FormulaBox
            title="최단거리 = 같은 것이 있는 순열"
            content="(a, b)에서 (c, d)로 가는 최단거리 = (c-a+d-b)! ÷ [(c-a)! × (d-b)!]"
          />
        </div>
      </div>

      {/* Deep Connection */}
      <div className="mt-8 bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-xl p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-3">💡 이항정리로의 징검다리</h3>
        <p className="text-gray-700 mb-3">
          원순열에서 배운 <span className="font-semibold text-blue-700">"겉모습은 다르지만 본질적으로 같은 것을 어떻게 처리할 것인가"</span>라는 논리는 
          이후 학습할 내용들의 기초가 됩니다.
        </p>
        <div className="bg-white rounded-lg p-4 space-y-2 text-sm text-gray-600">
          <p>→ <span className="font-semibold">같은 것이 있는 순열:</span> 중복을 제거하는 원리 (n! / p!q!)</p>
          <p>→ <span className="font-semibold">조합:</span> 순서를 제거하는 원리 (ₙPᵣ / r!)</p>
          <p>→ <span className="font-semibold">이항계수:</span> 조합론적 의미를 가진 계수</p>
        </div>
      </div>
    </div>
  );
}