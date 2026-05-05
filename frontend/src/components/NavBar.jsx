import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { NavigationMenu } from '@base-ui/react/navigation-menu';
import './NavBar.css';

const aboutLinks = [
  { href: '/about/team', title: 'Team', description: 'Meet our team.' },
  { href: '/about/mission', title: 'Mission', description: 'Our mission statement.' }
];

const problemsLinks = [
  { href: '/problems/easy', title: 'Easy', description: 'Solve easy problems.' },
  { href: '/problems/medium', title: 'Medium', description: 'Challenge yourself with medium problems.' },
  { href: '/problems/hard', title: 'Hard', description: 'Tackle hard problems.' }
];

const leaderboardLinks = [
  { href: '/leaderboard/top', title: 'Top Users', description: 'See the top users.' },
  { href: '/leaderboard/global', title: 'Global Rankings', description: 'Global leaderboard.' }
];

function ChevronDownIcon(props) {
  return (
    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" {...props}>
      <path d="M1 3.5L5 7.5L9 3.5" stroke="currentcolor" strokeWidth="1.5" />
    </svg>
  );
}

function ArrowSvg(props) {
  return (
    <svg width="20" height="10" viewBox="0 0 20 10" fill="none" {...props}>
      <path
        d="M9.66437 2.60207L4.80758 6.97318C4.07308 7.63423 3.11989 8 2.13172 8H0V10H20V8H18.5349C17.5468 8 16.5936 7.63423 15.8591 6.97318L11.0023 2.60207C10.622 2.2598 10.0447 2.25979 9.66437 2.60207Z"
        fill="#000"
      />
      <path
        d="M8.99542 1.85876C9.75604 1.17425 10.9106 1.17422 11.6713 1.85878L16.5281 6.22989C17.0789 6.72568 17.7938 7.00001 18.5349 7.00001L15.89 7L11.0023 2.60207C10.622 2.2598 10.0447 2.2598 9.66436 2.60207L4.77734 7L2.13171 7.00001C2.87284 7.00001 3.58774 6.72568 4.13861 6.22989L8.99542 1.85876Z"
        stroke="#000"
      />
      <path
        d="M10.3333 3.34539L5.47654 7.71648C4.55842 8.54279 3.36693 9 2.13172 9H0V8H2.13172C3.11989 8 4.07308 7.63423 4.80758 6.97318L9.66437 2.60207C10.0447 2.25979 10.622 2.2598 11.0023 2.60207L15.8591 6.97318C16.5936 7.63423 17.5468 8 18.5349 8H20V9H18.5349C17.2998 9 16.1083 8.54278 15.1901 7.71648L10.3333 3.34539Z"
        stroke="#000"
      />
    </svg>
  );
}

