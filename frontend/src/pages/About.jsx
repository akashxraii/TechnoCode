import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function About() {
  const location = useLocation();

  useEffect(() => {
    // Smooth scroll effect based on URL path
    if (location.pathname.includes('/about/team')) {
      setTimeout(() => {
        const teamSection = document.getElementById('team-section');
        if (teamSection) {
          teamSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    } else if (location.pathname.includes('/about/mission')) {
      setTimeout(() => {
        const missionSection = document.getElementById('mission-section');
        if (missionSection) {
          missionSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    }
  }, [location.pathname]);
  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f9f9f9', padding: '40px 20px' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <h1 style={{ fontSize: '48px', fontWeight: 'bold', marginBottom: '20px', color: '#000' }}>
            About Us
          </h1>
          <p style={{ fontSize: '18px', color: '#666', lineHeight: '1.6' }}>
            Learn about our mission and the team behind TechnoCode
          </p>
        </div>

        {/* Mission Section */}
        <div 
          id="mission-section"
          style={{
          backgroundColor: 'white',
          padding: '40px',
          borderRadius: '10px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          marginBottom: '40px',
          scrollMarginTop: '20px'
        }}>
          <h2 style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '20px', color: '#000' }}>
            What gives TechnoCode its meaning?
          </h2>
          <p style={{ fontSize: '16px', lineHeight: '1.8', color: '#333', marginBottom: '20px' }}>
            We are five CS students who got tired of coding platforms locking good content behind paywalls.
            So we built our own.
            TechnoCode is free. Every problem, every language, every submission — no credit card, no premium tier, no catch. We built it for the student who just wants to get better at coding without worrying about money.
            Every problem on TechnoCode is handpicked. We don't believe in dumping 3000 random questions on you. We believe in giving you the right problem, explained clearly, tested properly.
            You write code. You get a verdict. That's it.
            No ads. No distractions. No nonsense.
            Built by students, for students — because we at TECHNOCODE have been exactly where you are.
          </p>
        </div>

        {/* Team Section */}
        <div 
          id="team-section"
          style={{
          backgroundColor: 'white',
          padding: '40px',
          borderRadius: '10px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          marginBottom: '40px',
          scrollMarginTop: '20px'
        }}>
          <h2 style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '30px', color: '#000' }}>
            Meet Our Team
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '30px' }}>
            {[
              { name: 'Akash Rai', role: 'Founder & CEO', bio: 'Full-stack developer with 10+ years of experience' },
              { name: 'Vishakha Binani', role: 'Head of Content', bio: 'Former Google engineer focused on education' },
              { name: 'Anmol Kumar Singh', role: 'Lead Backend Developer', bio: 'Cloud infrastructure specialist' },
              { name: 'Abdullah Akhter', role: 'UI/UX Designer', bio: 'Award-winning design leader' },
              { name: 'Ashutosh Kumar', role: 'Frontend Developer', bio: 'Award-winning design leader' }
            ].map((member, index) => (
              <div
                key={index}
                style={{
                  padding: '20px',
                  border: '1px solid #e0e0e0',
                  borderRadius: '8px',
                  textAlign: 'center',
                  transition: 'transform 0.3s ease'
                }}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
              >
                <div style={{
                  width: '80px',
                  height: '80px',
                  borderRadius: '50%',
                  backgroundColor: '#aa3bff',
                  margin: '0 auto 15px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontSize: '32px',
                  fontWeight: 'bold'
                }}>
                  {member.name.charAt(0)}
                </div>
                <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '5px', color: '#000' }}>
                  {member.name}
                </h3>
                <p style={{ fontSize: '14px', fontWeight: '600', color: '#aa3bff', marginBottom: '10px' }}>
                  {member.role}
                </p>
                <p style={{ fontSize: '14px', color: '#666', lineHeight: '1.5' }}>
                  {member.bio}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
