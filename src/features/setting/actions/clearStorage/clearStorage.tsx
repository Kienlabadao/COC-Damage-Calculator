import { toast } from "react-toastify";
import { clearAll } from "utils/localStorage";

export function clearStorage() {
  clearAll();
  toast("Hello! This is a default notification.");
}
