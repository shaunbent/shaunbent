import React from 'react';
import classNames from 'classnames';

function Frame({ children, color, fit }) {
  return (
    <div
      className={
        classNames(
          'o-frame',
          `o-frame--${color}`,
          {
            'o-frame--fit': fit
          }
        )
      }
    >
      <div class="o-wrap">
        <div className="o-frame__content">
          {children}
        </div>
      </div>
    </div>
  )
};

export default Frame;
