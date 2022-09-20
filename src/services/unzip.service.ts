import jszip from "jszip";
import { logger } from "../utils/logger.util";

const unZip = async (zipFile: any) => {
  const unzipper: jszip = new jszip();
  const result: any = await unzipper.loadAsync(zipFile);

  const keys: string[] = Object.keys(result.files);

  const unZippedDataJson = {
    folderName: "",
    content: [],
  };
  const fileArr: any = [];

  for (let key of keys) {
    const item: any = result.files[key];

    if (!item.dir) {
      fileArr.push(objectToJson(item, item.dir));
    } else {
      const pathArr: string[] = key.split("/");
      if (pathArr.length == 2) {
        unZippedDataJson.folderName = pathArr[0];
      }
    }
  }

  unZippedDataJson.content = fileArr;
  return unZippedDataJson;
};

export { unZip };

const objectToJson = (object: any, isDir: boolean) => {
  const jsonObj = {
    name: "",
    isDir: false,
    data: "",
  };
  jsonObj.name = object.name;
  jsonObj.isDir = object.dir;
  if (!isDir) {
    jsonObj.data = object._data.compressedContent.toString("base64");
  }
  return jsonObj;
};
