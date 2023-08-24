import nookies from "nookies";
import type { NextPageContext } from "next";
import { Admin_Verify } from "utils/adminUrl";
import apiCall from "utils/apiCall";

const authVerifyCookie = async (ctx: NextPageContext) => {
  // Get cookies from context
  const cookies = nookies.get(ctx);
  const headers = { Authorization: cookies.admintoken };
  if (headers.Authorization === undefined) {
    return false;
  } else {
    // // Get absolute origin url
    const data = await apiCall(Admin_Verify, "GET", {});

    if (!data || data == "Unauthorized") {
      return false;
    }
    return data;
  }
};

export default authVerifyCookie;
