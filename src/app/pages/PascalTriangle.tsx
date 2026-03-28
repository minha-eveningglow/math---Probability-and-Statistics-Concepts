import { useState } from 'react';
import { Triangle, TrendingUp, Sparkles, Lightbulb, Calculator } from 'lucide-react';
import { PascalTriangleViz } from '../components/PascalTriangleViz';
import { BinomialDistribution } from '../components/BinomialDistribution';
import { BinomialExpansion } from '../components/BinomialExpansion';
import { FormulaBox } from '../components/FormulaBox';
import { PascalProperties } from '../components/PascalProperties';
import { RowSumVisualization } from '../components/RowSumVisualization';
import { HockeyStick } from '../components/HockeyStick';

export function PascalTriangle() {
  const [rows, setRows] = useState(10);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          파스칼의 삼각형: 대수에서 확률로
        </h1>
        <p className="text-lg text-gray-600">
          이항정리, 조합, 확률이 만나는 지점. 수학의 아름다운 연결고리를 탐험합니다.
        </p>
      </div>

      {/* Core Properties */}
      <div className="mb-8">
        <div className="flex items-center mb-4">
          <Lightbulb className="w-6 h-6 text-yellow-600 mr-2" />
          <h2 className="text-2xl font-bold text-gray-900">핵심 성질</h2>
        </div>
        <PascalProperties />
      </div>

      {/* Pascal Triangle Interactive */}
      <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <Triangle className="w-6 h-6 text-purple-600 mr-2" />
            <h2 className="text-2xl font-bold text-gray-900">인터랙티브 파스칼의 삼각형</h2>
          </div>
          <div className="flex items-center space-x-4">
            <label className="text-gray-700 font-medium">행 수:</label>
            <input
              type="range"
              min="5"
              max="15"
              value={rows}
              onChange={(e) => setRows(Number(e.target.value))}
              className="w-32"
            />
            <span className="text-indigo-600 font-bold w-8">{rows}</span>
          </div>
        </div>
        <PascalTriangleViz rows={rows} />
      </div>

      {/* Important Results Section */}
      <div className="mb-8">
        <div className="flex items-center mb-4">
          <Calculator className="w-6 h-6 text-indigo-600 mr-2" />
          <h2 className="text-2xl font-bold text-gray-900">중요한 결과</h2>
        </div>
        
        <div className="space-y-6">
          {/* Row Sum */}
          <RowSumVisualization />
          
          {/* Hockey Stick */}
          <HockeyStick />
        </div>
      </div>

      {/* Binomial Theorem Expansion */}
      <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
        <div className="flex items-center mb-6">
          <Sparkles className="w-6 h-6 text-purple-600 mr-2" />
          <h2 className="text-2xl font-bold text-gray-900">이항정리 전개식</h2>
        </div>
        <p className="text-gray-600 mb-6">
          조합의 원리를 식의 전개에 적용하면 이항정리가 됩니다. 계수는 곧 조합의 수입니다.
        </p>
        <BinomialExpansion />
      </div>

      {/* Connections Section */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-xl shadow-lg p-6 border-2 border-purple-200">
          <div className="flex items-center mb-4">
            <Sparkles className="w-6 h-6 text-purple-600 mr-2" />
            <h3 className="text-xl font-bold text-gray-900">이항정리와의 연결</h3>
          </div>
          <div className="space-y-3">
            <p className="text-gray-700">
              (a + b)ⁿ을 전개할 때 각 항의 계수는 파스칼의 삼각형 n번째 행과 일치합니다.
            </p>
            <div className="bg-white rounded-lg p-4 font-mono text-sm">
              <div>(a + b)² = 1a² + 2ab + 1b²</div>
              <div className="text-purple-600">계수: 1, 2, 1</div>
              <div className="mt-2">(a + b)³ = 1a³ + 3a²b + 3ab² + 1b³</div>
              <div className="text-purple-600">계수: 1, 3, 3, 1</div>
            </div>
            <div className="bg-purple-100 border border-purple-300 rounded-lg p-3">
              <p className="text-sm text-gray-800">
                <span className="font-semibold">세기가 대수가 되는 순간:</span>
              </p>
              <p className="text-xs text-gray-700 mt-1">
                aⁿ⁻ʳbʳ 항의 계수 = n개의 괄호 중에서 b를 r개 선택하는 방법의 수 = ₙCᵣ
              </p>
            </div>
            <p className="text-sm text-gray-600 italic">
              각 계수는 ₙCᵣ로 표현됩니다. 대수 = 조합!
            </p>
          </div>
        </div>

        <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl shadow-lg p-6 border-2 border-blue-200">
          <div className="flex items-center mb-4">
            <Sparkles className="w-6 h-6 text-blue-600 mr-2" />
            <h3 className="text-xl font-bold text-gray-900">숨겨진 패턴들</h3>
          </div>
          <div className="space-y-3">
            <FormulaBox
              title="각 행의 합"
              content="n번째 행의 모든 수를 더하면 2ⁿ"
            />
            <FormulaBox
              title="대각선 합"
              content="대각선을 따라 합하면 피보나치 수열 1, 1, 2, 3, 5, 8, 13..."
            />
            <FormulaBox
              title="하키 스틱 패턴"
              content="대각선의 연속된 수들의 합 = 바로 아래 대각선의 한 수"
            />
          </div>
        </div>
      </div>

      {/* Normal Distribution Connection */}
      <div className="bg-white rounded-xl shadow-lg p-8">
        <div className="flex items-center mb-6">
          <TrendingUp className="w-6 h-6 text-indigo-600 mr-2" />
          <h2 className="text-2xl font-bold text-gray-900">정규분포로의 확장</h2>
        </div>
        <p className="text-gray-600 mb-6">
          n이 커질수록 파스칼의 삼각형의 각 행은 종 모양(정규분포)에 가까워집니다.
          이것이 바로 <span className="font-semibold text-indigo-600">중심극한정리</span>의 시각적 표현입니다.
        </p>
        <BinomialDistribution />
      </div>

      {/* Summary */}
      <div className="mt-8 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl shadow-lg p-8 text-white">
        <h3 className="text-2xl font-bold mb-4">수학의 연결고리</h3>
        <div className="space-y-3 text-lg">
          <p>
            <span className="font-semibold">1. 이항정리</span> → 대수적 전개의 계수는 조합론적 의미를 가짐
          </p>
          <p>
            <span className="font-semibold">2. 파스칼의 삼각형</span> → 조합의 시각화, 수많은 수학적 패턴 내포
          </p>
          <p>
            <span className="font-semibold">3. 이항분포</span> → 확률 실험의 반복, 파스칼 삼각형과 직접 연결
          </p>
          <p>
            <span className="font-semibold">4. 정규분포</span> → n→∞일 때 이항분포의 극한, 통계의 기초
          </p>
        </div>
        <p className="mt-4 text-indigo-100 italic">
          이렇게 대수, 조합, 확률, 통계가 하나의 아름다운 수학적 구조로 연결됩니다.
        </p>
      </div>
    </div>
  );
}