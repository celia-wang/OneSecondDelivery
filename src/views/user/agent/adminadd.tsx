import { type FC } from "react";
import { Icon } from "@iconify/react";
import { NavLink } from "react-router-dom";
import { Button, Form, Input, message } from "antd";
import { AddAdmin } from "@/service/api";
const adminadd: FC = () => {
  // 收集数据
  const onFinish = (values: FieldType) => {
    AddAdmin(values)
      .then(async (res: any) => {
        if (res?.data?.code !== 200) {
          await message.error(res?.data?.msg);
        } else {
          await message.success({
            content: "添加管理员成功"
          });
        }
      })
      .catch((err) => {
        alert(err);
      });
  };

  interface FieldType {
    adminName: string;
    mobileNumber: string;
    realName: string;
  }

  return (
    <div className="p-[20px] w-[100%]">
      {/* 标题 */}
      <div className="flex items-center">
        <NavLink to={"/user/admins"}>
          <Icon icon="teenyicons:left-outline" color="black" />
        </NavLink>

        <p className="text-[#333333] text-[20px] font-semibold ml-3">
          新增管理员
        </p>
      </div>
      <div className="mt-3 ml-10">
        <Form
          name="basic"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          autoComplete="off"
          layout="vertical"
        >
          <Form.Item<FieldType>
            label="账户名称"
            name="adminName"
            rules={[{ required: true, message: "输入登录账户" }]}
          >
            <Input className="w-[500px] h-[40px]" />
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

export default adminadd;