const SimpleNavbar = () => {
  const { auth } = useAuth();
  
  return (
    <nav style={{ 
      display: 'flex', 
      justifyContent: 'space-between', 
      alignItems: 'center',
      padding: '10px 0',
      backgroundColor: '#000000',
      color: 'white',
      width: '100%',
      margin: '0',
      position: 'relative',
      border: '1px solid #000',
      outline: '1px solid #000',
      boxSizing: 'border-box'
    }}>
    <div style={{ display: 'flex', alignItems: 'center', padding: '0 20px' }}>
      <h2 style={{ fontSize: '30px', fontFamily: 'Trebuchet MS', fontStyle: 'normal', fontWeight: 'bold', margin: 0 }}>TechnoCode</h2>
    </div>
      
      {/* Middle section - Navigation Menu */}
      <NavigationMenu.Root>
        <NavigationMenu.List style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
          <NavigationMenu.Item>
            <NavigationMenu.Link render={<a />} href="/" style={{ color: 'white', textDecoration: 'none' }}>Home</NavigationMenu.Link>
          </NavigationMenu.Item>
          <NavigationMenu.Item>
            <NavigationMenu.Trigger style={{ color: 'white', background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px' }}>
              About
              <ChevronDownIcon />
            </NavigationMenu.Trigger>
            <NavigationMenu.Content style={{ backgroundColor: '#000', color: 'white', border: '1px solid #000', padding: '10px' }}>
              <ul style={{ display: 'flex', flexDirection: 'column', gap: '10px', listStyle: 'none', margin: 0, padding: 0 }}>
                {aboutLinks.map((item) => (
                  <li key={item.href}>
                    <a href={item.href} style={{ color: 'white', textDecoration: 'none' }}>
                      <h3 style={{ margin: 0, fontSize: '16px' }}>{item.title}</h3>
                      <p style={{ margin: 0, fontSize: '14px' }}>{item.description}</p>
                    </a>
                  </li>
                ))}
              </ul>
            </NavigationMenu.Content>
          </NavigationMenu.Item>
          <NavigationMenu.Item>
            <NavigationMenu.Trigger style={{ color: 'white', background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px' }}>
              Problems
              <ChevronDownIcon />
            </NavigationMenu.Trigger>
            <NavigationMenu.Content style={{ backgroundColor: '#000', color: 'white', border: '1px solid #000', padding: '10px' }}>
              <ul style={{ display: 'flex', flexDirection: 'column', gap: '10px', listStyle: 'none', margin: 0, padding: 0 }}>
                {problemsLinks.map((item) => (
                  <li key={item.href}>
                    <a href={item.href} style={{ color: 'white', textDecoration: 'none' }}>
                      <h3 style={{ margin: 0, fontSize: '16px' }}>{item.title}</h3>
                      <p style={{ margin: 0, fontSize: '14px' }}>{item.description}</p>
                    </a>
                  </li>
                ))}
              </ul>
            </NavigationMenu.Content>
          </NavigationMenu.Item>
          <NavigationMenu.Item>
            <NavigationMenu.Trigger style={{ color: 'white', background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px' }}>
              Leaderboard
              <ChevronDownIcon />
            </NavigationMenu.Trigger>
            <NavigationMenu.Content style={{ backgroundColor: '#000', color: 'white', border: '1px solid #000', padding: '10px' }}>
              <ul style={{ display: 'flex', flexDirection: 'column', gap: '10px', listStyle: 'none', margin: 0, padding: 0 }}>
                {leaderboardLinks.map((item) => (
                  <li key={item.href}>
                    <a href={item.href} style={{ color: 'white', textDecoration: 'none' }}>
                      <h3 style={{ margin: 0, fontSize: '16px' }}>{item.title}</h3>
                      <p style={{ margin: 0, fontSize: '14px' }}>{item.description}</p>
                    </a>
                  </li>
                ))}
              </ul>
            </NavigationMenu.Content>
          </NavigationMenu.Item>
          <NavigationMenu.Item>
            <NavigationMenu.Link render={<a />} href="/contact" style={{ color: 'white', textDecoration: 'none' }}>Contact</NavigationMenu.Link>
          </NavigationMenu.Item>
        </NavigationMenu.List>
        <NavigationMenu.Portal>
          <NavigationMenu.Positioner sideOffset={10} collisionPadding={{ top: 5, bottom: 5, left: 20, right: 20 }} collisionAvoidance={{ side: 'none' }}>
            <NavigationMenu.Popup style={{ backgroundColor: '#000', border: '1px solid #000' }}>
              <NavigationMenu.Arrow style={{ fill: '#000' }}>
                <ArrowSvg />
              </NavigationMenu.Arrow>
              <NavigationMenu.Viewport />
            </NavigationMenu.Popup>
          </NavigationMenu.Positioner>
        </NavigationMenu.Portal>
      </NavigationMenu.Root>
      
      {/* Right side - Auth */}
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: '10px',
        padding: '0 20px'
      }}>
        {auth.isAuthenticated ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span>{auth.user?.name || 'User'}</span>
            <button style={{ 
              background: 'red', 
              color: 'white', 
              border: 'none', 
              padding: '5px 10px',
              cursor: 'pointer',
              borderRadius: '4px'
            }}>
              Logout
            </button>
          </div>
        ) : (
          <div style={{ display: 'flex', gap: '10px' }}>
            <a href="/login" style={{ color: 'white', textDecoration: 'none', alignSelf: 'center' }}>Login</a>
            <button className="button-48" onClick={() => window.location.href = '/register'}><span className="text">Register</span></button>
          </div>
        )}
      </div>
    </nav>
  );
};


export default SimpleNavbar;
