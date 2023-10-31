import { type FC } from "react";
import { Tabs } from "antd";
import type { TabsProps } from "antd";
import {
  Develop,
  Pay,
  Map,
  AlibabaCloud,
  WeCom
} from "./appComponent/AppComponent";

const App: FC = () => {
  const onChange = (key: string) => {
    // console.log(key);
  };

  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "开发设置",
      children: <Develop />
    },
    {
      key: "2",
      label: "支付设置",
      children: <Pay />
    },
    {
      key: "3",
      label: "地图设置",
      children: <Map />
    },
    {
      key: "4",
      label: "阿里云配置",
      children: <AlibabaCloud />
    },
    {
      key: "5",
      label: "企业微信配置",
      children: <WeCom />
    }
  ];
  return (
    <>
      <div className="text-[24px] font-bold-[500]">小程序设置</div>
      <div>
        <Tabs defaultActiveKey="1" items={items} onChange={onChange} />;
      </div>
    </>
  );
};

export default App;
