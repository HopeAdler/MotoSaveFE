import React, { useEffect, useState } from 'react';
import { Card, Table } from 'antd';
import { servicePackageColumns, ServicePackages } from '../models/ServicePackages';
import { getServicePackages } from '../services/beAPIs';
import Title from 'antd/es/typography/Title';

const ServicePackagePreview: React.FC = () => {
    const [servicePackages, setServicePackages] = useState<ServicePackages[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    const fetchServicePackages = async () => {
        setLoading(true);
        try {
            const result = await getServicePackages();
            setServicePackages(result);
        } catch (error) {
            console.error('Failed to fetch data:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchServicePackages();
    }, []);


    return (
        <div>
            <Card className="p-6 shadow-lg relative">
                {/* Main Title */}
                <Title level={3} className="text-blue-600">📦 Tỉ giá dịch vụ</Title>
            </Card>
            <Table<ServicePackages>
                className="rounded-lg overflow-hidden shadow-lg p-5"
                columns={servicePackageColumns}
                dataSource={servicePackages}
                loading={loading}
                pagination={{ pageSize: 5 }}
            />
        </div>
    );
};

export default ServicePackagePreview;