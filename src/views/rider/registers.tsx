/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-floating-promises */
import { type FC, useState, useEffect, useRef } from "react";
import { useRequest } from "ahooks";
import {
  getRiderAuditList,
  getAdminRiderPass,
  getAdminRideRefuse
} from "@/service/api";
import {
  Button,
  Divider,
  Dropdown,
  Form,
  Input,
  Modal,
  Select,
  Space,
  Table,
  Tag
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

const Registers: FC = () => {
  const [form] = Form.useForm();
  const [currentID, setCurrentID] = useState(1);
  const [Search, setSearchCondition] = useState({}); // 查找
  const Ref: any = useRef(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectionType] = useState<"checkbox">("checkbox");
  const [UserNo, getUserNo] = useState("");
  const navigate = useNavigate();
  const { data: RiderAuditList, refresh } = useRequest(
    async () =>
      await getRiderAuditList({ current: currentID, pageSize: 20, ...Search })
  );
  useEffect(() => {
    refresh();
  }, [currentID, Search]);
  const onFinish = (values: { userNo?: string }) => {
    setSearchCondition(values);
  };
  const handleClear = () => {
    form.resetFields(); // 重置所有表单字段
    setSearchCondition(() => {});
  };

  const showModal = (userNo: string) => {
    setIsModalOpen(true);
    getUserNo(userNo);
  };
  const handleOk = async () => {
    await getAdminRideRefuse({
      refuseReason: Ref.current.input.value,
      userNo: UserNo
    });
    setIsModalOpen(false);
    refresh();
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const columns: ColumnsType<Res.TRiderAuditList2> = [
    {
      key: "userNo",
      title: "用户编号",
      dataIndex: "userNo",
      render: (_, { userNo }) => (
        <div className="text-[14px] whitespace-nowrap">{userNo}</div>
      )
    },
    {
      key: "realname",
      title: "姓名",
      // dataIndex: "realname",
      render: (_, { realname }) => (
        <div className=" text-[14px] whitespace-nowrap ">{realname}</div>
      )
    },
    {
      key: "idCardNo",
      title: "身份号码",
      // dataIndex: "idCardNo",
      render: (_, { idCardNo }) => (
        <div className=" text-[14px] whitespace-nowrap ">{idCardNo}</div>
      )
    },
    {
      key: "avatarFaceImage",
      title: "身份证头像照片",
      // dataIndex: "avatarFaceImage",
      render: (_, { nationalFaceImage }) => (
        <img
          src={nationalFaceImage}
          alt=""
          className="min-w-[150px] w-[150px]  min-h-[100px] h-[100px]"
        />
      )
    },
    {
      key: "nationalFaceImage",
      title: "身份证国徽照片",
      // dataIndex: "nationalFaceImage",
      render: (_, { nationalFaceImage }) => (
        <img
          src={nationalFaceImage}
          alt=""
          className="min-w-[150px] w-[150px]  min-h-[100px] h-[100px]"
        />
      )
    },
    {
      key: "status",
      title: "状态",
      // dataIndex: "status",
      render: (_, { status, refuseReason }) => (
        <div className="text-[14px]">
          {status === 2 ? (
            <div>
              <Tag color="red">未通过</Tag>
              <p className="text-[#ccc] text-[12px]">{refuseReason}</p>
            </div>
          ) : null}
          {status === 1 ? <Tag color="green">启用</Tag> : null}
        </div>
      )
    },

    {
      key: "time",
      title: "时间",
      // dataIndex: "time",
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
      render: (_, { status, userNo }) => (
        <Space>
          <Dropdown
            menu={{
              items: [
                {
                  key: "1",
                  label: "通过审核",
                  disabled: status === 1,
                  onClick: () => {
                    getAdminRiderPass({ userNo: `${userNo}` });
                    refresh();
                  }
                },
                {
                  key: "2",
                  disabled: status === 2,
                  label: "拒绝通过",
                  onClick: () => {
                    showModal(userNo);
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
      <div className="text-[24px] font-[500]">骑手列表</div>
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
          onClick={() => navigate("/rider/edit/add")}
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
      <div className="w-[100%] overflow-x-auto cursor-pointer">
        <Table
          bordered
          rowSelection={{
            type: selectionType
          }}
          columns={columns}
          rowKey="userNo"
          dataSource={RiderAuditList?.data.data}
          pagination={{
            total: RiderAuditList?.data.count,
            pageSize: 20,
            showSizeChanger: false,
            showQuickJumper: true,
            showTotal: (total) => `共 ${total} 条数据`
          }}
          onChange={(page) => {
            setCurrentID(page.current!);
          }}
        />
      </div>
      <Modal
        title="拒绝理由"
        open={isModalOpen}
        onOk={handleOk}
        okText="确定"
        cancelText="取消"
        onCancel={handleCancel}
      >
        <Divider className="m-0" />
        <Input
          ref={Ref}
          placeholder="请输入拒绝理由"
          className="my-[20px] h-[40px]"
        />
        <Divider className="m-0" />
      </Modal>
    </Wrapper>
  );
};

export default Registers;
