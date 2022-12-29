import { ConfigProvider, Layout, theme, App as AntdApp } from 'antd';
import { useContext } from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Sidebar from './components/organisms/Sidebar';
// import CalcPage from './components/pages/CalcPage';
import ProfilePage from './components/pages/ProfilePage';
import { LoaContext } from './contexts';
import { BLUE_TONE, DARK_PRIMARY } from './func/constant';
function App() {

  const { defaultAlgorithm, darkAlgorithm } = theme;
  const { isDark } = useContext(LoaContext)

  return (
    <ConfigProvider
      theme={{
        algorithm: isDark ? darkAlgorithm : defaultAlgorithm,
        token: isDark ? {
          colorBgLayout: "#2c3e50",
          colorBgElevated: "#2c3e50",
          colorBgContainer: "#2c3e50",
          colorBorder: BLUE_TONE,
          colorPrimary: DARK_PRIMARY,
          colorText: "#ecf0f1"
        } : undefined
      }}
    >
      <AntdApp>
        <BrowserRouter>
          <Sidebar/>
          <Layout style={{minHeight: "100vh"}}>
            <Routes>
              <Route path="/" element={<ProfilePage />}/>
              {/* <Route path="/observe" element={<ObservePage />}/> */}
              {/* <Route path="/calc" element={<CalcPage/>}/> */}
            </Routes>
          </Layout>
        </BrowserRouter>
      </AntdApp>
    </ConfigProvider>
  );
}

export default App;
