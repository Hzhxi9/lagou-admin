import usersListPageTemplate from '@/views/users-pages.art';
import { getUserList } from '../controllers';

/**
 * 页码高亮事件
 * @param {number} index
 */
export const setPageActive = index => {
  /**
   * 绑定点击事件
   * 排除第一个和最后一个li
   */
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
const paging = (count) => {
  const pageArray = new Array(count);
  const htmlPage = usersListPageTemplate({ pageArray });
  $('#users-pages').html(htmlPage);
  /**页码初始化高亮 */
  setPageActive(curPage);
};

/**点击页面翻页 */
$('#users-pages').on('click', '#pages-list li:not(:first-child, :last-child)', function () {
  const index = $(this).index();
  curPage = index;
  getUserList(index);
  setPageActive(index);
});

/**上一页 */
$('#users-pages').on('click', '#pages-list li:first-child', function () {
  if (curPage > 1) {
    curPage--;
    getUserList(curPage);
    setPageActive(curPage);
  }
});

/**下一页 */
$('#users-pages').on('click', '#pages-list li:last-child', function () {
  if (curPage < pages) {
    curPage++;
    getUserList(curPage);
    setPageActive(curPage);
  }
});

export default paging;
