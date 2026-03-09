import { Typography, Row, Col, Card, Statistic } from "antd";
import { ShoppingCartOutlined, UserOutlined, DollarOutlined } from "@ant-design/icons";

const { Title } = Typography;

export default function DashboardPage() {
    return (
        <div>
            <Title level={2} className="!mb-6 text-gray-800">Tổng Quan Hôm Nay</Title>

            <Row gutter={[16, 16]}>
                <Col xs={24} md={8}>
                    <Card bordered={false} className="shadow-sm">
                        <Statistic
                            title="Khách Hàng Đặt Bàn"
                            value={112}
                            prefix={<UserOutlined className="text-blue-500 mr-2" />}
                        />
                    </Card>
                </Col>
                <Col xs={24} md={8}>
                    <Card bordered={false} className="shadow-sm">
                        <Statistic
                            title="Đơn Đặt Món"
                            value={45}
                            prefix={<ShoppingCartOutlined className="text-green-500 mr-2" />}
                        />
                    </Card>
                </Col>
                <Col xs={24} md={8}>
                    <Card bordered={false} className="shadow-sm">
                        <Statistic
                            title="Doanh Thu Ước Tính"
                            value={24800000}
                            suffix="VNĐ"
                            prefix={<DollarOutlined className="text-yellow-500 mr-2" />}
                        />
                    </Card>
                </Col>
            </Row>

            <div className="mt-8">
                <Card title="Ghi chú" className="shadow-sm">
                    <p className="text-gray-500">
                        Đây là trang Dashboard quản lý. Chỉ người dùng đã đăng nhập (hoặc được hệ thống ProtectedLayout cho phép) mới có thể nhìn thấy nội dung này.
                    </p>
                </Card>
            </div>
        </div>
    );
}
