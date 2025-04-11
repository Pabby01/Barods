/* eslint-disable no-unused-vars */
import React from "react";
import "./Agents.css";

const agents = [
  {
    id: 1,
    image: "/images/CTO.jpg",
    name: "Babatunde Denton",
    company: "Barods Global Limited",
    email: "Mail: tunde@barodsglobal.com"
  },
  {
    id: 2,
    image: "/images/ajibola2.jpg",
    name: "ESV Ajibola Akinwande ANIVS, RSV",
    company: "Barods Global Limited",
    email: "Mail: ajibola@barodsglobal.com"
  },
  {
    id: 3,
    image: "/images/law.jpg",
    name: "Lawrita C. Agbor",
    company: "Barods Global Limited",
    email: "Mail: lawrita@barodsglobal.com"
  },
  {
    id: 4,
    image: "/images/solo.jpg",
    name: "ESV Solomon Olayimika Emmanuel ANIVS, RSV",
    company: "Barods Global Limited",
    email: "Mail: olayinka@barodsglobal.com"
  },
  {
    id: 5,
    image: "/images/ken.jpg",
    name: "Kehinde Oregbesan",
    company: "Barods Global Limited",
    email: "Mail: kehinde@barodsglobal.com"
  },
  {
    id: 6,
    image: "/images/lola.jpg",
    name: "Lolade Ogundimu",
    company: "Barods Global Limited",
    email: "Mail: lolade@barodsglobal.com"
  },
  {
    id: 7,
    image: "/images/toyo.jpg",
    name: "Toyosi Akinbobola",
    company: "Barods Global Limited",
    email: "Mail: toyosi@barodsglobal.com"
  },
  {
    id: 8,
    image: "/images/team-1.png",
    name: "Name Surname",
    company: "Barush Global Limited",
    email: "Mail: ababahe@mail.com"
  }
];

const Agents = () => {
  return (
    <div className="agents-container5">
      <h2 className="agents-title5">Meet Our Agents</h2>
      
      <div className="agents-grid5">
        {agents.map((agent) => (
          <div key={agent.id} className="agent-card5">
            <div className="agent-image-container5">
              <img src={agent.image} alt={agent.name} className="agent-image5" />
            </div>
            <div className="agent-info5">
              <h3 className="agent-name5">{agent.name}</h3>
              <p className="agent-company5">{agent.company}</p>
              <p className="agent-email5">{agent.email}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Agents;