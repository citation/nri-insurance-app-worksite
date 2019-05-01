import React, { Component } from 'react';
import { connect } from "react-redux";
import { Carousel } from 'react-responsive-carousel';
import Styles from './style/top.module.scss';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Menu, MenuItem, } from '@material-ui/core';
import ContactSupportIcon from '@material-ui/icons/ContactSupport';
import ContactMailIcon from '@material-ui/icons/ContactMail';
import ContactPhoneIcon from '@material-ui/icons/ContactPhone';
import ChatIcon from '@material-ui/icons/Chat';
import { DEFAULT_BREADCRUMB } from '../common/constant';
import { TOP_MENU } from '../common/navigation';
import { setCurrentPage, replaceBreadCrumb, enqueueBreadCrumb, removeInformation, } from '../module/action/common';

//Stub
import {
  NewsInformation
} from '../common/stub';

class top extends Component {
  constructor(props) {
    super(props);
    this.state = {
      anchorEl: null,
      newsInformation: NewsInformation,
    };

    // initialize Breadcrumb
    this.props.replaceBreadCrumb();
  };


  shouldComponentUpdate = (nextProps, nextState) => {
    if(this.state == nextState) {
      return false;
    }
    return true;
  }

  accessToNewsDetail = (value) => {
    const to = this.state.newsInformation[value].url;
    this.props.history.push(to)
  };

  accessToContents = (accessParameter) => {
    this.props.setCurrentPage(accessParameter.key);
    this.props.enqueueBreadCrumb(accessParameter);
    this.props.history.push(accessParameter.url)
  };

  openContactMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  closeContactMenu = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { 
      anchorEl 
    } = this.state;

    return (
      <div className={Styles.root}>
        <section className={`${Styles.section} ${Styles.news_container}`}>
          <Carousel showThumbs={false} autoPlay={true} infiniteLoop={true} onClickItem={this.accessToNewsDetail}>
            {(() => {
              return this.state.newsInformation.map(news => {
                return (
                  <div key={news.id}>
                    <img className={Styles.image} src={news.image} alt={news.title} />
                    {(()=>{
                      if(news.title){
                        return (
                          <p className={Styles.title}>{news.title}</p>
                        )
                      }
                    })()}
                  </div>
                )
              })
            })()}
          </Carousel>
        </section>
        <section className={`${Styles.section} ${Styles.menu_container}`}>
          {(() => {
            return TOP_MENU.map(menu => {
              return (
                <div key={menu.id} className={Styles.menu}>
                  <img className={Styles.image} src={menu.image} alt={menu.title} onClick={this.accessToContents.bind(this, menu)} />
                  <p className={Styles.title}>{menu.title}</p>
                </div>
              )
            })
          })()}
        </section>

        <ContactSupportIcon className={Styles.icon} onClick={this.openContactMenu}/>
        <Menu id="simple-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.closeContactMenu} >
          <MenuItem className={Styles.menu_item}><ContactPhoneIcon/>お電話でのお問い合わせ</MenuItem>
          <MenuItem className={Styles.menu_item}><ChatIcon/>チャットでのお問い合わせ</MenuItem>
          <MenuItem className={Styles.menu_item}><ContactMailIcon/>メールでのお問い合わせ</MenuItem>
        </Menu>
      </div>
    );
  }
}

const mapStateToProps = store => {
  return {}
}

const mapDispatchToProps = dispatch => {
  return {
    setCurrentPage(page) {
      dispatch(setCurrentPage(page));
    },
    replaceBreadCrumb() {
      dispatch(replaceBreadCrumb([DEFAULT_BREADCRUMB]));
    },
    enqueueBreadCrumb(breadcrumb) {
      dispatch(enqueueBreadCrumb(breadcrumb));
    },
    removeInformation(key) {
      dispatch(removeInformation(key));
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(top);