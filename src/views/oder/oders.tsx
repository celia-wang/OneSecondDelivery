// 管理员列表
import { Icon } from "@iconify/react";
import { Button, Dropdown, Form, Input, Select, Space, Table, Tag } from "antd";
import type { MenuProps } from "antd";
import type { FC } from "react";
import { useEffect, useState } from "react";
import { useRequest } from "ahooks";

import type { ColumnsType } from "antd/es/table";
import { getOrderList } from "@/service/api";
import styled from "styled-components";
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

const items: MenuProps["items"] = [
  {
    key: "1",
    label: "接单",
    disabled: true
  },
  {
    key: "2",
    label: "配送完成",
    disabled: true
  },
  {
    key: "3",
    label: "确认完成",
    disabled: true
  },
  {
    key: "4",
    label: "取消",
    disabled: true
  }
];

const OrderOrders: FC = () => {
  const [selectionType] = useState<"checkbox">("checkbox");
  const [currentID, setCurrentID] = useState(1);
  const [seek, setSeek] = useState({}); // 查找
  const { data: OrderListInf, refresh } = useRequest(
    async () =>
      await getOrderList({ current: currentID, pageSize: 20, ...seek })
  );

  useEffect(() => {
    refresh();
  }, [currentID, refresh, seek]);
  const columns: ColumnsType<Res.TOders> = [
    {
      key: "orderNo",
      title: "编号",
      dataIndex: "orderNo",
      render: (_, { orderNo }) => (
        <div className="w-[100px] text-[12px]">{orderNo}</div>
      )
    },
    {
      key: "nickName",
      title: "下单用户",
      dataIndex: "nickName",
      render: (_, { nickName, mobileNumber, avatarUrl }) => (
        <div className="flex justify-center items-center px-[10px]">
          <img
            src={avatarUrl}
            alt="avatar"
            width="30"
            className=" rounded-full pr-[5px]"
          />
          <div className="flex flex-col ">
            <div>{nickName}</div>
            <div className="text-[#999] font-[12px] ">{mobileNumber}</div>
          </div>
        </div>
      )
    },
    {
      key: "payAmount",
      title: "下单金额",
      dataIndex: "payAmount",
      render: (
        _,
        { payAmount, timePrice, startPrice, distancePrice, weightPrice, fee }
      ) => (
        <div className="flex flex-col w-[100px] text-[12px] ">
          <div className="flex justify-between items-center">
            <span>起步价：</span> <span>{startPrice !== 0 || null}元</span>
          </div>
          <div className="flex justify-between items-center">
            <span>重量价：</span> <span>{weightPrice}元</span>
          </div>
          {distancePrice !== 0 ? (
            <div className="flex justify-between items-center">
              <span>路程价：</span> <span>{distancePrice}元</span>
            </div>
          ) : null}
          {fee === "0" ? (
            <div className="flex justify-between items-center">
              <span>小费：</span> <span>{fee}元</span>
            </div>
          ) : null}
          {timePrice !== 0 ? (
            <div className="flex justify-between items-center">
              <span>时间段价：</span> <span>{timePrice}元</span>
            </div>
          ) : null}
          <div className="flex justify-between items-center font-[600]">
            <span>支付金额：</span> <span>{payAmount}元</span>
          </div>
        </div>
      )
    },
    {
      key: "goodsDesc",
      title: "下单信息",
      dataIndex: "goodsDesc",
      render: (_, { goodsDesc, startAddress, endAddress }) => (
        <div className="w-[130px] flex flex-col text-[12px]">
          <div>{goodsDesc}</div>
          <div>
            起点：
            <span className="text-[#999]">
              <span>{startAddress?.city}</span>
              <span>{startAddress?.addressDetail}</span>
            </span>
          </div>
          {startAddress?.contactName != null ||
          startAddress?.mobileNumber != null ? (
            <div>
              <span>{startAddress?.contactName} — </span>
              <span>{startAddress?.mobileNumber}</span>
            </div>
          ) : null}

          <div>
            终点：
            <span className="text-[#999]">
              <span>{endAddress.city}</span>
              <span>{endAddress.addressDetail}</span>
            </span>
          </div>
          {endAddress?.contactName != null ||
          endAddress?.mobileNumber != null ? (
            <div>
              <span>{endAddress?.contactName} — </span>
              <span>{endAddress?.mobileNumber}</span>
            </div>
          ) : null}
        </div>
      )
    },
    {
      key: "status",
      title: "状态",
      dataIndex: "status",
      render: (_, { status }) => (
        <div>
          {status === -1 ? <Tag color="#000">已关闭</Tag> : null}
          {status === -2 ? <Tag color="#999">已取消</Tag> : null}
        </div>
      )
    },
    {
      key: "refundAmount",
      title: "售后",
      dataIndex: "refundAmount",
      render: (_, { refundAmount, refundStatus }) => (
        <div className="text-[12px] flex flex-col w-[50px]">
          {refundStatus === 0 ? <div>已退款</div> : <div>正在处理</div>}
          <div>{refundAmount}元</div>
        </div>
      )
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
    },
    {
      key: "updatedBy",
      title: "操作",
      dataIndex: "updatedBy",
      render: () => (
        <Space>
          <Dropdown menu={{ items }}>
            <div>
              <Icon icon="gg:more-r" color="#955ce6" width="32" height="24" />
            </div>
          </Dropdown>
        </Space>
      )
    }
  ];

  const [form] = Form.useForm();
  const onFinish = (values: { userNo?: string }) => {
    setSeek(values);
  };
  const handleClear = () => {
    form.resetFields(); // 重置所有表单字段
    setSeek(() => {});
  };

  return (
    <Wrapper>
      <div className="text-[24px] font-[500]">用户列表</div>
      <Form
        form={form}
        onFinish={onFinish}
        className="mt-[20px] flex flex-col border-b"
      >
        <Space wrap>
          <Form.Item name="userNo" className=" w-[200px] h-[40px]">
            <Input
              type="text"
              placeholder="用户编号"
              className=" w-[200px] h-[40px]"
            />
          </Form.Item>
          <Form.Item name="orderNo" className=" w-[200px] h-[40px]">
            <Input
              type="text"
              placeholder="订单编号"
              className=" w-[200px] h-[40px]"
            />
          </Form.Item>
          <Form.Item name="riderNo" className=" w-[200px] h-[40px]">
            <Input
              type="text"
              placeholder="骑手编号"
              className="w-[200px] h-[40px]"
            />
          </Form.Item>
          <Form.Item name="mobileNumber" className=" w-[200px] h-[40px]">
            <Input
              type="tel"
              placeholder="用户手机号"
              className="w-[200px] h-[40px]"
            />
          </Form.Item>
          <Form.Item name="status" className=" w-[200px] h-[40px]">
            <Select
              placeholder="状态"
              style={{ height: 40 }}
              className=" w-[200px] h-[40px]"
              options={[
                { label: "状态:全部" },
                { value: "-2", label: "取消订单" },
                { value: "-1", label: "交易关闭" },
                { value: "0", label: "待支付" },
                { value: "1", label: "待接单" },
                { value: "2", label: "配送中" },
                { value: "3", label: "待确认完成" },
                { value: "4", label: "订单已完成" }
              ]}
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
        rowKey="orderNo"
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

export default OrderOrders;
