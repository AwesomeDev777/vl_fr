import nookies from "nookies";
import type { NextPageContext } from "next";
import { Admin_Verify } from "utils/adminUrl";
import axios from "axios";

const authVerifyCookie = async (ctx: NextPageContext) => {
  // Get cookies from context
  const cookies = nookies.get(ctx);
  const headers = { Authorization: cookies.admintoken };
  if (headers.Authorization === undefined) {
    return false;
  } else {
    // // Get absolute origin url
    const resp = await axios({
      url: Admin_Verify,
      method: "GET",
      headers
    })

    if (!resp.data || resp.data == "Unauthorized") {
      return false;
    }
    return resp.data;
  }
};

export default authVerifyCookie;
