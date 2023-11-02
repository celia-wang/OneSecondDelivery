/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-confusing-void-expression */
import { type FC } from "react";
import {
  Button,
  Divider,
  Form,
  InputNumber,
  Radio,
  Select,
  Space,
  message
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { Icon } from "@iconify/react";
import { useRequest } from "ahooks";
import { adminCouponList, postAdminConfigCoupon } from "@/service/api";

interface OptType {
  value: string;
  label: string;
}

const Setting: FC = () => {
  // 请求并拿到数据
  // const { data } = useRequest(adminCouponList);
  const { data } = useRequest(
    async () => await adminCouponList({ current: 1, pageSize: 20 })
  );
  // eslint-disable-next-line no-console
  // console.log(data?.data.data.data);
  // 选择优惠券的数据
  const dataOptions: OptType[] = [];
  data?.data?.data?.data?.forEach((item, index) => {
    dataOptions.push({
      value: `${index}`,
      label: `${item.couponName}`
    });
  });

  const onFinish = (values: any) => {
    console.log(values);
    postAdminConfigCoupon({ values })
      .then(async () => {
        await message.success({ content: "修改成功" });
      })
      .catch(() => {});
  };

  return (
    <div
      className="text-[#333]"
      style={{
        height: "calc(100vh - 60px - 60px)"
      }}
    >
      <h2 className=" px-[24px] py-[16px] m-0">优惠券设置</h2>
      <Form
        name="form"
        onFinish={onFinish}
        style={{ maxWidth: 600 }}
        autoComplete="off"
      >
        {/* 新用户获得优惠券 */}
        <div className="px-[50px]">
          <div className=" w-[500px]">
            <Divider plain>新用户获得优惠券</Divider>
          </div>

          {/* 是否开启此项功能 */}
          <div className=" mb-[24px]">
            <div className=" py-[14px]">是否开启此项功能：</div>
            <Radio.Group
              name="shareOpen"
              defaultValue={1}
              className=" py-[10px]"
            >
              <Radio value={1} className=" mr-[14px]">
                开启
              </Radio>
              <Radio value={2}>关闭</Radio>
            </Radio.Group>
          </div>
          {/* 优惠券规则 (1) */}
          <div className=" mb-[24px]">
            <div className=" py-[14px]">获得优惠券规则：</div>
            <Form.List name="newUser" initialValue={[{ first: "", last: "" }]}>
              {(fields, { add, remove }) => (
                <>
                  {fields.map(({ key, name, ...restField }) => (
                    <Space
                      key={key}
                      style={{ display: "flex", alignItems: "center" }}
                      align="baseline"
                    >
                      <Form.Item {...restField} name={[name, "first"]}>
                        <div>
                          <div className="mb-[10px]">选择一张优惠券</div>
                          <Select
                            showSearch
                            style={{ width: 200, height: 40 }}
                            // 数据需要渲染 !!!!!!!!!!!!
                            options={dataOptions}
                          />
                        </div>
                      </Form.Item>
                      <Form.Item {...restField} name={[name, "last"]}>
                        <div>
                          <div className="mb-[10px]">
                            概率(填100表示100%获得)
                          </div>
                          <InputNumber
                            defaultValue={1}
                            size="large"
                            className=" w-[200px] h-[40px]"
                          />
                        </div>
                      </Form.Item>
                      <Icon
                        icon="solar:trash-bin-minimalistic-bold-duotone"
                        color="#ff4d4f"
                        width="40px"
                        className=" mt-[6px]"
                        onClick={() => remove(name)}
                      />
                    </Space>
                  ))}
                  <Form.Item name="btn">
                    <Button
                      onClick={() => add()}
                      icon={<PlusOutlined />}
                      className="h-[40px]"
                    >
                      添加一项规则
                    </Button>
                  </Form.Item>
                </>
              )}
            </Form.List>
          </div>
        </div>

        {/* 转发获得优惠券 */}
        <div className="px-[50px]">
          <div className=" w-[500px]">
            <Divider plain>转发获得优惠券</Divider>
          </div>
          {/* 是否开启此项功能2 */}
          <div className=" mb-[24px]">
            <div className=" py-[14px]">是否开启此项功能：</div>
            <Radio.Group
              name="newUserOpen"
              defaultValue={1}
              className=" py-[10px]"
            >
              <Radio value={1} className=" mr-[14px]">
                开启
              </Radio>
              <Radio value={2}>关闭</Radio>
            </Radio.Group>
          </div>
          {/* 优惠券规则 (2) */}
          <div className=" mb-[24px]">
            <div className=" py-[14px]">获得优惠券规则：</div>
            <Form.List
              name="forwardUser"
              initialValue={[{ first: "", last: "" }]}
            >
              {(fields, { add, remove }) => (
                <>
                  {fields.map(({ key, name, ...restField }) => (
                    <Space
                      key={key}
                      style={{ display: "flex", alignItems: "center" }}
                      align="baseline"
                    >
                      <Form.Item {...restField} name={[name, "first"]}>
                        <div>
                          <div className="mb-[10px]">选择一张优惠券</div>
                          <Select
                            showSearch
                            style={{ width: 200, height: 40 }}
                            // 数据需要渲染 !!!!!!!!!!!!
                            options={dataOptions}
                          />
                        </div>
                      </Form.Item>
                      <Form.Item {...restField} name={[name, "last"]}>
                        <div>
                          <div className="mb-[10px]">
                            概率(填100表示100%获得)
                          </div>
                          <InputNumber
                            defaultValue={1}
                            size="large"
                            className=" w-[200px] h-[40px]"
                          />
                        </div>
                      </Form.Item>
                      <Icon
                        icon="solar:trash-bin-minimalistic-bold-duotone"
                        color="#ff4d4f"
                        width="40px"
                        className=" mt-[6px]"
                        onClick={() => remove(name)}
                      />
                    </Space>
                  ))}
                  <Form.Item name="btn">
                    <Button
                      onClick={() => add()}
                      icon={<PlusOutlined />}
                      className="h-[40px]"
                    >
                      添加一项规则
                    </Button>
                  </Form.Item>
                </>
              )}
            </Form.List>
          </div>
          <Form.Item>
            <Button type="primary" htmlType="submit" className=" h-[40px]">
              提交保存
            </Button>
          </Form.Item>
        </div>
      </Form>
    </div>
  );
};

export default Setting;
