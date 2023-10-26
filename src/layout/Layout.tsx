/* eslint-disable @typescript-eslint/consistent-type-assertions */
import { type FC, useMemo, useState } from "react";
import { Outlet, useNavigate, Navigate } from "react-router-dom";
import styled from "styled-components";
import type { MenuProps } from "antd";
import { Menu, Layout, Popover } from "antd";
import { Icon } from "@iconify/react";
import checkPermission from "@/utils/checkPermission";

const Wrapper = styled.div`
  .ant-menu-item::after {
    transform: scaleY(1);
    transition:
      transform 0.15s cubic-bezier(0.645, 0.045, 0.355, 1),
      opacity 0.15s cubic-bezier(0.645, 0.045, 0.355, 1);
    background-color: #955ce6;
    display: block;
    width: 3px;
    height: 40px;
    bottom: 0;
    content: "";
    opacity: 1;
    position: absolute;
    right: 0;
    top: 0;
  }
  .ant-menu-item:hover {
    color: #955ce6 !important;
    background-color: transparent !important;
  }
  .ant-menu-item-selected {
    border-right: 2px solid #955ce6 !important;
  }
  .ant-menu-item {
    border-radius: unset !important;
  }
  .ant-layout-sider-children {
    height: 603.2px;
    width: 200px;
    overflow-y: auto;
  }
  .ant-layout-sider-children::-webkit-scrollbar {
    width: 5px; /* 设置垂直滚动条的宽度 */
  }
  .ant-layout-sider-children::-webkit-scrollbar-thumb {
    background-color: #eeeeee; /* 设置滚动条滑块颜色 */
    border-radius: 5px; /* 设置滑块的圆角半径 */
  }
  .ant-layout-sider-children {
    overflow-x: hidden; /* 隐藏垂直方向的滚动条 */
  }
`;

