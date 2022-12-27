import { SettingOutlined } from '@ant-design/icons';
import { Button, Drawer, Switch, Typography } from 'antd';
import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom';
import { LoaContext } from '../../contexts';

const { Title } = Typography
 
function Sidebar() {

    /**
     * @param visible: 사이드바의 표시 여부
     */
    const [visible, setVisible] = useState(false);
    const path = window.location.pathname
    const { isDark, toggleDark } = useContext(LoaContext);

    const endpoints = [
        {name: "프로필", path: "/"},
        // {name: "군장검사 Beta", path: "/observe"},
        {name: "가토 수익 계산", path: "/calc"}
    ]

    return (
      <>
        <div 
            style={{
                display: "flex", 
                justifyContent: "center", 
                padding: "10px 20px 10px 20px", 
                backgroundColor: "#4169e1",
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                zIndex: 99
            }}
        >
            <Button 
                style={{backgroundColor: "#2c3e50", borderColor: "#2c3e50"}}
                type="primary"
                shape='circle'
                size='large'
                icon={<SettingOutlined/>} 
                onClick={() => setVisible(true)}
            />            
            <div style={{flexGrow: 1, maxWidth: 1300, fontSize: 20, fontWeight: 600, lineHeight: "40px"}}>
                <Link to="/" style={{color: "white"}}>
                    Loa Profile
                </Link>
            </div>
        </div>
        <Drawer 
            title="설정"
            width={250}
            placement="left" 
            onClose={() => setVisible(false)} 
            visible={visible} 
            bodyStyle={{display: 'flex', flexDirection: 'column'}}
        >
            <div style={{flexGrow: 1, display: 'flex', flexDirection: "column"}}>
                {endpoints.map((end, index) => (
                    <Link key={index} to={end.path} onClick={() => setVisible(false)}>
                        <Title type={path!==end.path ? "secondary" : "success"}>{end.name}</Title>                        
                    </Link>
                ))}
            </div>
            <div>
                <Switch checked={isDark} onChange={toggleDark}/>&nbsp;&nbsp;다크 모드
            </div>
        </Drawer>
      </>
    );
}

export default Sidebar