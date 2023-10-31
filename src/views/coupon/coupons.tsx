import { type FC, useEffect } from "react";
import { Icon } from "@iconify/react";
import { useRequest } from "ahooks";
import {
  Button,
  Dropdown,
  Form,
  Input,
  Select,
  Table,
  Tag,
  Tooltip,
  message
} from "antd";
import type { ColumnsType } from "antd/es/table";
import { useState } from "react";
import { adminCouponList, adminCouponStatus } from "@/service/api";
import { useNavigate } from "react-router-dom";

interface DataType {
  key: React.Key;
  name: string; // 优惠券名称
  ranges: string[]; // 适用范围
  money: string; // 优惠金额
  meet: string; // 满足条件
  day: string; // 有效天数
  recNumber: string; // 领取人数
  useNumber: string; // 使用人数
  tags: string[]; // 状态
  time: React.ReactElement; // 时间
  operate: React.ReactElement; // 操作
}

// 第一行标题内容
const columns: ColumnsType<DataType> = [
  {
    title: "优惠券名称",
    dataIndex: "name",
    key: "name"
  },
  {
    title: "适用范围",
    dataIndex: "range",
    key: "ranges",
    render: (_, { ranges }) => (
      <>
        {ranges.map((range) => {
          let color = "green";
          let title = "所有";
          if (range === "helpDeliver") {
            color = "cyan";
            title = "帮我送";
          } else if (range === "helpBuy") {
            color = "purple";
            title = "帮我买";
          } else if (range === "helpGet") {
            color = "blue";
            title = "帮我取";
          } else if (range === "hepGet") {
            color = "white";
            title = "";
          }
          return (
            <Tag color={color} key={range}>
              {title}
            </Tag>
          );
        })}
      </>
    )
  },
  {
    title: "优惠金额",
    dataIndex: "money",
    key: "money"
  },
  {
    title: "满足条件",
    dataIndex: "meet",
    key: "meet"
  },
  {
    title: "有效天数",
    dataIndex: "day",
    key: "day"
  },
  {
    title: "领取人数",
    dataIndex: "recNumber",
    key: "recNumber"
  },
  {
    title: "使用人数",
    dataIndex: "useNumber",
    key: "useNumber"
  },
  {
    title: "状态", // 0 :禁用  1：启用
    key: "tags",
    // dataIndex: "tags",
    render: (_, { tags }) => (
      <>
        {tags.map((tag) => {
          let color = "green";
          let title = "启用";
          if (tag === "0") {
            color = "volcano";
            title = "禁用";
          }
          return (
            <Tag color={color} key={tag}>
              {title}
            </Tag>
          );
        })}
      </>
    )
  },
  {
    title: "时间",
    dataIndex: "time",
    key: "time"
  },
  {
    title: "操作",
    dataIndex: "operate",
    key: "operate"
  }
];

