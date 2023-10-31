/**
 * wangshuxian
 *小程序设置 app
 */
import type React from "react";
import { Button, Form, Input, Divider, message } from "antd";
import { useRequest } from "ahooks";
import {
  appDevelop,
  appDevelopPost,
  appPay,
  appPayPost,
  appMap,
  appMapPost,
  appAli,
  appAliPost,
  appComwx,
  appComwxPost,
  appCreatePost
} from "../../../service/api";

// 开发设置
const Develop: React.FC = () => {
  const [form] = Form.useForm();
  const { data } = useRequest(async () => await appDevelop());
  const onSubmit = (vul: Req.AppDevelopPostData) => {
    appDevelopPost(vul)
      .then(() => message.success("修改成功"))
      .catch(() => message.error("修改失败"));
  };
  form.setFieldsValue({
    wxAppId: data?.data?.data?.wxAppId ?? "",
    wxAppSecret: data?.data?.data?.wxAppSecret ?? "",
    qqAppid: data?.data?.data?.qqAppid ?? "",
    qqAppSecret: data?.data?.data?.qqAppSecret ?? "",
    ttAppid: data?.data?.data?.ttAppid ?? "",
    ttAppSecret: data?.data?.data?.ttAppSecret ?? ""
  });
  return (
    <div className=" w-[100%] flex justify-center">
      <Form
        form={form}
        layout="vertical"
        name="wrap"
        // labelCol={{ flex: "110px" }}
        labelAlign="left"
        labelWrap
        wrapperCol={{ flex: 1 }}
        colon={false}
        style={{ minWidth: 600 }}
        size="large"
        onFinish={onSubmit}
      >
        {/* 微信 */}
        <div className="flex justify-between">
          <span className=" font-bold">微信小程序配置</span>
          <a href="#">帮助</a>
        </div>
        <Form.Item
          label="小程序ID:"
          name="wxAppId"
          rules={[{ required: true, message: "请输入小程序ID" }]}
        >
          <Input type="text" placeholder={data?.data?.data?.wxAppId} />
        </Form.Item>
        <Form.Item
          label="小程序密钥:"
          name="wxAppSecret"
          rules={[{ required: true, message: "请输入小程序密钥" }]}
        >
          <Input placeholder={data?.data?.data?.wxAppSecret} />
        </Form.Item>
        <Divider plain />

        {/* qq */}
        <div className="flex justify-between">
          <span className=" font-bold">QQ小程序配置</span>
          <a href="#">帮助</a>
        </div>
        <Form.Item label="小程序ID:" name="qqAppid">
          <Input placeholder={data?.data?.data?.qqAppid} />
        </Form.Item>
        <Form.Item label="小程序密钥:" name="qqAppSecret">
          <Input placeholder={data?.data?.data?.qqAppSecret} />
        </Form.Item>
        <Divider plain />
        {/* 字节跳动小程序配置 */}
        <div className="flex justify-between">
          <span className=" font-bold">字节跳动小程序配置</span>
          <a href="#">帮助</a>
        </div>
        <Form.Item label="小程序ID:" name="ttAppid">
          <Input placeholder={data?.data?.data?.ttAppid} />
        </Form.Item>
        <Form.Item label="小程序密钥:" name="ttAppSecret">
          <Input placeholder={data?.data?.data?.ttAppSecret} />
        </Form.Item>
        <Divider plain />
        <Form.Item label=" ">
          <Button type="primary" htmlType="submit">
            提交保存
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
// 支付设置
const Pay: React.FC = () => {
  const [form] = Form.useForm();
  const { data } = useRequest(async () => await appPay());
  const onSubmit = (vul: Req.AppPayPostData) => {
    appPayPost(vul)
      .then(() => message.success("修改成功"))
      .catch(() => message.error("修改失败"));
  };
  form.setFieldsValue({
    wxMchId: data?.data?.data?.wxMchId ?? "",
    wxMchSecert: data?.data?.data?.wxMchSecert ?? "",
    notifyUrl: data?.data?.data?.notifyUrl ?? ""
  });
  return (
    <div className=" w-[100%] flex justify-center">
      <Form
        form={form}
        layout="vertical"
        name="wrap"
        // labelCol={{ flex: "110px" }}
        labelAlign="left"
        labelWrap
        wrapperCol={{ flex: 1 }}
        colon={false}
        style={{ minWidth: 600 }}
        size="large"
        onFinish={onSubmit}
      >
        <div className="flex justify-between">
          <span className=" font-bold">微信商户号配置</span>
          <a href="#">帮助</a>
        </div>
        <Form.Item
          label="微信商户ID:"
          name="wxMchId"
          rules={[{ required: true, message: "请输入微信商户ID" }]}
        >
          <Input placeholder={data?.data?.data?.wxMchId} />
        </Form.Item>
        <Form.Item
          label="微信商户秘钥:"
          name="wxMchSecert"
          rules={[{ required: true, message: "请输入微信商户秘钥" }]}
        >
          <Input placeholder={data?.data?.data?.wxMchSecert} />
        </Form.Item>
        <Form.Item
          label="回调地址:"
          name="notifyUrl"
          rules={[{ required: true, message: "请输入回调地址" }]}
          extra="输入域名即可,如:https://www.landalf.cn"
        >
          <Input placeholder={data?.data?.data?.notifyUrl} />
        </Form.Item>

        <Form.Item label=" ">
          <Button type="primary" htmlType="submit">
            提交保存
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
// 地图设置
const Map: React.FC = () => {
  const onSubmit = (vul: string | number) => {
    appMapPost(vul)
      .then(() => message.success("修改成功"))
      .catch(() => message.error("修改失败"));
  };
  const { data } = useRequest(async () => await appMap());
  const [form] = Form.useForm();
  form.setFieldsValue({
    mapKey: data?.data?.data?.mapKey ?? ""
  });
  return (
    <div className=" w-[100%] flex justify-center">
      <Form
        form={form}
        layout="vertical"
        name="wrap"
        // labelCol={{ flex: "110px" }}
        labelAlign="left"
        labelWrap
        wrapperCol={{ flex: 1 }}
        colon={false}
        style={{ minWidth: 600 }}
        size="large"
        onFinish={onSubmit}
      >
        <div className="flex justify-between">
          <span className=" font-bold">地图配置</span>
          <a href="#">帮助</a>
        </div>

        <Form.Item
          label="腾讯地图key:"
          name="mapKey"
          rules={[{ required: true, message: "请输入腾讯地图key" }]}
        >
          <Input placeholder={data?.data?.data?.mapKey} />
        </Form.Item>

        <Form.Item label=" ">
          <Button type="primary" htmlType="submit">
            提交保存
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
// 阿里云配置
const AlibabaCloud: React.FC = () => {
  const { data } = useRequest(async () => await appAli());
  const onSubmit = (vul: Req.AppAliPostData) => {
    appAliPost(vul)
      .then(() => message.success("修改成功"))
      .catch(() => message.error("修改失败"));
  };
  const [form] = Form.useForm();
  form.setFieldsValue({
    accessKeyId: data?.data?.data?.accessKeyId ?? "",
    accessKeySecret: data?.data?.data?.accessKeySecret ?? "",
    arn: data?.data?.data?.arn ?? "",
    ossRegion: data?.data?.data?.ossRegion ?? "",
    ossBucket: data?.data?.data?.ossBucket ?? "",
    smsSignName: data?.data?.data?.smsSignName ?? "",
    smsTemplateCode: data?.data?.data?.smsTemplateCode ?? ""
  });
  return (
    <div className=" w-[100%] flex justify-center">
      <Form
        form={form}
        layout="vertical"
        name="wrap"
        // labelCol={{ flex: "110px" }}
        labelAlign="left"
        labelWrap
        wrapperCol={{ flex: 1 }}
        colon={false}
        style={{ minWidth: 600 }}
        size="large"
        onFinish={onSubmit}
      >
        <div className="flex justify-between">
          <span className=" font-bold">阿里云配置</span>
          <a href="#">帮助</a>
        </div>

        <Form.Item
          label="AccessKey ID:"
          name="accessKeyId"
          rules={[{ required: true, message: "请输入AccessKey ID" }]}
        >
          <Input placeholder={data?.data?.data?.accessKeyId} />
        </Form.Item>
        <Form.Item
          label="秘钥 Secret:"
          name="accessKeySecret"
          rules={[{ required: true, message: "请输入秘钥 Secret" }]}
        >
          <Input placeholder={data?.data?.data?.accessKeySecret} />
        </Form.Item>
        <Form.Item
          label="ARN:"
          name="arn"
          rules={[{ required: true, message: "请输入ARN" }]}
        >
          <Input placeholder={data?.data?.data?.arn} />
        </Form.Item>
        <Form.Item
          label="对象存储Oss Region:"
          name="ossRegion"
          rules={[{ required: true, message: "请输入对象存储Oss Region" }]}
        >
          <Input placeholder={data?.data?.data?.ossRegion} />
        </Form.Item>
        <Form.Item
          label="对象存储Oss Bucket:"
          name="ossBucket"
          rules={[{ required: true, message: "请输入对象存储Oss Bucket" }]}
        >
          <Input placeholder={data?.data?.data?.ossBucket} />
        </Form.Item>
        <div className="flex justify-between">
          <span className=" font-bold">阿里云短信验证码</span>
          <a href="#">帮助</a>
        </div>

        <Form.Item
          label="签名名称:"
          name="smsSignName"
          rules={[{ required: true, message: "请输入签名名称" }]}
        >
          <Input placeholder={data?.data?.data?.smsSignName} />
        </Form.Item>
        <Form.Item
          label="模板CODE:"
          name="smsTemplateCode"
          rules={[{ required: true, message: "请输入模板CODE" }]}
        >
          <Input placeholder={data?.data?.data?.smsTemplateCode} />
        </Form.Item>
        <Form.Item label=" ">
          <Button type="primary" htmlType="submit">
            提交保存
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
// 企业微信配置
const WeCom: React.FC = () => {
  const { data } = useRequest(async () => await appComwx());
  const onSubmit = (
    corpid: string,
    corpsecret: string,
    verifyChatid?: string | undefined
  ) => {
    appComwxPost(corpid, corpsecret, verifyChatid)
      .then(() => message.success("修改成功"))
      .catch(() => message.error("修改失败"));
  };
  // name: string; owner: string; userlist: string[];
  const onCreateSubmit = (
    name: string,
    owner?: string,
    userlist?: string[]
  ) => {
    appCreatePost(name, owner, userlist)
      .then(() => message.success("修改成功"))
      .catch(() => message.error("修改失败"));
  };
  const [form] = Form.useForm();
  form.setFieldsValue({
    corpid: data?.data?.data?.corpid ?? "",
    corpsecret: data?.data?.data?.corpsecret ?? ""
  });

  const formList = [
    {
      key: 0,
      name: "群成员1"
    },
    {
      key: 1,
      name: "群成员2"
    },
    {
      key: 2,
      name: "群成员3"
    }
  ];
  return (
    <div className=" w-[100%] flex justify-center">
      <Form
        form={form}
        layout="vertical"
        name="wrap"
        // labelCol={{ flex: "110px" }}
        labelAlign="left"
        labelWrap
        wrapperCol={{ flex: 1 }}
        colon={false}
        style={{ minWidth: 600 }}
        size="large"
        // onFinish={onSubmit}
      >
        <div className="flex justify-between">
          <span className=" font-bold">企业微信配置</span>
          <a href="#">帮助</a>
        </div>

        <Form.Item
          label="企业ID:"
          name="corpid"
          rules={[{ required: true, message: "请输入企业ID" }]}
        >
          <Input placeholder={data?.data?.data?.corpid} />
        </Form.Item>
        <Form.Item
          label="应用凭证Secret:"
          name="corpsecret"
          rules={[{ required: true, message: "请输入应用凭证Secret" }]}
        >
          <Input placeholder={data?.data?.data?.corpsecret} />
        </Form.Item>
        <Form.Item label="群聊id(用于骑手申请通知):" name="verifyChatid">
          <Input />
        </Form.Item>

        <Form.Item label=" ">
          <Button
            type="primary"
            htmlType="submit"
            onClick={() => {
              onSubmit(
                form.getFieldValue("corpid"),
                form.getFieldValue("corpsecret"),
                form.getFieldValue("verifyChatid")
              );
            }}
          >
            提交保存
          </Button>
        </Form.Item>
        <div className="text-[14px] h-[40px] leading-[40px]">
          创建群聊 生成群ID
        </div>
        <div className="text-[12px] h-[40px] leading-[40px]">
          请提交上述配置后,在创建如下配置,并提交群聊id
        </div>
        <div className="flex flex-wrap justify-between w-[500px]">
          <Form.Item
            label="群名称"
            name="username"
            className="w-[240px]"
            initialValue="骑士交流群"
          >
            <Input />
          </Form.Item>
          <Form.Item label="群所有者" name="owner" className="w-[240px]">
            <Input />
          </Form.Item>
          <Form.List name="userlist">
            {() =>
              formList.map((field) => {
                return (
                  <Form.Item
                    key={field.key}
                    label={field.name}
                    className="w-[140px]"
                    name={field.key}
                  >
                    <Input className="w-[140px]" />
                  </Form.Item>
                );
              })
            }
          </Form.List>
        </div>
        <Form.Item label="">
          <Button
            type="primary"
            htmlType="submit"
            onClick={() => {
              onCreateSubmit(
                form.getFieldValue("username"),
                form.getFieldValue("owner"),
                form.getFieldValue("userlist")
              );
            }}
          >
            生成群ID
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export { Develop, Pay, Map, AlibabaCloud, WeCom };
