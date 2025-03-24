/* eslint-disable no-unused-vars */
import React from "react";
import "./Agents.css";

const agents = [
  {
    id: 1,
    image: "/images/team-1.png",
    name: "Name Surname",
    company: "Barush Global Limited",
    email: "Mail: ababahe@mail.com"
  },
  {
    id: 2,
    image: "/images/team-1.png",
    name: "Name Surname",
    company: "Barush Global Limited",
    email: "Mail: ababahe@mail.com"
  },
  {
    id: 3,
    image: "/images/team-1.png",
    name: "Name Surname",
    company: "Barush Global Limited",
    email: "Mail: ababahe@mail.com"
  },
  {
    id: 4,
    image: "/images/team-1.png",
    name: "Name Surname",
    company: "Barush Global Limited",
    email: "Mail: ababahe@mail.com"
  },
  {
    id: 5,
    image: "/images/team-1.png",
    name: "Name Surname",
    company: "Barush Global Limited",
    email: "Mail: ababahe@mail.com"
  },
  {
    id: 6,
    image: "/images/team-1.png",
    name: "Name Surname",
    company: "Barush Global Limited",
    email: "Mail: ababahe@mail.com"
  },
  {
    id: 7,
    image: "/images/team-1.png",
    name: "Name Surname",
    company: "Barush Global Limited",
    email: "Mail: ababahe@mail.com"
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
            <a href={`/agent/${agent.id}`} className="agent-link5" aria-label={`View profile of ${agent.name}`}></a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Agents;