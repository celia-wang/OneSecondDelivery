import { type FC } from "react";
import { Icon } from "@iconify/react";
import { DataOverview, OrderData } from "@/service/api";
import { useRequest } from "ahooks";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { DatePicker } from "antd";
import ReactECharts from "echarts-for-react";

const Home: FC = () => {
  const curDate = new Date();
  const currentYear = curDate.getFullYear(); // 获取当前年份
  const currentMonth = curDate.getMonth() + 1; // 获取当前月份（注意：月份从0开始，0表示一月）
  const currentDay = curDate.getDate();
  const beginDate = `${currentYear}${currentMonth}${currentDay}`;
  const dateFormat = "YYYY/MM/DD";
  const currentDate = dayjs();
  const { data: Overview } = useRequest(DataOverview);
  const numberdata = Overview?.data?.data; // 数据总览数据
  const { data: Order } = useRequest(
    async () => await OrderData({ beginDate: beginDate, endDate: beginDate })
  );
  const Orderdata = Order?.data?.data; // 订单数据
  const option = {
    title: {
      text: ""
    },
    tooltip: {
      trigger: "axis"
    },
    legend: {
      data: ["新增用户", "新增微信用户"]
    },
    grid: {
      left: "0%",
      right: "6%",
      bottom: "0%",
      top: "10%",
      containLabel: true
    },
    toolbox: {
      feature: {}
    },
    xAxis: {
      type: "category",
      boundaryGap: false,
      data: [
        "",
        currentDate.format("YYYY-MM-DD"),
        currentDate.format("YYYY-MM-DD")
      ]
    },
    yAxis: {
      type: "value",
      interval: 25,
      min: 0,
      max: 100
    },
    series: [
      {
        name: "wx",
        type: "line",
        stack: "Total",
        color: "green",
        data: ["", 0, 0, 0, 0, 0]
      }
    ]
  };
  //  数据总览
  const userdata: any = [
    {
      icon: <Icon icon="uiw:user" color="white" width="24" />,
      title: "总用户数",
      background: "linear-gradient(to bottom right,#f3af19,#ea6439)",
      txt: `${numberdata?.userTotal}人`,
      newdata: `${numberdata?.yesterdayUserTotal}人`
    },
    {
      icon: (
        <Icon
          icon="streamline:money-cash-bag-dollar-bag-payment-cash-money-finance"
          color="white"
          width="24"
        />
      ),
      title: "总盈利",
      background: "linear-gradient(to bottom right,#46aaf4,#385cf4)",
      txt: `${numberdata?.tradeTotal}元`,
      newdata: `${numberdata?.yesterdayTradeTotal}元`
    },
    {
      icon: <Icon icon="clarity:wallet-solid" color="white" width="24" />,
      title: "总交易额",
      background: "linear-gradient(to bottom right,#5ad4e0,#2299d2)",
      txt: `${numberdata?.incomeTotal}元`,
      newdata: `${numberdata?.yesterdayIncomeTotal}元`
    },
    {
      icon: <Icon icon="ep:checked" color="white" width="24" />,
      title: "订单完成量",
      background: "linear-gradient(to bottom right,#4ed855,#3ec296)",
      txt: `${numberdata?.orderCompleteTotal}元`,
      newdata: `${numberdata?.yesterdayOrderCompleteTotal}元`
    }
  ];
  //  订单数据
  const icon = [
    {
      icon: <Icon icon="ep:checked" color="white" width="20" />,
      title: "已完成",
      text: `${Orderdata?.complete}个`,
      background: "rgb(0, 204, 102)"
    },
    {
      icon: (
        <Icon icon="ant-design:file-done-outlined" width="20" color="white" />
      ),
      title: "待确认",
      text: `${Orderdata?.waitPay}个`,
      background: "rgb(255, 51, 0)"
    },
    {
      icon: <Icon icon="humbleicons:chat" color="white" width="20" />,
      title: "配送中",
      text: `${Orderdata?.sending}个`,
      background: "rgb(255, 102, 102)"
    },
    {
      icon: (
        <Icon icon="ant-design:file-done-outlined" width="20" color="white" />
      ),
      title: "待接单",
      text: `${Orderdata?.waitConfirm}个`,
      background: "rgb(255, 102, 51)"
    },
    {
      icon: <Icon icon="bxs:shopping-bags" color="white" width="20" />,
      title: "待支付",
      text: `${Orderdata?.waitReceive}个`,
      background: "rgb(0, 153, 255)"
    },
    {
      icon: <Icon icon="ci:file-close" color="white" width="20" />,
      title: "已取消",
      text: `${Orderdata?.cancel}个`,
      background: "rgb(170, 170, 170)"
    },
    {
      icon: <Icon icon="iconamoon:file-close" color="white" width="20" />,
      title: "已关闭",
      text: `${Orderdata?.close}个`,
      background: "rgb(51, 51, 51)"
    },
    {
      icon: <Icon icon="ri:coins-fill" color="white" width="20" />,
      title: "已退款",
      text: `${Orderdata?.refund}个`,
      background: "rgb(255, 102, 153)"
    }
  ];
  const { RangePicker } = DatePicker;
  const divStyle = {
    boxShadow: "0 0 5px 3px rgba(0,0,0,.05)"
  };
  dayjs.extend(customParseFormat);
  return (
    <div className="p-[20px]">
      <div className="text-[24px] font-bold text-[#333333]">数据总览</div>
      <div className="flex items-center justify-between mt-[30px]">
        {userdata.map((item: any) => {
          return (
            <div
              style={divStyle}
              className="h-[100px] w-[22%] relative rounded-[4px] text-[10px] flex justify-between px-[20px]"
              key={item.id}
            >
              <div
                className="flex items-center justify-center p-[15px] absolute left-5 top-[-10px] rounded-lg"
                style={{ backgroundImage: item.background }}
              >
                {item.icon}
              </div>
              <div className="text-[12px] text-[#666666] mt-[40px] text-center">
                <p>昨日新增</p>
                <p>{item.newdata}</p>
              </div>
              <div className="text-[14px] text-[#333333] p-[20px] text-center">
                <p>{item.title}</p>
                <p>{item.txt}</p>
              </div>
            </div>
          );
        })}
      </div>
      <div className="w-[100%] mt-5 flex justify-between">
        <div
          className="px-[20px] pt-[20px] pb-[20px] rounded-md w-[49.5%]"
          style={divStyle}
        >
          <p className="text-[20px] text-[#999]">用户数据曲线</p>
          <div className="flex items-center mt-4">
            <p className="text-[14px] text-[#333] pr-[10px]">
              按时间查询&nbsp;:
            </p>
            <RangePicker
              defaultValue={[
                dayjs(currentDate.format("YYYY-MM-DD"), dateFormat),

                dayjs(currentDate.format("YYYY-MM-DD"), dateFormat)
              ]}
              format={dateFormat}
              // onPanelChange={(value) => console.log(value)}
            />
          </div>
          <ReactECharts option={option} className="!h-[88%] !w-[100%] mt-5" />
        </div>
        <div
          className="px-[20px] pt-[20px] pb-[20px] rounded-md w-[49.5%]"
          style={divStyle}
        >
          <p className="text-[20px] text-[#999]">订单数据</p>
          <div className="flex items-center mt-2">
            <p className="text-[14px] text-[#333] pr-[10px]">
              按时间查询&nbsp;:
            </p>
            <RangePicker
              defaultValue={[
                dayjs(currentDate.format("YYYY-MM-DD"), dateFormat),
                dayjs(currentDate.format("YYYY-MM-DD"), dateFormat)
              ]}
              format={dateFormat}
            />
          </div>
          <div className="mt-[20px] flex items-center justify-between flex-wrap">
            {icon.map((item, index) => (
              <div
                className="h-[125px] w-[50%] flex items-center flex-col justify-center"
                key={index}
              >
                <div
                  className="rounded-tr-lg rounded-bl-lg h-[30px] w-[30px] flex items-center justify-center"
                  style={{ backgroundColor: item.background }}
                >
                  {item.icon}
                </div>
                <p className="text-[12px] text-[#999] mt-2">{item.title}</p>
                <p className="text-[18px] text-[#333]">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div
        className="w-[100%] mt-5 px-[20px] pt-[20px] pb-[20px] rounded-md"
        style={divStyle}
      >
        <p className="text-[20px] text-[#999]">订单数据曲线</p>
        <div className="flex items-center mt-2">
          <p className="text-[14px] text-[#333] pr-[10px]">按时间查询&nbsp;:</p>
          <RangePicker
            defaultValue={[
              dayjs(currentDate.format("YYYY-MM-DD"), dateFormat),
              dayjs(currentDate.format("YYYY-MM-DD"), dateFormat)
            ]}
            format={dateFormat}
          />
        </div>
        <ReactECharts option={option} />
      </div>
    </div>
  );
};

export default Home;
