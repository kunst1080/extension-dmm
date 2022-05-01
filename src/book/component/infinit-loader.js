import axios from "axios";
const nodes = document.querySelectorAll(
  "#main-bmk > div > div:first-child > div:first-of-type > ul > li > a"
);
const hrefs = new Set(
  [...nodes].map((e) => {
    e.getAttribute("href");
  })
);
console.log(hrefs);
