import { Controller } from "cx/ui";
import { GET } from "../../api/methods";

const day = 24 * 60 * 60 * 1000;
let startDate = Date.now() - 30 * day;
let categories = {
  Opened: 12,
  Fixed: 7,
  Verified: 10
};

let series = [];

for (let cat in categories) {
  let points = [];

  let v = Math.round(15 * Math.random());

  for (let i = 0; i < 30; i++) {
    v += Math.round(4 * (Math.random() - 0.5));
    if (v < 0) v = 0;
    points.push({
      date: startDate + i * day,
      count: 15 + Math.round(20 * Math.random())
    });
  }

  series.push({
    category: cat,
    data: points,
    color: categories[cat],
    trackedValue: null
  });
}

export default class extends Controller {
  async onInit() {
    this.store.init("series", series);
    var issuesByType = await GET('issue/byType/' + this.store.get("report.selectedProjectId"));
    console.log(issuesByType)
    this.store.init("issues_by_type", issuesByType);
  }
}
