import { type FC } from "react";
import { Button, Radio } from "antd-mobile";
import { TreeSelect, Input, Empty } from "antd";
import { UndoOutline, LeftOutline, RightOutline } from "antd-mobile-icons";
import { useState } from "react";

const treeData = [
  {
    value: "parent 1",
    title: "状态：全部"
  },
  { value: "parent 2", title: "状态：提现成功" },
  { value: "parent 3", title: "状态：待提现" },
  { value: "parent 4", title: "状态：提现失败" }
];

const Cash: FC = () => {
  const [value, setValue] = useState<string>();

  const onChange = (newValue: string) => {
    setValue(newValue);
  };
  return (
    <>
      <div className="text-[24px]">提现列表</div>
      <div style={{ borderBottom: "1px solid #c8c4c4" }}>
        <div>
          <Input
            placeholder="开户行"
            style={{
              width: "200px",
              height: "40px",
              padding: "4px 11px",
              border: "1px solid #c8c4c4",
              display: "inline-block",
              color: "#333",
              borderRadius: "4px",
              boxSizing: "border-box",
              marginTop: "20px",
              marginRight: "10px",
              fontSize: "14px",
              marginBottom: "20px"
            }}
          />
          <Input
            placeholder="银行卡号"
            style={{
              width: "200px",
              height: "40px",
              padding: "4px 11px",
              border: "1px solid #c8c4c4",
              display: "inline-block",
              color: "#333",
              borderRadius: "4px",
              boxSizing: "border-box",
              marginTop: "20px",
              marginRight: "10px",
              fontSize: "14px"
            }}
          />
          <Input
            placeholder="真实姓名"
            style={{
              width: "200px",
              height: "40px",
              padding: "4px 11px",
              border: "1px solid #c8c4c4",
              display: "inline-block",
              color: "#333",
              borderRadius: "4px",
              boxSizing: "border-box",
              marginTop: "20px",
              marginRight: "10px",
              fontSize: "14px"
            }}
          />
          <Input
            placeholder="提现编号"
            style={{
              width: "200px",
              height: "40px",
              padding: "4px 11px",
              border: "1px solid #c8c4c4",
              display: "inline-block",
              color: "#333",
              borderRadius: "4px",
              boxSizing: "border-box",
              marginTop: "20px",
              marginRight: "10px",
              fontSize: "14px"
            }}
          />

          <TreeSelect
            style={{ width: "200px", height: "40px", borderRadius: "10px" }}
            value={value}
            dropdownStyle={{ maxHeight: 400, overflow: "auto" }}
            placeholder="状态"
            allowClear
            treeDefaultExpandAll
            onChange={onChange}
            treeData={treeData}
          />
        </div>
        <div style={{ marginTop: "20px", marginBottom: "25px" }}>
          <Button
            color="default"
            fill="outline"
            style={{
              width: "120px",
              height: "40px",
              padding: "0 15px",
              marginRight: "5px",
              border: "1px solid #c8c4c4",
              fontSize: "14px"
            }}
          >
            取消
          </Button>
          <Button
            color="danger"
            fill="solid"
            style={{
              width: "120px",
              height: "40px",
              padding: "0 15px",
              backgroundColor: "#955ce6",
              border: "1px solid #955ce6",
              fontSize: "14px"
            }}
          >
            搜索
          </Button>
        </div>
      </div>

      <div style={{ margin: "30px 0", height: "40px" }}>
        <div>
          <Button
            color="primary"
            fill="outline"
            style={{
              width: "40px",
              height: "40px",
              float: "right",
              border: "1px solid #c8c4c4"
            }}
          >
            <UndoOutline style={{ color: "black" }} />
          </Button>
        </div>
      </div>

      <div>
        <div>
          <table>
            <tbody>
              <tr style={{ height: "53px" }}>
                <th
                  style={{
                    width: "60px",
                    border: "1px solid #c8c4c4",
                    backgroundColor: "#fafafa"
                  }}
                >
                  <Radio
                    value="1"
                    disabled
                    style={{ width: "16px", height: "16px" }}
                  ></Radio>
                </th>
                <th
                  style={{
                    width: "12%",
                    border: "1px solid #c8c4c4",
                    fontWeight: "400",
                    backgroundColor: "#fafafa"
                  }}
                >
                  编号
                </th>
                <th
                  style={{
                    width: "12%",
                    border: "1px solid #c8c4c4",
                    fontWeight: "400",
                    backgroundColor: "#fafafa"
                  }}
                >
                  提现用户
                </th>
                <th
                  style={{
                    width: "12%",
                    border: "1px solid #c8c4c4",
                    fontWeight: "400",
                    backgroundColor: "#fafafa"
                  }}
                >
                  用户
                </th>
                <th
                  style={{
                    width: "12%",
                    border: "1px solid #c8c4c4",
                    fontWeight: "400",
                    backgroundColor: "#fafafa"
                  }}
                >
                  提现金额
                </th>
                <th
                  style={{
                    width: "12%",
                    border: "1px solid #c8c4c4",
                    fontWeight: "400",
                    backgroundColor: "#fafafa"
                  }}
                >
                  提现账户
                </th>
                <th
                  style={{
                    width: "12%",
                    border: "1px solid #c8c4c4",
                    fontWeight: "400",
                    backgroundColor: "#fafafa"
                  }}
                >
                  状态
                </th>
                <th
                  style={{
                    width: "12%",
                    border: "1px solid #c8c4c4",
                    fontWeight: "400",
                    backgroundColor: "#fafafa"
                  }}
                >
                  时间
                </th>
                <th
                  style={{
                    width: "12%",
                    border: "1px solid #c8c4c4",
                    fontWeight: "400",
                    backgroundColor: "#fafafa"
                  }}
                >
                  操作
                </th>
              </tr>
            </tbody>
          </table>
        </div>
        <div
          style={{
            height: "175px",
            border: "1px solid #c8c4c4",
            borderTop: "0px",
            padding: "16px"
          }}
        >
          <div>
            <div style={{ width: "150px", margin: "0 auto" }}>
              <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />;
            </div>
          </div>
        </div>
      </div>

      <div style={{ float: "right", marginTop: "20px", height: "24.5px" }}>
        <ul style={{ height: "24.5px" }}>
          <li style={{ display: "inline-block" }}>共 0 条数据</li>
          <li
            style={{ display: "inline-block", width: "24px", height: "24px" }}
          >
            <a href="">
              {" "}
              <LeftOutline
                style={{
                  width: "12px",
                  height: "12px",
                  margin: "0 auto ",
                  marginTop: "12px",
                  color: "#c8c4c4"
                }}
              />
            </a>
          </li>
          <li
            style={{
              display: "inline-block",
              width: "22px",
              height: "22px",
              textAlign: "center"
            }}
          >
            <a href="" style={{ color: "#c8c4c4" }}>
              0
            </a>
          </li>
          <li
            style={{
              display: "inline-block",
              width: "24px",
              height: "24px"
            }}
          >
            <a href="">
              <RightOutline
                style={{
                  width: "12px",
                  height: "12px",
                  margin: "0 auto ",
                  marginTop: "12px",
                  color: "#c8c4c4"
                }}
              />
            </a>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Cash;
