// convert.mjs
import fs from "node:fs/promises";

// MoonTV 原始配置地址
const SOURCE_URL =
  "https://raw.githubusercontent.com/666zmy/MoonTV/refs/heads/main/config.json";

async function main() {
  const res = await fetch(SOURCE_URL);
  if (!res.ok) {
    throw new Error(`Failed to fetch source config: ${res.status} ${res.statusText}`);
  }

  const raw = await res.json();

  // 核心转换逻辑
  const apiSite = raw.api_site || {};
  const sites = Object.values(apiSite).map((item) => ({
    id: "",
    key: item.name || "",
    name: item.name || "",
    api: item.api || "",
    type: 2,
    isActive: 1,
    time: "",
    isDefault: 0,
    remark: item.detail || "",
    tags: [],
    priority: 0,
    proxyMode: "none",
    customProxy: "",
  }));

  const output = { sites };

  await fs.writeFile("sites.json", JSON.stringify(output, null, 2), "utf8");
  console.log("Generated sites.json with", sites.length, "items");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
