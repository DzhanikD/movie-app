import { Input } from 'antd';
import './SearchPanel.css';

function SearchPanel ({onChangeInput}) {
  return(
    <form className="search-panel">
      <Input placeholder="Type to search..." className="search-panel__input" onChange={(ev) => onChangeInput(ev)}/>
    </form>);
}

export default SearchPanel;