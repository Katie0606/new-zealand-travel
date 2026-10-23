import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import {
  ArrowUpRight,
  ArrowRight,
  MapPin,
  CalendarDays,
  Users,
  CarFront,
  Menu,
  X,
  Camera,
  Clock3,
  Navigation,
  Plane,
  Check,
  Plus,
  Trash2,
  Wallet,
  CheckCheck,
  Mountain,
  ExternalLink,
  BedDouble,
  Route,
  Download,
} from "lucide-react";
import { days, stays, photos, maps, routeUrl, checklist } from "./data";
import "./style.css";

function useSaved<T>(key: string, initial: T): [T, (value: T) => void] {
  const [value, setValue] = useState<T>(() => {
    try {
      const raw = localStorage.getItem(key);
      return raw ? (JSON.parse(raw) as T) : initial;
    } catch {
      return initial;
    }
  });
  return [
    value,
    (next: T) => {
      setValue(next);
      try {
        localStorage.setItem(key, JSON.stringify(next));
      } catch {
        /* private browsing can disable storage */
      }
    },
  ];
}
const LinkOut = ({
  href,
  children,
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) => (
  <a className={className} href={href} target="_blank" rel="noreferrer">
    {children}
  </a>
);
function Photo({
  src,
  alt,
  className = "",
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  return (
    <img
      className={className}
      src={src}
      alt={alt}
      loading="lazy"
      onError={(e) => {
        e.currentTarget.style.opacity = "0";
        e.currentTarget.parentElement?.classList.add("photo-unavailable");
      }}
    />
  );
}
function App() {
  const [day, setDay] = useState(0);
  const [menu, setMenu] = useState(false);
  const [tab, setTab] = useState("行程");
  const [checked, setChecked] = useSaved<string[]>(
    "south-island-checklist-v1",
    [],
  );
  const [people, setPeople] = useSaved<number>("south-island-people-v1", 3);
  const [rate, setRate] = useSaved<number>("south-island-rate-v1", 4.3);
  type Expense = {
    id: string;
    name: string;
    amount: number;
    currency: "CNY" | "NZD";
    category: string;
  };
  const [expenses, setExpenses] = useSaved<Expense[]>(
    "south-island-expenses-v1",
    [
      {
        id: "tekapo",
        name: "The Quartermaster · 1 晚（待核对）",
        amount: 4535,
        currency: "CNY",
        category: "住宿",
      },
    ],
  );
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [currency, setCurrency] = useState<"CNY" | "NZD">("NZD");
  const [category, setCategory] = useState("餐饮");
  const [error, setError] = useState("");
  const total = expenses.reduce(
    (s, e) => s + e.amount * (e.currency === "NZD" ? rate : 1),
    0,
  );
  const allItems = checklist.flatMap((g) => g.items);
  const done = checked.filter((i) => allItems.includes(i)).length;
  const current = days[day];
  const go = (id: string, label: string) => {
    setTab(label);
    setMenu(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };
  function addExpense(e: React.FormEvent) {
    e.preventDefault();
    const n = Number(amount);
    if (!name.trim() || !Number.isFinite(n) || n <= 0 || n > 10000000) {
      setError("请输入支出名称和有效的正数金额。");
      return;
    }
    setExpenses([
      ...expenses,
      {
        id: crypto.randomUUID(),
        name: name.trim(),
        amount: n,
        currency,
        category,
      },
    ]);
    setName("");
    setAmount("");
    setError("");
  }
  const money = (v: number) =>
    v.toLocaleString("zh-CN", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  function exportBudget() {
    const body =
      "\uFEFF名称,类别,币种,金额,人民币折算\n" +
      expenses
        .map((e) =>
          [
            e.name,
            e.category,
            e.currency,
            e.amount,
            (e.amount * (e.currency === "NZD" ? rate : 1)).toFixed(2),
          ]
            .map((v) => '"' + String(v).replaceAll('"', '""') + '"')
            .join(","),
        )
        .join("\n");
    const url = URL.createObjectURL(
      new Blob([body], { type: "text/csv;charset=utf-8;" }),
    );
    const a = document.createElement("a");
    a.href = url;
    a.download = "南岛旅行预算.csv";
    a.click();
    URL.revokeObjectURL(url);
  }
  return (
    <>
      <header className="header">
        <a href="#" className="brand" aria-label="南岛来信首页">
          <Mountain size={28} strokeWidth={1.3} />
          <span>
            南岛来信<small>THE SOUTH ISLAND JOURNAL</small>
          </span>
        </a>
        <nav className={menu ? "nav open" : "nav"}>
          {[
            ["itinerary", "行程"],
            ["route", "自驾路线"],
            ["stays", "旅行住所"],
            ["budget", "旅行预算"],
            ["packing", "行前准备"],
          ].map(([id, label]) => (
            <button
              key={id}
              className={tab === label ? "active" : ""}
              onClick={() => go(id, label)}
            >
              {label}
            </button>
          ))}
        </nav>
        <span className="header-note">NEW ZEALAND · 2026</span>
        <button
          className="menu-toggle"
          aria-label={menu ? "关闭菜单" : "打开菜单"}
          onClick={() => setMenu(!menu)}
        >
          {menu ? <X /> : <Menu />}
        </button>
      </header>
      <main>
        <section className="hero">
          <img
            src={photos.hero}
            alt="新西兰南岛的湖泊与群山"
            fetchPriority="high"
            onError={(e) => (e.currentTarget.style.opacity = "0")}
          />
          <div className="hero-shade" />
          <div className="hero-content">
            <p className="eyebrow light">
              <span /> A ROAD TRIP TO REMEMBER
            </p>
            <h1>
              向南，
              <br />
              去湖蓝的地方。
            </h1>
            <p className="hero-subtitle">
              五天，三座小城。把日子交给公路，把心留在南岛。
            </p>
            <div className="hero-bottom">
              <button
                onClick={() => go("itinerary", "行程")}
                className="hero-button"
              >
                开启我们的旅程 <ArrowUpRight size={19} />
              </button>
              <p>
                CHRISTCHURCH <span>—</span> LAKE TEKAPO <span>—</span>{" "}
                QUEENSTOWN
              </p>
            </div>
          </div>
          <span className="hero-coordinate">
            43°53′ S &nbsp; 170°30′ E<br />A LITTLE CLOSER TO NATURE
          </span>
          <span className="hero-number">01 — 05</span>
        </section>
        <div className="trip-summary">
          <div>
            <CalendarDays />
            <span>
              旅行时间<strong>2026.11.22 — 11.26</strong>
            </span>
          </div>
          <div>
            <Users />
            <span>
              同行伙伴<strong>2–3 位旅行者</strong>
            </span>
          </div>
          <div>
            <CarFront />
            <span>
              旅行方式<strong>南岛自驾 · 约 570 km</strong>
            </span>
          </div>
          <div className="summary-last">
            <span className="small-sun">✳</span>
            <span>
              季节手记<strong>春末夏初，刚好出发</strong>
            </span>
          </div>
        </div>
        <section id="itinerary" className="section itinerary-section">
          <div className="section-top">
            <div>
              <p className="eyebrow">01 / THE ITINERARY</p>
              <h2>不赶路，只感受。</h2>
              <p className="section-desc">
                从花园城市到星空小镇，再向南，抵达山与湖的怀抱。
              </p>
            </div>
            <span className="hand-note">
              五天四晚，慢慢收藏风景 <span>↙</span>
            </span>
          </div>
          <div className="day-tabs" role="tablist" aria-label="每日行程">
            {days.map((d, i) => (
              <button
                key={d.date}
                role="tab"
                aria-selected={i === day}
                aria-controls="daily-panel"
                id={`day-${i}`}
                className={i === day ? "selected" : ""}
                onClick={() => setDay(i)}
              >
                <span>
                  DAY 0{i + 1}
                  <small>
                    {d.date} · {d.week}
                  </small>
                </span>
                <strong>
                  {
                    [
                      "初见基督城",
                      "湖畔蒂卡波",
                      "一路向皇后镇",
                      "山湖自由日",
                      "下次再见",
                    ][i]
                  }
                </strong>
                <ArrowUpRight size={18} />
              </button>
            ))}
          </div>
          <div
            className="daily-layout"
            id="daily-panel"
            role="tabpanel"
            aria-labelledby={`day-${day}`}
            key={day}
          >
            <div className="daily-main">
              <div className="daily-heading">
                <span className="day-big">0{day + 1}</span>
                <div>
                  <p className="english-title">{current.en}</p>
                  <h3>{current.title}</h3>
                  <p>{current.description}</p>
                </div>
              </div>
              <div className="daily-meta">
                <span>
                  <Route size={15} />
                  {current.route}
                </span>
                <span>
                  <CarFront size={15} />
                  {current.distance}
                </span>
              </div>
              <div className="timeline">
                {current.stops.map((s, i) => (
                  <article key={s.time} className="stop">
                    <div className="stop-time">
                      {s.time}
                      <span className={i === 0 ? "dot filled" : "dot"} />
                    </div>
                    <div className="stop-body">
                      <div className="stop-title">
                        <h4>{s.title}</h4>
                        <LinkOut href={maps(s.map)} className="text-link">
                          导航 <ArrowUpRight size={15} />
                        </LinkOut>
                      </div>
                      <p className="stop-en">{s.en}</p>
                      <p className="stop-description">{s.detail}</p>
                      {s.drive && (
                        <p className="drive-tag">
                          <CarFront size={14} />
                          {s.drive}
                        </p>
                      )}
                      {s.shot && (
                        <p className="photo-tip">
                          <Camera size={15} />
                          <span>拍照灵感 · {s.shot}</span>
                        </p>
                      )}
                      {s.photo && (
                        <div className="stop-photo">
                          <Photo src={s.photo} alt={`${s.title}风景参考`} />
                          <span>SCENES FROM THE SOUTH ISLAND</span>
                        </div>
                      )}
                    </div>
                  </article>
                ))}
              </div>
            </div>
            <aside className="day-aside">
              <div className="postcard">
                <Photo
                  src={
                    day === 1 || day === 2 ? photos.tekapo : photos.queenstown
                  }
                  alt="南岛湖畔风景参考"
                />
                <span className="postcard-label">A MOMENT TO KEEP</span>
                <div>
                  <p>
                    {day === 1
                      ? "蓝得不太真实。"
                      : day === 4
                        ? "旅行会结束，回忆不会。"
                        : "好风景，值得慢一点。"}
                  </p>
                  <small>— SOUTH ISLAND, NEW ZEALAND</small>
                </div>
              </div>
              <div className="tips-card">
                <span className="eyebrow">A LITTLE REMINDER</span>
                <h4>
                  {day === 0
                    ? "落地第一天，慢慢来"
                    : day === 4
                      ? "把从容留给返程"
                      : "路上，比目的地更动人"}
                </h4>
                <p>
                  {day === 0
                    ? "新西兰采用左侧通行。取车后先熟悉车辆，长途飞行后不要疲劳驾驶。"
                    : day === 4
                      ? "皇后镇机场较小，但国际航班仍需预留充足时间。还车前记得加油并拍照。"
                      : "这里的弯道、山路和风景都值得放慢速度。驾驶时间为估算，请为休息与拍照多留一点余量。"}
                </p>
                <div>
                  <Clock3 size={16} /> 行程时间均为新西兰当地时间
                </div>
              </div>
              <div className="flight-card">
                <Plane size={20} />
                <p>我们的来回航程</p>
                <div>
                  <b>11.22</b>
                  <span>
                    BNE <ArrowRight size={14} /> CHC
                  </span>
                  <small>QF133 · 08:25 → 14:55</small>
                </div>
                <div>
                  <b>11.26</b>
                  <span>
                    ZQN <ArrowRight size={14} /> BNE
                  </span>
                  <small>VA120 · 17:35 → 18:20</small>
                </div>
                <p className="tiny">
                  航班信息来自提供的截图；请以航司通知为准。所有时刻为出发 /
                  抵达地当地时间。
                </p>
              </div>
            </aside>
          </div>
          <div className="day-bottom">
            <span>每一天，都有值得期待的小事。</span>
            <button
              className="text-link"
              onClick={() => {
                setDay((day + 1) % 5);
                document
                  .querySelector(".day-tabs")
                  ?.scrollIntoView({ behavior: "smooth", block: "start" });
              }}
            >
              下一天 · {days[(day + 1) % 5].title} <ArrowRight size={16} />
            </button>
          </div>
        </section>
        <section id="route" className="route-section">
          <div className="section route-inner">
            <div className="route-copy">
              <p className="eyebrow">02 / ON THE ROAD</p>
              <h2>
                最美的风景，
                <br />
                在路上。
              </h2>
              <p>
                约 570 公里的南岛公路，把城市、湖泊与山谷串成一段私藏的记忆。
              </p>
              <div className="route-stops">
                <span>
                  01<b>基督城</b>
                  <small>Christchurch</small>
                </span>
                <i>230 km · 3 h</i>
                <span>
                  02<b>蒂卡波湖</b>
                  <small>Lake Tekapo</small>
                </span>
                <i>260 km · 3.5 h</i>
                <span>
                  03<b>皇后镇</b>
                  <small>Queenstown</small>
                </span>
              </div>
              <LinkOut href={routeUrl} className="dark-button">
                <Navigation size={17} /> 在 Google 地图查看自驾路线{" "}
                <ArrowUpRight size={17} />
              </LinkOut>
              <p className="tiny">
                里程含市内游览估算；路况与天气请查询{" "}
                <a
                  href="https://www.journeys.nzta.govt.nz/"
                  target="_blank"
                  rel="noreferrer"
                >
                  NZTA 实时路况 ↗
                </a>
              </p>
            </div>
            <div className="map-panel">
              <svg
                viewBox="0 0 600 470"
                role="img"
                aria-label="南岛自驾路线示意图，从东北方向的基督城经蒂卡波和普卡基湖向西南抵达皇后镇，非等比例地图"
              >
                <defs>
                  <pattern
                    id="grid"
                    width="35"
                    height="35"
                    patternUnits="userSpaceOnUse"
                  >
                    <path
                      d="M 35 0 L 0 0 0 35"
                      fill="none"
                      stroke="#c2d2ca"
                      strokeWidth=".5"
                    />
                  </pattern>
                  <filter id="shadow">
                    <feDropShadow
                      dx="0"
                      dy="6"
                      stdDeviation="8"
                      floodOpacity=".08"
                    />
                  </filter>
                </defs>
                <rect width="600" height="470" fill="#e9f1ee" />
                <rect width="600" height="470" fill="url(#grid)" />
                <path
                  d="M105 390L95 344 129 309 144 273 169 254 176 216 211 205 234 170 265 155 283 122 312 115 336 84 366 68 389 43 416 52 438 31 462 47 459 83 480 103 456 138 452 177 415 196 404 225 373 237 344 271 318 282 300 319 260 333 238 368 204 379 180 410 138 424Z"
                  fill="#f9f8ee"
                  stroke="#b9cec0"
                  strokeWidth="2"
                  filter="url(#shadow)"
                />
                <path
                  d="M172 352Q200 305 235 279T300 200 367 143"
                  stroke="#dedfcf"
                  strokeWidth="22"
                  fill="none"
                  strokeLinecap="round"
                  opacity=".55"
                />
                <text
                  x="218"
                  y="250"
                  transform="rotate(-46 218 250)"
                  fill="#a4b1a0"
                  fontSize="12"
                  letterSpacing="5"
                >
                  SOUTHERN ALPS
                </text>
                <path
                  d="M410 175C375 185 352 207 321 232S281 265 266 283 256 312 232 325 208 345 176 352"
                  fill="none"
                  stroke="#608e9b"
                  strokeWidth="3"
                  strokeDasharray="6 5"
                />
                <ellipse
                  cx="304"
                  cy="246"
                  rx="6"
                  ry="13"
                  fill="#a3d3df"
                  transform="rotate(25 304 246)"
                />
                <ellipse
                  cx="276"
                  cy="274"
                  rx="5"
                  ry="13"
                  fill="#a3d3df"
                  transform="rotate(25 276 274)"
                />
                <path
                  d="M173 348Q152 360 154 379 163 379 184 354"
                  fill="#a3d3df"
                />
                {[
                  [410, 175, "基督城", "CHRISTCHURCH"],
                  [321, 232, "蒂卡波湖", "LAKE TEKAPO"],
                  [266, 283, "普卡基湖", "LAKE PUKAKI"],
                  [176, 352, "皇后镇", "QUEENSTOWN"],
                ].map(([x, y, cn, en], i) => (
                  <g key={cn}>
                    <circle
                      cx={x}
                      cy={y}
                      r="8"
                      fill="#fff"
                      stroke="#477784"
                      strokeWidth="2"
                    />
                    <circle cx={x} cy={y} r="3" fill="#477784" />
                    <text
                      x={Number(x) + 17}
                      y={Number(y) - 7}
                      fontSize="15"
                      fill="#263e40"
                      fontWeight="600"
                    >
                      {cn}
                    </text>
                    <text
                      x={Number(x) + 17}
                      y={Number(y) + 10}
                      fontSize="8"
                      letterSpacing="1"
                      fill="#6b8584"
                    >
                      {en}
                    </text>
                    {i === 3 && (
                      <text x="110" y="403" fontSize="10" fill="#6b8584">
                        LAKE WAKATIPU
                      </text>
                    )}
                  </g>
                ))}
                <text
                  x="440"
                  y="336"
                  fill="#9bb1b8"
                  fontSize="12"
                  letterSpacing="3"
                >
                  PACIFIC
                </text>
                <text
                  x="449"
                  y="354"
                  fill="#9bb1b8"
                  fontSize="12"
                  letterSpacing="3"
                >
                  OCEAN
                </text>
                <path d="M535 60L541 81 535 77 529 81Z" fill="#50747b" />
                <text x="531" y="52" fontSize="11" fill="#50747b">
                  N
                </text>
                <text x="25" y="442" fontSize="10" fill="#6b8584">
                  SOUTH ISLAND · NEW ZEALAND
                </text>
              </svg>
              <span className="map-caption">
                <MapPin size={13} /> 自驾路线示意 · 非等比例
              </span>
              <LinkOut href={routeUrl} className="map-open">
                打开互动地图 <ExternalLink size={14} />
              </LinkOut>
            </div>
          </div>
        </section>
        <section id="stays" className="section">
          <div className="section-top">
            <div>
              <p className="eyebrow">03 / PLACES TO STAY</p>
              <h2>今晚，住进风景里。</h2>
              <p className="section-desc">
                四个夜晚，三个落脚点。醒来，继续走进南岛。
              </p>
            </div>
            <span className="muted-caption">
              <BedDouble size={17} /> 3 处住所 · 共 4 晚
            </span>
          </div>
          <div className="stay-grid">
            {stays.map((s, i) => (
              <article className="stay-card" key={s.name}>
                <div className="stay-photo">
                  <Photo
                    src={s.photo}
                    alt={`${s.place}住宿氛围参考，非实景房型照片`}
                  />
                  <span>{s.place}</span>
                  <b>0{i + 1}</b>
                  <small>目的地 / 住宿氛围参考图</small>
                </div>
                <div className="stay-body">
                  <p className="stay-date">
                    {s.date}
                    <span>{s.nights}</span>
                  </p>
                  <h3>{s.name}</h3>
                  <p>{s.zh}</p>
                  <div className="stay-price">
                    {s.price ? (
                      <strong>
                        ¥ {s.price.toLocaleString()}
                        <small> / 住宿记录</small>
                      </strong>
                    ) : (
                      <strong>费用待确认</strong>
                    )}
                    <LinkOut href={maps(s.map)} className="circle-link">
                      <ArrowUpRight size={19} />
                      <span className="sr-only">导航至 {s.name}</span>
                    </LinkOut>
                  </div>
                  <p className="tiny">{s.note}</p>
                </div>
              </article>
            ))}
          </div>
          <p className="disclaimer">
            住宿名称与日期依据你的旅行笔记整理；图片为风景或氛围参考，非已核实酒店实拍。皇后镇住所的准确地址请以订单为准。
          </p>
        </section>
        <section id="budget" className="budget-section">
          <div className="section">
            <div className="section-top">
              <div>
                <p className="eyebrow">04 / TRAVEL WALLET</p>
                <h2>把预算安排好，把快乐留给旅途。</h2>
                <p className="section-desc">
                  人民币、新西兰元，记在一起。轻松掌握我们每个人的旅行开销。
                </p>
              </div>
              <Wallet className="section-icon" size={36} strokeWidth={1} />
            </div>
            <div className="budget-layout">
              <div className="budget-dashboard">
                <div className="budget-controls">
                  <label>
                    同行人数
                    <select
                      aria-label="同行人数"
                      value={people}
                      onChange={(e) => setPeople(Number(e.target.value))}
                    >
                      <option value={2}>2 人</option>
                      <option value={3}>3 人</option>
                    </select>
                  </label>
                  <label>
                    参考汇率 · 1 NZD =
                    <div className="rate-input">
                      <input
                        aria-label="人民币参考汇率"
                        type="number"
                        min="0.01"
                        max="100"
                        step="0.01"
                        value={rate}
                        onChange={(e) => {
                          const n = Number(e.target.value);
                          if (n > 0 && n <= 100) setRate(n);
                        }}
                      />
                      <span>CNY</span>
                    </div>
                  </label>
                </div>
                <span className="budget-label">已记录总预算 · 人民币</span>
                <p className="total-money">
                  <small>¥</small>
                  {money(total)}
                </p>
                <div className="per-person">
                  <span>
                    每人分摊<span>共 {people} 人，平均分摊</span>
                  </span>
                  <strong>¥ {money(total / people)}</strong>
                </div>
                <div className="budget-bars">
                  {["住宿", "交通", "餐饮", "游玩", "其他"].map((c, i) => {
                    const n = expenses
                      .filter((e) => e.category === c)
                      .reduce(
                        (s, e) =>
                          s + e.amount * (e.currency === "NZD" ? rate : 1),
                        0,
                      );
                    return (
                      <div key={c}>
                        <span>
                          <i
                            style={{
                              background: [
                                "#51808c",
                                "#98b6bd",
                                "#d6b987",
                                "#9ea98a",
                                "#c5b4a4",
                              ][i],
                            }}
                          />
                          {c}
                        </span>
                        <div>
                          <i
                            style={{
                              width: `${total ? (n / total) * 100 : 0}%`,
                              background: [
                                "#51808c",
                                "#98b6bd",
                                "#d6b987",
                                "#9ea98a",
                                "#c5b4a4",
                              ][i],
                            }}
                          />
                        </div>
                        <b>¥ {money(n)}</b>
                      </div>
                    );
                  })}
                </div>
                <p className="tiny">
                  汇率为可编辑估算值，并非实时汇率。仅统计已录入项目，机票、租车及未确认住宿费用尚未包含。
                </p>
              </div>
              <div className="expense-panel">
                <div className="expense-title">
                  <h3>
                    旅行支出 <span>{expenses.length} 笔</span>
                  </h3>
                  <button className="text-link" onClick={exportBudget}>
                    <Download size={14} />
                    导出
                  </button>
                </div>
                <form onSubmit={addExpense}>
                  <label className="expense-name">
                    支出名称
                    <input
                      aria-label="支出名称"
                      placeholder="例如：湖边的晚餐"
                      value={name}
                      maxLength={100}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </label>
                  <div className="form-row">
                    <label>
                      金额
                      <input
                        aria-label="支出金额"
                        type="number"
                        step="0.01"
                        min="0.01"
                        max="10000000"
                        placeholder="0.00"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        required
                      />
                    </label>
                    <label>
                      币种
                      <select
                        aria-label="支出币种"
                        value={currency}
                        onChange={(e) =>
                          setCurrency(e.target.value as "CNY" | "NZD")
                        }
                      >
                        <option value="NZD">NZD 新西兰元</option>
                        <option value="CNY">CNY 人民币</option>
                      </select>
                    </label>
                    <label>
                      类别
                      <select
                        aria-label="支出类别"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                      >
                        {["住宿", "交通", "餐饮", "游玩", "其他"].map((c) => (
                          <option key={c}>{c}</option>
                        ))}
                      </select>
                    </label>
                  </div>
                  {error && <p role="alert">{error}</p>}
                  <button type="submit" className="add-button">
                    <Plus size={17} /> 记一笔支出
                  </button>
                </form>
                <div className="expense-list" aria-live="polite">
                  {expenses.length === 0 ? (
                    <p className="empty">还没有支出，记录旅途的第一笔吧。</p>
                  ) : (
                    expenses.map((e) => (
                      <div className="expense-item" key={e.id}>
                        <span className="expense-symbol">
                          {e.category === "住宿" ? (
                            <BedDouble size={17} />
                          ) : e.category === "交通" ? (
                            <CarFront size={17} />
                          ) : (
                            <Wallet size={17} />
                          )}
                        </span>
                        <div>
                          <strong>{e.name}</strong>
                          <small>
                            {e.category} · {e.currency}
                          </small>
                        </div>
                        <b>
                          {e.currency === "CNY" ? "¥" : "NZ$"} {money(e.amount)}
                        </b>
                        <button
                          aria-label={`删除 ${e.name}`}
                          onClick={() =>
                            setExpenses(expenses.filter((x) => x.id !== e.id))
                          }
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    ))
                  )}
                </div>
                <p className="tiny local-note">
                  记录自动保存在当前浏览器。建议导出备份，不会同步至其他设备。
                </p>
              </div>
            </div>
          </div>
        </section>
        <section id="packing" className="section packing-section">
          <div className="section-top">
            <div>
              <p className="eyebrow">05 / BEFORE WE GO</p>
              <h2>出发前，把小事准备好。</h2>
              <p className="section-desc">
                行李轻一点，安心多一点。勾选之后，就离南岛更近一点。
              </p>
            </div>
            <div className="packing-progress">
              <CheckCheck size={20} />
              <b>
                {done}
                <span> / {allItems.length}</span>
              </b>
              <small>项准备已完成</small>
            </div>
          </div>
          <div className="progress-track">
            <span style={{ width: `${(done / allItems.length) * 100}%` }} />
          </div>
          <div className="checklist-grid">
            {checklist.map((g, i) => (
              <div className="check-group" key={g.group}>
                <h3>
                  <span>0{i + 1}</span>
                  {g.group}
                </h3>
                {g.items.map((item) => (
                  <label
                    className={
                      checked.includes(item)
                        ? "check-item checked"
                        : "check-item"
                    }
                    key={item}
                  >
                    <input
                      type="checkbox"
                      checked={checked.includes(item)}
                      onChange={() =>
                        setChecked(
                          checked.includes(item)
                            ? checked.filter((x) => x !== item)
                            : [...checked, item],
                        )
                      }
                    />
                    <span className="checkbox">
                      {checked.includes(item) && <Check size={12} />}
                    </span>
                    <span>{item}</span>
                  </label>
                ))}
              </div>
            ))}
          </div>
          <p className="disclaimer">
            出行前请核对 Immigration New Zealand 入境要求、NZTA
            驾驶规定及天气预报。上述清单是旅行提醒，请按个人证件与预订情况确认。
          </p>
        </section>
        <section className="closing">
          <Mountain size={32} strokeWidth={1} />
          <p>旅程的意义，是一起看过的风景。</p>
          <span>SEE YOU IN THE SOUTH ISLAND.</span>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            回到旅程起点 <ArrowUpRight size={16} />
          </button>
        </section>
      </main>
      <footer>
        <a href="#" className="footer-brand">
          南岛来信 <span>THE SOUTH ISLAND JOURNAL</span>
        </a>
        <p>为我们即将出发的 2026，留一份期待。</p>
        <span>22 — 26 NOVEMBER 2026</span>
      </footer>
    </>
  );
}

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
