import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';

export default function Homepage() {
  const { auth } = useAuth();

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#f9f9f9' }}>
      {/* Hero Section */}
      <section style={{ 
        padding: '120px 20px 120px 60px', 
        textAlign: 'left',
        background: 'linear-gradient(135deg, #000000 0%, #1a1a1a 100%)',
        color: 'white',
        display: 'flex',
        alignItems: 'center',
        gap: '40px'
      }}>
        <div style={{ flex: 1, maxWidth: '800px' }}>
          <h1 style={{ fontSize: '56px', marginBottom: '30px', fontWeight: 'bold', lineHeight: '1.3' }}>Sharpen your skills, crush real-world problems, and turn practice into power—one challenge at a time.</h1>
          <p style={{ fontSize: '24px', marginBottom: '60px', opacity: 0.9, lineHeight: '1.5' }}>Master coding challenges and improve your skills</p>
        
          {!auth.isAuthenticated ? (
            <div style={{ display: 'flex', gap: '15px', justifyContent: 'flex-start' }}>
              <Link to="/register" style={{ 
                padding: '12px 30px', 
                backgroundColor: 'white', 
                color: '#000', 
                textDecoration: 'none',
                borderRadius: '5px',
                fontSize: '16px',
                fontWeight: '600'
              }}>
                Start Coding
              </Link>
            </div>
          ) : (
            <Link to="/problems" style={{ 
              padding: '12px 30px', 
              backgroundColor: '#aa3bff', 
              color: 'white', 
              textDecoration: 'none',
              borderRadius: '5px',
              fontSize: '16px',
              fontWeight: '600'
            }}>
              Start Coding
            </Link>
          )}
        </div>

        <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <img 
            src="https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExM3MxMzdjNnNnYmdvbDMyNXNsd3p6MTF1dWR4NGUybnZzMGQ4YzM2MyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/xT9IgzoKnwFNmISR8I/giphy.gif"
            alt="Coding"
            style={{ maxWidth: '100%', height: 'auto', maxHeight: '400px', borderRadius: '10px' }}
          />
        </div>
      </section>

      {/* CTA Section */}
      {auth.isAuthenticated && (
        <section style={{ 
          padding: '60px 20px', 
          textAlign: 'center',
          backgroundColor: '#f0f0f0'
        }}>
          <h2 style={{ fontSize: '36px', marginBottom: '30px', color: '#000' }}>Ready to Start?</h2>
          <div style={{ display: 'flex', gap: '15px', justifyContent: 'center' }}>
            <Link to="/problems" style={{ 
              padding: '12px 30px', 
              backgroundColor: '#aa3bff', 
              color: 'white', 
              textDecoration: 'none',
              borderRadius: '5px',
              fontSize: '16px',
              fontWeight: '600'
            }}>
              Browse Problems
            </Link>
            <Link to="/leaderboard/global" style={{ 
              padding: '12px 30px', 
              backgroundColor: '#000', 
              color: 'white', 
              textDecoration: 'none',
              borderRadius: '5px',
              fontSize: '16px',
              fontWeight: '600'
            }}>
              View Leaderboard
            </Link>
          </div>
        </section>
      )}
    </div>
  );
}
