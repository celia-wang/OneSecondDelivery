import { type FC } from "react";
import { Icon } from "@iconify/react";
import { NavLink, useParams, useNavigate } from "react-router-dom";
import { Button, Form, Input, message, Radio } from "antd";
import { updataAgent } from "@/service/api";

const agentsupdata: FC = () => {
  const navigte = useNavigate();
  const { id } = useParams();
  const valuedata = new URLSearchParams(id); // 将字符串转换成对象
  const UrlObj = Object.fromEntries(valuedata.entries());
  const onFinish = (values: FieldType) => {
    values.agenNo = UrlObj.adminNo;
    updataAgent(values)
      .then(async (res: any) => {
        if (res?.data?.code !== 200) {
          await message.error(res?.data?.msg);
        } else {
          await message.success({
            content: "修改代理信息成功"
          });
          navigte("user/agent/agents");
        }
      })
      .catch((err) => {
        alert(err);
      });
  };

  interface FieldType {
    agentAccount: string;
    mobileNumber: string;
    realName: string;
    status: number;
    agenNo: string;
  }

  return (
    <div className="p-[20px] w-[100%]">
      {/* 标题 */}
      <div className="flex items-center">
        <NavLink to={"/user/agent/agents"}>
          <Icon icon="teenyicons:left-outline" color="black" />
        </NavLink>

        <p className="text-[#333333] text-[20px] font-semibold ml-3">
          修改代理
        </p>
      </div>
      <div className="mt-3 ml-10">
        <Form
          name="basic"
          onFinish={onFinish}
          autoComplete="off"
          layout="vertical"
          initialValues={UrlObj}
        >
          <Form.Item<FieldType>
            label="账户名称"
            name="agentAccount"
            rules={[{ required: true, message: "输入账户名称" }]}
          >
            <Input className="w-[500px] h-[40px]" value={111} />
          </Form.Item>

          <Form.Item<FieldType>
            label="真实姓名"
            name="realName"
            rules={[{ required: true, message: "输入真实姓名" }]}
          >
            <Input className="w-[500px] h-[40px]" />
          </Form.Item>

          <Form.Item<FieldType>
            label="手机号"
            name="mobileNumber"
            rules={[{ required: true, message: "输入手机号" }]}
          >
            <Input className="w-[500px] h-[40px]" />
          </Form.Item>
          <Form.Item<FieldType>
            label="是否启用："
            name="status"
            rules={[{ required: true, message: "输入手机号" }]}
          >
            <Radio.Group>
              <Radio value="1">启用 </Radio>
              <Radio value="0"> 禁用 </Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              提交保存
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default agentsupdata;