const Coupons: FC = () => {
  const navigate = useNavigate();
  const [seek, setSeek] = useState({});
  // 请求并拿到数据  refresh修改数据刷新
  const [currentID, setCurrentID] = useState(1);
  const { data: adminCouponListData, refresh } = useRequest(
    async () =>
      await adminCouponList({ current: currentID, pageSize: 20, ...seek })
  );

  useEffect(() => {
    refresh();
  }, [refresh, seek]);

  // 禁用启用功能
  const disableEnableFn = (couponNo: string, status: string) => {
    adminCouponStatus({ couponNo, status })
      .then((res) => message.success(res.data.msg))
      .catch(() => message.error("修改状态失败"));
    refresh();
  };

  // 用户信息 dataPoop
  const dataPoop: DataType[] = [];
  // eslint-disable-next-line prettier/prettier
  adminCouponListData?.data.data?.data?.forEach((item: any, index: number) => {
    dataPoop.push({
      key: `${index}`,
      name: `${item.couponName}`,
      ranges: [`${item.conditionService}`],
      money: `${item.discountAmount}元`,
      meet: `${item.conditionsAmount}元`,
      day: `${
        item.deadlineDays === -1 ? "不限天数" : item.deadlineDays + "天"
      }`,
      recNumber: `${item.cumulativeUseNo}/${
        item.limitNumber === -1 ? "不限" : item.limitNumber
      }`,
      useNumber: `${item.cumulativeUseNo}/${item.cumulativeDrawNo}`,
      tags: [`${item.status}`], // 0 :禁用  1：启用
      time: (
        <div>
          <p className="m-0 text-[12px]">
            创建:{new Date(item.createTime).toLocaleString()}
          </p>
          <p className="m-0 text-[12px]">
            更新:{new Date(item.updateTime).toLocaleString()}
          </p>
        </div>
      ),
      operate: (
        <div className=" flex items-center text-[#955ce6]">
          <Tooltip title="操作人">
            <span>
              <Icon icon="fa6-solid:user-gear" />
            </span>
          </Tooltip>

          <Dropdown
            menu={{
              items: [
                {
                  key: "1",
                  label: "修改",
                  onClick: () => {
                    navigate("/coupon/coupons/update");
                  }
                },
                {
                  key: "2",
                  label: "启用",
                  disabled: item.status !== 0,
                  onClick: () => {
                    disableEnableFn(item.couponNo, "1");
                  }
                },
                {
                  key: "3",
                  label: "禁用",
                  disabled: item.status === 0,
                  onClick: () => {
                    disableEnableFn(item.couponNo, "0");
                  }
                }
              ]
            }}
            placement="bottom"
          >
            <span>
              <Icon
                icon="ri:more-fill"
                className="w-[32px] h-[24px] text-[20px] border-[1px] border-solid rounded-[4px] my-[4px] mx-[8px]"
              />
            </span>
          </Dropdown>
        </div>
      )
    });
  });
  // 多选框
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange
  };

  // 搜索
  const [form] = Form.useForm();
  const onFinish = (values: { couponName?: string }) => {
    setSeek(values);
  };
  const handleClear = () => {
    form.resetFields(); // 重置所有表单字段
    setSeek(() => {});
  };
  return (
    <div
      className="overflow-auto"
      style={{
        height: "calc(100vh - 60px - 60px)"
      }}
    >
      <h1 className="text-[24px] font-[500] mt-0">优惠券列表</h1>
      <Form form={form} onFinish={onFinish}>
        <div className=" flex flex-wrap">
          <Form.Item name="couponName">
            <Input
              placeholder="优惠券名称"
              className=" w-[200px] h-[40px] mr-[8px] mb-[8px]"
            />
          </Form.Item>
          <Form.Item name="conditionService">
            <Select
              placeholder="优惠券类型"
              style={{ width: 200, marginRight: 8, height: 40 }}
              options={[
                {
                  value: "ALL",
                  label: "类型: 全部类型"
                },
                {
                  value: "hepDeliver",
                  label: "类型: 帮我送"
                },
                {
                  value: "hepGet",
                  label: "类型: 帮我取"
                },
                {
                  value: "hepBuy",
                  label: "类型: 帮我买"
                }
              ]}
            />
          </Form.Item>
          <Form.Item name="status">
            <Select
              placeholder="状态"
              style={{ width: 200, height: 40 }}
              options={[
                {
                  value: "",
                  label: "状态: 全部"
                },
                {
                  value: "1",
                  label: "状态: 启用"
                },
                {
                  value: "0",
                  label: "状态: 禁用"
                }
              ]}
            />
          </Form.Item>
        </div>
        {/* 取消搜索按钮 */}
        <div className=" flex mt-[12px]">
          <Button
            className="w-[120px] h-[40px] mr-[4px]"
            htmlType="submit"
            onClick={handleClear}
          >
            取消
          </Button>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="w-[120px] h-[40px]"
            >
              搜索
            </Button>
          </Form.Item>
        </div>
      </Form>
      <div className=" w-[99%] h-[1px] my-[22px] bg-[#e8e8e8]" />
      {/* 添加优惠券 */}
      <div className=" flex items-center justify-between">
        <Button
          type="primary"
          className="h-[40px]"
          onClick={() => {
            navigate("/coupon/coupons/add");
          }}
        >
          添加优惠券
        </Button>
        <Button
          type="primary"
          ghost
          className=" w-[40px] h-[40px] items-center leading-[46px] p-0 mr-[5px]"
          onClick={handleClear}
        >
          <Icon
            icon="basil:refresh-outline"
            rotate={3}
            vFlip={true}
            className=" text-[20px] text-[#955ce6]"
          />
        </Button>
      </div>

      {/* 表格 */}
      <div className="mt-[22px]">
        <Table
          rowSelection={rowSelection}
          columns={columns}
          dataSource={dataPoop}
          bordered
          pagination={{
            showSizeChanger: true,
            showQuickJumper: true, // 快速跳转至某页
            defaultPageSize: 20,
            total: adminCouponListData?.data.data?.count, // 页数
            showTotal: (total) => `共 ${total} 条数据`,
            showPrevNextJumpers: true
          }}
          onChange={(page) => {
            setCurrentID(page.current!);
          }}
        />
      </div>
    </div>
  );
};

export default Coupons;
