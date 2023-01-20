import './Card.css';
import { Image, Typography } from 'antd';

const { Title, Text, Paragraph } = Typography;


function wordBreakdown (text) {
  return text.split(' ').filter((el, index) => index < 25).join(' '); 
}
// const a = 'A former basketball all-star, who has lost his wife and family foundation in a struggle with addiction attempts to regain his soul  and salvation by becoming the coach of a disparate ethnically mixed high A former basketball all-star, who has lost his wife and family foundation in a struggle with addiction attempts to regain his soul  and salvation by becoming the coach of a disparate ethnically mixed high' ;


function Card ({title, poster, date, overview}) {

  return <div className="card">
    <Image
      // width={183}
      alt="movies"
      src={`https://image.tmdb.org/t/p/original${poster}`}
    />
    <div className='card__details'>
      <Title level={2} className="card__title">{title}</Title>
      <div className='card__date'><Text type="secondary">{date}</Text></div>
      <div className='card__genre'>
        <div><Text code>Action</Text></div>
        <div><Text code>Drama</Text></div>
      </div>
      <div className='card__description'>
        <Paragraph>{wordBreakdown(overview)} ...
        </Paragraph></div>
    </div>
  </div>;
}

export default Card;