/* eslint-disable no-console */
import type React from "react";
import { type FC, useState, useEffect } from "react";
import { useRequest } from "ahooks";
import styled from "styled-components";
import { Icon } from "@iconify/react";
import { Button, Input, Table, Dropdown, Form, Tooltip, message } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useNavigate } from "react-router-dom";
import { getValuation, delValuation } from "@/service/api";
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
  key: React.Key;
  id: number;
  ruleName: string;
  distanceRule: string;
  weightRule: string;
  timeRule: React.ReactElement | string;
  time: React.ReactElement;
}
interface FieldType {
  ruleName?: string;
}

const del = (id: number) => {
  delValuation({ id })
    .then(() => {
      void message.success("删除成功");
    })
    .catch(() => {
      void message.error("删除失败");
    });
};

const Valuations: FC = () => {
  const [form] = useForm();
  // 筛选
  const [screen, setScreen] = useState({});
  // 获取输入框
  const onFinish = (values: any) => {
    console.log(values);
    setScreen(values);
  };
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
  const Hours = (dateNumber: number) => {
    const h = 8;
    const originalDate = new Date(dateNumber);
    const hours =
      Number(originalDate.getHours().toString().padStart(0, "0")) - h < 0
        ? Number(originalDate.getHours().toString().padStart(0, "0")) - h + 24
        : Number(originalDate.getHours().toString().padStart(0, "0")) - h;
    return `${hours}`;
  };

  const { data, refresh } = useRequest(
    async () =>
      await getValuation({
        current: 1,
        pageSize: 20,
        ...screen
      })
  );
  useEffect(() => {
    refresh();
  }, [screen]);

  const ValuationList: DataType[] = [];
  data?.data?.data?.data?.forEach((vlist, index) => {
    ValuationList.push({
      key: index,
      id: vlist.id,
      ruleName: vlist.ruleName,
      distanceRule: `${
        vlist?.ruleContext?.distance[0]?.gt !== undefined
          ? `在${vlist?.ruleContext?.distance[0]?.gt}~${vlist?.ruleContext?.distance[0]?.lte}公里范围内,每${vlist?.ruleContext?.distance[0]?.unitDistance}公里加价${vlist?.ruleContext?.distance[0]?.price}元`
          : ""
      }`,
      weightRule: `${
        vlist?.ruleContext?.weight[0]?.lte !== undefined
          ? `在${vlist?.ruleContext?.weight[0]?.gt}~${vlist?.ruleContext?.weight[0]?.lte}公斤范围内，每${vlist?.ruleContext?.weight[0]?.unitWeight}公斤加价${vlist?.ruleContext?.weight[0]?.price}元`
          : ""
      }`,
      timeRule:
        vlist?.ruleContext?.time[0] !== undefined ? (
          <div>
            在{Hours(vlist?.ruleContext?.time[0]?.gt)}~
            {Hours(vlist?.ruleContext?.time[0]?.lte)}时间段内，加价
            {vlist?.ruleContext?.time[0]?.price}元
          </div>
        ) : (
          ""
        ),
      time: (
        <div>
          <div className=" text-[12px]">
            创建:{formatDate(vlist?.createTime)}
          </div>
          <div className=" text-[12px]">
            更新:{formatDate(vlist?.updateTime)}
          </div>
        </div>
      )
    });
  });

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
      render: (_, record) => (
        <Dropdown.Button
          dropdownRender={() => {
            return (
              <div className="flex flex-col items-center bg-white">
                <Button
                  type="text"
                  onClick={() => {
                    del(record.id);
                    refresh();
                  }}
                >
                  删除
                </Button>
                <Button type="text">修改</Button>
              </div>
            );
          }}
        >
          <Tooltip title="操作人">
            <Icon
              icon="clarity:administrator-solid"
              className="text-[#955ce6]"
            />
          </Tooltip>
        </Dropdown.Button>
      )
    }
  ];

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
    }, 1000);
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
  // 重置
  const onReset = () => {
    form.resetFields();
    setScreen("");
    refresh();
  };
  const nav = useNavigate();
  return (
    <Div className="h-[100%] overflow-auto">
      <div className="home-page-title font-[500] text-[24px]">计价规则列表</div>
      <Form name="basic" onFinish={onFinish} autoComplete="off" form={form}>
        <Form.Item<FieldType> name="ruleName">
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
      <div
        role="separator"
        className="ant-divider ant-divider-horizontal"
      ></div>
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
            onReset();
            // run({
            //   current: 0,
            //   pageSize: 0
            // });
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
