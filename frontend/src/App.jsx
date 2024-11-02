import React, { useState } from "react";
import {
  Upload,
  Button,
  Layout,
  Typography,
  Image,
  message,
  Card,
  Row,
  Col,
} from "antd";
import {
  UploadOutlined,
  CloudUploadOutlined,
  DownloadOutlined,
} from "@ant-design/icons";
import axios from "axios";

const { Header, Content, Footer } = Layout;
const { Title } = Typography;
const { Dragger } = Upload;

const App = () => {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [processedImages, setProcessedImages] = useState([]);
  const [imageId, setImageId] = useState(null);
  const [processingStatus, setProcessingStatus] = useState([]);

  const checkImageStatus = async (id) => {
    try {
      const response = await axios.get(`http://localhost:5000/status/${id}`);
      if (response.data.status === "completed") {
        const images = response.data.files.map((file) => ({
          url: `http://localhost:5000/${id}/${file}`,
          name: file,
        }));
        setProcessedImages(images);
        setLoading(false);
        message.success("Images processed successfully!");
        setFiles([]); // Reset the uploaded files after processing
      } else {
        setProcessingStatus((prevStatus) => [
          ...prevStatus,
          response.data.message,
        ]);
        setTimeout(() => checkImageStatus(id), 2000);
      }
    } catch (error) {
      console.error(error);
      setLoading(false);
      message.error("Error checking image status.");
    }
  };

  const handleUpload = async () => {
    if (files.length === 0) {
      message.error("Please select files to upload.");
      return;
    }

    const formData = new FormData();
    files.forEach((file) => {
      formData.append("images", file);
    });

    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:5000/upload",
        formData
      );
      const { id } = response.data;
      setImageId(id);
      setTimeout(() => checkImageStatus(id), 2000);
    } catch (error) {
      setLoading(false);
      message.error("Error uploading images.");
      console.error(error);
    }
  };

  const beforeUpload = (file) => {
    setFiles((prevFiles) => [...prevFiles, file]);
    return false; // Prevent automatic upload
  };

  const handleDownload = (url) => {
    fetch(url)
      .then((response) => response.blob())
      .then((blob) => {
        const url = window.URL.createObjectURL(blob);
        const downloadLink = document.createElement("a");
        downloadLink.href = url;
        downloadLink.download = "processed_image.png";
        document.body.appendChild(downloadLink);
        downloadLink.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(downloadLink);
      })
      .catch((error) => console.error("Error downloading image:", error));
  };

  return (
    <Layout className="layout" style={{ minHeight: "100vh" }}>
      <Header style={{ background: "transparent", padding: "0 50px" }}>
        <Title
          style={{ color: "black", textAlign: "center", margin: "20px 0" }}
        >
          Background Removal App (Bulk)
        </Title>
      </Header>
      <Content style={{ padding: "50px 50px" }}>
        <Row gutter={16} justify="center">
          <Col span={24}>
            <Card
              title="Upload Images"
              style={{
                textAlign: "center",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                minHeight: "150px",
              }}
              bodyStyle={{ padding: "20px" }}
            >
              <Dragger
                beforeUpload={beforeUpload}
                multiple
                showUploadList={false}
              >
                <p className="ant-upload-drag-icon">
                  <UploadOutlined />
                </p>
                <p className="ant-upload-text">
                  Click or drag images to this area to upload
                </p>
                <p className="ant-upload-hint">
                  Support for a single or bulk upload.
                </p>
              </Dragger>
              <Button
                type="primary"
                icon={<CloudUploadOutlined />}
                onClick={handleUpload}
                style={{ width: "100%", marginTop: 20 }}
                disabled={files.length === 0 || loading}
              >
                Upload and Remove Backgrounds
              </Button>
            </Card>
          </Col>
        </Row>
        {loading ? (
          <>
            <ul>
              {processingStatus.map((status, index) => (
                <li key={index}>{status}</li>
              ))}
            </ul>
            <Title level={3} style={{ textAlign: "center", marginTop: 20 }}>
              Uploaded Images:
            </Title>
            <Row gutter={[16, 16]} justify="center">
              {files.map((file, index) => (
                <Col xs={24} sm={12} md={8} key={index}>
                  <Card
                    loading={true}
                    style={{
                      textAlign: "center",
                      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                      minHeight: "150px",
                    }}
                    bodyStyle={{ padding: "20px" }}
                  />
                </Col>
              ))}
            </Row>
          </>
        ) : (
          <Row gutter={[16, 16]} justify="center" style={{ marginTop: 20 }}>
            {processedImages.map((image) => (
              <Col xs={24} sm={12} md={8} key={image.name}>
                <Card
                  cover={<Image src={image.url} alt={image.name} />}
                  actions={[
                    <Button
                      type="link"
                      icon={<DownloadOutlined />}
                      onClick={() => handleDownload(image.url)}
                    >
                      Download
                    </Button>,
                  ]}
                >
                  <Card.Meta title={image.name} />
                </Card>
              </Col>
            ))}
          </Row>
        )}
      </Content>
      <Footer style={{ textAlign: "center" }}>
        Background Removal App ©2024 Created by You
      </Footer>
    </Layout>
  );
};

export default App;