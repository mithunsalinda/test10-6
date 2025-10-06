import React from 'react';
import { Button, Space, Avatar } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { UserOutlined, MenuOutlined } from '@ant-design/icons';

interface TopHeaderProps {
  onToggleSidebar?: () => void;
}

const TopHeader: React.FC<TopHeaderProps> = ({ onToggleSidebar }) => {
  const navigate = useNavigate();
//  const { email } = useSelector((state: any) => state.auth.user || {});

  const handleLogout = () => {
    //dispatch(logoutSuccess());
    navigate('/login');
    localStorage.removeItem('user');
    sessionStorage.removeItem('user');
  };
  return (
    <>
      <div style={{ display: 'flex', alignItems: 'center', zIndex: 10000 }}>
        {onToggleSidebar && (
          <Button
            type="text"
            icon={<MenuOutlined />}
            onClick={onToggleSidebar}
            style={{ fontSize: '18px', marginRight: 16 }}
            //className='mobileOnly'
          />
        )}

        {/* Logo */}
   
      </div>
      <Space>
        <Space wrap size={16}>
          <Avatar size={35} icon={<UserOutlined />} />
        </Space>
        <Button onClick={handleLogout}>Log Out</Button>
      </Space>
    </>
  );
};

export default TopHeader;
