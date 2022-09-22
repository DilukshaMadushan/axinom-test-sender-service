import axios from "axios";
import { logger } from "../utils/logger.util";

let token: string;

//@desc    Authenticate with receiver app
const login = async () => {
  const body = {
    name: process.env.USER_NAME || "Diluksha",
    password: process.env.PASSWORD || "123456",
  };
  try {
    const response: any = await axios.post(
      process.env.RECEIVER_LOGIN_URL ||
        "http://localhost:5001/api/v1/auth/login",
      body
    );
    if (response.status == 200 && response.data.success) {
      token = response.data.token;
      logger.info(`Status: ${response.status}, ${response.data.data}`);
    } else {
      logger.error(`Status: ${response.status}, ${response.data.error}`);
    }
  } catch (error: any) {
    logger.error("Error occured while calling login API, ", error.message);
  }
};

export { login, token };
