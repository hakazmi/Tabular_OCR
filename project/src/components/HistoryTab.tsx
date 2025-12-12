import { Clock, FileText } from 'lucide-react';

export default function HistoryTab() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Processing History</h2>
          <p className="text-gray-600">View your recent document processing activities</p>
        </div>

        <div className="flex flex-col items-center justify-center py-16">
          <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4">
            <Clock className="w-10 h-10 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No History Yet</h3>
          <p className="text-gray-600 text-center max-w-sm">
            Your processed documents will appear here. Start by uploading a file to process.
          </p>
        </div>
      </div>
    </div>
  );
}