const layout: FC = () => {
  const navigate = useNavigate();

  // 路径
  const UrlArr = [
    "/",
    "/user/agent/agents",
    "/user/admins",
    "/user/users",
    "/order/orders",
    "/order/capitaltrend",
    "/order/cancelset",
    "/order/feeset",
    "/rider/riders",
    "/rider/registers",
    "/city/citys",
    "/city/valuation/valuations",
    "/city/weight/weight",
    "/city/tag/tag",
    "/coupon/coupons",
    "/coupon/setting",
    "/rider/cash",
    "/config/cash",
    "/config/app",
    "/config/share",
    "/config/integral",
    "/config/wxsubscribe",
    "/config/user",
    "/config/rider",
    "/config/agreementRider"
  ];
  // 侧边导航栏
  type MenuItem = Required<MenuProps>["items"][number];

  function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
    type?: "group"
  ): MenuItem {
    return {
      key,
      icon,
      children,
      label,
      type
    } as MenuItem;
  }

  const items: MenuProps["items"] = [
    getItem("数据总览", "sub1", <Icon icon="vaadin:dashboard" />),

    getItem("用户管理", "sub2", <Icon icon="fa:id-card" />, [
      getItem("代理列表", "1"),
      getItem("管理员列表", "2"),
      getItem("用户列表", "3")
    ]),

    getItem("订单管理", "sub3", <Icon icon="mingcute:drawer-fill" />, [
      getItem("订单列表", "4"),
      getItem("资金走向列表", "5"),
      getItem("取消订单配置", "6"),
      getItem("消费选项配置", "7")
    ]),

    getItem("骑手管理", "sub4", <Icon icon="mdi:truck" />, [
      getItem("骑手列表", "8"),
      getItem("骑手审核列表", "9")
    ]),

    getItem("城市管理", "sub5", <Icon icon="solar:city-bold" />, [
      getItem("运营城市列表", "10")
    ]),

    getItem(
      "运营管理",
      "sub6",
      <Icon icon="material-symbols:folder-managed" />,
      [
        getItem("计价规则", "11"),
        getItem("重量标签", "12"),
        getItem("物品标签组", "13")
      ]
    ),

    getItem("优惠券管理", "sub7", <Icon icon="icon-park-solid:coupon" />, [
      getItem("优惠券列表", "14"),
      getItem("优惠券设置", "15")
    ]),

    getItem("提现管理", "sub8", <Icon icon="jam:pictures-f" />, [
      getItem("提现列表", "16"),
      getItem("提现设置", "17")
    ]),

    getItem("系统设置", "sub9", <Icon icon="ic:sharp-settings" />, [
      getItem("小程序设置", "18"),
      getItem("分享设置", "19"),
      getItem("积分设置", "20"),
      getItem("订阅消息设置", "21"),
      getItem("用户指南", "22"),
      getItem("骑手指南", "23"),
      getItem("骑手协议", "24")
    ])
  ];
  const subsMap = [
    { range: [1, 4], subs: "sub2" },
    { range: [4, 8], subs: "sub3" },
    { range: [8, 10], subs: "sub4" },
    { range: [10, 11], subs: "sub5" },
    { range: [11, 14], subs: "sub6" },
    { range: [14, 16], subs: "sub7" },
    { range: [16, 18], subs: "sub8" },
    { range: [18, 24], subs: "sub9" }
  ];
  let keys: any;
  let subs;
  for (const item of subsMap) {
    const [start, end] = item.range;
    if (keys >= start && keys < end) {
      subs = item.subs;
      break;
    }
  }

  // 样式
  const { Header, Sider, Content } = Layout;
  const layoutStyle = {
    width: "100vw",
    minWidth: "1200px",
    height: "100vh",
    backgroundColor: "#f3f3f3",
    overflow: "hidden"
  };

  const headerStyle = {
    width: "100vw",
    minWidth: "1200px",
    height: 60,
    backgroundColor: "#fff",
    padding: "0 20px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between"
  };

  const contentStyle: React.CSSProperties = {
    width: "calc(100vw - 40px - 20px - 200px)",
    minWidth: "calc(1200px - 40px - 20px - 200px)",
    height: "calc(100vh - 60px - 40px)",
    position: "absolute",
    top: 80,
    left: 240,
    backgroundColor: "#fff",
    borderRadius: 4,
    padding: 20
  };

  const siderStyle: React.CSSProperties = {
    paddingTop: 12,
    position: "absolute",
    width: 200,
    height: "calc(100vh - 60px - 40px)",
    left: 20,
    top: 80,
    borderRadius: 4,
    backgroundColor: "#ffffff"
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onClick = (e: any) => {
    if (e.key === "sub1") {
      navigate("");
    } else {
      navigate(UrlArr[Number(e.key)]);
    }
  };

  // 右上角个人信息弹窗
  const content = (
    <div className="h-[238px] w-[240px] m-[-12px]">
      <div className="h-[88px] w-[100%] bg-gradient-to-r from-[#667BD0] to-[#D9A0FE] flex justify-between items-center rounded-t-[3px]">
        <div className="h-[50px] pl-[15px]">
          <div className="flex text-[20px] text-[#fff]">
            <p className="mr-[10px]">Info.realName</p>
            <p>Info.mobileNumber</p>
          </div>
          <div className="text-[#fff]">NO:Info.adminNo</div>
        </div>
      </div>
      <div className="w-[100%] border-b">
        <div
          className="h-[50px] pl-[10px] w-[100%] flex items-center justify-start cursor-pointer hover:bg-[#F3F3F3]"
          onClick={() => {
            navigate("/user/update");
          }}
        >
          <Icon icon="ic:sharp-settings" />
          <div>个人设置</div>
        </div>
        <div
          className="h-[50px] pl-[10px] w-[100%] flex items-center justify-start cursor-pointer hover:bg-[#F3F3F3]"
          onClick={() => {
            navigate("/user/pwd");
          }}
        >
          <Icon icon="ph:lock-key-fill" />
          <div>修改密码</div>
        </div>
      </div>
      <div className="h-[50px] w-[100%] pl-[30px] cursor-pointer flex items-center justify-start hover:bg-[#F3F3F3]">
        退出登录
      </div>
    </div>
  );
  const [showArrow] = useState(true);
  const [arrowAtCenter] = useState(false);
  const mergedArrow = useMemo(() => {
    if (arrowAtCenter) return { pointAtCenter: true };
    return showArrow;
  }, [showArrow, arrowAtCenter]);
  return checkPermission() ? (
    <div>
      <Wrapper className="bg-[#F3F3F3]">
        <Layout style={layoutStyle}>
          <Header style={headerStyle}>
            {/* 头部 */}
            <div className="bg-[#fff] h-[60px] min-w-[1200px] px-[20px] w-screen flex items-center justify-between">
              <div className="flex items-center justify-start">
                <svg
                  data-v-46a7d9ae=""
                  viewBox="0 0 45 30"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-[30px]"
                >
                  <path
                    d="M24.7203 29.704H41.1008C41.6211 29.7041 42.1322 29.5669 42.5828 29.3061C43.0334 29.0454 43.4075 28.6704 43.6675 28.2188C43.9275 27.7672 44.0643 27.2549 44.0641 26.7335C44.0639 26.2121 43.9266 25.6999 43.6662 25.2485L32.6655 6.15312C32.4055 5.70162 32.0315 5.32667 31.581 5.06598C31.1305 4.8053 30.6195 4.66805 30.0994 4.66805C29.5792 4.66805 29.0682 4.8053 28.6177 5.06598C28.1672 5.32667 27.7932 5.70162 27.5332 6.15312L24.7203 11.039L19.2208 1.48485C18.9606 1.03338 18.5864 0.658493 18.1358 0.397853C17.6852 0.137213 17.1741 0 16.6538 0C16.1336 0 15.6225 0.137213 15.1719 0.397853C14.7213 0.658493 14.3471 1.03338 14.0868 1.48485L0.397874 25.2485C0.137452 25.6999 0.000226653 26.2121 2.8053e-07 26.7335C-0.000226092 27.2549 0.136554 27.7672 0.396584 28.2188C0.656614 28.6704 1.03072 29.0454 1.48129 29.3061C1.93185 29.5669 2.44298 29.7041 2.96326 29.704H13.2456C17.3195 29.704 20.3239 27.9106 22.3912 24.4118L27.4102 15.7008L30.0986 11.039L38.1667 25.0422H27.4102L24.7203 29.704ZM13.0779 25.0374L5.9022 25.0358L16.6586 6.36589L22.0257 15.7008L18.4322 21.9401C17.0593 24.2103 15.4996 25.0374 13.0779 25.0374Z"
                    fill="#955ce6"
                  ></path>
                </svg>
                <div className="text-[20px] ml-[12px] font-bold">
                  一秒快送后台管理系统
                </div>
              </div>
              <Popover
                placement="bottomRight"
                content={content}
                arrow={mergedArrow}
              >
                <div className="w-[32px] h-[32px] flex items-center justify-end">
                  <span className="w-[32px] h-[32px] bg-[#ccc] rounded-[50%] whitespace-nowrap text-[#fff] flex items-center justify-center">
                    <Icon icon="el:user" className="text-[16px]" />
                  </span>
                </div>
              </Popover>
            </div>
          </Header>
          {/* 侧边导行栏 */}
          <Layout hasSider>
            <Sider style={siderStyle}>
              <Menu
                onClick={onClick}
                style={{ width: 200 }}
                defaultSelectedKeys={[`${keys}`]}
                defaultOpenKeys={[`${subs}`]}
                mode="inline"
                items={items}
              />
            </Sider>
            <Content style={contentStyle}>
              <Outlet></Outlet>
            </Content>
          </Layout>
        </Layout>
      </Wrapper>
    </div>
  ) : (
    <Navigate to="/login" />
  );
};

export default layout;
