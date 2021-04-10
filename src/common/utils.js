// item图片防抖函数
export function debounce(func, delay) {
  let timer = null;
  // ...args ...代表可以传入多个参数
  return function(...args) {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
}
