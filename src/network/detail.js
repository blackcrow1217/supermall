// 详情页网络请求封装
import {request} from "./request";

export function getDetail(iid) {
  return request({
    url:"/detail",
    params:{
      iid
    }
  })
}

// ex6语法 类 接口比较乱，创建一个对象来保存这些获取的数据
// 保存商品详情信息
export class Goods {
  constructor(itemInfo, columns, services) {
    this.title = itemInfo.title
    this.desc = itemInfo.desc
    this.newPrice = itemInfo.price
    this.oldPrice = itemInfo.oldPrice
    this.discount = itemInfo.discountDesc
    this.columns = columns
    this.services = services
    this.realPrice = itemInfo.lowNowPrice
  }
}
// 保存商家展示信息
export class Shop {
  constructor(shopInfo) {
    this.logo = shopInfo.shopLogo;
    this.name = shopInfo.name;
    this.fans = shopInfo.cFans;
    this.sells = shopInfo.cSells;
    this.score = shopInfo.score;
    this.goodsCount = shopInfo.cGoods
  }
}

// 保存商品尺码等信息
export class GoodsParam {
  constructor(info, rule) {
    // images可有些商品有值，有些商品没有值
    this.image = info.images ? info.images[0] : "";
    this.infos = info.set;
    this.sizes = rule.tables;
  }
}