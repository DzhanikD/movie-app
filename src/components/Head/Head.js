import { Tabs } from 'antd';
import './Head.css';
import React from 'react';

import SearchPanel from '../SearchPanel';

export default class Head extends React.Component {
  state = {
    oldPage: 1,
  };

  onClickTabs(key) {
    const { onChangeTabs, page } = this.props;
    const { oldPage } = this.state;
    this.setState({ oldPage: page });
    onChangeTabs(key, oldPage);
  }

  render() {
    const { onChangeInput, activeKey } = this.props;
    return (
      <Tabs
        activeKey={activeKey}
        onChange={(key) => this.onClickTabs(key)}
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
