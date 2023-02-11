import { Tabs } from 'antd';

import './Head.css';
import SearchPanel from '../SearchPanel';

function Head ({onChangeInput, onChangeTabs, activeKey}) {
  return <Tabs
    activeKey={activeKey}
    onChange={(key) => onChangeTabs(key)}
    centered
    items={[
      {
        label: 'Search',
        key: 'search',
        children: <SearchPanel onChangeInput={onChangeInput}/>,
      },
      {
        label: 'Rated',
        key: 'rated',
      }
    ]}
  />;
}

export default Head;