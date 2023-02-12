import { Pagination } from 'antd';
import './Paginations.css';

function Paginations({ onChangePagination, current, total, loading, notFound, notRatedFilms }) {
  let footerClassName = 'footer__pagination';

  if (loading || notFound || notRatedFilms) {
    footerClassName += ' footer__pagination--hidden';
  }

  return (
    <div className={footerClassName}>
      <Pagination
        current={current}
        total={total}
        pageSize={20}
        showSizeChanger={false}
        hideOnSinglePage
        onChange={(page) => onChangePagination(page)}
      />
    </div>
  );
}

export default Paginations;
