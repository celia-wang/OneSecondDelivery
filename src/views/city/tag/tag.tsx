/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { type FC, useState, useEffect } from "react";
import { useRequest } from "ahooks";
import styled from "styled-components";
import { Icon } from "@iconify/react";
// import type { MenuProps } from "antd";
import { Button, Input, Table, Dropdown, Popover, message, Form } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useNavigate } from "react-router-dom";
import { getTag, getTagDel } from "@/service/api";
import { useForm } from "antd/es/form/Form";

const Div = styled.div`
  .search-item {
    width: 200px;
    margin-right: 8px;
    margin-bottom: 8px;
  }
  .ant-divider-horizontal {
    display: block;
    clear: both;
    width: 100%;
    min-width: 100%;
    height: 1px;
    margin: 24px 0;
    background: #e8e8e8;
  }
  .ant-btn-primary {
    color: #fff;
    background-color: #955ce6;
    border-color: #955ce6;
    text-shadow: 0 -1px 0 rgba(0, 0, 0, 0.12);
    box-shadow: 0 2px 0 rgba(0, 0, 0, 0.045);
  }
  .ant-btn-compact-first-item {
    border: none;
  }
  .ant-dropdown-trigger {
    color: #955ce6;
    border-color: #955ce6;
    text-shadow: 0 -1px 0 rgba(0, 0, 0, 0.12);
    box-shadow: 0 2px 0 rgba(0, 0, 0, 0.045);
  }
`;
interface DataType {
  groupName: string;
  tag: string;
  time: React.ReactElement;
  id: number;
}
const items = [
  {
    key: "1",
    label: " 修改"
  },
  {
    key: "2",
    label: "删除"
  }
];
const Tag: FC = () => {
  const [form] = useForm();
  const [currents, setCurrent] = useState<number>(1);
  const [groupName, setGroupName] = useState<string | null | undefined>(null);
  useEffect(() => {
    refresh();
  }, [groupName]);
  const { data, refresh } = useRequest(
    async () => await getTag({ pageSize: 20, current: currents, groupName })
  );
  // 表头
  const columns: ColumnsType<DataType> = [
    {
      title: "标签组名称",
      dataIndex: "groupName",
      key: "groupName"
    },
    {
      title: "标签",
      dataIndex: "tag",
      key: "tag"
    },
    {
      title: "时间",
      dataIndex: "time",
      key: "time"
    },
    {
      title: "操作",
      key: "action",
      dataIndex: "id",
      render: (_, record) => (
        <Dropdown.Button
          menu={{
            items,
            onClick: (ev) => {
              onMenuClick(ev, record.id);
            }
          }}
          // style={{ flex: "flex", justifyContent: "center" }}
        >
          <Popover>
            <Icon
              icon="clarity:administrator-solid"
              className="text-[#955ce6]"
            />
          </Popover>
        </Dropdown.Button>
      )
    }
  ];

  // 数据
  const TagList: DataType[] = [];
  data?.data.data.data.forEach((tlist: any) => {
    TagList.push({
      id: tlist?.id,
      groupName: `${tlist?.groupName}`,
      tag: `${tlist?.tags[0]}`,
      time: (
        <div>
          <div className=" text-[12px]">创建:{tlist?.createTime}</div>
          <div className=" text-[12px]">更新:{tlist?.updateTime}</div>
        </div>
      )
    });
  });
  const [loadings, setLoadings] = useState<boolean[]>([]);
  const enterLoading = (index: number) => {
    setLoadings((prevLoadings) => {
      const newLoadings = [...prevLoadings];
      newLoadings[index] = true;
      return newLoadings;
    });

    setTimeout(() => {
      setLoadings((prevLoadings) => {
        const newLoadings = [...prevLoadings];
        newLoadings[index] = false;
        return newLoadings;
      });
    }, 6000);
  };

  // 多选框
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange
  };
  // 修改删除
  const onMenuClick = (e: any, id: number) => {
    if (e.key === "1") {
      console.log("修改");
    } else if (e.key === "2") {
      console.log("删除");
      getTagDel({ id })
        .then(async () => {
          refresh();
          await message.success("删除成功");
        })
        .catch(async () => await message.error("删除失败"));
    }
  };
  // 搜索
  const onFinish = (vul: { groupName: string }) => {
    console.log(vul.groupName);
    setGroupName(vul.groupName);
    refresh();
  };
  // 重置
  const onReset = () => {
    form.resetFields();
  };
  const nav = useNavigate();
  return (
    <Div className="h-[100%] overflow-auto">
      <div className="home-page-title font-[500] text-[24px]">
        物品标签组列表
      </div>
      <Form name="basic" onFinish={onFinish} autoComplete="off" form={form}>
        <Form.Item name="groupName">
          <Input
            placeholder="规则名称"
            className="w-[200px] mt-[20px] h-[40px]"
          />
        </Form.Item>
        <Form.Item>
          <Button className="w-[120px] h-[40px] mr-[5px]" onClick={onReset}>
            取消
          </Button>
          <Button
            type="primary"
            htmlType="submit"
            className="w-[120px] h-[40px] "
          >
            搜索
          </Button>
        </Form.Item>
      </Form>
      <div className="flex justify-between item-center">
        <Button
          type="primary"
          className="h-[40px]"
          onClick={() => {
            nav("/city/tag/enit/add");
          }}
        >
          添加计价规则
        </Button>
        <Button
          icon={<Icon icon="iconoir:refresh" />}
          loading={loadings[2]}
          onClick={() => {
            enterLoading(2);
          }}
        />
      </div>
      <div className="mt-[20px]">
        <Table
          bordered
          rowSelection={rowSelection}
          columns={columns}
          dataSource={TagList}
          rowKey="userNo"
          pagination={{
            showQuickJumper: true,
            pageSize: 20,
            showSizeChanger: false,
            showTotal: (total) => `共 ${total} 条数据`,
            onChange: (page) => {
              setCurrent(page);
            }
          }}
        />
      </div>
    </Div>
  );
};

export default Tag;
