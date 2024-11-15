import React, { useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { X, Calendar, Clock } from 'lucide-react';
import { format, addDays, isWeekend } from 'date-fns';
import { sendConsultationEmail } from '../services/email';

interface ConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ConsultationModal({ isOpen, onClose }: ConsultationModalProps) {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    organization: '',
    message: ''
  });

  const availableTimes = [
    '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', 
    '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM'
  ];

  const nextFiveWorkDays = Array.from({ length: 10 }, (_, i) => {
    const date = addDays(new Date(), i);
    return !isWeekend(date) ? date : null;
  }).filter((date): date is Date => date !== null).slice(0, 5);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setError(null);
  };

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      organization: '',
      message: ''
    });
    setSelectedDate(null);
    setSelectedTime('');
    setError(null);
    setShowConfirmation(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      await sendConsultationEmail({
        ...formData,
        date: selectedDate ? format(selectedDate, 'MMMM d, yyyy') : undefined,
        time: selectedTime
      });
      
      setShowConfirmation(true);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to send request');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleConfirmationClose = () => {
    resetForm();
    onClose();
  };

  if (showConfirmation) {
    return (
      <Dialog as="div" className="relative z-50" open={true} onClose={handleConfirmationClose}>
        <div className="fixed inset-0 bg-black/25 backdrop-blur-sm" />
        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-center shadow-xl transition-all">
              <Dialog.Title className="text-lg font-medium leading-6 text-gray-900 mb-4">
                Thank you! Your consultation request has been sent. We will contact you shortly.
              </Dialog.Title>
              <button
                onClick={handleConfirmationClose}
                className="inline-flex justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
              >
                OK
              </button>
            </Dialog.Panel>
          </div>
        </div>
      </Dialog>
    );
  }

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/25 backdrop-blur-sm" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-2xl transform overflow-hidden rounded-2xl bg-white shadow-xl transition-all">
                <div className="flex justify-between items-center p-6 bg-blue-600">
                  <Dialog.Title className="text-xl font-semibold text-white">
                    Schedule Your Free Consultation
                  </Dialog.Title>
                  <button
                    onClick={onClose}
                    className="text-white hover:text-blue-100 transition-colors"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>

                {error && (
                  <div className="p-4 bg-red-50 border-l-4 border-red-500">
                    <p className="text-red-700">{error}</p>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="p-6">
                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-lg font-medium text-gray-900 mb-4">Select a Date & Time (PST)</h3>
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 gap-4">
                          {nextFiveWorkDays.map((date) => (
                            <button
                              type="button"
                              key={date.toISOString()}
                              onClick={() => setSelectedDate(date)}
                              className={`p-4 rounded-lg border-2 text-left hover:border-blue-500 transition-colors ${
                                selectedDate?.toDateString() === date.toDateString()
                                  ? 'border-blue-600 bg-blue-50'
                                  : 'border-gray-200'
                              }`}
                            >
                              <div className="flex items-center">
                                <Calendar className="h-5 w-5 text-blue-600 mr-3" />
                                <span>{format(date, 'EEEE, MMMM d')}</span>
                              </div>
                            </button>
                          ))}
                        </div>

                        {selectedDate && (
                          <div className="mt-6">
                            <h4 className="text-sm font-medium text-gray-700 mb-3">Available Times (PST)</h4>
                            <div className="grid grid-cols-2 gap-2">
                              {availableTimes.map((time) => (
                                <button
                                  type="button"
                                  key={time}
                                  onClick={() => setSelectedTime(time)}
                                  className={`p-2 rounded-lg border text-sm hover:border-blue-500 transition-colors flex items-center justify-center ${
                                    selectedTime === time
                                      ? 'border-blue-600 bg-blue-50 text-blue-600'
                                      : 'border-gray-200'
                                  }`}
                                >
                                  <Clock className="h-4 w-4 mr-2" />
                                  {time}
                                </button>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-medium text-gray-900 mb-4">Your Information</h3>
                      <div className="space-y-4">
                        <div>
                          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                            Full Name *
                          </label>
                          <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            required
                          />
                        </div>

                        <div>
                          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Email *
                          </label>
                          <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            required
                          />
                        </div>

                        <div>
                          <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                            Phone (Optional)
                          </label>
                          <input
                            type="tel"
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                          />
                        </div>

                        <div>
                          <label htmlFor="organization" className="block text-sm font-medium text-gray-700">
                            Organization
                          </label>
                          <input
                            type="text"
                            id="organization"
                            name="organization"
                            value={formData.organization}
                            onChange={handleInputChange}
                            className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                          />
                        </div>

                        <div>
                          <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                            Tell us about your project *
                          </label>
                          <textarea
                            id="message"
                            name="message"
                            rows={4}
                            value={formData.message}
                            onChange={handleInputChange}
                            className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            placeholder="Please describe your funding needs and goals"
                            required
                          ></textarea>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8">
                    <button
                      type="submit"
                      disabled={isSubmitting || !selectedDate || !selectedTime}
                      className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? 'Sending...' : 'Schedule Consultation'}
                    </button>
                  </div>
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}