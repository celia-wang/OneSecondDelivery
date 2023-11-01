import { type FC } from "react";
import { useState } from "react";
import type { RadioChangeEvent } from "antd";
import { Radio, Button, message } from "antd";

const Cash: FC = () => {
  const plainOptions = ["开启", "关闭"];

  const optionsWithDisabled = [
    { label: "开启", value: "开启" },
    { label: "关闭", value: "关闭" }
  ];
  const [value1, setValue1] = useState("开启");
  const [value2, setValue2] = useState("开启");
  const onChange1 = ({ target: { value } }: RadioChangeEvent) => {
    setValue1(value);
  };

  const onChange2 = ({ target: { value } }: RadioChangeEvent) => {
    setValue2(value);
  };

  const [messageApi, contextHolder] = message.useMessage();

  const success = () => {
    void messageApi.open({
      type: "success",
      content: "更新配置成功"
    });
  };

  return (
    <>
      <div>
        <div style={{ padding: "20px" }}>
          <div style={{ fontSize: "20px", fontWeight: "900" }}>提现设置</div>
          <div style={{ padding: "0 25px", width: "600px", marginTop: "30px" }}>
            <form action="">
              <div>
                <div style={{ marginBottom: "20px" }}>是否开启此项功能:</div>
                <Radio.Group
                  options={plainOptions}
                  onChange={onChange1}
                  value={value1}
                />
              </div>
              <div style={{ marginTop: "40px", marginBottom: "50px" }}>
                <div style={{ marginBottom: "20px" }}>是否开启此项功能:</div>
                <Radio.Group
                  options={optionsWithDisabled}
                  onChange={onChange2}
                  value={value2}
                />
              </div>
              <div>
                {contextHolder}
                <Button
                  onClick={success}
                  style={{
                    width: "87px",
                    height: "40px",
                    backgroundColor: "#955ce6",
                    color: "white"
                  }}
                >
                  提交保存
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cash;
