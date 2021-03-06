import Notification from "iview/src/components/base/notification";

const prefixCls = "ivu-notice";
const prefixKey = "ivu_notice_key_";

let top = 24;
let defaultDuration = 5;
let noticeInstance;
let name = 1;

function getNoticeInstance() {
  noticeInstance =
    noticeInstance ||
    Notification.newInstance({
      prefixCls: prefixCls,
      styles: {
        top: `${top}px`,
        right: 0
      }
    });

  return noticeInstance;
}

function notice(type, options) {
  const title = options.title || "";
  const desc = options.desc || "";
  const noticeKey = options.name || `${prefixKey}${name}`;
  const onClose = options.onClose || function() {};
  const render = options.render;
  // todo const btn = options.btn || null;
  const duration =
    options.duration === 0 ? 0 : options.duration || defaultDuration;

  name++;

  let instance = getNoticeInstance();
  let content;
  const with_desc =
    options.render && !title
      ? ""
      : desc || options.render
      ? ` ${prefixCls}-with-desc`
      : "";

  if (type == "normal") {
    content = `
            <div class="${prefixCls}-custom-content ${prefixCls}-with-normal ${with_desc}">${title}</div>
        `;
  } else {
    content = `
            <div class="${prefixCls}-custom-content ${prefixCls}-with-${type} ${with_desc}">${title}</div>
        `;
  }
  instance.notice({
    name: noticeKey.toString(),
    duration: duration,
    styles: {},
    transitionName: "move-notice",
    content: content,
    withIcon: false,
    render: render,
    hasTitle: !!title,
    onClose: onClose,
    closable: true,
    type: "notice"
  });
}

export default {
  open(options) {
    return notice("normal", options);
  },
  info(options) {
    return notice("info", options);
  },
  success(options) {
    return notice("success", options);
  },
  warning(options) {
    return notice("warning", options);
  },
  error(options) {
    return notice("error", options);
  },
  config(options) {
    if (options.top) {
      top = options.top;
    }
    if (options.duration || options.duration === 0) {
      defaultDuration = options.duration;
    }
  },
  close(name) {
    if (name) {
      name = name.toString();
      if (noticeInstance) {
        noticeInstance.remove(name);
      }
    } else {
      return false;
    }
  },
  destroy() {
    let instance = getNoticeInstance();
    noticeInstance = null;
    instance.destroy("ivu-notice");
  }
};
