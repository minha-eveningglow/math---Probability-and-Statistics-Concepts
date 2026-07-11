import { useState, useEffect } from 'react';
import { Outlet, Link, useLocation } from 'react-router';
import {
  BookOpen, Shuffle, Grid3x3, Triangle, Sigma, Percent,
  Filter, Repeat, TrendingUp, BarChart2, Activity, Bell, GitMerge, Menu, X, Target,
} from 'lucide-react';

const groups = [
  {
    label: '경우의 수',
    items: [
      { path: '/permutation', label: '순열', icon: Shuffle },
      { path: '/combination', label: '조합', icon: Grid3x3 },
      { path: '/binomial', label: '이항정리', icon: Sigma },
      { path: '/pascal', label: '파스칼의 삼각형', icon: Triangle },
    ],
  },
  {
    label: '확률',
    items: [
      { path: '/probability', label: '확률 기초', icon: Percent },
      { path: '/conditional', label: '조건부확률', icon: Filter },
      { path: '/independence', label: '독립과 독립시행', icon: Repeat },
    ],
  },
  {
    label: '확률변수',
    items: [
      { path: '/discrete-rv', label: '이산확률변수', icon: BarChart2 },
      { path: '/continuous-rv', label: '연속확률변수 · PDF', icon: Activity },
      { path: '/normal-distribution', label: '정규분포', icon: Bell },
      { path: '/binomial-normal', label: '이항분포의 정규근사', icon: GitMerge },
    ],
  },
  {
    label: '통계적 추정',
    items: [
      { path: '/sample-mean', label: '모평균과 표본평균, 모평균의 추정', icon: Target },
    ],
  },
  {
    label: '기타',
    items: [
      { path: '/flow', label: '개념의 흐름', icon: TrendingUp },
    ],
  },
];

function SidebarContent({ onClose }: { onClose?: () => void }) {
  const location = useLocation();

  return (
    <div className="flex flex-col h-full bg-white">
      {/* 로고 */}
      <div className="flex items-center justify-between px-5 py-5 border-b border-gray-100">
        <Link to="/" className="flex items-center gap-2" onClick={onClose}>
          <BookOpen className="w-7 h-7 text-indigo-600" />
          <span className="font-bold text-lg text-gray-900">확률과 통계</span>
        </Link>
        {onClose && (
          <button onClick={onClose} className="p-1 rounded-lg hover:bg-gray-100 transition-colors">
            <X className="w-5 h-5 text-gray-500" />
          </button>
        )}
      </div>

      {/* 홈 링크 */}
      <div className="px-3 pt-4">
        <Link
          to="/"
          onClick={onClose}
          className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
            location.pathname === '/'
              ? 'bg-indigo-600 text-white'
              : 'text-gray-700 hover:bg-indigo-50'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          홈
        </Link>
      </div>

      {/* 그룹 메뉴 */}
      <nav className="flex-1 overflow-y-auto px-3 py-3 space-y-5">
        {groups.map((group) => (
          <div key={group.label}>
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-3 mb-1">
              {group.label}
            </p>
            <div className="space-y-0.5">
              {group.items.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={onClose}
                    className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-indigo-600 text-white'
                        : 'text-gray-700 hover:bg-indigo-50'
                    }`}
                  >
                    <Icon className="w-4 h-4 flex-shrink-0" />
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>
    </div>
  );
}

export function Root() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  // 페이지 이동 시 모바일 메뉴 닫기
  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">

      {/* 데스크탑 사이드바 (lg 이상 고정) */}
      <aside className="hidden lg:flex lg:flex-col lg:fixed lg:inset-y-0 lg:left-0 lg:w-64 lg:shadow-lg lg:z-30">
        <SidebarContent />
      </aside>

      {/* 모바일 오버레이 */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* 모바일 사이드바 패널 */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 shadow-xl transition-transform duration-300 lg:hidden ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <SidebarContent onClose={() => setMobileOpen(false)} />
      </aside>

      {/* 모바일 상단 헤더 */}
      <header className="lg:hidden fixed top-0 left-0 right-0 z-30 bg-white shadow-sm flex items-center justify-between px-4 h-14">
        <button
          onClick={() => setMobileOpen(true)}
          className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
        >
          <Menu className="w-5 h-5 text-gray-700" />
        </button>
        <Link to="/" className="flex items-center gap-2">
          <BookOpen className="w-6 h-6 text-indigo-600" />
          <span className="font-bold text-gray-900">확률과 통계</span>
        </Link>
        <div className="w-9" /> {/* 균형 spacer */}
      </header>

      {/* 메인 콘텐츠 */}
      <main className="lg:ml-64 pt-14 lg:pt-0 min-h-screen">
        <Outlet />
      </main>
    </div>
  );
}
