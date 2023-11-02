import request from "@/utils/request";

// 验证码
export const getVerifyCode = async () =>
  await request.get<Res.VerifyCode>("/api/admin/verifycode");

// 登录
export const postAdminLogin = async (data: Req.AdminLogin) =>
  await request.post("/api/admin/login", data);

export const adminAgent = async (params: Req.AdminAgent) =>
  await request.get<Res.AgentList>("/admin/agent/list", { params });

// 订单列表
export const getOrderList = async (params: Req.TOrderList) =>
  await request.get("/api/admin/order/list", { params });

// 资金走向列表
export const getFundsFlowList = async (params: {
  current: number;
  pageSize: number;
}) =>
  (await request.get("/api/admin/order/capitaltrend/list", { params })).data;

// 取消订单配置
export const getAdminConfigOrderCancel = async () =>
  await request.get<Res.TAdminConfigOrderCancel>(
    "/api/admin/config/ordercancel"
  );

// 设置取消订单配置
export const ChangeAdminConfigOrderCancel = async (
  data: Res.TAdminConfigOrderCancel
) => await request.post<Res.VerifyCode>("/api/admin/config/ordercancel", data);

// 小费选项配置
export const getAdminConfigOrderFee = async () =>
  await request.get<Res.TTipOptionsConfiguration>("/api/admin/config/orderfee");

// 小费配置
export const getTipOptionsConfiguration = async (
  data: Res.TTipOptionsConfiguration
) => await request.post<Res.VerifyCode>("/api/admin/config/orderfee", data);

// 骑手管理开始++++——————++++
// 骑手列表http://192.168.145.28:8888/admin/rider/list?current=1&pageSize=20
export const getRiderList = async (params: Req.TOrderList) =>
  await request.get<Res.TRiderList>("/api/admin/rider/list", { params });

export const getRiderAuditList = async (params: Req.TOrderList) =>
  (
    await request.get<Res.TRiderAuditList>("/api/admin/rider/register/list", {
      params
    })
  ).data;

// 是否开启接单http://192.168.145.28:8888/admin/rider/receive/status
export const getAdminRiderReceiveStatus = async (params: {
  startReceive: boolean;
  riderNo: string;
}) => await request.put("/api/admin/rider/receive/status", params);

// 是否禁用启用http://192.168.145.28:8888/admin/user/status
export const getAdminUserStatus = async (params: {
  status: string;
  userNo: string;
}) => await request.put("/api/admin/user/status", params);

// 通过审批 http://192.168.145.28:8888/admin/rider/pass
export const getAdminRiderPass = async (params: { userNo: string }) =>
  await request.put("/api/admin/rider/pass", params);

// 拒绝审批 http://192.168.145.28:8888/admin/rider/refuse
// 骑手管理结束++++——————++++
export const getAdminRideRefuse = async (params: {
  refuseReason: string;
  userNo: string;
}) => await request.put("/api/admin/rider/refuse", params);
// await request.get<Res.AgentList>("api/admin/agent/list", { params });
// 计价表单
export const getValuation = async (params: Req.Valuation) =>
  await request.get<Res.ValuationList>("/api/admin/citys/valuation/list", {
    params
  });

// 计价删除
export const delValuation = async (data: Req.DelVal) =>
  await request.delete("/api/admin/citys/valuation/del", { data });

// 计价新增
export const addValuation = async (data: Req.AddVal) =>
  await request.post("/api/admin/citys/valuation/add", data);

// 重量标签
export const getWeight = async (params: Req.Weight) =>
  await request.get<Res.WeightList>(
    "/api/admin/citys/weight/list?current=1&pageSize=20",
    {
      params
    }
  );

// 物品标签组
export const getTag = async (params: Req.Tag) =>
  await request.get<Res.TagList>("/api/admin/citys/tag/list", {
    params
  });
export const getTagAdd = async (params: Req.TagAddData) =>
  await request.post("/api/admin/citys/tag/add", params);
export const getTagDel = async (data: object) =>
  await request.delete("/api/admin/citys/tag/del", { data });
/**
 * wsx
 * 系统设置
 */
// 小程序设置
export const appDevelop = async () =>
  await request.get<Res.AppDevelopData>("/api/admin/config/appauth");
export const appDevelopPost = async (params: Req.AppDevelopPostData) =>
  await request.post<Res.AppDevelopData>("/api/admin/config/appauth", params);
export const appPay = async () =>
  await request.get<Res.AppPayData>("/api/admin/config/appmch");
export const appPayPost = async (params: Req.AppPayPostData) =>
  await request.post("/api/admin/config/appmch", params);
export const appMap = async () =>
  await request.get<Res.AppMapData>("/api/admin/config/map");

export const appMapPost = async (mapKey: number | string) =>
  await request.post("/api/admin/config/map", mapKey);

export const appAli = async () =>
  await request.get<Res.AppAliData>("/api/admin/config/ali");
export const appAliPost = async (params: Req.AppAliPostData) =>
  await request.post<Res.AppAliData>("/api/admin/config/ali", params);

export const appComwx = async () =>
  await request.get<Res.AppComwxData>("/api/admin/config/corwx");

export const appComwxPost = async (
  corpid: string,
  corpsecret: string,
  verifyChatid?: string | undefined
) =>
  await request.post("/api/admin/config/corwx", {
    corpid,
    corpsecret,
    verifyChatid
  });
