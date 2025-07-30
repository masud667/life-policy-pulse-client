
import React from 'react';

const TestimonialSection = ({ testimonials }) => {
  if (testimonials.length === 0) return null;
  
  return (
    <div className="bg-gray-50 rounded-2xl p-8 mb-16">
      <div className="text-center mb-10">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">Customer Testimonials</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Read what our customers have to say about their experience with our insurance policies.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {testimonials.map(testimonial => (
          <div 
            key={testimonial._id} 
            className="bg-white p-6 rounded-xl shadow-sm border border-gray-100"
          >
            <div className="flex items-center mb-4">
              <div className="mr-4 w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                <span className="text-blue-800 font-bold">{testimonial.author.charAt(0)}</span>
              </div>
              <div>
                <h4 className="font-semibold text-gray-800">{testimonial.author}</h4>
                <p className="text-sm text-gray-500">{testimonial.date}</p>
              </div>
            </div>
            
            <div className="flex mb-3">
              {[...Array(5)].map((_, i) => (
                <span 
                  key={i} 
                  className={`text-xl ${i < testimonial.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                >
                  ★
                </span>
              ))}
            </div>
            
            <h5 className="font-medium text-gray-800 mb-2">{testimonial.policyName}</h5>
            <p className="text-gray-600 italic">"{testimonial.review}"</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TestimonialSection;