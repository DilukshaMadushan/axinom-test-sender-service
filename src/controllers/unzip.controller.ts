import { Request, Response, NextFunction } from "express";
import { unZip } from "../services/unzip.service";
import { callReceiver } from "../services/api.service";
import { login } from "../services/auth.service";

const extractZipFile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const files: any = req.files;
  const outputArr: any = [];
  const output: any = {
    uploadOwner: req.body.uploadOwner,
    zipFiles: [],
  };
  for (let zipFile of files.file) {
    const unZuppedRes = await unZip(zipFile.data);
    outputArr.push(unZuppedRes);
  }
  output.zipFiles = outputArr;
  let resCode: number;
  resCode = await callReceiver(output);
  if (resCode == 401) {
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
      data: "Operation Failed",
    });
  }
};

export { extractZipFile };
