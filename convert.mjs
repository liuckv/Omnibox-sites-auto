import fs from "fs";
import crypto from "crypto";
//下面填写需要转换的地址
//const url = "https://raw.githubusercontent.com/rapier15sapper/ew/refs/heads/main/test.json";
const url = "https://py.doube.eu.org/static/t4.json";

const res = await fetch(url);
const original = await res.json();

function uuid() {
  return crypto.randomUUID();
}

const converted = original
  .filter(item => item.enabled === true)
  .map(item => ({
    id: uuid(),
    key: item.name,
    name: item.name,
    api: item.baseUrl,
    type: 2,                 // OmniBox CMS 类型
    isActive: 1,
    time: new Date().toISOString(),
    isDefault: 0,
    remark: "",
    tags: [],
    priority: 0,
    proxyMode: "none",
    customProxy: ""
  }));

const output = {
  sites: converted
};

fs.writeFileSync("omnibox.json", JSON.stringify(output, null, 2));

console.log("转换完成，共", converted.length, "条");
