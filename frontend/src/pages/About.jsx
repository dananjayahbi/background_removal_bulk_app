import React, { useEffect, useState } from "react";
import { Layout, Card, Typography } from "antd";
import HeaderComp from "../components/HeaderComp";

const { Header, Content } = Layout;
const { Title, Paragraph, Text } = Typography;

const About = () => {
  const [isMobileView, setIsMobileView] = useState(window.innerWidth < 445);

  // Handle window resize
  const handleResize = () => {
    setIsMobileView(window.innerWidth < 445);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <Layout>
      <Header style={{ background: "transparent", padding: "0", zIndex: 999 }}>
        <HeaderComp />
        <br />
      </Header>
      <Content
        style={{
          padding: isMobileView ? "50px 10px" : "50px 50px",
          minHeight: "calc(100vh - 120px)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Card
          style={{
            width: isMobileView ? "100%" : "600px",
            textAlign: "center",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
            padding: "40px",
            borderRadius: "10px",
          }}
        >
          <Title level={2}>About Me</Title>
          <Paragraph>
            Hi, I'm a passionate <Text strong>Full Stack Web Developer</Text> who loves trying out new technologies and pushing the boundaries of what I can create. 
          </Paragraph>

          <Paragraph>
            This background removal tool you're using is actually one of my <Text strong>hobby projects</Text>. I’ve always been curious about developing tools like this for myself, so I decided to take a crack at it and here we are!
          </Paragraph>

          <Title level={3}>Why This Project?</Title>
          <Paragraph>
            As a developer who loves experimenting, I wanted to build something practical yet challenging. Since this is a hobby project, my focus has been purely on the core functionality: <Text strong>background removal</Text>. While some other features might not be as polished or follow best practices, I hope you’ll find the core feature useful!
          </Paragraph>

          <Title level={3}>Room for Improvement</Title>
          <Paragraph>
            I'm aware that there could be some issues with user experience and other functionalities, but the idea here was to get the main feature working first. With <Text strong>your feedback</Text>, I’d love to continue improving this tool or even branch out into more projects like this!
          </Paragraph>

          <Paragraph>
            Thanks for stopping by and giving my project a try. If you have any suggestions, feel free to <Text strong>contact me</Text> or leave your thoughts. Your input will motivate me to enhance this tool or tackle more exciting challenges.
          </Paragraph>
        </Card>
      </Content>
    </Layout>
  );
};

export default About;
