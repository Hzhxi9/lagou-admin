class Page {
  constructor() {
    this.pageSize = 3; // 每页显示的数据量
    this.curPage = 1; // 当前页码, 默认为1
    this.pages = 0; // 总页数
  }
  setCurPage(page) {
    this.curPage = page;
  }
  setPages(page) {
    this.pages = page;
  }
}

export default new Page();
