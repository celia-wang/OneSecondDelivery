import { Icon } from "@iconify/react";
import { useRequest } from "ahooks";
import { Button, Form, Input, Space, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { getFundsFlowList } from "@/service/api";
const Wrapper = styled.div`
  .ant-space-item {
    height: 40px;
  }
  .ant-select-selector {
    align-items: center;
    height: 40px !important;
  }
  .ant-select-selection-item {
    line-height: 40px !important;
  }
  .ant-btn-primary {
    background-color: #955ce6 !important;
  }
`;

const OrderCapitaltrend = () => {
  const [form] = Form.useForm();
  const [selectionType] = useState<"checkbox">("checkbox");
  const [currentID, setCurrentID] = useState(1);
  const [seek, setSeek] = useState({}); // 查找
  const { data: OrderListInf, refresh } = useRequest(
    async () =>
      await getFundsFlowList({ current: currentID, pageSize: 20, ...seek })
  );

  useEffect(() => {
    refresh();
  }, [currentID, refresh, seek]);
  const columns: ColumnsType<Res.TOders> = [
    {
      key: "orderNo",
      title: "订单编号",
      dataIndex: "orderNo",
      render: (_, { orderNo }) => (
        <div className="w-[100px] text-[12px]">{orderNo}</div>
      )
    },
    {
      key: "nickName",
      title: "平台收入",
      dataIndex: "nickName",
      render: () => (
        <div className="flex justify-center items-center px-[10px]"></div>
      )
    },
    {
      key: "payAmount",
      title: "代理收入",
      dataIndex: "payAmount",
      render: () => <div className="flex flex-col w-[100px] text-[12px] "></div>
    },
    {
      key: "goodsDesc",
      title: "骑手收入",
      dataIndex: "goodsDesc",
      render: () => <div className="w-[130px] flex flex-col text-[12px]"></div>
    },
    {
      key: "status",
      title: "描述",
      dataIndex: "status",
      render: () => <div></div>
    },
    {
      key: "time",
      title: "时间",
      dataIndex: "time",
      render: (_, { createTime, updateTime }) => (
        <div className="text-[12px]">
          <div>创建: {new Date(createTime).toLocaleString()}</div>
          <br />
          <div>更新: {new Date(updateTime).toLocaleString()}</div>
        </div>
      )
    }
  ];
  const onFinish = (values: { status: string }) => {
    setSeek(values);
  };
  const handleClear = () => {
    form.resetFields(); // 重置所有表单字段
    setSeek(() => {});
  };
  return (
    <Wrapper>
      <div className="text-[24px] font-[500]">资金走向列表</div>
      <Form
        form={form}
        onFinish={onFinish}
        className="mt-[20px] flex flex-col border-b"
      >
        <Space wrap>
          <Form.Item name="userNo" className=" w-[200px] ">
            <Input
              type="text"
              placeholder="订单编号"
              className=" w-[200px] h-[40px]"
            />
          </Form.Item>
          <Form.Item name="orderNo" className=" w-[200px]">
            <Input
              type="text"
              placeholder="代理编号"
              className=" w-[200px] h-[40px]"
            />
          </Form.Item>
          <Form.Item name="riderNo" className=" w-[200px]">
            <Input
              type="text"
              placeholder="城市编号"
              className="w-[200px] h-[40px]"
            />
          </Form.Item>
          <Form.Item name="mobileNumber" className=" w-[200px] ">
            <Input
              type="tel"
              placeholder="描述"
              className="w-[200px] h-[40px]"
            />
          </Form.Item>
        </Space>
        <Form.Item>
          <Space className="mt-[20px]">
            <Button onClick={handleClear} className="w-[120px] h-[40px]">
              取消
            </Button>
            <Button
              type="primary"
              htmlType="submit"
              className="w-[120px] h-[40px]"
            >
              搜索
            </Button>
          </Space>
        </Form.Item>
      </Form>
      <div className="flex justify-between items-center">
        <div className="h-[40px] my-[20px]"> </div>
        <Button
          onClick={handleClear}
          className="h-[40px] w-[40px] p-[9px] border rounded-[4px]"
        >
          <Icon icon="codicon:refresh" rotate={2} width="20" />
        </Button>
      </div>

      <Table
        bordered
        rowSelection={{
          type: selectionType
        }}
        columns={columns}
        dataSource={OrderListInf?.data.data.data}
        pagination={{
          total: OrderListInf?.data.data.count,
          pageSize: 20,
          showSizeChanger: false,
          showQuickJumper: true,
          showTotal: (total) => `共 ${total} 条数据`
        }}
        onChange={(page) => {
          setCurrentID(page.current!);
        }}
      />
    </Wrapper>
  );
};

export default OrderCapitaltrend;
