/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable no-console */
import { useState, type FC, useEffect } from "react";
import { useRequest } from "ahooks";
import {
  getRiderList,
  getAdminRiderReceiveStatus,
  getAdminUserStatus
} from "@/service/api";
import {
  Button,
  Dropdown,
  Form,
  Input,
  Select,
  Space,
  Switch,
  Table,
  Tag,
  message
} from "antd";
import { Icon } from "@iconify/react";
import type { ColumnsType } from "antd/es/table";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
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

const Riders: FC = () => {
  const [currentID, setCurrentID] = useState(1);
  const [Search, setSearchCondition] = useState({}); // 查找
  const [selectionType] = useState<"checkbox">("checkbox");
  const navigate = useNavigate();
  const { data: RiderList, refresh } = useRequest(
    async () =>
      await getRiderList({ current: currentID, pageSize: 20, ...Search })
  );
  const [form] = Form.useForm();

  const onFinish = (values: { userNo?: string }) => {
    setSearchCondition(values);
  };
  const handleClear = () => {
    form.resetFields(); // 重置所有表单字段
    setSearchCondition(() => {});
  };
  useEffect(() => {
    refresh();
  }, [currentID, Search]);

  const columns: ColumnsType<Res.TRiderList2> = [
    {
      key: "riderNo",
      title: "编号",
      dataIndex: "riderNo",
      render: (_, { riderNo }) => (
        <div className="w-[100px] text-[12px]">{riderNo}</div>
      )
    },
    {
      key: "nickName",
      title: "用户",
      dataIndex: "nickName",
      render: (_, { avatarUrl, nickName, mobileNumber }) => (
        <div className="flex w-[120px] justify-center items-center px-[10px]">
          <img
            src={avatarUrl}
            alt="avatar"
            width="30"
            className=" rounded-full mr-[5px] w-[30px] h-[30px]"
          />
          <div className="flex flex-col ">
            <div>{nickName}</div>
            <div className="text-[#999] font-[12px] ">{mobileNumber}</div>
          </div>
        </div>
      )
    },
    {
      key: "realname",
      title: "身份",
      dataIndex: "realname",
      render: (_, { realname }) => (
        <div className="text-[12px] ">{realname}</div>
      )
    },
    {
      key: "AccountBalance",
      title: "账户余额",
      render: () => <div className="w-[100px] text-[12px]">元</div>
    },
    {
      key: "startReceive",
      title: "开启接单",
      dataIndex: "startReceive",
      render: (_, { startReceive, riderNo }) => (
        <Switch
          className="w-[60px]"
          defaultChecked={startReceive !== 0}
          // eslint-disable-next-line @typescript-eslint/no-misused-promises
          onClick={async () => {
            await getAdminRiderReceiveStatus({
              riderNo: `${riderNo}`,
              startReceive: startReceive !== 0
            });
            refresh();
          }}
        />
      )
    },
    {
      key: "status",
      title: "状态",
      dataIndex: "status",
      render: (_, { status }) => (
        <div>
          {status === 0 ? <Tag color="red">禁用</Tag> : null}
          {status === 1 ? <Tag color="green">启用</Tag> : null}
        </div>
      )
    },

    {
      key: "time",
      title: "时间",
      dataIndex: "time",
      render: (_, { createTime, updateTime }) => (
        <div className="text-[14px]">
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
      render: (_, { status, riderNo, userNo }) => (
        <Space>
          <Dropdown
            menu={{
              items: [
                {
                  key: "1",
                  label: "启用",
                  disabled: status === 1,
                  onClick: () => {
                    console.log(riderNo);
                    getAdminUserStatus({
                      status: status === 0 ? "1" : "0",
                      userNo: `${userNo}`
                    });
                    refresh();
                    message.success("通过审核");
                  }
                },
                {
                  key: "2",
                  disabled: status === 0,
                  label: "禁用",
                  onClick: () => {
                    console.log(riderNo);
                    getAdminUserStatus({
                      status: status === 0 ? "1" : "0",
                      userNo: `${userNo}`
                    });
                    refresh();
                    message.success("通过审核");
                  }
                }
              ]
            }}
          >
            <div>
              <Icon icon="gg:more-r" color="#955ce6" width="32" height="24" />
            </div>
          </Dropdown>
        </Space>
      )
    }
  ];
  return (
    <Wrapper>
      <div className="text-[24px] font-[500]">用户列表</div>
      <Form
        form={form}
        onFinish={onFinish}
        className="mt-[20px] flex flex-col border-b"
      >
        <Space wrap>
          <Form.Item name="riderNo" className=" w-[200px] h-[40px]">
            <Input
              type="text"
              placeholder="骑手编号"
              className="w-[200px] h-[40px]"
            />
          </Form.Item>
          <Form.Item name="userNo" className=" w-[200px] h-[40px]">
            <Input
              type="text"
              placeholder="用户编号"
              className=" w-[200px] h-[40px]"
            />
          </Form.Item>
          <Form.Item name="realname" className=" w-[200px] h-[40px]">
            <Input
              type="text"
              placeholder="真实姓名"
              className=" w-[200px] h-[40px]"
            />
          </Form.Item>
          <Form.Item name="idCardNo" className=" w-[200px] h-[40px]">
            <Input
              type="tel"
              placeholder="身份证号码"
              className="w-[200px] h-[40px]"
            />
          </Form.Item>
          <Form.Item name="mobileNumber" className=" w-[200px] h-[40px]">
            <Input
              type="tel"
              placeholder="手机号"
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
                { value: "1", label: "启用" },
                { value: "0", label: "禁用" }
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
        <Button
          type="primary"
          htmlType="submit"
          className="h-[40px] my-[20px]"
          // eslint-disable-next-line @typescript-eslint/no-confusing-void-expression
          onClick={() => navigate("/rider/cash")}
        >
          新增一位骑手
        </Button>
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
        rowKey="riderNo"
        dataSource={RiderList?.data.data.data}
        pagination={{
          total: RiderList?.data.data.count,
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

export default Riders;
