import fs from "fs";

const url = "https://raw.githubusercontent.com/rapier15sapper/ew/refs/heads/main/test.json";

const res = await fetch(url);
const original = await res.json();

const converted = original
  .filter(item => item.enabled === true) // 只保留启用的
  .map(item => ({
    name: item.name,
    type: 0,
    api: item.baseUrl,
    searchable: 1,
    quickSearch: 1,
    filterable: 1
  }));

const output = {
  code: 0,
  msg: "success",
  data: converted
};

fs.writeFileSync("omnibox.json", JSON.stringify(output, null, 2));

console.log("转换完成，共", converted.length, "条");
