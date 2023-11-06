/* eslint-disable react/prop-types */
import Cropper from "cropperjs";
import { v4 as uuidv4 } from "uuid";
import { Upload, Button } from "antd";
import React, { useRef, useState, useEffect, useCallback } from "react";

// import propTypes from "prop-types";
// import classnames from "classnames";

// import css from "./style.scss";
// import css from "./style.less";

export function ResizeUpload(props) {

  const { value, onChange } = props;

  const fileObjectCache = useRef([]);

  const [fileList, setFileList] = useState(value);

  /** 
   * URL.revokeObjectURL
   * @description 组件移除的时候需要释放BLOB URL
   * @see https://developer.mozilla.org/en-US/docs/Web/API/URL/revokeObjectURL_static
   * **/
  useEffect(() => {
    return () => {
      fileObjectCache.current.forEach((blobURL) => URL.revokeObjectURL(blobURL));
    };
  }, []);

  const handleBeforeUpload = useCallback((info) => {
    const blobURL = URL.createObjectURL(info);
    fileObjectCache.current.push(blobURL);
    const singleFileInfo = {
      uid: uuidv4(),
      name: info.name,
      status: "done",
      thumbUrl: blobURL,
      file: info
    };
    const composeFileList = [...fileList, singleFileInfo];
    setFileList(composeFileList);
    onChange(composeFileList);
    return false;
  }, [fileList]);

  const handleRemove = useCallback((info) => {
    URL.revokeObjectURL(info.thumbUrl);
    const afterFileList = fileList.filter((fileInfo) => fileInfo.uid !== info.uid);
    setFileList(afterFileList);
    onChange(afterFileList);
  }, [fileList]);

  return (
    <Upload
      listType="picture"
      fileList={fileList}
      beforeUpload={handleBeforeUpload}
      onRemove={handleRemove}
    >
      <Button>上传文件</Button>
    </Upload>
  )
};


ResizeUpload.propTypes = {

};

ResizeUpload.defaultProps = {
  value: [],
  onChange() { }
};