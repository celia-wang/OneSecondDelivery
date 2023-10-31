/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { useEffect, type FC, useState } from "react";
import {
  Button,
  Form,
  Input,
  Select,
  Table,
  Tag,
  Dropdown,
  message
} from "antd";
import { Icon } from "@iconify/react";
import type { ColumnsType } from "antd/es/table";
import { ListUsers, updateUsers } from "@/service/api";
import { useRequest } from "ahooks";

const users: FC = () => {
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
  const { data, run } = useRequest(
    async () =>
      await ListUsers({
        current: pagination,
        pageSize: 20,
        ...sift
      })
  );
  const ListUsersData = data?.data?.data?.data; // 表格数据
  useEffect(() => {
    run();
  }, [sift]);

  interface DataType {
    id: number;
    createTime: string;
    updateTime: string;
    userNo: string;
    countryCode: string;
    mobileNumber: string;
    avatarUrl: string;
    nickName: string;
    gender: number;
    province: string;
    city: string;
    area: object;
    status: number;
    homeAddressNo: object;
    companyAddressNo: object;
  }
  // 获取input的内容
  const onFinish = (values: any) => {
    setsift(values);
  };
  // 启用禁用
  const onFinishone = (userNo: string, status: number) => {
    updateUsers(userNo, status)
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
  // 表格数据渲染
  const columns: ColumnsType<any> = [
    {
      title: "编号",
      dataIndex: "userNo"
    },
    {
      title: "头像",
      dataIndex: "avatarUrl",
      render: (text, record) => {
        return (
          <img
            src={record.avatarUrl}
            alt=""
            className="h-[40px] w-[40px] rounded-[50%]"
          />
        );
      }
    },
    {
      title: "昵称",
      dataIndex: "nickName"
    },
    {
      title: "手机号",
      dataIndex: "mobileNumber"
    },
    {
      title: "地区",
      render: (text, record) => {
        return (
          <p>
            {record.province ? record.province : "---"}&nbsp;{record.city}
          </p>
        );
      }
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
            <Dropdown
              placement="bottom"
              className="ml-[10px]"
              dropdownRender={() => {
                return (
                  <div className="bg-[white] z-[999] flex flex-col items-start">
                    {record.status === 0 ? (
                      <Button
                        type="text"
                        onClick={() => {
                          onFinishone(record.userNo, 1);
                          run();
                        }}
                      >
                        启用
                      </Button>
                    ) : (
                      <Button
                        type="text"
                        disabled
                        onClick={() => {
                          onFinishone(record.userNo, 1);
                          run();
                        }}
                      >
                        启用
                      </Button>
                    )}
                    {record.status === 1 ? (
                      <Button
                        type="text"
                        onClick={() => {
                          onFinishone(record.userNo, 0);
                        }}
                      >
                        禁用
                      </Button>
                    ) : (
                      <Button
                        type="text"
                        disabled
                        onClick={() => {
                          onFinishone(record.userNo, 0);
                        }}
                      >
                        禁用
                      </Button>
                    )}
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
      <div className="text-[24px] font-normal">用户列表</div>
      <div className="mt-[20px] flex">
        <Form
          name="basic"
          style={{ maxWidth: "100%" }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          autoComplete="off"
        >
          <div className="flex items-center">
            <Form.Item<DataType> name="userNo">
              <Input
                size="large"
                placeholder="用户编号"
                className="w-[200px]"
              />
            </Form.Item>
            <Form.Item<DataType> name="nickName">
              <Input
                placeholder="昵称"
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
            <Form.Item<DataType> name="nickName">
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
        <div className="flex w-[100%] justify-end mt-[10px]">
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
          dataSource={ListUsersData}
          pagination={{
            pageSize: 20,
            showQuickJumper: true,
            total: data?.data.data.count,
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

export default users;
