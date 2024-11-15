import React from 'react';
import { FileText, Download, BookOpen } from 'lucide-react';

export default function Resources() {
  const resources = [
    {
      category: 'Guides & Templates',
      items: [
        { title: 'Grant Writing Best Practices', type: 'PDF Guide' },
        { title: 'Federal Grant Proposal Template', type: 'Template' },
        { title: 'Budget Development Worksheet', type: 'Spreadsheet' },
      ],
    },
    {
      category: 'Educational Content',
      items: [
        { title: 'Understanding Federal Grants', type: 'Article' },
        { title: 'Corporate Grant Writing Tips', type: 'Video' },
        { title: 'Grant Compliance Guide', type: 'PDF Guide' },
      ],
    },
    {
      category: 'Tools & Checklists',
      items: [
        { title: 'Proposal Review Checklist', type: 'Checklist' },
        { title: 'Grant Calendar Template', type: 'Template' },
        { title: 'Budget Calculator', type: 'Tool' },
      ],
    },
  ];

  return (
    <section id="resources" className="pt-24 pb-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Grant Writing Resources</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Access our collection of free resources to help you write better grant proposals and increase your success rate.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {resources.map((section, index) => (
            <div key={index} className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">{section.category}</h3>
              <div className="space-y-4">
                {section.items.map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <div className="flex items-center">
                      <FileText className="h-5 w-5 text-blue-600 mr-3" />
                      <div>
                        <h4 className="text-gray-900 font-medium">{item.title}</h4>
                        <p className="text-sm text-gray-600">{item.type}</p>
                      </div>
                    </div>
                    <button className="text-blue-600 hover:text-blue-700">
                      <Download className="h-5 w-5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}