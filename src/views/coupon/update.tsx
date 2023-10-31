// import { adminCouponUpdate } from "@/service/api";
import { Icon } from "@iconify/react";
// import { useRequest } from "ahooks";
import { Button, Form, Input, InputNumber, Radio, Select } from "antd";
import { type FC } from "react";

const Add: FC = () => {
  const [form] = Form.useForm();
  const onFinish = (values: { couponName?: string }) => {
    // eslint-disable-next-line no-console
    console.log(values);
  };
  // const onRunAdminCouponAdd = (res: { data: { code: number } }) => {
  //   if (res.data.code === 200) {
  //     void message.success({ content: "修改优惠券成功" });
  //     form.resetFields(); // 清空表单数据
  //   }
  // };
  // const { run } = useRequest(
  //   async (values) => await adminCouponUpdate({ ...values }),
  //   {
  //     manual: true,
  //     onSuccess: onRunAdminCouponAdd
  //   }
  // );

  return (
    <div
      className="text-[#333] overflow-auto"
      style={{
        height: "calc(100vh - 60px - 60px)"
      }}
    >
      <div className=" flex items-center px-[24px] py-[16px] box-border">
        <Icon
          icon="charm:arrow-left"
          width="22"
          className=" mr-[10px] font-bold"
          onClick={() => {
            window.history.back();
          }}
        />
        <h2>修改优惠券</h2>
      </div>
      {/* 修改 */}
      <div className=" w-[600px] px-[50px] box-border">
        <Form
          form={form}
          onFinish={onFinish}
          style={{ maxWidth: 500 }}
          layout="vertical"
          initialValues={{
            couponName: "",
            conditionsAmount: 0,
            discountAmount: 0,
            conditionService: "ALL",
            deadlineDays: -1,
            limitNumber: -1,
            status: 1
          }}
        >
          <Form.Item
            label="优惠券名称:"
            name="couponName"
            rules={[{ required: true, message: "优惠券名称必填!" }]}
          >
            <Input placeholder="请输入优惠券名称" className="h-[40px]" />
          </Form.Item>

          {/* 金额 */}
          <div className=" flex items-center justify-between">
            <Form.Item name="discountAmount">
              <div className="w-[240px]">
                <div>优惠金额:</div>
                <InputNumber
                  size="large"
                  defaultValue={0}
                  className=" w-[238px] mt-[10px]"
                />
              </div>
            </Form.Item>
            <Form.Item name="conditionsAmount">
              <div className="w-[240px]">
                <div>满足条件金额:</div>
                <InputNumber
                  size="large"
                  defaultValue={0}
                  className=" w-[238px] mt-[10px]"
                />
              </div>
            </Form.Item>
          </div>

          <Form.Item label="优惠券类型:" name="conditionService">
            <Select
              style={{ width: 500, height: 40 }}
              options={[
                { value: "ALL", label: "全部" },
                { value: "helpDeliver", label: "帮我送" },
                { value: "helpGet", label: "帮我取" },
                { value: "helpBuy", label: "帮我买" }
              ]}
            />
          </Form.Item>

          <Form.Item label="有效天数:" name="deadlineDays">
            <div>
              <Input defaultValue="-1" className="h-[40px]" />
              <div className=" text-[14px] text-[#999] mt-[8px]">
                领取后开始计算到期时间, -1为不限
              </div>
            </div>
          </Form.Item>

          <Form.Item label="限制领取数量:" name="limitNumber">
            <div>
              <InputNumber
                size="large"
                defaultValue={-1}
                className=" w-[248px]"
              />
              <div className=" text-[14px] text-[#999] mt-[8px]">
                限制领取数量， -1为不限制
              </div>
            </div>
          </Form.Item>

          <Form.Item label="状态:" name="status">
            <div>
              <Radio.Group
                name="radiogroup"
                defaultValue={1}
                className=" py-[10px]"
              >
                <Radio value={1} className=" mr-[14px]">
                  启用
                </Radio>
                <Radio value={0}>禁用</Radio>
              </Radio.Group>
            </div>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" className=" h-[40px]">
              提交保存
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Add;
