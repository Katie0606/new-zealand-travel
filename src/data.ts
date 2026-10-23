export const photos = {
  hero: "./images/hero.jpg",
  tekapo: "./images/tekapo.jpg",
  mountain: "./images/mountains.jpg",
  queenstown: "./images/queenstown.jpg",
  stay: "./images/stay.jpg",
  city: "./images/christchurch.png",
};
export const maps = (query: string) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
export const routeUrl =
  "https://www.google.com/maps/dir/?api=1&origin=Christchurch+New+Zealand&destination=Queenstown+New+Zealand&waypoints=Lake+Tekapo%7CLake+Pukaki%7CCromwell&travelmode=driving";
export type Stop = {
  time: string;
  title: string;
  en: string;
  detail: string;
  drive?: string;
  photo?: string;
  map: string;
  shot?: string;
};
export const days: {
  date: string;
  week: string;
  title: string;
  en: string;
  route: string;
  distance: string;
  description: string;
  stops: Stop[];
}[] = [
  {
    date: "11.22",
    week: "周日",
    title: "你好，基督城",
    en: "A gentle beginning",
    route: "基督城机场 → 市区 → Clearwater",
    distance: "约 35 km · 45 分钟",
    description:
      "落地后的第一天，把节奏放慢。取车、补给，在花园之城开启南岛的夏日前奏。",
    stops: [
      {
        time: "14:55",
        title: "抵达基督城 · 机场取车",
        en: "Christchurch Airport",
        detail:
          "QF133 布里斯班 08:25 出发，当地 14:55 抵达。预留约 90 分钟入境、取行李和办理租车；疲劳时先休息。",
        map: "Christchurch Airport rental cars",
        drive: "机场 → 市区约 25 分钟",
      },
      {
        time: "16:30",
        title: "城市补给与河畔漫步",
        en: "Riverside Market",
        detail:
          "采购饮用水、早餐和路上零食；如市场已闭店，可前往超市。沿雅芳河散步，适应左侧驾驶。",
        map: "Riverside Market Christchurch",
        photo: photos.city,
        shot: "雅芳河桥边 · 柔和的傍晚光线",
      },
      {
        time: "18:00",
        title: "入住湖畔公寓",
        en: "Clearwater Quays Apartments",
        detail:
          "前往 Clearwater Quays Apartments。晚餐以简单自炊为主，提前确认厨房设施和入住方式。",
        map: "Clearwater Quays Apartments Christchurch",
        drive: "市区 → 住宿约 25 分钟",
      },
    ],
  },
  {
    date: "11.23",
    week: "周一",
    title: "驶向蒂卡波的蓝",
    en: "Chasing the turquoise",
    route: "基督城 → Geraldine → Lake Tekapo",
    distance: "约 230 km · 3 小时",
    description:
      "穿过坎特伯雷平原，在第一眼湖蓝前停下。好牧羊人教堂、鲁冰花与星空，是今天的关键词。",
    stops: [
      {
        time: "09:00",
        title: "出发，穿越坎特伯雷平原",
        en: "Christchurch → Geraldine",
        detail:
          "早餐后退房，沿 SH1 / SH79 前往 Geraldine，中途休息喝咖啡。驾驶时长不含休息，避免赶路。",
        map: "Geraldine New Zealand",
        drive: "约 140 km · 1 小时 50 分钟",
      },
      {
        time: "12:30",
        title: "好牧羊人教堂与湖畔鲁冰花",
        en: "Church of the Good Shepherd",
        detail:
          "抵达蒂卡波后午餐，沿湖畔步道慢行。11 月下旬可能遇见鲁冰花，花期依天气而变；沿现有步道拍摄，请勿踩踏植被。",
        map: "Church of the Good Shepherd Lake Tekapo",
        photo: photos.tekapo,
        shot: "教堂侧后方湖岸 · 湖水、花丛与雪山同框",
        drive: "Geraldine → Tekapo 约 1 小时 15 分钟",
      },
      {
        time: "15:00",
        title: "入住 The Quartermaster",
        en: "Slow afternoon by the lake",
        detail:
          "放下行李，享受自由的湖畔下午。可选 Tekapo Springs 温泉，需自行确认开放时间与预约。",
        map: "The Quartermaster Lake Tekapo",
      },
      {
        time: "21:30",
        title: "暗夜星空，留给宇宙的时间",
        en: "Aoraki Mackenzie Dark Sky Reserve",
        detail:
          "天气晴朗时在安全的湖岸观星，专业观星团需预约。日落和夜空条件临近出发再确认，准备保暖外套。",
        map: "Lake Tekapo lakefront",
        shot: "湖岸朝南 · 三脚架与长曝光",
      },
    ],
  },
  {
    date: "11.24",
    week: "周二",
    title: "湖光之间，抵达皇后镇",
    en: "The scenic way south",
    route: "Tekapo → Lake Pukaki → Cromwell → 皇后镇",
    distance: "约 260 km · 3.5 小时",
    description:
      "把今天留给公路。普卡基湖的牛奶蓝、林迪斯山口的起伏，以及瓦卡蒂普湖边的第一场日落。",
    stops: [
      {
        time: "09:00",
        title: "普卡基湖观景台",
        en: "Lake Pukaki Lookout",
        detail:
          "早餐退房后沿 SH8 前往普卡基湖南岸；天气通透时可远眺库克山。本日不绕行库克山徒步，保留充足驾驶休息时间。",
        map: "Lake Pukaki View Point",
        photo: photos.tekapo,
        drive: "Tekapo → Pukaki 约 45 分钟",
        shot: "南岸观景台 · 长焦压缩雪山与湖面",
      },
      {
        time: "11:00",
        title: "林迪斯山口 · 公路风景",
        en: "Lindis Pass",
        detail:
          "途经 Twizel、Omarama 与林迪斯山口，仅在正规停车区停靠。到 Cromwell 享用午餐、补充燃油。",
        map: "Lindis Pass Viewpoint",
        drive: "Pukaki → Cromwell 约 2 小时",
        shot: "观景台步道 · 金色草坡与蜿蜒公路",
      },
      {
        time: "15:30",
        title: "入住皇后镇的风景之家",
        en: "Prime House in Queenstown",
        detail:
          "入住 Prime House in Queenstown with Beautiful Views（2 晚）。实际位置与入住时间以订单为准。",
        map: "Queenstown New Zealand",
        drive: "Cromwell → Queenstown 约 1 小时",
      },
      {
        time: "18:00",
        title: "瓦卡蒂普湖畔的日落散步",
        en: "Lake Wakatipu",
        detail:
          "湖岸步道与 Queenstown Gardens 轻松散步，找一间餐厅，庆祝抵达旅程的最后一站。",
        map: "Queenstown Gardens",
        photo: photos.queenstown,
        shot: "湖畔码头 · 傍晚的山影与帆船",
      },
    ],
  },
  {
    date: "11.25",
    week: "周三",
    title: "把快乐留在皇后镇",
    en: "A little wild, a little slow",
    route: "皇后镇 → 鹿园 → 市区湖畔",
    distance: "约 35 km · 50 分钟",
    description:
      "和小鹿见面，吃一只心心念念的汉堡，再把下午留给山顶和湖风。今天不赶路。",
    stops: [
      {
        time: "09:30",
        title: "鹿园的早晨",
        en: "Deer Park Heights",
        detail:
          "自驾前往 Deer Park Heights，提前在官网确认预约、开放与车辆限制。山路较窄，慢行并遵守动物喂食规定。",
        map: "Deer Park Heights Queenstown",
        drive: "市区 → 鹿园约 20 分钟",
        photo: photos.mountain,
        shot: "山顶观景区 · 瓦卡蒂普湖全景",
      },
      {
        time: "12:30",
        title: "大脸汉堡与一口甜甜",
        en: "Fergburger & Fergbaker",
        detail:
          "到 Fergburger 品尝汉堡，再去 Fergbaker 或 Mrs Ferg 挑选甜点。热门时段可能排队，预留 1 小时。",
        map: "Fergburger Queenstown",
      },
      {
        time: "14:30",
        title: "山顶缆车，或湖畔发呆",
        en: "Skyline Queenstown",
        detail:
          "可选 Skyline 缆车与山顶观景，票价、开放时间及项目限制以官网为准。也可以沿湖散步，逛独立小店。",
        map: "Skyline Queenstown",
        photo: photos.queenstown,
        shot: "鲍勃峰观景台 · 皇后镇标志性全景",
      },
      {
        time: "18:30",
        title: "在南岛的最后一顿晚餐",
        en: "One more evening",
        detail: "选择湖边餐厅或回住宿自炊，整理行李、核对航班和还车要求。",
        map: "Queenstown waterfront",
      },
    ],
  },
  {
    date: "11.26",
    week: "周四",
    title: "带着湖蓝，回家",
    en: "Until we meet again",
    route: "皇后镇 → 机场 → 布里斯班",
    distance: "约 8 km · 20 分钟",
    description:
      "再喝一杯咖啡，再看一眼湖。为返程留下从容的余量，和南岛好好道别。",
    stops: [
      {
        time: "09:00",
        title: "最后的湖畔早餐",
        en: "A slow morning",
        detail:
          "退房前检查随身物品。可在湖边吃早餐，或简单购买伴手礼；行李请勿留在车内显眼处。",
        map: "Queenstown waterfront",
        photo: photos.queenstown,
        shot: "清晨码头 · 留一张旅行合照",
      },
      {
        time: "11:00",
        title: "退房，自由午餐",
        en: "Check-out & lunch",
        detail:
          "按订单规定退房。午餐后前往机场附近加油，核对租车公司的异地还车地址与油量要求。",
        map: "Queenstown Airport petrol station",
      },
      {
        time: "14:00",
        title: "加油还车，办理值机",
        en: "Queenstown Airport",
        detail:
          "建议 14:00 左右到达还车点，为接驳与国际航班手续预留约 3 小时；以航空公司要求为准。",
        map: "Queenstown Airport rental car return",
        drive: "市区 → 机场约 20 分钟",
      },
      {
        time: "17:35",
        title: "VA120 · 飞往布里斯班",
        en: "Queenstown → Brisbane",
        detail:
          "当地 17:35 出发，布里斯班当地 18:20 抵达。日期和时刻来自所提供截图，最终以航空公司通知为准。",
        map: "Queenstown Airport",
      },
    ],
  },
];
export const stays = [
  {
    name: "Clearwater Quays Apartments",
    zh: "克利尔沃特码头公寓",
    place: "CHRISTCHURCH",
    date: "11.22 — 11.23",
    nights: "1 晚",
    price: null,
    photo: photos.stay,
    map: "Clearwater Quays Apartments Christchurch",
    note: "湖畔公寓 · 适合抵达后的休憩",
  },
  {
    name: "The Quartermaster",
    zh: "蒂卡波的湖畔时光",
    place: "LAKE TEKAPO",
    date: "11.23 — 11.24",
    nights: "1 晚",
    price: 4535,
    photo: photos.tekapo,
    map: "The Quartermaster Lake Tekapo",
    note: "截图记录 ¥4,535 · 总价请核对订单",
  },
  {
    name: "Prime House in Queenstown",
    zh: "Beautiful Views · 风景之家",
    place: "QUEENSTOWN",
    date: "11.24 — 11.26",
    nights: "2 晚",
    price: null,
    photo: photos.stay,
    map: "Queenstown New Zealand",
    note: "具体地址、房型与价格待订单确认",
  },
];
export const checklist = [
  {
    group: "证件与预订",
    items: [
      "护照及有效新西兰签证 / NZeTA（按资格）",
      "往返机票与住宿确认单",
      "驾照原件 + 合规英文翻译或适用国际驾照",
      "租车订单、信用卡与保险条款",
      "旅行保险及紧急联系人",
    ],
  },
  {
    group: "行李与出发",
    items: [
      "防风保暖外套与雨具",
      "防晒霜、墨镜、遮阳帽",
      "舒适步行鞋与换洗衣物",
      "新西兰转换插头、充电宝与相机",
      "手机漫游 / eSIM 与离线地图",
      "常用药、饮用水与路上零食",
    ],
  },
  {
    group: "自驾与安全",
    items: [
      "熟悉左侧通行与环岛让行规则",
      "核对取还车时间及异地还车费",
      "检查轮胎、油量并拍摄车辆状况",
      "查询 NZTA 实时路况与天气",
      "确认鹿园、缆车及观星预约",
    ],
  },
];
