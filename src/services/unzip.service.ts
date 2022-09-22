import jszip from "jszip";
import { logger } from "../utils/logger.util";

//@desc         Extract zip file
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
      fileArr.push(await objectToJson(item, item.dir));
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

//@desc         Convert Object to json
const objectToJson = async (object: any, isDir: boolean) => {
  const jsonObj = {
    name: "",
    isDir: false,
    data: "",
  };
  jsonObj.name = object.name;
  jsonObj.isDir = object.dir;
  if (!isDir) {
    jsonObj.data = await object.async("base64");
  }
  return jsonObj;
};
