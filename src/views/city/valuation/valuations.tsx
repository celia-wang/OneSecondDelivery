/* eslint-disable no-console */
import type React from "react";
import { type FC, useState } from "react";
import { useRequest } from "ahooks";
import styled from "styled-components";
import { Icon } from "@iconify/react";
import type { MenuProps } from "antd";
import { Button, Input, Table, Dropdown, Popover } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useNavigate } from "react-router-dom";
import { getValuation } from "@/service/api";
// import { remove } from "js-cookie";

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
`;

interface DataType {
  key: React.Key;
  ruleName: string;
  distanceRule: string;
  weightRule: string;
  timeRule: string;
  time: React.ReactElement;
}

const Valuations: FC = () => {
  const { data } = useRequest(getValuation);
  const ValuationList: DataType[] = [];
  data?.data.data.data.forEach((vlist, index) => {
    ValuationList.push({
      key: index,
      ruleName: `${vlist.ruleName}`,
      distanceRule: `在${vlist.ruleContext.distance[0].gt}~${vlist.ruleContext.distance[0].lte}公里范围内，每1公里加价${vlist.ruleContext.distance[0].price}元`,
      weightRule: `在${vlist.ruleContext.weight[0].gt}~${vlist.ruleContext.weight[0].lte}公斤范围内，每1公斤加价${vlist.ruleContext.weight[0].price}元`,
      timeRule: `在${vlist.ruleContext.distance[0].gt}~${vlist.ruleContext.distance[0].lte}时间段内，加价${vlist.ruleContext.distance[0].price}元`,
      time: (
        <div>
          <div className=" text-[12px]">
            创建:
            {`${vlist.createTime.split("T")[0]} ${
              Number(vlist.createTime.split("T")[1].split(":")[0]) + 8 > 24
                ? Number(vlist.createTime.split("T")[1].split(":")[0]) + 8 - 24
                : Number(vlist.createTime.split("T")[1].split(":")[0]) + 8
            }:${vlist.createTime.split("T")[1].split(":")[1]}`}
          </div>
          <div className=" text-[12px]">更新:{vlist.updateTime}</div>
        </div>
      )
    });
  });

  console.log(ValuationList);

  const columns: ColumnsType<DataType> = [
    {
      title: "规则名称",
      dataIndex: "ruleName",
      key: "ruleName"
    },
    {
      title: "距离规则",
      dataIndex: "distanceRule",
      key: "distanceRule"
    },
    {
      title: "重量规则",
      dataIndex: "weightRule",
      key: "weightRule"
    },
    {
      title: "时间规则",
      dataIndex: "timeRule",
      key: "timeRule"
    },
    {
      title: "时间",
      dataIndex: "time",
      key: "time"
    },
    {
      title: "操作",
      key: "action",
      render: (_, record: { key: React.Key }) => (
        <Dropdown.Button
          menu={{
            items,
            onClick: onMenuClick
          }}
        >
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

  const onMenuClick: MenuProps["onClick"] = (e) => {
    console.log(e);
  };

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

  const nav = useNavigate();
  return (
    <Div className="h-[100%] overflow-auto">
      <div className="home-page-title font-[500] text-[24px]">计价规则列表</div>
      <div className=" mt-[20px]">
        <div className="flex justify-start flex-wrap">
          <div className="search-item">
            <Input placeholder="规则名称" className=" h-[40px] " />
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
          className="h-[40px]"
          onClick={() => {
            nav("/city/valuation/enit/add");
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
      {/* 表格 */}
      <div className="mt-[20px]">
        <Table
          bordered
          rowSelection={rowSelection}
          columns={columns}
          dataSource={ValuationList}
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

export default Valuations;
