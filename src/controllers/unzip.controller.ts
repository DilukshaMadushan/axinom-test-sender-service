import { Request, Response, NextFunction } from "express";
import { unZip } from "../services/unzip.service";
import { callReceiver } from "../services/api.service";
import { login } from "../services/auth.service";

//@desc         Extract zip file and send data
//@route        POST /api/v1/uploadzip
const extractZipFile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let files: any = req.files;
  let fileArr: any;
  if (Array.isArray(files.file)) {
    fileArr = files.file;
  } else {
    fileArr = [files.file];
  }

  const outputArr: any = [];
  const output: any = {
    uploadOwner: req.body.uploadOwner,
    zipFiles: [],
  };

  for (let zipFile of fileArr) {
    const unZuppedRes = await unZip(zipFile.data);
    outputArr.push(unZuppedRes);
  }
  output.zipFiles = outputArr;
  let resCode: number;
  resCode = await callReceiver(output);
  if (resCode != 200) {
    await login();
    resCode = await callReceiver(output);
  }

  res.setHeader("Content-Type", "application/json");
  if (resCode == 200) {
    res.status(200).json({
      success: true,
      data: "Operation successfull",
    });
  } else {
    res.status(resCode).json({
      success: false,
      data: `Operation Failed ${resCode}`,
    });
  }
};

export { extractZipFile };
