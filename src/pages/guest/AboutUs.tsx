import { Layout, Typography, Space, Divider } from 'antd';

const { Content } = Layout;
const { Title, Paragraph } = Typography;

export default function AboutUs() {
  return (
      <Content>
        <Title level={1}>About Us</Title>
        <Divider />
        <Space direction="vertical" size="large">
          <Title level={2}>Who We Are</Title>
          <Paragraph>
            We are a dedicated team of educators and innovators who are passionate about STEM education. Our team is composed of experienced teachers, industry professionals, and enthusiastic volunteers who all share a common goal - to make STEM education accessible and enjoyable for all students.
          </Paragraph>
          <Title level={2}>Our Mission</Title>
          <Paragraph>
            Our mission is to provide quality STEM education for high school students. We believe in fostering an environment that encourages curiosity and drives students to learn and grow. We aim to inspire students to explore STEM fields and pursue their passions.
          </Paragraph>
          <Title level={2}>Our Vision</Title>
          <Paragraph>
            Our vision is to be a leading provider of STEM education, equipping students with the skills and knowledge they need to excel in their future careers and contribute to society. We envision a world where every student has the opportunity to learn and succeed in STEM.
          </Paragraph>
          <Title level={2}>Our Values</Title>
          <Paragraph>
            We value curiosity, innovation, and perseverance. We believe that every student has the potential to succeed and we are committed to providing the resources and support they need to reach their full potential.
          </Paragraph>
        </Space>
      </Content>
  );
};
