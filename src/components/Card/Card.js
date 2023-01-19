import './Card.css';
import { Image, Typography } from 'antd';

const { Title, Text, Paragraph } = Typography;

function Card () {
  return <div className="card">
    <Image
      width={183}
      alt="movies"
      src="./img/af.png"
    />
    <div className='card__details'>
      <Title level={2} className="card__title">The way back</Title>
      <div className='card__date'><Text type="secondary"> March 5, 2020</Text></div>
      <div className='card__genre'>
        <div><Text code>Action</Text></div>
        <div><Text code>Drama</Text></div>
      </div>
      <div className='card__description'>
        <Paragraph>A former basketball all-star, who has lost his wife and family foundation in a struggle with 
          addiction attempts to regain his soul  and salvation by becoming the coach of a disparate ethnically 
          mixed high ...
        </Paragraph></div>
    </div>
  </div>;
}

export default Card;