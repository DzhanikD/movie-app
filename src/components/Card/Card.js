import './Card.css';
import { Image, Rate } from 'antd';
import React from 'react';

import notImg from '../../img/notImg.png';
import { GenresConsumer } from '../Genres-context';

export default class Card extends React.Component {
  state = {
    words: 0,
  };

  heightRating = React.createRef();

  heightDescription = React.createRef();

  heightHeader = React.createRef();

  heightCard = React.createRef();

  componentDidMount() {
    this.resizingElem();
  }

  componentDidUpdate(prevProps) {
    const { widthWindow } = this.props;

    if (widthWindow !== prevProps.widthWindow) {
      this.resizingElem();
    }
  }

  resizingElem = () => {
    const header = this.heightHeader.current.offsetHeight;
    const widthDescription = this.heightDescription.current.offsetWidth;
    const card = this.heightCard.current.offsetHeight;

    const numberOfWordsinLines = widthDescription / 5.9;
    const heightDescription = card - header - 70;
    const numberOfLines = Math.round(heightDescription / 22);
    const numberOfWords = numberOfLines * numberOfWordsinLines;
    this.setState({ words: numberOfWords });
  };

  ApdateWord = (text) => {
    const { words } = this.state;
    const newText = text.slice(0, words);
    const newArray = newText.split(' ');
    newArray.pop();
    const newWords = newArray.join(' ');
    return newWords;
  };

  render() {
    const { title, poster, date, overview, vote, id, onChangeRating, ratedIdMovies, genreID } = this.props;

    let currentRating = 'card__current-rating';

    const image = poster ? (
      <Image alt="movies" src={`https://image.tmdb.org/t/p/original${poster}`} />
    ) : (
      <Image alt="error" src={notImg} />
    );

    if (vote >= 0 && vote < 4) {
      currentRating += ' card__color-red';
    }
    if (vote > 3 && vote < 6) {
      currentRating += ' card__color-orange';
    }
    if (vote > 3 && vote < 8) {
      currentRating += ' card__color-yellow';
    }
    if (vote > 7) {
      currentRating += ' card__color-green';
    }
    return (
      <GenresConsumer>
        {(genres) => (
          <div className="card" ref={this.heightCard}>
            <div className="card__image">{image}</div>
            <div className="card__details">
              <div className="card__header" ref={this.heightHeader}>
                <div className="card__wrapper">
                  <h2 className="card__title">{title}</h2>
                  <div className={currentRating}>{vote.toFixed(1)}</div>
                </div>
                <div className="card__date">
                  <span type="secondary">{date}</span>
                </div>
                <div className="card__genre">
                  {genreID.map((genreIds) => (
                    <div key={genreIds} className="card__span">
                      <span>{genres.map((j) => (j.id === genreIds ? j.name : null))}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="card__description" ref={this.heightDescription}>
                <p className="card__text">{this.ApdateWord(overview)} ...</p>
              </div>
              <div ref={this.heightRating} className="card__rating">
                <Rate
                  className="rate"
                  allowHalf
                  value={ratedIdMovies[id]}
                  count={10}
                  onChange={(ev) => onChangeRating(ev, id)}
                />
              </div>
            </div>
          </div>
        )}
      </GenresConsumer>
    );
  }
}
