import Notice from "@/components/custom/notice";
import Message from "@/components/custom/message";

export const runNotice= (type, message) => {
  if (/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)) {
    Message[type](message);
  } else {
    Notice[type]({ title: message });
  }
}


