import React, { Component } from 'react';
import Video from './Video';

const ActiveItem = (props) => {
  return (
    <div className="row">
      <div className="col-md-10 offset-md-1">
        <div className="text-center">
          <div className="card px-5">
            <div className="row">
              <div className="col-md-10 offset-md-1">
                <Video />
                <div className="pt-5 pb-4">
                  <h4>{props.title}</h4>
                  <p>{props.description}</p>
                  <div className="cta-wrapper">
                    <a
                      onClick={props.handleItemActivate}
                      className="btn cta-btn">
                        Watch This Video
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ActiveItem;
