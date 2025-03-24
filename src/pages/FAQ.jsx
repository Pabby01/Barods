/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import './FAQPage.css';

const FAQPage = () => {
  // State to track which FAQ items are open
  const [openItems, setOpenItems] = useState({});

  // Toggle FAQ item open/closed
  const toggleItem = (id) => {
    setOpenItems(prevState => ({
      ...prevState,
      [id]: !prevState[id]
    }));
  };

  // FAQ data structure
  const faqItems = [
    {
      id: 1,
      question: "What services does your company offer?",
      answer: (
        <>
          <p>At [Company Name], we specialize in providing reliable, accessible and affordable real estate solutions:</p>
          <ul>
            <li>Property Sales: We help you sell your property efficiently by conducting thorough market analysis to determine the right price, developing effective marketing strategies, and managing viewership.</li>
            <li>Property Acquisition: If you're looking to purchase property, our team will help you find properties matching your requirements and budget.</li>
            <li>Property Management: For property owners who need assistance with tenants, leasing, and property maintenance.</li>
            <li>Advisory Services: We provide expert consultations on property investment, property valuation, mortgage guidance, and more to help you make informed decisions.</li>
            <li>Development Planning: Assistance in planning and developing properties to maximize value.</li>
          </ul>
        </>
      )
    },
    {
      id: 2,
      question: "Why should I choose your company in Danpexloco?",
      answer: (
        <>
          <p>Choosing [Company Name] means selecting a partner dedicated to your success:</p>
          <ul>
            <li>Our deep knowledge of the Danpexloco real estate market gives us valuable insights.</li>
            <li>We have established strong connections with buyers, sellers, and other key stakeholders in the community.</li>
            <li>Our comprehensive approach covers all aspects of property buying, selling, and management.</li>
            <li>We maintain transparent communication throughout the process to ensure you remain informed.</li>
            <li>We prioritize your satisfaction and work diligently to exceed your expectations every step of the way.</li>
          </ul>
        </>
      )
    },
    {
      id: 3,
      question: "How do I get started on shopping through your company?",
      answer: (
        <>
          <p>Getting started with us is simple and straightforward:</p>
          <ol>
            <li>Contact us through our website contact form, email, or phone.</li>
            <li>Schedule an initial consultation to discuss your needs and goals.</li>
            <li>We'll work with you to develop a personalized plan.</li>
            <li>View our extensive property listings or showcase your property with us.</li>
            <li>Our team will guide you through each subsequent step, ensuring the process runs as smoothly as possible.</li>
          </ol>
        </>
      )
    },
    {
      id: 4,
      question: "Do you offer flexible payment options?",
      answer: (
        <p>We understand that financial flexibility is important. That's why we offer various payment methods including installment options, deferred payment plans (for certain services), and multiple payment methods (bank transfers, credit/debit cards, mobile payments) to accommodate your preferences and circumstances.</p>
      )
    },
    {
      id: 5,
      question: "What is the process for beginning to list a property or land or property?",
      answer: (
        <>
          <p>Listing your property with us involves these steps:</p>
          <ol>
            <li>Contact us to schedule a property evaluation.</li>
            <li>We'll visit the property to assess its features, condition, and market value.</li>
            <li>Our team will guide you through required documentation and legal considerations.</li>
            <li>We'll create a compelling listing with professional photography and detailed descriptions.</li>
            <li>Your property will then be marketed through our extensive network and multiple channels.</li>
          </ol>
        </>
      )
    },
    {
      id: 6,
      question: "How your properties listed?",
      answer: (
        <p>Our properties are listed with comprehensive details including high-quality images, floor plans, property specifications, location information, amenities, pricing, and neighborhood insights. We distribute these listings across multiple platforms including our website, social media, real estate portals, direct marketing to our client database, and various offline channels.</p>
      )
    },
    {
      id: 7,
      question: "What types of properties do you offer?",
      answer: (
        <>
          <p>We offer a diverse range of properties to meet various needs:</p>
          <ul>
            <li>Residential properties: Houses, apartments, condos, townhouses</li>
            <li>Commercial properties: Office spaces, retail locations, warehouses</li>
            <li>Land: Vacant lots, development parcels, agricultural land</li>
            <li>Investment properties: Rental units, multi-family buildings</li>
          </ul>
        </>
      )
    },
    {
      id: 8,
      question: "Can I buy and sell at the same time?",
      answer: (
        <p>Yes, we specialize in coordinating simultaneous buying and selling transactions. Our team will help you time these processes effectively, manage contingencies, and provide strategies to ensure a smooth transition between your current and new property.</p>
      )
    },
    {
      id: 9,
      question: "Do you handle international transactions?",
      answer: (
        <p>Yes, we facilitate international real estate transactions. Our team is experienced in managing the unique requirements for international buyers and sellers, including currency considerations, legal compliance across jurisdictions, and remote transaction management. We provide comprehensive support throughout the entire process.</p>
      )
    },
    {
      id: 10,
      question: "How are houses listed? Do you do online marketing?",
      answer: (
        <p>Our comprehensive marketing approach includes professional photography, virtual tours, detailed property descriptions, targeted online advertising, social media promotion, email marketing to our buyer database, and listing on major real estate portals. We also employ traditional marketing methods when appropriate, ensuring maximum exposure for your property.</p>
      )
    },
    {
      id: 11,
      question: "What is the advantage of listing on all your portals?",
      answer: (
        <p>Listing on all our portals provides maximum visibility to diverse audience segments. Each platform reaches different buyer demographics, increasing your property's exposure exponentially. Our integrated approach ensures consistent, high-quality presentation across all channels, while our analytics allow us to track performance and adjust strategies accordingly for optimal results.</p>
      )
    },
    {
      id: 12,
      question: "What makes your company different from others?",
      answer: (
        <>
          <p>What sets us apart:</p>
          <ul>
            <li>Personalized service tailored to your specific needs and goals</li>
            <li>Deep local market knowledge combined with innovative marketing strategies</li>
            <li>Transparent communication throughout the entire process</li>
            <li>Our extensive network of industry connections and potential buyers/sellers</li>
            <li>Continuous support beyond the transaction closing</li>
          </ul>
        </>
      )
    },
    {
      id: 13,
      question: "Do you offer property inspections?",
      answer: (
        <p>Yes, we coordinate professional property inspections to ensure you're fully informed about the condition of a property. Our network of certified inspectors can identify potential issues and provide detailed reports that help with negotiation and decision-making. We can arrange various specialized inspections based on your specific requirements.</p>
      )
    },
    {
      id: 14,
      question: "Can I view the property in ERA format through your company?",
      answer: (
        <p>Yes, we offer ERA (Extended Reality Applications) property viewing options including virtual tours, 3D walkthroughs, and augmented reality features. These technologies allow you to explore properties remotely in detail, saving time and making the initial selection process more efficient. Just let us know your preferences, and we'll arrange the appropriate viewing format.</p>
      )
    }
  ];

  return (
    <div className="faq-page">
      {/* Hero Section */}
      <div className="faq-hero-section">
        <div className="faq-hero-background">
          <div className="faq-hero-container">
            <h1 className="faq-hero-title">FAQ</h1>
          </div>
        </div>
      </div>
      
      <div className="faq-container">
        <div className="faq-content">
          {faqItems.map((item) => (
            <div className="faq-item" key={item.id}>
              <div 
                className={`faq-question ${openItems[item.id] ? 'active' : ''}`}
                onClick={() => toggleItem(item.id)}
              >
                <h3>{item.question}</h3>
                <div className="faq-toggle-icon">
                  {openItems[item.id] ? '−' : '+'}
                </div>
              </div>
              <div className={`faq-answer ${openItems[item.id] ? 'open' : ''}`}>
                {item.answer}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQPage;