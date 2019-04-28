import React from 'react';
import Logo from '../images/shaun-bent-logo-white-transparent.inline.svg';

function SocialLink({ text, icon, url }) {
  return (
    <li className="c-masthead__links-item [ o-list-inline__item ]">
      <a className="c-masthead__link" href={url}>
        <span className="u-hidden-visually">{text}</span>
        <span className="c-masthead__link-icon [ o-icon ]">
          {icon}
        </span>
      </a>
    </li>
  );
}

function Masthead({ social }) {
  return (
    <header className="c-masthead">
      <div className="o-wrap">
        <div className="c-masthead__top">
          <div className="c-masthead__logo">
            <Logo width="64" height="64" />
          </div>
          <nav className="c-masthead_nav">
            <ul className="o-list-inline">
              <li className="c-masthead__links-item [ o-list-inline__item ]">
                <a className="c-masthead__link" href="/">Home</a>
              </li>
              <li className="c-masthead__links-item [ o-list-inline__item ]">
                <a className="c-masthead__link" href="/">Blog</a>
              </li>
            </ul>
          </nav>
        </div>
        <div className="c-masthead__content">
          <h1 className="c-masthead__title">Design System Architect</h1>
          <ul className="c-masthead__links [ o-list-inline ]">
            {social.map((item, i) => <SocialLink key={i} {...item} />)}
          </ul>
        </div>
      </div>
    </header>
  )
}

export default Masthead;
