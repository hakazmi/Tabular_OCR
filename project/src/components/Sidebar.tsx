import { Upload, FileSpreadsheet, History, Settings, HelpCircle } from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function Sidebar({ activeTab, setActiveTab }: SidebarProps) {
  const menuItems = [
    { id: 'upload', icon: Upload, label: 'Upload & Process', color: 'blue' },
    { id: 'history', icon: History, label: 'History', color: 'purple' },
    { id: 'help', icon: HelpCircle, label: 'Help', color: 'green' },
    { id: 'settings', icon: Settings, label: 'Settings', color: 'gray' },
  ];

  return (
    <aside className="fixed left-0 top-16 h-[calc(100vh-4rem)] w-64 bg-white border-r border-gray-200 overflow-y-auto">
      <div className="p-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                isActive
                  ? 'bg-blue-50 text-blue-700 shadow-sm'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? 'text-blue-600' : 'text-gray-400'}`} />
              <span className={`font-medium ${isActive ? 'text-blue-700' : ''}`}>
                {item.label}
              </span>
            </button>
          );
        })}
      </div>

      <div className="p-4 mt-8">
        <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg p-4 border border-blue-100">
          <FileSpreadsheet className="w-8 h-8 text-blue-600 mb-2" />
          <h3 className="font-semibold text-gray-900 mb-1">Quick Tip</h3>
          <p className="text-sm text-gray-600">
            Supports PNG, JPG, PDF, BMP, and TIFF formats
          </p>
        </div>
      </div>
    </aside>
  );
}
