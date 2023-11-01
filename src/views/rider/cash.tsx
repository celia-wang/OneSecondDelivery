/* eslint-disable n/no-callback-literal */
import { AppstoreAddOutlined, LoadingOutlined } from "@ant-design/icons";
import { Icon } from "@iconify/react";
import { Button, Form, Input, Radio, Upload, message } from "antd";
import type {
  RcFile,
  UploadChangeParam,
  UploadFile,
  UploadProps
} from "antd/es/upload";
import { useState, type FC } from "react";

const getBase64 = (img: RcFile, callback: (url: string) => void) => {
  const reader = new FileReader();
  reader.addEventListener("load", () => {
    callback(reader.result as string);
  });
  reader.readAsDataURL(img);
};

const beforeUpload = (file: RcFile) => {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  if (!isJpgOrPng) {
    void message.error("You can only upload JPG/PNG file!");
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    void message.error("Image must smaller than 2MB!");
  }
  return isJpgOrPng && isLt2M;
};
const Cash: FC = () => {
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>();
  const handleChange: UploadProps["onChange"] = (
    info: UploadChangeParam<UploadFile>
  ) => {
    if (info.file.status === "uploading") {
      setLoading(true);
      return;
    }
    if (info.file.status === "done") {
      getBase64(info.file.originFileObj as RcFile, (url) => {
        setLoading(false);
        setImageUrl(url);
      });
    }
  };

  const uploadButton = (
    <div>{loading ? <LoadingOutlined /> : <AppstoreAddOutlined />}</div>
  );
  return (
    <div
      className="text-[#333]"
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
        <div className="text-[24px] font-[500]">骑手列表</div>
      </div>
      {/* 新增 */}
      <div className=" w-[600px] px-[50px] box-border">
        <Form style={{ maxWidth: 500 }} layout="vertical">
          <Form.Item
            label="用户:"
            name="1"
            rules={[{ required: true, message: "手机号必填!" }]}
          >
            <div className=" flex">
              <Input
                placeholder="输入用户手机号查询"
                className="h-[40px] border-r-0 rounded-r-none"
              />
              <Button
                type="primary"
                className="rounded-l-none h-[40px] bg-[#955ce6]"
              >
                查询
              </Button>
            </div>
          </Form.Item>

          {/* 姓名 */}
          <Form.Item
            label="真实姓名:"
            name="2"
            rules={[{ required: true, message: "请输入真实姓名" }]}
          >
            <Input placeholder="请输入真实姓名" className="h-[40px]" />
          </Form.Item>

          {/* 身份证号码 */}
          <Form.Item
            label="身份证号码:"
            name="3"
            rules={[{ required: true, message: "请输入身份证号码" }]}
          >
            <Input placeholder="请输入身份证号码" className="h-[40px]" />
          </Form.Item>

          {/* 上传身份证头像面照片 */}
          <Form.Item
            label="上传身份证头像面照片:"
            name="4"
            rules={[{ required: true, message: "请上传身份证照片面照片" }]}
          >
            <div>
              <Upload
                name="avatar1"
                listType="picture-card"
                className="avatar-uploader"
                showUploadList={false}
                action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
                beforeUpload={beforeUpload}
                onChange={handleChange}
              >
                {imageUrl != null ? (
                  <img src={imageUrl} alt="avatar" style={{ width: "100%" }} />
                ) : (
                  uploadButton
                )}
              </Upload>

              <div className=" text-[12px] text-[#999]">
                <div>上传格式:jpg,jpeg,png,webp</div>
                <div>最大限制2MB</div>
              </div>
            </div>
          </Form.Item>

          {/* 上传身份国徽面照片 */}
          <Form.Item
            label="上传身份国徽面照片:"
            name="5"
            rules={[{ required: true, message: "请上传省份证国徽面照片" }]}
          >
            <div>
              <Upload
                name="avatar2"
                listType="picture-card"
                className="avatar-uploader"
                showUploadList={false}
                action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
                beforeUpload={beforeUpload}
                onChange={handleChange}
              >
                {imageUrl != null ? (
                  <img src={imageUrl} alt="avatar" style={{ width: "100%" }} />
                ) : (
                  uploadButton
                )}
              </Upload>
              <div className=" text-[12px] text-[#999]">
                <div>上传格式:jpg,jpeg,png,webp</div>
                <div>最大限制2MB</div>
              </div>
            </div>
          </Form.Item>

          {/* 状态 */}
          <Form.Item label="状态:" name="status">
            <div>
              <Radio.Group
                name="radiogroup"
                defaultValue={1}
                className=" py-[10px]"
              >
                <Radio value={1} className=" mr-[14px]">
                  通过审核
                </Radio>
                <Radio value={0}>待审核</Radio>
              </Radio.Group>
            </div>
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className=" h-[40px] bg-[#955ce6] mb-[40px]"
            >
              提交保存
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Cash;
