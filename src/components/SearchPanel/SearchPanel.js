import { Input } from 'antd';
import './SearchPanel.css';

function SearchPanel({ onChangeInput }) {
  return (
    <Input
      placeholder="Type to search..."
      className="search-panel__input search-panel"
      onChange={(ev) => onChangeInput(ev)}
    />
  );
}

export default SearchPanel;
