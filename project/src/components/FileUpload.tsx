import { useCallback, useState } from 'react';
import { Upload, FileText, AlertCircle, CheckCircle2, Loader2, Download } from 'lucide-react';

const API_URL = 'https://8581a2fb9278.ngrok-free.app';

export default function FileUpload() {
  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState<'idle' | 'uploading' | 'processing' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setIsDragging(true);
    } else if (e.type === 'dragleave') {
      setIsDragging(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      validateAndSetFile(droppedFile);
    }
  }, []);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      validateAndSetFile(selectedFile);
    }
  };

  const validateAndSetFile = (file: File) => {
    const validTypes = ['.png', '.jpg', '.jpeg', '.pdf', '.bmp', '.tiff', '.tif'];
    const fileExt = '.' + file.name.split('.').pop()?.toLowerCase();

    if (!validTypes.includes(fileExt)) {
      setErrorMessage('Invalid file type. Please upload PNG, JPG, PDF, BMP, or TIFF files.');
      setStatus('error');
      return;
    }

    setFile(file);
    setStatus('idle');
    setErrorMessage('');
    setDownloadUrl(null);
  };

  const handleUpload = async () => {
    if (!file) return;

    setStatus('uploading');
    setErrorMessage('');

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch(`${API_URL}/upload-and-process`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Upload failed: ${response.statusText}`);
      }

      setStatus('processing');

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      setDownloadUrl(url);
      setStatus('success');
    } catch (error) {
      setStatus('error');
      setErrorMessage(error instanceof Error ? error.message : 'An error occurred during processing');
    }
  };

  const handleDownload = () => {
    if (downloadUrl && file) {
      const a = document.createElement('a');
      a.href = downloadUrl;
      a.download = `${file.name.split('.')[0]}_ocr_result.xlsx`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
  };

  const handleReset = () => {
    setFile(null);
    setStatus('idle');
    setErrorMessage('');
    setDownloadUrl(null);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Upload Document</h2>
          <p className="text-gray-600">
            Upload your images or PDF files to extract text and convert to Excel
          </p>
        </div>

        <div
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          className={`relative border-2 border-dashed rounded-xl p-12 transition-all ${
            isDragging
              ? 'border-blue-500 bg-blue-50'
              : 'border-gray-300 hover:border-gray-400'
          }`}
        >
          <input
            type="file"
            id="file-input"
            className="hidden"
            accept=".png,.jpg,.jpeg,.pdf,.bmp,.tiff,.tif"
            onChange={handleFileInput}
            disabled={status === 'uploading' || status === 'processing'}
          />

          <div className="text-center">
            {!file ? (
              <>
                <div className="mx-auto w-16 h-16 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-full flex items-center justify-center mb-4">
                  <Upload className="w-8 h-8 text-blue-600" />
                </div>
                <p className="text-lg font-semibold text-gray-900 mb-2">
                  Drop your file here, or browse
                </p>
                <p className="text-sm text-gray-500 mb-6">
                  Supports: PNG, JPG, PDF, BMP, TIFF (Max 50MB)
                </p>
                <label
                  htmlFor="file-input"
                  className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors cursor-pointer font-medium"
                >
                  Select File
                </label>
              </>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center justify-center gap-3 p-4 bg-gray-50 rounded-lg">
                  <FileText className="w-6 h-6 text-gray-600" />
                  <span className="font-medium text-gray-900">{file.name}</span>
                  <span className="text-sm text-gray-500">
                    ({(file.size / 1024 / 1024).toFixed(2)} MB)
                  </span>
                </div>

                {status === 'idle' && (
                  <div className="flex gap-3 justify-center">
                    <button
                      onClick={handleUpload}
                      className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                    >
                      Process Document
                    </button>
                    <button
                      onClick={handleReset}
                      className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium"
                    >
                      Cancel
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {(status === 'uploading' || status === 'processing') && (
          <div className="mt-6 p-6 bg-blue-50 rounded-lg border border-blue-100">
            <div className="flex items-center gap-4">
              <Loader2 className="w-6 h-6 text-blue-600 animate-spin" />
              <div>
                <p className="font-semibold text-gray-900">
                  {status === 'uploading' ? 'Uploading...' : 'Processing Document...'}
                </p>
                <p className="text-sm text-gray-600">
                  {status === 'uploading'
                    ? 'Uploading your file to the server'
                    : 'Running OCR and converting to Excel format'}
                </p>
              </div>
            </div>
          </div>
        )}

        {status === 'success' && (
          <div className="mt-6 p-6 bg-green-50 rounded-lg border border-green-100">
            <div className="flex items-start gap-4">
              <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="font-semibold text-gray-900 mb-2">Processing Complete!</p>
                <p className="text-sm text-gray-600 mb-4">
                  Your document has been successfully processed and converted to Excel format.
                </p>
                <div className="flex gap-3">
                  <button
                    onClick={handleDownload}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
                  >
                    <Download className="w-5 h-5" />
                    Download Excel
                  </button>
                  <button
                    onClick={handleReset}
                    className="px-6 py-3 bg-white text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium border border-gray-300"
                  >
                    Process Another
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {status === 'error' && (
          <div className="mt-6 p-6 bg-red-50 rounded-lg border border-red-100">
            <div className="flex items-start gap-4">
              <AlertCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="font-semibold text-gray-900 mb-2">Processing Failed</p>
                <p className="text-sm text-gray-600 mb-4">{errorMessage}</p>
                <button
                  onClick={handleReset}
                  className="px-6 py-3 bg-white text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium border border-gray-300"
                >
                  Try Again
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
            <Upload className="w-6 h-6 text-blue-600" />
          </div>
          <h3 className="font-semibold text-gray-900 mb-2">Easy Upload</h3>
          <p className="text-sm text-gray-600">
            Drag and drop or click to upload your documents
          </p>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="w-12 h-12 bg-cyan-100 rounded-lg flex items-center justify-center mb-4">
            <Loader2 className="w-6 h-6 text-cyan-600" />
          </div>
          <h3 className="font-semibold text-gray-900 mb-2">Smart Processing</h3>
          <p className="text-sm text-gray-600">
            Advanced OCR technology extracts text accurately
          </p>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
            <Download className="w-6 h-6 text-green-600" />
          </div>
          <h3 className="font-semibold text-gray-900 mb-2">Quick Download</h3>
          <p className="text-sm text-gray-600">
            Get your Excel file instantly after processing
          </p>
        </div>
      </div>
    </div>
  );
}
