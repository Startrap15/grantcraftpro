import React from 'react';
import { CheckCircle, XCircle } from 'lucide-react';

interface PaymentStatusProps {
  success: boolean;
  message: string;
  onClose: () => void;
}

export default function PaymentStatus({ success, message, onClose }: PaymentStatusProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4">
        <div className="text-center">
          {success ? (
            <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
          ) : (
            <XCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          )}
          <h3 className={`text-lg font-semibold mb-2 ${success ? 'text-green-700' : 'text-red-700'}`}>
            {success ? 'Payment Successful' : 'Payment Failed'}
          </h3>
          <p className="text-gray-600 mb-6">{message}</p>
          <button
            onClick={onClose}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}