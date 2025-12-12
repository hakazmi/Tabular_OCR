import { HelpCircle, FileText, CheckCircle } from 'lucide-react';

export default function HelpTab() {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">How It Works</h2>
          <p className="text-gray-600">Learn how to use OCR Studio effectively</p>
        </div>

        <div className="space-y-6">
          <div className="flex gap-4">
            <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
              <span className="text-blue-600 font-bold">1</span>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Upload Your Document</h3>
              <p className="text-gray-600">
                Click the upload area or drag and drop your image or PDF file. We support PNG, JPG,
                PDF, BMP, and TIFF formats.
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex-shrink-0 w-10 h-10 bg-cyan-100 rounded-full flex items-center justify-center">
              <span className="text-cyan-600 font-bold">2</span>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Processing</h3>
              <p className="text-gray-600">
                Our advanced OCR technology will extract text from your document. For PDFs, each page
                is processed separately to ensure accuracy.
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex-shrink-0 w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
              <span className="text-green-600 font-bold">3</span>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Download Excel</h3>
              <p className="text-gray-600">
                Once processing is complete, download your Excel file with all extracted text
                organized and ready to use.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Supported Formats</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {['PNG', 'JPG', 'PDF', 'BMP', 'TIFF', 'JPEG'].map((format) => (
            <div key={format} className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <span className="text-gray-700 font-medium">{format}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl border border-blue-100 p-8">
        <div className="flex gap-4">
          <HelpCircle className="w-6 h-6 text-blue-600 flex-shrink-0" />
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">Need Help?</h3>
            <p className="text-gray-600">
              If you encounter any issues or have questions about using OCR Studio,
              please check that your file format is supported and the file is not corrupted.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