export const appCreatePost = async (
  name: string,
  owner?: string,
  userlist?: string[]
) =>
  await request.post<Res.AppCreateData>("/api/admin/corwx/appchat/create", {
    name,
    owner,
    userlist
  });
// 分享设置
export const shareData = async () =>
  await request.get<Res.ShareData>("/api/admin/config/share");
export const sharePostData = async (params: Req.ShareData) =>
  await request.post("/api/admin/config/share", params);
// 积分设置
export const integralData = async () =>
  await request.get<Res.IntegralData>("/api/admin/config/integral");

export const integralPostData = async (withIntegral: {
  withIntegral: number;
}) => await request.post("/api/admin/config/integral", withIntegral);

// 用户指南
export const userData = async () =>
  await request.get<Res.userData>("/api//admin/config/guide/user");

export const userPostData = async (content: string | null) =>
  await request.post("/api//admin/config/guide/user", { content });

// 骑手指南
export const riderData = async () =>
  await request.get<Res.userData>("/api/admin/config/guide/rider");
export const riderPostData = async (content: string | undefined) =>
  await request.post("/api/admin/config/guide/rider", { content });
// 骑手协议 /admin/config/agreement/rider
export const riderAgreementData = async () =>
  await request.get<Res.userData>("/api/admin/config/agreement/rider");
export const riderAgreementPostData = async (content: string | undefined) =>
  await request.post("/api/admin/config/agreement/rider", { content });

// 优惠券列表接口
export const adminCouponList = async (params: Req.AdminAgent) =>
  await request.get<Res.AdminCouponList>("/api/admin/coupon/list", { params });

// 优惠券状态的接口
export const adminCouponStatus = async (params: Req.AdminCouponStatus) =>
  await request.put<Res.AdminCouponStatus>("/api/admin/coupon/status", params);

// 添加优惠券接口
export const adminCouponAdd = async (params: Req.AdminCouponAdd) =>
  await request.post<Res.AdminCouponStatus>("/api/admin/coupon/add", params);

// 修改优惠券接口
export const adminCouponUpdate = async (params: Req.AdminCouponUpdate) =>
  await request.put<Res.AdminCouponStatus>("/api/admin/coupon/update", params);
// 数据总览数据
export const DataOverview = async () =>
  await request.get<Req.DataOverview>("/api/admin/analysis/total");

// 订单数据
export const OrderData = async (params: {
  beginDate: string;
  endDate: string;
}) =>
  await request.get<Req.OrderData>("/api/admin/analysis/order/status", {
    params
  });

// 代理列表
export const broker = async (data: any) =>
  await request.get<Req.brokerData>("/api/admin/agent/list", { params: data });

// 代理启用禁用
export const updateUserInfo = async (agentNo: string, status: number) =>
  await request.put("/api/admin/agent/status", {
    agentNo,
    status
  });

// 代理重置密码
export const ResetPassword = async (agentNo: string) =>
  await request.put<Res.ResetPassword>("/api/admin/agent/resetpwd", {
    agentNo
  });

// 修改代理信息
export const updataAgent = async (data: {
  agentAccount: string;
  mobileNumber: string;
  realName: string;
  status: number;
}) => await request.put("/api/admin/agent/update", data);

// 管理员列表
export const ListAdministrators = async (data: {
  current: number;
  pageSize: number;
}) => await request.get<Req.AdminData>("/api/admin/list", { params: data });

// 启用禁用
export const updateAdmin = async (adminNo: string, status: number) =>
  await request.put("/api/admin/status", {
    adminNo,
    status
  });

// 管理重置密码
export const AdminPassword = async (adminNo: string) =>
  await request.put<Res.ResetPassword>("/api/admin/resetpwd", {
    adminNo
  });

// 用户列表
export const ListUsers = async (data: { current: number; pageSize: number }) =>
  await request.get<Req.ListUsersData>("/api/admin/user/list", {
    params: data
  });

// 用户启用禁用
export const updateUsers = async (userNo: string, status: number) =>
  await request.put("/api/admin/user/status", {
    userNo,
    status
  });

// 添加代理
export const Addproxies = async (params: {
  agentAccount: string;
  mobileNumber: string;
  realName: string;
  status: number;
}) => await request.post("/api/admin/agent/add", params);

// 添加管理员
export const AddAdmin = async (params: {
  adminName: string;
  mobileNumber: string;
  realName: string;
}) => await request.post("/api/admin/add", params);

// 修改管理员信息
export const updataAdmin = async (data: {
  adminName: string;
  mobileNumber: string;
  realName: string;
  adminNo: string;
}) => await request.put("/api/admin/update", data);

// 修改优惠卷
export const ModifyVoucher = async (data: {
  conditionService: string;
  conditionsAmount: number;
  couponName: string;
  couponNo: string;
  deadlineDays: string;
  discountAmount: number;
  limitNumber: number;
  status: number;
}) => await request.put("/api/admin/coupon/update", data);

// 优惠卷设置
export const postAdminConfigCoupon = async (data: any) =>
  await request.post("/api/admin/config/coupon", data);

// 个人信息
export const PersonalInformation = async () =>
  await request.get("/api/admin/info");

// 修改密码
export const updataPassword = async (data: {
  oldpwd: string;
  adminPwd: string;
  confirmPwd: string;
}) => await request.put("/api/admin/updatepwd", data);

// 个人信息设置
export const PersonalSettings = async (data: {
  mobileNumber: string;
  realName: string;
  avatarUrl: object;
}) => await request.put("/api/admin/update/self", data);
