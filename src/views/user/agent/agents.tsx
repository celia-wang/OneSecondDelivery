import { useEffect, type FC, useState } from "react";
import {
  Button,
  Form,
  Input,
  Select,
  Table,
  Tag,
  Tooltip,
  Dropdown,
  message
} from "antd";
import { Icon } from "@iconify/react";
import type { ColumnsType } from "antd/es/table";
import { broker, updateUserInfo, ResetPassword } from "@/service/api";
import { useRequest } from "ahooks";
import { useNavigate } from "react-router-dom";

const Agents: FC = () => {
  const Navigte = useNavigate();
  const [selectionType] = useState<"checkbox" | "radio">("checkbox");
  const [sift, setsift] = useState({}); // 筛选
  const [pagination, setpagination] = useState(1); // 分页
  // 转换日期
  const formatDate = (dateString: string) => {
    const originalDate = new Date(dateString);
    const year = originalDate.getFullYear();
    const month = (originalDate.getMonth() + 1).toString().padStart(2, "0");
    const day = originalDate.getDate().toString().padStart(2, "0");
    const hours = originalDate.getHours().toString().padStart(2, "0");
    const minutes = originalDate.getMinutes().toString().padStart(2, "0");
    return `${year}/${month}/${day} ${hours}:${minutes}`;
  };
  // 发送请求
  const { data: ageondata, run } = useRequest(
    async () =>
      await broker({
        current: pagination,
        pageSize: 20,
        ...sift
      })
  );
  const brokerData = ageondata?.data?.data?.data; // 表格数据

  useEffect(() => {
    run();
  }, [sift]);

  interface DataType {
    agentNo: string;
    agentAccount: string;
    mobileNumber: string;
    realName: string;
    status: number;
    createTime: string;
    updateTime: string;
    defaultPwd: string;
    updatedBy: string;
  }
  // 获取input的内容
  const onFinish = (values: any) => {
    setsift(values);
  };
  // 启用禁用
  const onFinishone = (agentNo: string, status: number) => {
    updateUserInfo(agentNo, status)
      .then(async () => {
        await message.success({
          content: "修改状态成功"
        });
        run();
      })
      .catch((err) => {
        alert(err);
      });
  };
  // 重置密码
  const resetpassword = (agentNo: string) => {
    ResetPassword(agentNo)
      .then(async () => {
        await message.success({
          content: "重置密码成功"
        });
      })
      .catch((err) => {
        alert(err);
      });
  };
  // 表格数据渲染
  const columns: ColumnsType<DataType> = [
    {
      title: "编号",
      dataIndex: "agentNo"
    },
    {
      title: "账号",
      dataIndex: "agentAccount",
      render: (text, record) => {
        return (
          <span>
            {record.agentAccount} <br />
            初始密码: {record.defaultPwd}
          </span>
        );
      }
    },
    {
      title: "手机号",
      dataIndex: "mobileNumber"
    },
    {
      title: "姓名",
      dataIndex: "realName"
    },
    {
      title: "状态",
      dataIndex: "status",
      render: (text) => {
        return (
          <Tag color={text === 1 ? "green" : "red"}>
            {text === 1 ? "启用" : "禁用"}
          </Tag>
        );
      }
    },
    {
      title: "时间",
      render: (text, record) => {
        return (
          <span>
            更新时间: {formatDate(record.updateTime)} <br />
            创建时间: {formatDate(record.createTime)}
          </span>
        );
      }
    },
    {
      title: "操作",
      render: (_, record) => {
        return (
          <div className="flex items-center">
            <Tooltip placement="top" title={"操作人"}>
              <Icon
                icon="fa-solid:user-cog"
                color="#955ce6"
                width="25"
                onClick={() => {
                  setsift("");
                  setsift({ agentNo: record.agentNo });
                  run();
                }}
              />
            </Tooltip>
            <Dropdown
              placement="bottom"
              className="ml-[10px]"
              dropdownRender={() => {
                return (
                  <div className="bg-[white] z-[999] flex flex-col items-start">
                    <Button
                      type="text"
                      onClick={() => {
                        Navigte(`/user/agent/edit/update/agentNo=${record.agentNo}&agentAccount=${record.agentAccount}&mobileNumber=${record.mobileNumber}
                      &realName=${record.realName}~&status=${record.status}&createTime=${record.createTime}&updatedBy=${record.updateTime}`);
                      }}
                    >
                      修改
                    </Button>
                    {record.status === 0 ? (
                      <Button
                        type="text"
                        onClick={() => {
                          onFinishone(record.agentNo, 1);
                        }}
                      >
                        启用
                      </Button>
                    ) : (
                      <Button
                        type="text"
                        disabled
                        onClick={() => {
                          onFinishone(record.agentNo, 1);
                        }}
                      >
                        启用
                      </Button>
                    )}
                    {record.status === 1 ? (
                      <Button
                        type="text"
                        onClick={() => {
                          onFinishone(record.agentNo, 0);
                        }}
                      >
                        禁用
                      </Button>
                    ) : (
                      <Button
                        type="text"
                        disabled
                        onClick={() => {
                          onFinishone(record.agentNo, 0);
                        }}
                      >
                        禁用
                      </Button>
                    )}
                    <Button
                      type="text"
                      onClick={() => {
                        resetpassword(record.agentNo);
                      }}
                    >
                      重置密码
                    </Button>
                  </div>
                );
              }}
            >
              <Button className="!text-[#955ce6] !text-[12px] font-bold">
                ...
              </Button>
            </Dropdown>
          </div>
        );
      }
    }
  ];
  return (
    <div className="p-[20px]">
      <div className="text-[24px] font-normal">代理列表</div>
      <div className="mt-[20px] flex">
        <Form
          name="basic"
          style={{ maxWidth: "100%" }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          autoComplete="off"
        >
          <div className="flex items-center">
            <Form.Item<DataType> name="agentNo">
              <Input
                size="large"
                placeholder="代理编号"
                className="w-[200px]"
              />
            </Form.Item>
            <Form.Item<DataType> name="agentAccount">
              <Input
                placeholder="账号"
                size="large"
                className="w-[200px] ml-[10px]"
              />
            </Form.Item>
            <Form.Item<DataType> name="mobileNumber">
              <Input
                placeholder="手机号"
                size="large"
                className="w-[200px] ml-[10px]"
              />
            </Form.Item>
            <Form.Item<DataType> name="realName">
              <Input
                placeholder="昵称"
                size="large"
                className="w-[200px]  ml-[10px]"
              />
            </Form.Item>
          </div>
          <Form.Item name="status" className="w-[200px] h-[40px] mr-[8px]">
            <Select placeholder="状态" className="!w-[200px] !h-[40px]">
              <Select.Option value="1">状态:启用</Select.Option>
              <Select.Option value="0">状态:禁用</Select.Option>
              <Select.Option>状态:全部</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item>
            <Button
              className="w-[120px] h-[40px]"
              onClick={() => {
                setsift("");
                run();
              }}
            >
              取消
            </Button>
            <Button
              type="primary"
              htmlType="submit"
              className="w-[120px] h-[40px] ml-[10px]"
            >
              搜索
            </Button>
          </Form.Item>
        </Form>
      </div>
      {/* 表格 */}
      <div
        style={{ backgroundColor: "#e8e8e8", height: "1px", width: "100%" }}
      />
      <div className="mt-[20px] w-[100%]">
        <div className="flex w-[100%] justify-between mt-[10px]">
          <Button
            type="primary"
            onClick={() => {
              Navigte("/user/agent/edit/add");
            }}
          >
            添加代理
          </Button>
          <button
            className="flex items-center justify-center border border-solid w-[30px] h-[30px] rounded-[6px] text-[30px] hover:border-[#b888f2] hover:text-[#b888f2] focus:border-[#b888f2] focus:text-[#b888f2]"
            onClick={() => {
              setsift("");
              run();
            }}
          >
            <Icon icon="ant-design:redo-outlined" />
          </button>
        </div>
        <Table
          bordered
          rowSelection={{
            type: selectionType
          }}
          columns={columns}
          dataSource={brokerData}
          pagination={{
            pageSize: 20,
            showQuickJumper: true,
            total: ageondata?.data.data.count,
            showTotal: (total) => `共 ${total} 条数据`,
            onChange: (page) => {
              setpagination(page);
              run();
            }
          }}
          className="mt-[20px]"
        />
      </div>
    </div>
  );
};

export default Agents;
