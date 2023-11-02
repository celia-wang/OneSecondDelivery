/* eslint-disable no-console */
import { type FC, useState } from "react";
import { useRequest } from "ahooks";
import styled from "styled-components";
import { Icon } from "@iconify/react";
import type { MenuProps } from "antd";
import { Button, Input, Table, Dropdown, Popover } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useNavigate } from "react-router-dom";
import { getWeight } from "@/service/api";

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
  tagName: string;
  weightTag: string;
  time: React.ReactElement;
}

const onMenuClick: MenuProps["onClick"] = (e) => {
  console.log("click", e);
};
const items = [
  {
    key: "1",
    label: "修改"
  },
  {
    key: "2",
    label: "删除"
  }
];

const Weight: FC = () => {
  // 时间转换
  const formatDate = (dateString: string) => {
    const originalDate = new Date(dateString);
    const year = originalDate.getFullYear();
    const month = (originalDate.getMonth() + 1).toString().padStart(2, "0");
    const day = originalDate.getDate().toString().padStart(2, "0");
    const hours = originalDate.getHours().toString().padStart(2, "0");
    const minutes = originalDate.getMinutes().toString().padStart(2, "0");
    return `${year}/${month}/${day} ${hours}:${minutes}`;
  };
  const { data } = useRequest(getWeight);

  const columns: ColumnsType<DataType> = [
    {
      title: "标签名称",
      dataIndex: "tagName",
      key: "tagName"
    },
    {
      title: "重量标签",
      dataIndex: "weightTag",
      key: "weightTag"
    },
    {
      title: "时间",
      dataIndex: "time",
      key: "time"
    },
    {
      title: "操作",
      key: "action",
      render: (_, record) => (
        <Dropdown.Button menu={{ items, onClick: onMenuClick }}>
          <Popover title="操作人">
            <Icon
              icon="clarity:administrator-solid"
              className="text-[#955ce6]"
            />
          </Popover>
        </Dropdown.Button>
      )
    }
  ];

  const WeightList: DataType[] = [];
  data?.data.data.data.forEach((wlist) => {
    WeightList.push({
      tagName: `${wlist?.tagName}`,
      weightTag: `${wlist?.tags[0]?.label}`,
      time: (
        <div>
          <div className=" text-[12px]">
            创建:{formatDate(wlist?.createTime)}
          </div>
          <div className=" text-[12px]">
            更新:{formatDate(wlist?.updateTime)}
          </div>
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
  const nav = useNavigate();
  return (
    <Div className="h-[100%] overflow-auto">
      <div className="home-page-title font-[500] text-[24px]">重量标签列表</div>
      <div className=" mt-[20px]">
        <div className="flex justify-start flex-wrap">
          <div className="search-item">
            <Input placeholder="标签列表" className=" h-[40px] " />
          </div>
        </div>
        <div className=" mt-[12px]">
          <Button className="w-[120px] h-[40px] mr-[5px]">取消</Button>
          <Button type="primary" className="w-[120px] h-[40px]">
            搜索
          </Button>
        </div>
        <div
          role="separator"
          className="ant-divider ant-divider-horizontal"
        ></div>
      </div>
      <div className="flex justify-between item-center">
        <Button
          type="primary"
          className=" h-[40px]"
          onClick={() => {
            nav("/city/weight/enit/add");
          }}
        >
          添加重量标签
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
          dataSource={WeightList}
          pagination={{
            showQuickJumper: true,
            pageSize: 20,
            showSizeChanger: false,
            showTotal: (total) => `共 ${total} 条数据`
          }}
        />
      </div>
    </Div>
  );
};

export default Weight;
