/* eslint-disable no-console */
import { type FC } from "react";
import styled from "styled-components";
import { Icon } from "@iconify/react";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Form, Input, Space, InputNumber } from "antd";
import { useNavigate } from "react-router-dom";

const Div = styled.div`
  input {
    height: 40px;
  }
  .ant-btn {
    width: auto;
    height: 40px;
  }
  .add-header-heading {
    width: 100%;
    overflow: hidden;
  }
  .add-back {
    float: left;
    margin: 8px 0;
    margin-right: 16px;
    font-size: 16px;
    line-height: 1;
  }
  .add-header-title {
    display: block;
    float: left;
    margin-bottom: 0;
    padding-right: 12px;
    color: #333333;
    font-weight: 600;
    font-size: 20px;
    line-height: 32px;
  }
  .edit-content {
    width: 600px;
    padding: 0 50px;
  }
  .ant-row {
    position: relative;
    height: auto;
    margin-right: 0;
    margin-left: 0;
    zoom: 1;
    display: block;
    box-sizing: border-box;
  }
  .ant-col {
    text-align: start;
  }
  .ant-form-item-labe {
    text-align: start;
  }
  .ant-btn-primary {
    color: #fff;
    background-color: #955ce6;
    border-color: #955ce6;
    text-shadow: 0 -1px 0 rgba(0, 0, 0, 0.12);
    box-shadow: 0 2px 0 rgba(0, 0, 0, 0.045);
  }
`;

const onFinish = (values: any) => {
  console.log("Success:", values);
};
const onFinishFailed = (errorInfo: any) => {
  console.log("Failed:", errorInfo);
};

const Wadd: FC = () => {
  const navigate = useNavigate();
  return (
    <Div className="home-container p-[20px] h-[100%] overflow-auto">
      <div className="add-header-heading">
        <div
          className="add-back"
          onClick={() => {
            navigate(-1);
          }}
        >
          <Icon
            icon="solar:arrow-left-outline"
            className=" text-[20px]"
            onClick={() => {
              navigate(-1);
            }}
          />
        </div>
        <span className="add-header-title">新增重量标签</span>
      </div>
      <div className="edit-content">
        <Form
          name="basic"
          style={{ maxWidth: 600 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            name="tagName"
            label="标签名称:"
            rules={[{ required: true }]}
          >
            <Input placeholder="请输入标签名称" />
          </Form.Item>
          <Form.Item
            name="weightTag"
            label="重量标签"
            rules={[{ required: true }]}
          >
            <Form.List name="weightTag">
              {(fields, { add, remove }) => (
                <>
                  <Form.Item>
                    <Button
                      className="h-[40px]"
                      onClick={() => {
                        add();
                      }}
                      block
                      icon={<PlusOutlined />}
                    >
                      添加一项
                    </Button>
                  </Form.Item>
                  {fields.map(({ key, name, ...restField }) => (
                    <Space
                      key={key}
                      style={{ display: "flex", marginBottom: 8 }}
                      align="baseline"
                    >
                      <Form.Item label="标签名称">
                        <Input placeholder="请输入标签" />
                      </Form.Item>
                      <Form.Item label="取值:">
                        <InputNumber defaultValue={0} />~
                        <InputNumber defaultValue={1} />
                        <MinusCircleOutlined
                          onClick={() => {
                            remove(name);
                          }}
                        />
                      </Form.Item>
                    </Space>
                  ))}
                </>
              )}
            </Form.List>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              提交保存
            </Button>
          </Form.Item>
        </Form>
      </div>
    </Div>
  );
};

export default Wadd;
