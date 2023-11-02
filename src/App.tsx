import { type FC } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ConfigProvider } from "antd";

import Layout from "./layout/Layout";
import Home from "./views/home/Home";
import Login from "./views/Login/login";
import Citys from "./views/city/citys";
import Tag from "./views/city/tag/tag";
import Valuations from "./views/city/valuation/valuations";
import Vadd from "./views/city/valuation/enit/add";
import Wadd from "./views/city/weight/enit/add";
import Tadd from "./views/city/tag/enit/add";
import Weight from "./views/city/weight/weight";
import Apps from "./views/config/app";
import Cash from "./views/config/cash";
import Integral from "./views/config/integral";
import Rider from "./views/config/rider";
import Share from "./views/config/share";
import User from "./views/config/user";
import Wxsubscribe from "./views/config/wxsubscribe";
import Coupons from "./views/coupon/coupons";
import Setting from "./views/coupon/setting";
import CopAdd from "./views/coupon/add"; // 新增添加优惠券页面
import CopUpdate from "./views/coupon/update"; // 新增添加优惠券页面
import Cancelset from "./views/oder/cancelset";
import Capitaltrend from "./views/oder/capitaltrend";
import Feeset from "./views/oder/feeset";
import Oders from "./views/oder/oders";
import RiderCash from "./views/rider/cash";
import Registers from "./views/rider/registers";
import Riders from "./views/rider/riders";
import Agents from "./views/user/agent/agents";
import Admins from "./views/user/admins";
import AgentsAdd from "./views/user/agent/agentadd";
import AdminAdd from "./views/user/agent/adminadd";
import Users from "./views/user/users";
import AgreementRider from "./views/config/agreementRider";
import Agentupdata from "./views/user/edit/agentsupdata";
import Adminupdata from "./views/user/edit/adminupdata";
import RiderEditAdd from "./views/rider/RidereditAdd";
import Pwd from "./views/user/Pwd";
import Update from "./views/user/updata";

const App: FC = () => {
  return (
    <ConfigProvider
      theme={{
        token: {
          // Seed Token，影响范围大
          colorPrimary: "#955ce6" // 修改主题颜色
        }
      }}
    >
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/user/pwd" element={<Pwd />} />
            <Route path="/user/update" element={<Update />} />
            <Route path="/user/agent/agents" element={<Agents />} />
            <Route path="/user/agent/edit/add" element={<AgentsAdd />} />
            <Route path="/user/edit/add" element={<AdminAdd />} />
            <Route path="/user/admins" element={<Admins />} />
            <Route path="/user/edit/update/:id" element={<Adminupdata />} />
            <Route
              path="/user/agent/edit/update/:id"
              element={<Agentupdata />}
            />
            <Route path="/user/users" element={<Users />} />
            <Route path="/order/orders" element={<Oders />} />
            <Route path="/order/capitaltrend" element={<Capitaltrend />} />
            <Route path="/order/cancelset" element={<Cancelset />} />
            <Route path="/order/feeset" element={<Feeset />} />
            <Route path="/rider/riders" element={<Riders />} />
            <Route path="/rider/registers" element={<Registers />} />
            <Route path="/rider/edit/add" element={<RiderEditAdd />} />
            <Route path="/rider/cash" element={<RiderCash />} />
            <Route path="/city/citys" element={<Citys />} />
            <Route path="/city/valuation/valuations" element={<Valuations />} />
            <Route path="/city/valuation/enit/add" element={<Vadd />} />
            <Route path="/city/weight/weight" element={<Weight />} />
            <Route path="/city/weight/enit/add" element={<Wadd />} />
            <Route path="/city/tag/tag" element={<Tag />} />
            <Route path="/city/tag/enit/add" element={<Tadd />} />
            <Route path="/coupon/coupons" element={<Coupons />} />
            <Route path="/coupon/setting" element={<Setting />} />
            <Route path="/coupon/coupons/add" element={<CopAdd />} />
            <Route path="/coupon/coupons/update/:id" element={<CopUpdate />} />
            <Route path="/config/cash" element={<Cash />} />
            <Route path="/config/app" element={<Apps />} />
            <Route path="/config/share" element={<Share />} />
            <Route path="/config/integral" element={<Integral />} />
            <Route path="/config/wxsubscribe" element={<Wxsubscribe />} />
            <Route path="/config/user" element={<User />} />
            <Route path="/config/rider" element={<Rider />} />
            <Route path="/config/agreementRider" element={<AgreementRider />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ConfigProvider>
  );
};

export default App;
