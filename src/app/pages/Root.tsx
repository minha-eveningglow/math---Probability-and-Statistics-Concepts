import { Outlet, Link, useLocation } from 'react-router';
import { BookOpen, Shuffle, Grid3x3, Triangle, Sigma, Percent, TrendingUp } from 'lucide-react';

export function Root() {
  const location = useLocation();

  const navItems = [
    { path: '/', label: '홈', icon: BookOpen },
    { path: '/permutation', label: '순열', icon: Shuffle },
    { path: '/combination', label: '조합', icon: Grid3x3 },
    { path: '/binomial', label: '이항정리', icon: Sigma },
    { path: '/pascal', label: '파스칼', icon: Triangle },
    { path: '/probability', label: '확률기초', icon: Percent },
    { path: '/flow', label: '개념의흐름', icon: TrendingUp },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <BookOpen className="w-8 h-8 text-indigo-600 mr-2" />
              <span className="font-bold text-xl text-gray-900">확률과 통계</span>
            </div>
            <div className="flex space-x-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
                      isActive
                        ? 'bg-indigo-600 text-white'
                        : 'text-gray-700 hover:bg-indigo-50'
                    }`}
                  >
                    <Icon className="w-5 h-5 mr-2" />
                    <span className="hidden sm:inline">{item.label}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </nav>
      <main>
        <Outlet />
      </main>
    </div>
  );
}