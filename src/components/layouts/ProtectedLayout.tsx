import { Navigate, Outlet } from "react-router-dom";
import { Layout, Menu } from "antd";

const { Header, Content, Sider } = Layout;

export default function ProtectedLayout() {
    // Temporary auth check strategy: assume user isn't logged in for now, or assume they are.
    // For the sake of demonstration, we'll assume logged in. 
    // Change to `const isAuthenticated = false;` to test redirect to login.
    const isAuthenticated = true;

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    return (
        <Layout className="min-h-screen">
            <Header className="bg-gray-900 border-b border-gray-800 flex items-center justify-between px-6">
                <div className="text-white font-serif text-xl">SL Admin</div>
                <div className="text-gray-300">Admin User</div>
            </Header>
            <Layout>
                <Sider width={200} className="bg-white">
                    <Menu
                        mode="inline"
                        defaultSelectedKeys={['1']}
                        style={{ height: '100%', borderRight: 0 }}
                        items={[
                            { key: '1', label: 'Dashboard' },
                            { key: '2', label: 'Quản lý bàn' },
                            { key: '3', label: 'Đơn hàng' },
                        ]}
                    />
                </Sider>
                <Layout className="p-6 bg-gray-50">
                    <Content className="bg-white p-6 rounded-md shadow-sm">
                        <Outlet />
                    </Content>
                </Layout>
            </Layout>
        </Layout>
    );
}
