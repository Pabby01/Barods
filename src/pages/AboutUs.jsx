/* eslint-disable no-unused-vars */
import React from "react";
import "../styles/about.css";

const AboutUs = () => {
  return (
    <div className="about-page">
      {/* Hero Section */}
      <div className="hero-section">
        <div className="hero-content">
          <h1>Our Values</h1>
          <p>We are committed to helping individuals and businesses achieve their goals through our comprehensive range of services.</p>
        </div>
      </div>

      {/* Our Story Section */}
      <div className="container">
        <div className="story-section">
          <div className="story-text">
            <h2>Our Story</h2>
            <p>
              BARODS GLOBAL VENTURES LTD was founded with a singular vision to provide expert financial guidance and support to individuals and businesses across Nigeria. Our journey began with a small team of dedicated professionals who shared a passion for excellence in service delivery.
            </p>
            <p>
              Our varied and complementary expertise has enabled us to build a robust platform offering comprehensive solutions tailored to meet the diverse needs of our clients. From personal financial management to corporate advisory services, we&apos;ve continually expanded our offerings to address emerging challenges.
            </p>
            <p>
              The values that guide our business include integrity, professionalism, innovation, and exceptional customer service. We believe in building lasting relationships with our clients based on trust and mutual respect. Our success is measured not just by our financial performance, but by the positive impact we make in the lives of those we serve.
            </p>
            <p>
              Today, we stand as a trusted partner to numerous individuals and organizations, helping them navigate complex financial landscapes and achieve their goals. Our commitment to excellence remains unwavering as we continue to evolve and adapt to the changing needs of our clients.
            </p>
          </div>
          <div className="story-images">
            <div className="main-image">
              <img src="/images/team-lead.png" alt="Company Director" />
            </div>
            <div className="small-images">
              <img src="/images/team-1.png" alt="Team Members" />
              <img src="/images/team-ladies.png" alt="Office Space" />
            </div>
          </div>
        </div>

        {/* Our Values Section */}
        <div className="values-section">
          <div className="values-images">
            <img src="/images/team-male.png" alt="Team Meeting" />
          </div>
          <div className="values-text">
            <h2>Our Values</h2>
            <p>
              At BARODS GLOBAL VENTURES, our foundation is built upon strong core values that guide every aspect of our business. We are committed to integrity in all our dealings, ensuring transparency and honesty in every interaction with our clients and partners.
            </p>
            <p>
              Excellence is not just a goal but a standard we uphold in all our services. We consistently strive to exceed expectations and deliver superior results that make a meaningful difference in our clients&apos; lives and businesses.
            </p>
            <p>
              Innovation drives our approach to problem-solving. We embrace creative thinking and leverage cutting-edge technologies to develop solutions that address complex challenges effectively and efficiently.
            </p>
            <p>
              Our client-centric focus ensures that we prioritize understanding and meeting the unique needs of each individual and organization we serve. We believe in building lasting relationships based on trust, respect, and mutual success.
            </p>
          </div>
        </div>

        {/* Meet Our Team Section */}
        <div className="team-section">
          <h2>Meet Our Team</h2>
          <p className="team-intro">
            Our company boasts a remarkable team of professionals with diverse skills and a shared vision. From financial experts to customer service specialists, each member brings unique talents that contribute to our success and your positive experience.
          </p>
          
          <div className="team-grid">
            <div className="team-member">
              <img src="/images/CEO.jpg" alt="Team Member" />
              <h3>Babatunde Denton</h3>
              <p>CEO & Founder</p>
              <p><a className="update" href="mailto:tunde@barodsglobal.com">tunde@barodsglobal.com</a></p>
            </div>
            <div className="team-member">
              <img src="/images/ajibola.jpg" alt="Team Member" />
              <h3>ESV Ajibola Akinwande ANIVS, RSV</h3>
              <p>General Manager</p>
              <p><a className="update" href="mailto:ajibola@barodsglobal.com">ajibola@barodsglobal.com</a></p>
            </div>
            <div className="team-member">
              <img src="/images/lawrita.jpg" alt="Team Member" />
              <h3>Lawrita C. Agbor</h3>
              <p>HR/Senior Property Consultant</p>
              <p><a className="update" href="mailto:lawrita@barodsglobal.com">lawrita@barodsglobal.com</a></p>
            </div>
            <div className="team-member">
              <img src="/images/solomon.jpg" alt="Team Member" />
              <h3> ESV Solomon Olayimika Emmanuel ANIVS, RSV</h3>
              <p>Media Lead/Property Consultant</p>
              <p><a className="update" href="mailto: olayinka@barodsglobal.com">olayinka@barodsglobal.com</a></p>
            </div>
            
            <div className="team-member">
              <img src="/images/lolade.jpg" alt="Team Member" />
              <h3>Lolade Ogundimu</h3>
              <p> Executive Secretary</p>
              <p><a className="update" href="mailto: lolade@barodsglobal.com">lolade@barodsglobal.com</a></p>
            </div>
            <div className="team-member">
              <img src="/images/kehinde.jpg" alt="Team Member" />
              <h3>Kehinde Oregbesan</h3>
              <p>Lead Architect</p>
              <p><a className="update" href="mailto:kehinde@barodsglobal.com">kehinde@barodsglobal.com</a></p>
            </div>
            <div className="team-member">
              <img src="/images/toyosi.jpg" alt="Team Member" />
              <h3>Toyosi Akinbobola</h3>
              <p>Property Consultant</p>
              <p><a className="update" href="mailto:toyosi@barodsglobal.com">toyosi@barodsglobal.com</a></p>
            </div>
            
          </div>
        </div>
      </div>

      
    </div>
  );
};

export default AboutUs;