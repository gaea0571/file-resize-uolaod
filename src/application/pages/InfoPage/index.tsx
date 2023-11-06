/* eslint-disable react/prop-types */
import Cropper from "cropperjs";
import { Form, Button } from "antd";
import React, { useCallback } from "react";
import { ResizeUpload } from "@/application/components/ResizeUpload";


// import propTypes from "prop-types";
// import classnames from "classnames";

// import css from "./style.module.scss";
// import css from "./style.module.less";


async function getResizeBlobWithFile(file) {
  try {
    const originBlobURL = URL.createObjectURL(file);
    const imageElement: HTMLImageElement = await new Promise((resolve, reject) => {
      const imageObject = document.createElement("img");
      imageObject.src = originBlobURL;
      imageObject.onload = () => resolve(imageObject);
      imageObject.onerror = (error) => reject(error);
    });

    let scaleRate = 1;
    const { width, height } = imageElement;
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");

    if (width >= height) {
      if (width > 300) {
        scaleRate = 1 - (width - 300) / width;
      };
      if (width < 300) {
        scaleRate = 1 - (300 - width) / 300;
      };
      const drawWidth = width * scaleRate;
      const drawHeight = height * scaleRate;
      canvas.width = drawWidth;
      canvas.height = drawHeight;
      context.drawImage(imageElement, 0, 0, drawWidth, drawHeight);
    } else {
      if (height > 300) {
        scaleRate = 1 - (height - 300) / height;
      };
      if (height < 300) {
        scaleRate = 1 - (300 - height) / 300;
      };
      const drawWidth = width * scaleRate;
      const drawHeight = height * scaleRate;
      canvas.width = drawWidth;
      canvas.height = drawHeight;
      context.drawImage(imageElement, 0, 0, drawWidth, drawHeight);
    };

    const resizeBlob: any = await new Promise((resolve, reject) => {
      try {
        canvas.toBlob(resolve);
      } catch (error) {
        reject(reject);
      };
    });

    const resizeFile = new File([resizeBlob], file.name);

    return { resizeBlob, resizeFile, originBlobURL };
  } catch (error) {
    throw error;
  };
};

export function InfoPage(props) {

  const [form] = Form.useForm();

  const handleClick = useCallback(async () => {
    const { upload } = await form.validateFields();
    console.log("upload", upload);
    const file = upload[0].file;
    const { resizeFile } = await getResizeBlobWithFile(file);
    console.log("resizeFile", resizeFile);
    const previewBlobURL = URL.createObjectURL(resizeFile);
    const imageElement = document.createElement("img");
    document.body.appendChild(imageElement);
    imageElement.src = previewBlobURL;
  }, [form]);

  return (
    <Form form={form}>
      <Form.Item label="文件域" name="upload">
        <ResizeUpload />
      </Form.Item>
      <Button onClick={handleClick}>提交</Button>
    </Form>
  )
};


InfoPage.propTypes = {


};
InfoPage.defaultProps = {


};