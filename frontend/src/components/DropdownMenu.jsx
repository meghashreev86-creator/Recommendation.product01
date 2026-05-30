import React, { useState, useRef, useEffect } from 'react';
import { User, Settings, LogOut, ChevronDown, UserCircle } from 'lucide-react';

const DropdownMenu = ({ user, onLogout }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const menuItems = [
    { icon: User, label: 'Profile', onClick: () => console.log('Profile clicked') },
    { icon: Settings, label: 'Settings', onClick: () => console.log('Settings clicked') },
    { icon: LogOut, label: 'Logout', onClick: onLogout }
  ];

  return (
    <div style={{ position: 'relative' }} ref={dropdownRef}>
      {/* Dropdown Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          padding: '8px 16px',
          background: '#1a1a2e',
          border: '1px solid rgba(255,255,255,0.2)',
          borderRadius: '40px',
          cursor: 'pointer',
          color: '#ffffff'
        }}
      >
        <UserCircle size={18} />
        <span style={{ fontSize: '14px', fontWeight: '500', color: '#ffffff' }}>
          {user?.name || 'Account'}
        </span>
        <ChevronDown size={14} style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.3s' }} />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div style={{
          position: 'absolute',
          top: 'calc(100% + 8px)',
          right: 0,
          minWidth: '220px',
          background: 'rgba(255, 255, 255, 0.98)',
          backdropFilter: 'blur(12px)',
          borderRadius: '16px',
          boxShadow: '0 12px 32px rgba(0,0,0,0.25)',
          border: '1px solid rgba(0, 0, 0, 0.08)',
          overflow: 'hidden',
          zIndex: 9999
        }}>
          {/* User Info */}
          <div style={{
            padding: '16px',
            borderBottom: '1px solid #eee',
            background: 'rgba(0,0,0,0.02)'
          }}>
            <div style={{ 
              fontSize: '14px', 
              fontWeight: '700', 
              color: '#111111',
              marginBottom: '2px'
            }}>
              {user?.name || 'Guest'}
            </div>
            <div style={{ 
              fontSize: '12px', 
              color: '#666'
            }}>
              {user?.email || 'guest@example.com'}
            </div>
          </div>

          {/* Menu Items */}
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <button
                key={index}
                onClick={() => {
                  item.onClick();
                  setIsOpen(false);
                }}
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '14px 18px',
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  borderBottom: index < menuItems.length - 1 ? '1px solid rgba(0,0,0,0.05)' : 'none',
                  transition: 'all 0.2s ease-in-out'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(138, 43, 226, 0.08)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'transparent';
                }}
              >
                <Icon size={18} color="#111111" />
                <span style={{ 
                  fontSize: '14px', 
                  fontWeight: '700',
                  color: '#111111'
                }}>
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default DropdownMenu;