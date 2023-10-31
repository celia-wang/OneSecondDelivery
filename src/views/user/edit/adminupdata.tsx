import { type FC } from "react";
import { Icon } from "@iconify/react";
import { NavLink, useParams, useNavigate } from "react-router-dom";
import { Button, Form, Input, message } from "antd";
import { updataAdmin } from "@/service/api";

const adminupdata: FC = () => {
  const navigte = useNavigate();
  const { id } = useParams();
  const valuedata = new URLSearchParams(id); // 将字符串转换成对象
  const UrlObj = Object.fromEntries(valuedata.entries());
  const onFinish = (values: FieldType) => {
    values.adminNo = UrlObj.adminNo;
    updataAdmin(values)
      .then(async (res: any) => {
        if (res?.data?.code !== 200) {
          await message.error(res?.data?.msg);
        } else {
          await message.success({
            content: "修改管理员信息成功"
          });
          navigte("/user/admins");
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
    status: number;
    adminNo: string;
  }

  return (
    <div className="p-[20px] w-[100%]">
      {/* 标题 */}
      <div className="flex items-center">
        <NavLink to={"/user/admins"}>
          <Icon icon="teenyicons:left-outline" color="black" />
        </NavLink>

        <p className="text-[#333333] text-[20px] font-semibold ml-3">
          修改管理员
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
            name="adminName"
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

export default adminupdata;
