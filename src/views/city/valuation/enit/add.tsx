/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable no-console */
import { type FC } from "react";
import styled from "styled-components";
import { Icon } from "@iconify/react";
import dayjs from "dayjs";
import { Button, Form, Input, Space, InputNumber, TimePicker } from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
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

const onFinish = (values: Req.AddVal) => {
  console.log({ ...values });

  // addValuation(values)
  //   .then(() => {
  //     void message.success("添加成功");
  //   })
  //   .catch(() => message.error("添加失败"));
};
const format = "HH:mm";

const vAdd: FC = () => {
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
        <span className="add-header-title">新增计价规则</span>
      </div>
      <div className="edit-content">
        <Form
          name="basic"
          style={{ maxWidth: 600 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item
            label="规则名称"
            name="ruleName"
            rules={[{ required: true, message: "请输入规则名称" }]}
          >
            <Input placeholder="请输入规则名称" />
          </Form.Item>

          {/* 距离 */}
          <Form.Item
            label="距离规则"
            name="distanceRule"
            rules={[{ required: true }]}
          >
            <Form.List name="distanceRule">
              {(fields, { add, remove }) => (
                <>
                  {fields.map(({ key, name, ...restField }) => (
                    <Space
                      key={key}
                      style={{ display: "flex", marginBottom: 8 }}
                      align="baseline"
                    >
                      <Form.Item name={[name, "gt"]} label="范围(km):">
                        <InputNumber defaultValue={1} /> ~
                        <InputNumber defaultValue={3} />
                      </Form.Item>
                      <Form.Item label="距离单位(km):" name={[name, "dunit"]}>
                        <InputNumber defaultValue={1} />
                      </Form.Item>
                      <Form.Item label="价格(元):" name={[name, "dprice"]}>
                        <InputNumber defaultValue={1} />
                      </Form.Item>
                      <MinusCircleOutlined
                        onClick={() => {
                          remove(name);
                        }}
                      />
                    </Space>
                  ))}
                  <Form.Item>
                    <Button
                      className="h-[40px]"
                      onClick={() => {
                        add();
                      }}
                      block
                      icon={<PlusOutlined />}
                    >
                      添加距离规则
                    </Button>
                  </Form.Item>
                </>
              )}
            </Form.List>
          </Form.Item>
          <Form.Item
            label="重量规则"
            name="weightRule"
            rules={[{ required: true }]}
          >
            <Form.List name="weightRule">
              {(fields, { add, remove }) => (
                <>
                  {fields.map(({ key, name, ...restField }) => (
                    <Space
                      key={key}
                      style={{ display: "flex", marginBottom: 8 }}
                      align="baseline"
                    >
                      <Form.Item label="范围(kg):">
                        <InputNumber defaultValue={1} />~
                        <InputNumber defaultValue={3} />
                      </Form.Item>
                      <Form.Item label="重量单位(kg):">
                        <InputNumber defaultValue={1} />
                      </Form.Item>
                      <Form.Item label="价格(元):">
                        <InputNumber defaultValue={1} />
                      </Form.Item>
                      <MinusCircleOutlined
                        onClick={() => {
                          remove(name);
                        }}
                      />
                    </Space>
                  ))}
                  <Form.Item>
                    <Button
                      className="h-[40px]"
                      onClick={() => {
                        add();
                      }}
                      block
                      icon={<PlusOutlined />}
                    >
                      添加重量规则
                    </Button>
                  </Form.Item>
                </>
              )}
            </Form.List>
          </Form.Item>
          <Form.Item
            label="时间规则"
            name="timeRule"
            rules={[{ required: true }]}
          >
            <Form.List name="timeRule">
              {(fields, { add, remove }) => (
                <>
                  {fields.map(({ key, name, ...restField }) => (
                    <Space
                      key={key}
                      style={{ display: "flex", marginBottom: 8 }}
                      align="baseline"
                    >
                      <Form.Item label="范围:">
                        <TimePicker
                          defaultValue={dayjs("00:00", "HH:mm")}
                          format={format}
                          size="large"
                        />
                        ~
                        <TimePicker
                          defaultValue={dayjs("07:00", "HH:mm")}
                          format={format}
                          size="large"
                        />
                      </Form.Item>
                      <Form.Item label="价格(元):">
                        <InputNumber defaultValue={1} />
                      </Form.Item>
                      <MinusCircleOutlined
                        onClick={() => {
                          remove(name);
                        }}
                      />
                    </Space>
                  ))}
                  <Form.Item>
                    <Button
                      className="h-[40px]"
                      onClick={() => {
                        add();
                      }}
                      block
                      icon={<PlusOutlined />}
                    >
                      添加时间规则
                    </Button>
                  </Form.Item>
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

export default vAdd;
