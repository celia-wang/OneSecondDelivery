import Cookies from "js-cookie";

export default function checkPermission() {
  return Cookies.get("token") != null;
}
