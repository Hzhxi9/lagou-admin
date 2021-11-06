import usersListPageTemplate from '@/views/users-pages.art';

import Page from '../data/Page';

// const page = new Page();


/**
 * 页码高亮事件
 * @param {number} index
 */
export const setPageActive = index => {
  /**绑定点击事件， 排除第一个和最后一个li */
  $('#pages-list li:not(:first-child, :last-child)')
    .eq(index - 1)
    .addClass('active')
    .siblings()
    .removeClass('active');
};

/**
 * 渲染页码
 * @param {*} count
 */
const paging = count => {
  const pageArray = new Array(count);
  const htmlPage = usersListPageTemplate({ pageArray });
  $('#users-pages').html(htmlPage);

  /**页码初始化高亮 */
  setPageActive(Page.curPage);
  /**事件注册 */
  pageEvent();
};

/**页面事件集合 */
const pageEvent = () => {
  /**点击页面翻页 */
  $('#users-pages').on('click', '#pages-list li:not(:first-child, :last-child)', function () {
    const index = $(this).index();
    Page.setCurPage(index);

    /**事件发布 */
    $('body').trigger('changeCurPage', index);
    setPageActive(index);
  });

  /**上一页 */
  $('#users-pages').on('click', '#pages-list li:first-child', function (e) {
    e.preventDefault();
    if (Page.curPage > 1) {
      Page.setCurPage(Page.curPage - 1);
      /**事件发布 */
      $('body').trigger('changeCurPage', Page.curPage);

      setPageActive(Page.curPage);
    }
  });

  /**下一页 */
  $('#users-pages').on('click', '#pages-list li:last-child', function (e) {
    e.preventDefault();
    if (Page.curPage < Page.pages) {
      Page.setCurPage(Page.curPage + 1);

      /**事件发布 */
      $('body').trigger('changeCurPage', Page.curPage);
      setPageActive(Page.curPage);
    }
  });
};

export default paging;
