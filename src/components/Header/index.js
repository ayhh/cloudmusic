import React, { memo } from 'react'
import { NavLink } from 'react-router-dom'

import { Input } from 'antd'
import { SearchOutlined } from '@ant-design/icons'

import { HeaderWrapper, HeaderLeft, HeaderRight } from './style'
import { headerLinks } from '@/common/local-data'

const selectItem = (item, index) => {
  if (index < 3) {
    return (
      <NavLink exact to={item.link}>
        {item.title}
        <i className='icon sprite_01'></i>
      </NavLink>
    )
  } else {
    return <a href={item.link}>{item.title}</a>
  }
}

export default memo(function Header() {
  return (
    <div>
      <HeaderWrapper>
        <div className='content wrap-v1'>
          <HeaderLeft>
            <a href='#/' className='logo sprite_01'>
              {' '}
            </a>
            <div className='select-list'>
              {headerLinks.map((item, index) => {
                return (
                  <div key={item.title} className='select-item'>
                    {selectItem(item, index)}
                  </div>
                )
              })}
            </div>
          </HeaderLeft>
          <HeaderRight>
            <Input
              className='search'
              placeholder='音乐'
              prefix={<SearchOutlined />}
            ></Input>
            <div className='center'>创作中心</div>
            <div>登录</div>
          </HeaderRight>
        </div>
        <div className='divider'></div>
      </HeaderWrapper>
    </div>
  )
})
