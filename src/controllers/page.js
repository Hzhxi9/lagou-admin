import usersListPageTemplate from '@/views/users-pages.art';

import Page from '../utils/Page';
import emitter from '../utils';

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
const paging = (count, index) => {
  const pageArray = new Array(count);
  const htmlPage = usersListPageTemplate({ pageArray });
  $('#users-pages').html(htmlPage);

   /**设置总页码 */
   Page.setPages(count);

  /**页码初始化高亮 */
  setPageActive(index);

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
    emitter.emit('changeCurPage', false, index);
  });

  /**上一页 */
  $('#prev').on('click',  function (e) {
    e.preventDefault();
    if (Page.curPage > 1) {
      Page.setCurPage(Page.curPage - 1);

      /**事件发布 */
      emitter.emit('changeCurPage', false, Page.curPage)
    }
  });

  /**下一页 */
  $('#next').on('click', function (e) {
    e.preventDefault();
    if (Page.curPage < Page.pages) {
      Page.setCurPage(Page.curPage + 1);
      
       /**事件发布 */
      emitter.emit('changeCurPage', false, Page.curPage)
    }
  });
};

export default paging;
