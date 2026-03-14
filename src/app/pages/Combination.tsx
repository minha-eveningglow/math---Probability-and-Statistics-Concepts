import { Grid3x3, Package, Youtube } from 'lucide-react';
import { ConceptCard } from '../components/ConceptCard';
import { FormulaBox } from '../components/FormulaBox';
import { PartitionModel } from '../components/PartitionModel';

export function Combination() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">조합과 중복조합</h1>
        <p className="text-lg text-gray-600">
          선택의 관점에서 경우의 수를 해석합니다. 순서가 중요하지 않은 상황에서 사용됩니다.
        </p>
      </div>

      <div className="space-y-6">
        <ConceptCard
          title="일반 조합 (Combination)"
          description="서로 다른 n개에서 순서 상관없이 r개를 선택합니다."
          formula="ₙCᵣ = n! ÷ [r! × (n-r)!]"
          explanation="순열에서 선택된 r개의 순서를 제거 (r!로 나눔)"
          example="10명 중 3명 선택 = ₁₀C₃ = 120"
          color="bg-green-50 border-green-200"
        />

        <ConceptCard
          title="중복조합 (Combination with Repetition)"
          description="서로 다른 n개에서 중복을 허용하여 r개를 순서 상관없이 선택합니다."
          formula="ₙHᵣ = ₙ₊ᵣ₋₁Cᵣ"
          explanation="칸막이 모델: r개의 물건을 n개 영역으로 나누기"
          example="3종류 과일에서 5개 선택(중복가능) = ₃H₅ = ₇C₅ = 21"
          color="bg-emerald-50 border-emerald-200"
          note="중복조합의 핵심은 '구별되는 상자(n개)'에 '구별 안 되는 공(r개)'을 넣는 것"
        />
      </div>

      {/* Reference Video */}
      <div className="mt-8 bg-gradient-to-r from-red-50 to-pink-50 border-2 border-red-200 rounded-xl p-6">
        <div className="flex items-start">
          <Youtube className="w-6 h-6 text-red-600 mr-3 flex-shrink-0 mt-1" />
          <div className="flex-1">
            <h3 className="text-lg font-bold text-gray-900 mb-2">참고 동영상: 중복조합</h3>
            <p className="text-sm text-gray-600 mb-3">
              중복조합의 개념을 더 깊이 이해하고 싶다면 아래 영상을 참고하세요.
            </p>
            <a
              href="https://www.youtube.com/watch?v=5wheQyQxGOc"
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

      {/* Partition Model Visualization */}
      <div className="mt-12 bg-white rounded-xl shadow-lg p-8">
        <div className="flex items-center mb-6">
          <Package className="w-6 h-6 text-green-600 mr-2" />
          <h2 className="text-2xl font-bold text-gray-900">칸막이 모델 시각화</h2>
        </div>
        <p className="text-gray-600 mb-6">
          중복조합 ₙHᵣ = ₙ₊ᵣ₋₁Cᵣ 공식의 직관적 이해
        </p>
        <PartitionModel />
      </div>

      {/* Key Insights */}
      <div className="mt-12 bg-white rounded-xl shadow-lg p-8">
        <div className="flex items-center mb-6">
          <Grid3x3 className="w-6 h-6 text-green-600 mr-2" />
          <h2 className="text-2xl font-bold text-gray-900">핵심 포인트</h2>
        </div>
        <div className="space-y-4">
          <FormulaBox
            title="조합 vs 중복조합"
            content="조합(ₙCᵣ): 한 번 선택하면 제외 / 중복조합(ₙHᵣ): 같은 것을 여러 번 선택 가능"
          />
          <FormulaBox
            title="칸막이 모델의 원리"
            content="○○|○○○||○ → 5개 공을 3개 영역으로 나눔 = (2개, 3개, 0개, 1개). 총 5+3개 위치 중 3개를 칸막이로 선택 = ₈C₃"
          />
          <FormulaBox
            title="실생활 예시"
            content="편의점에서 3종류 음료 중 5개 구매(중복가능) = ₃H₅ = ₇C₅ = 21가지"
          />
          <FormulaBox
            title="정수해 문제 연결"
            content="x₁ + x₂ + x₃ = 10 (xᵢ ≥ 0)의 음이 아닌 정수해 개수 = ₃H₁₀ = ₁₂C₁₀"
          />
        </div>
      </div>

      {/* Stars and Bars Connection */}
      <div className="mt-8 bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-xl p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-3">💡 선택을 배열로 변환하는 마법</h3>
        <p className="text-gray-700 mb-3">
          <span className="font-semibold text-green-700">중복조합의 핵심 (Stars and Bars):</span> 
          서로 다른 종류(n)에서 중복을 허용해 선택(r)하는 복잡한 문제를, 
          똑같은 것(r)과 칸막이(n-1)를 나열하는 '같은 것이 있는 순열'의 문제로 변환합니다.
        </p>
        <div className="bg-white rounded-lg p-4 space-y-3">
          <p className="text-sm text-gray-700">
            <span className="font-semibold">이항정리 연관성:</span>
          </p>
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded p-3 text-sm text-gray-700">
            <p className="mb-2">(a + b + c)⁵를 전개하면 서로 다른 항이 몇 개일까?</p>
            <p className="font-mono text-indigo-700">
              → a, b, c 중에서 중복을 허용해 5개를 선택 = ₃H₅ = ₇C₅ = <span className="font-bold">21개</span>
            </p>
            <p className="mt-2 text-xs text-gray-600">
              예: a⁵, a⁴b, a³b², a²bc², abc³ 등... 총 21가지 항이 존재
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}