/* 分享设置 */
import { type FC, useState } from "react";
import { Form, Input, Button, message, Upload } from "antd";
import { sharePostData, shareData } from "../../service/api";
import { useRequest } from "ahooks";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import type { UploadChangeParam } from "antd/es/upload";
import type { RcFile, UploadFile, UploadProps } from "antd/es/upload/interface";

const getBase64 = (img: RcFile, callback: (url: string) => void) => {
  const reader = new FileReader();
  reader.addEventListener("load", () => {
    // callback(reader.result as string);
  });
  reader.readAsDataURL(img);
};

const beforeUpload = async (file: RcFile) => {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  if (!isJpgOrPng) {
    await message.error("You can only upload JPG/PNG file!");
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    await message.error("Image must smaller than 2MB!");
  }
  return isJpgOrPng && isLt2M;
};

const Share: FC = () => {
  const { data } = useRequest(async () => await shareData());
  const [form] = Form.useForm();
  form.setFieldsValue({
    desc: data?.data?.data?.desc,
    path: data?.data?.data?.path,
    title: data?.data?.data?.title
  });
  // 图片上传
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
      // Get this url from response in real world.
      getBase64(info.file.originFileObj as RcFile, (url) => {
        setLoading(false);
        setImageUrl(url);
      });
    }
  };

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  const onSubmit = (vul: Req.ShareData) => {
    sharePostData(vul)
      .then(() => message.success("修改成功"))
      .catch(() => message.error("修改失败"));
  };
  return (
    <>
      <div className="text-[20px] font-bold-[600] h-[32px] leading-[32px]">
        分享设置
      </div>
      <div className=" w-[100%] flex justify-center">
        <Form
          form={form}
          layout="vertical"
          name="wrap"
          labelAlign="left"
          labelWrap
          wrapperCol={{ flex: 1 }}
          colon={false}
          style={{ minWidth: 600 }}
          size="large"
          onFinish={onSubmit}
        >
          <Form.Item label="分享标题:" name="title">
            <Input />
          </Form.Item>
          <Form.Item label="自定义分享描述:" name="desc">
            <Input />
          </Form.Item>
          <Form.Item
            label="页面path:"
            name="path"
            extra="页面 path ，必须是以 / 开头的完整路径"
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="分享图标:"
            extra="
            路径可以是本地文件路径、代码包文件路径或者网络图片路径。显示图片长宽比是 5:4
          "
          >
            <Upload
              name="avatar"
              listType="picture-circle"
              className="avatar-uploader"
              showUploadList={false}
              action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
              beforeUpload={beforeUpload}
              onChange={handleChange}
            >
              {imageUrl !== null ? (
                <img src={imageUrl} alt="avatar" style={{ width: "100%" }} />
              ) : (
                uploadButton
              )}
            </Upload>
          </Form.Item>

          <Form.Item label=" ">
            <Button type="primary" htmlType="submit">
              提交保存
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  );
};

export default Share;
