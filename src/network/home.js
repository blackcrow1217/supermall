import { request } from "./request";

export function getHomeMultidata(params) {
  return request({
    url:'/home/multidata'
  })
}