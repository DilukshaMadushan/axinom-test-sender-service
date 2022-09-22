import axios from "axios";
import { logger } from "../utils/logger.util";
import { token } from "./auth.service";

//@desc         Call receiver API
const callReceiver = async (body: any) => {
  try {
    const response = await axios.post(
      process.env.RECEIVER_UPLOAD_URL ||
        "http://localhost:5001/api/v1/zip-content",
      body,
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    logger.info(`Status: ${response.status}`);
    logger.info(response.data.data);
    return response.status;
  } catch (error: any) {
    logger.error("Error occured while calling receiver app");
    return 500;
  }
};

export { callReceiver };
