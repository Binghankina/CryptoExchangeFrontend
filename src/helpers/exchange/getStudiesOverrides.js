import colors from "@/colors";

export const getStudiesOverrides = theme => {
  var themes = {
    light: {
      c0: colors["color-down"],
      c1: colors["color-up"],
      t: 70,
      v: !1
    },
    night: {
      c0: colors["color-down"],
      c1: colors["color-up"],
      t: 70,
      v: !1
    }
  };
  var t = themes[theme];
  return {
    "volume.volume.color.0": t.c0,
    "volume.volume.color.1": t.c1,
    "volume.volume.transparency": t.t
  };
};
