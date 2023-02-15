import { Tabs } from 'antd';
import './Head.css';
import React from 'react';

import SearchPanel from '../SearchPanel';

export default class Head extends React.Component {
  state = {
    oldPageSearch: 1,
    oldPageRated: 1,
  };

  onChangeTabsss(key) {
    const { onChangeTabs, page, activeKey } = this.props;
    const { oldPageSearch, oldPageRated } = this.state;
    if (activeKey === 'search') {
      this.setState({ oldPageSearch: page });
    }

    if (activeKey === 'rated') {
      this.setState({ oldPageRated: page });
    }
    onChangeTabs(key, oldPageSearch, oldPageRated);
  }

  render() {
    const { onChangeInput, activeKey } = this.props;
    return (
      <Tabs
        activeKey={activeKey}
        onChange={(key) => this.onChangeTabsss(key)}
        centered
        items={[
          {
            label: 'Search',
            key: 'search',
            children: <SearchPanel onChangeInput={onChangeInput} />,
          },
          {
            label: 'Rated',
            key: 'rated',
          },
        ]}
      />
    );
  }
}
