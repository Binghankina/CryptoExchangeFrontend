import NProgress from "accessible-nprogress";

NProgress.settings.template = `
    <div class="bar" role="progressbar" aria-valuemin="0" aria-valuemax="1">
      <div class="peg"></div>
    </div>
  `;

export const initProgress = router => {
  router.beforeEach((to, from, next) => {
    NProgress.start();
    return next();
  });
  router.afterEach(() => {
    setTimeout(() => {
      NProgress.done();
    }, 100);
  });
};
