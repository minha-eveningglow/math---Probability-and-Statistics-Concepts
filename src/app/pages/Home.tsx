import { Link } from 'react-router';
import { ArrowRight, Shuffle, Grid3x3, Triangle, TrendingUp, Sigma, Percent } from 'lucide-react';

export function Home() {
  const topics = [
    {
      title: '순열 (Permutation)',
      description: '배열의 관점에서 경우의 수를 이해합니다',
      path: '/permutation',
      icon: Shuffle,
      color: 'bg-blue-500',
      items: ['원순열', '중복순열', '같은 것이 있는 순열'],
    },
    {
      title: '조합 (Combination)',
      description: '선택의 관점에서 경우의 수를 이해합니다',
      path: '/combination',
      icon: Grid3x3,
      color: 'bg-green-500',
      items: ['중복조합', '칸막이 모델'],
    },
    {
      title: '이항정리',
      description: '세기(Counting)가 대수(Algebra)가 되는 순간',
      path: '/binomial',
      icon: Sigma,
      color: 'bg-purple-500',
      items: ['이항정리 공식', '계수와 조합의 관계', '다항식 전개'],
    },
    {
      title: '파스칼의 삼각형',
      description: '대수에서 확률로 이어지는 연결고리',
      path: '/pascal',
      icon: Triangle,
      color: 'bg-pink-500',
      items: ['파스칼의 삼각형', '이항계수의 시각화', '정규분포로의 확장'],
    },
    {
      title: '확률 기초',
      description: '표본공간, 사건, 그리고 확률의 기본 연산',
      path: '/probability',
      icon: Percent,
      color: 'bg-orange-500',
      items: ['표본공간과 사건', '사건의 연산', '배반과 독립'],
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-5xl font-bold text-gray-900 mb-4">
          확률과 통계: 경우의 수의 확장
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          단순히 숫자를 세는 것이 아니라, 상황을 <span className="font-semibold text-indigo-600">'배열(순열)'</span>과{' '}
          <span className="font-semibold text-indigo-600">'선택(조합)'</span>의 관점에서 재해석합니다
        </p>
      </div>

      {/* Topic Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mb-16">
        {topics.map((topic) => {
          const Icon = topic.icon;
          return (
            <Link
              key={topic.path}
              to={topic.path}
              className="bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition-all transform hover:-translate-y-1"
            >
              <div className={`${topic.color} w-12 h-12 rounded-lg flex items-center justify-center mb-4`}>
                <Icon className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">{topic.title}</h2>
              <p className="text-gray-600 mb-4">{topic.description}</p>
              <ul className="space-y-2 mb-4">
                {topic.items.map((item) => (
                  <li key={item} className="flex items-center text-sm text-gray-700">
                    <ArrowRight className="w-4 h-4 mr-2 text-indigo-500" />
                    {item}
                  </li>
                ))}
              </ul>
              <div className="flex items-center text-indigo-600 font-semibold">
                학습하기
                <ArrowRight className="w-5 h-5 ml-2" />
              </div>
            </Link>
          );
        })}
      </div>

      {/* Connection Insight */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl shadow-lg p-8 text-white mb-8">
        <div className="flex items-start justify-between">
          <div className="flex items-start flex-1">
            <TrendingUp className="w-8 h-8 mr-4 flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-2xl font-bold mb-3">수학적 연결고리</h3>
              <p className="text-lg mb-4">
                조합론 → 이항정리 → 파스칼의 삼각형 → 이항분포 → 정규분포
              </p>
              <p className="text-indigo-100 mb-4">
                각 단원들이 왜 이 순서로 배치되었는지 이해하면 공부가 더 쉬워집니다.
                대수학의 조합 계수가 확률의 세계로 자연스럽게 이어지는 과정을 시각화하여 확인해보세요.
              </p>
              <Link
                to="/flow"
                className="inline-flex items-center px-6 py-3 bg-white text-indigo-600 rounded-lg font-bold hover:bg-indigo-50 transition-all transform hover:scale-105"
              >
                <TrendingUp className="w-5 h-5 mr-2" />
                개념의 흐름 살펴보기
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Conceptual Flow */}
      <div className="mt-8 bg-white rounded-xl shadow-lg p-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-6">
          관계의 핵심: 배열에서 선택으로 (Arrangement → Selection)
        </h3>
        <p className="text-gray-600 mb-6">
          이 단원들의 학습 순서는 <span className="font-semibold text-indigo-600">'순서가 있는 나열'</span>에서 시작해{' '}
          <span className="font-semibold text-indigo-600">'순서가 없는 선택'</span>으로, 
          그리고 이를 <span className="font-semibold text-indigo-600">'수식(계수)'</span>으로 연결하는 과정입니다.
        </p>

        <div className="space-y-6">
          {/* Step 1 */}
          <div className="border-l-4 border-blue-500 pl-6 py-2">
            <h4 className="text-xl font-bold text-gray-900 mb-2">
              ① 원순열: 대칭성을 고려한 배열
            </h4>
            <div className="space-y-3 text-gray-700">
              <p>
                <span className="font-semibold">관계:</span> 원순열은 순열(n!)의 가장 기초적인 변형입니다.
              </p>
              <p>
                <span className="font-semibold">핵심:</span> 회전했을 때 겹치는 '대칭성'을 제거하기 위해 
                전체 배열의 수를 중복되는 수(n)로 나눕니다 (n!/n = (n-1)!).
              </p>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-sm italic">
                  <span className="font-semibold">이항정리로의 징검다리:</span> 
                  "겉모습은 다르지만 본질적으로 같은 것을 어떻게 처리할 것인가"라는 논리는 
                  이후 같은 것이 있는 순열을 거쳐 조합과 이항계수의 원리로 이어집니다.
                </p>
              </div>
            </div>
          </div>

          {/* Step 2 */}
          <div className="border-l-4 border-green-500 pl-6 py-2">
            <h4 className="text-xl font-bold text-gray-900 mb-2">
              ② 중복조합 (ₙHᵣ): 선택을 배열로 변환
            </h4>
            <div className="space-y-3 text-gray-700">
              <p>
                <span className="font-semibold">관계:</span> 중복조합은 이항정리의 전개식에서{' '}
                <span className="font-semibold text-green-700">'항의 개수'</span>를 결정하는 직접적인 도구입니다.
              </p>
              <p>
                <span className="font-semibold">핵심 (Stars and Bars):</span> 서로 다른 종류(n)에서 
                중복을 허용해 선택(r)하는 복잡한 문제를, 똑같은 것(r)과 칸막이(n-1)를 나열하는 
                '같은 것이 있는 순열'의 문제로 변환하여 계산합니다.
              </p>
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <p className="text-sm">
                  <span className="font-semibold">이항정리 연관성:</span> 
                  예를 들어 (a+b+c)⁵의 전개식에서 서로 다른 항의 개수는 
                  3종류(a, b, c)에서 중복을 허용해 5개를 뽑는 중복조합 ₃H₅와 같습니다.
                </p>
              </div>
            </div>
          </div>

          {/* Step 3 */}
          <div className="border-l-4 border-purple-500 pl-6 py-2">
            <h4 className="text-xl font-bold text-gray-900 mb-2">
              ③ 이항정리: 세기(Counting)가 대수(Algebra)가 되는 순간
            </h4>
            <div className="space-y-3 text-gray-700">
              <p>
                이항정리는 앞서 배운 '조합'의 원리를 식의 전개에 적용한 결과물입니다.
              </p>
              <p>
                <span className="font-semibold">계수는 곧 조합의 수:</span> (a+b)ⁿ을 전개할 때 
                aⁿ⁻ʳbʳ 항의 계수 C(n, r)은 n개의 괄호 중에서 b를 r개 선택하는 방법의 수와 같습니다.
              </p>
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                <p className="font-semibold mb-2">논리적 흐름:</p>
                <ol className="list-decimal list-inside space-y-1 text-sm">
                  <li><span className="font-semibold">원순열/순열:</span> 서로 다른 것을 나열하는 법을 배움</li>
                  <li><span className="font-semibold">중복조합:</span> 중복을 허용해 선택하고 이를 나열로 바꾸는 법을 배움</li>
                  <li><span className="font-semibold">이항정리:</span> 이 선택의 원리를 문자의 곱(항)에 적용하여 계수를 찾아냄</li>
                </ol>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}