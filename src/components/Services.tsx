import React from 'react';
import { Building2, GraduationCap, FileText, Users, ArrowRight } from 'lucide-react';

const services = [
  {
    icon: Building2,
    title: 'Government Grants & RFPs',
    description: 'Expert navigation of federal, state, and local government funding opportunities.',
    features: ['Proposal Development', 'RFP/RFQ Responses', 'Compliance Review'],
  },
  {
    icon: GraduationCap,
    title: 'Educational Funding',
    description: 'Specialized grant writing for educational institutions and programs.',
    features: ['Research Grants', 'Program Development', 'Equipment Funding'],
  },
  {
    icon: FileText,
    title: 'Corporate Grants',
    description: 'Strategic approach to securing corporate funding and partnerships.',
    features: ['CSR Programs', 'Innovation Grants', 'Partnership Proposals'],
  },
  {
    icon: Users,
    title: 'Nonprofit Funding',
    description: 'Comprehensive support for nonprofit organizations seeking grants.',
    features: ['Foundation Grants', 'Program Funding', 'Capacity Building'],
  },
];

export default function Services() {
  return (
    <section id="services" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Specialized Services</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Comprehensive grant writing solutions tailored to your specific needs and goals
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div
                key={index}
                className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow"
              >
                <Icon className="h-12 w-12 text-blue-600 mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{service.title}</h3>
                <p className="text-gray-600 mb-4">{service.description}</p>
                <ul className="space-y-2">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-gray-700">
                      <ArrowRight className="h-4 w-4 text-blue-600 mr-2" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}