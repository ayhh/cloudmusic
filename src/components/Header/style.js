import styled from 'styled-components';

export const HeaderWrapper = styled.div`
  height: 75px;
  background-color: #242424;
  color: #fff;
  .content {
    height: 70px;

    display: flex;
    justify-content: space-between;
  }
  .divider {
    height: 5px;
    background-color: #C20C0C;
  }
`

export const HeaderLeft = styled.div`
  display: flex;
  height: 70px;
  line-height: 70px;
  font-size: 14px;
  .logo {
    display: block;
    width: 176px;
    height: 69px;
    background-position: 0 0;
  }
  .select-list {
    display: flex;
    .select-item {
      position: relative;
      a {
      display: block;
      padding: 0 20px;
      color: #ccc;
      }

      :last-of-type a {
        position: relative;
        ::after {
          position: absolute;
          content: "";
          width: 28px;
          height: 19px;
          /* background-image: url("../../assets/img/sprite_01.png"); */
          background: url(${require("../../assets/img/sprite_01.png").default}) no-repeat 0 9999px;
          /* background: url("https://s2.music.126.net/style/web2/img/frame/topbar.png?c7176a7a5e8395f732502c60466d533d") no-repeat 0 9999px; */
          background-position: -190px 0;
          top: 20px;
          right: -15px;
        }
      }
      &:hover a, a.active {
        color: #fff;
        background: #000;
        text-decoration: none;
      }
      
      .active .icon {
        position: absolute;
        display: inline-block;
        width: 12px;
        height: 7px;
        bottom: -1px;
        left: 50%;
        transform: translate(-50%, 0);
        background-position: -226px 0;
      }
    }
  }
`
export const HeaderRight = styled.div`
  display: flex;
  align-items: center;
  color: #CCC;
  font-size: 12px;

  .search {
    width: 158px;
    height: 32px;
    border-radius: 16px;

    input {
      &::placeholder {
        font-size: 12px;
      }
    }
  }

  .center {
    width: 90px;
    height: 32px;
    line-height: 32px;
    text-align: center;
    border: 1px solid #666;
    border-radius: 16px;
    margin: 0 16px;
  }
`
