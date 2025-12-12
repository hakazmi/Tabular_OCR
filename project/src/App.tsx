import { useState } from 'react';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import FileUpload from './components/FileUpload';
import HistoryTab from './components/HistoryTab';
import HelpTab from './components/HelpTab';
import SettingsTab from './components/SettingsTab';

function App() {
  const [activeTab, setActiveTab] = useState('upload');

  const renderContent = () => {
    switch (activeTab) {
      case 'upload':
        return <FileUpload />;
      case 'history':
        return <HistoryTab />;
      case 'help':
        return <HelpTab />;
      case 'settings':
        return <SettingsTab />;
      default:
        return <FileUpload />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Navbar />
      <div className="flex">
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        <main className="flex-1 ml-64 mt-16 p-8">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}

export default App;
