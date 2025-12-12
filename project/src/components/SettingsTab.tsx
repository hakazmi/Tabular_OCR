import { Settings, Globe, Bell, Shield } from 'lucide-react';

export default function SettingsTab() {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Settings</h2>
          <p className="text-gray-600">Manage your preferences and configurations</p>
        </div>

        <div className="space-y-6">
          <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
            <Globe className="w-6 h-6 text-gray-600 flex-shrink-0 mt-1" />
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900 mb-1">API Endpoint</h3>
              <p className="text-sm text-gray-600 mb-2">
                Current endpoint: https://330482c710eb.ngrok-free.app
              </p>
              <span className="inline-flex items-center px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                Connected
              </span>
            </div>
          </div>

          <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
            <Bell className="w-6 h-6 text-gray-600 flex-shrink-0 mt-1" />
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900 mb-1">Notifications</h3>
              <p className="text-sm text-gray-600">
                Get notified when your document processing is complete
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
            <Shield className="w-6 h-6 text-gray-600 flex-shrink-0 mt-1" />
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900 mb-1">Privacy & Security</h3>
              <p className="text-sm text-gray-600">
                Your files are processed securely and not stored on our servers
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
