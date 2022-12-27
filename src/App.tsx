import { ConfigProvider, Layout, theme } from 'antd';
import { useContext } from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Sidebar from './components/organisms/Sidebar';
// import CalcPage from './components/pages/CalcPage';
import ProfilePage from './components/pages/ProfilePage';
import { LoaContext } from './contexts';
function App() {

  const { compactAlgorithm, darkAlgorithm } = theme;
  const { isDark } = useContext(LoaContext)

  return (
    <ConfigProvider
      theme={{
        algorithm: isDark ? darkAlgorithm : compactAlgorithm,
        token: isDark ? {
          colorBgLayout: "#2c3e50",
          colorBgElevated: "#2c3e50"
        } : undefined
      }}
    >
      <BrowserRouter>
        <Sidebar/>
        <Layout style={{height: "100vh"}}>
          <Routes>
            <Route path="/" element={<ProfilePage />}/>
            {/* <Route path="/observe" element={<ObservePage />}/> */}
            {/* <Route path="/calc" element={<CalcPage/>}/> */}
          </Routes>
        </Layout>
      </BrowserRouter>
    </ConfigProvider>
  );
}

export default App;
