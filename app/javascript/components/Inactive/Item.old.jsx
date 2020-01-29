import React, { Component } from 'react';
import Thumbnail from './Thumbnail';
import styled from 'styled-components';

const Button = styled.a`
  text-decoration: none;
  font-weight: bold !important;
  border-radius: 0 !important;
  background: #fff !important;
  color: #333 !important;
  padding: 10px 20px !important;
  font-size: 18px;

  box-shadow: 0px 0px 0px 3px #473228,
    -6px 6px #ef5f17,
    -6px 6px 0px 3px #473228;

  transition-property: none !important;
  &:hover {
    position: relative;
    box-shadow: 0px 0px 0px 3px #473228;
    top: 6px;
    left: -6px;
    transition-property: none !important;
  }
`;

const Item = (props) => {
  return (
    <div className="row pt-4 pb-4">
      <div className="col-md-10 offset-md-1">
        <div className="text-left">
          <div className="card px-5">
            <div className="row">
              <div className="col-md-4">
                <Thumbnail />
              </div>
              <div className="col-md-8">
                <div className="pt-4 pb-4">
                  <h4>{props.title}</h4>
                  <p>{props.description}</p>
                  <div className="cta-wrapper">
                    <Button
                      onClick={props.handleItemActivate}
                      className="btn cta-btn">
                        Watch This Video
                    </Button>
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

export default Item;
