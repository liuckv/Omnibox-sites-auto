import fs from "fs";

const sources = [
    "https://raw.githubusercontent.com/rapier15sapper/ew/refs/heads/main/test.json"
];

const allData = [];

for (const url of sources) {
  try {
    console.log("读取:", url);
    const res = await fetch(url);
    const data = await res.json();

    if (Array.isArray(data)) {
      allData.push(...data);
    } else if (data.data) {
      allData.push(...data.data);
    }
  } catch (err) {
    console.log("失败:", url, err.message);
  }
}

// 去重（按 api）
const unique = {};
for (const item of allData) {
  if (item.api) {
    unique[item.api] = item;
  }
}

const output = {
  code: 0,
  msg: "success",
  data: Object.values(unique)
};

fs.writeFileSync(
  "sitesFull.json",
  JSON.stringify(output, null, 2)
);

console.log("完成，共", Object.keys(unique).length, "条");
