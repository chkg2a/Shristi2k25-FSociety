import React from 'react';

const TestimonialsSection = () => {
  const testimonials = [
    {
      id: 1,
      name: 'John Smith',
      title: 'CEO, TechCorp',
      image: '/images/johndoe.png',
      quote: '"DocScan has streamlined our document processing workflow. The AI matching feature is incredibly accurate."'
    },
    {
      id: 2,
      name: 'Sarah Johnson',
      title: 'Operations Manager',
      image: '/images/sarahjohnson.png',
      quote: '"The cloud storage integration makes it easy to access our documents from anywhere. Great solution!"'
    },
    {
      id: 3,
      name: 'Michael Chen',
      title: 'IT Director',
      image: '/images/michaelchen.png',
      quote: '"The security features are robust and the API integration was seamless. Highly recommended!"'
    }
  ];

  return (
    <section id="testimonials" className="py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-semibold text-center mb-12">What Our Customers Say</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial) => (
            <div 
              key={testimonial.id} 
              className="bg-gray-50 rounded-lg p-6"
            >
              <div className="flex items-center mb-4">
                <img 
                  src={testimonial.image} 
                  alt={testimonial.name} 
                  className="w-12 h-12 rounded-full mr-3 object-cover"
                />
                <div>
                  <h3 className="font-medium text-gray-900">{testimonial.name}</h3>
                  <p className="text-sm text-gray-600">{testimonial.title}</p>
                </div>
              </div>
              <p className="text-gray-700">{testimonial.quote}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
