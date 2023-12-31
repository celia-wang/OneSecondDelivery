/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-console */
import { type FC } from "react";
import styled from "styled-components";
import { Icon } from "@iconify/react";
import { Button, Form, Input, Select, message } from "antd";
import { useNavigate } from "react-router-dom";
import { getTagAdd } from "../../../../service/api";

const Div = styled.div`
  input {
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
// 提交
const onFinish = (values: Req.TagAddData) => {
  getTagAdd(values)
    .then(() => {
      void message.success("添加成功");
    })
    .catch(() => message.error("添加失败"));
};
const onFinishFailed = (errorInfo: any) => {
  console.log("Failed:", errorInfo);
};

const Tadd: FC = () => {
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
          <Icon icon="solar:arrow-left-outline" className=" text-[20px]" />
        </div>
        <span className="add-header-title">新增物品标签组</span>
      </div>
      <div className="edit-content">
        <Form
          name="basic"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item label="物品标签组名称:" name="groupName">
            <Input placeholder="请输入物品标签组名称" />
          </Form.Item>
          <Form.Item name="tags" label="标签" rules={[{ required: true }]}>
            <Select className="h-[40px] w-[500px]" mode="tags" />
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

export default Tadd;
