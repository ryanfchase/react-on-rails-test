import React, { Component } from 'react';
import styled from 'styled-components';

const Section =styled.section`
  background-color: #d74235;
  min-height: 550px;
  padding: 250px 0;
  color: #fff;
`;

const Header = styled.h1`
  color: #fff;
  font-weight: 700;
  font-size: 40px;
  line-height: 52px;
`;

const Subhead = styled.p`
  font-size: 18px;
  font-weight: 500;
`;

const Embed = styled.div`
  width: 550px;
  height: 350px;
  border: 5px solid black;
`;

const Button = styled.a`
  display: inline-block;
  text-decoration: none;
  font-weight: bold;
  cursor: pointer;
  border-radius: 0;
  background: #fff;
  color: #333 !important;
  box-shadow: 1px 1px 1px 1px;
`;

const Jumbotron = () => {
  return (
    <Section className="home-section--1">
      <div className="container">
        <div className="row">
          <div className="col col-sm-12 col-md-5">
            <div className="pt-4 mt-5">
              <Header>React For Rails Developers</Header>
              <Subhead>Supercharge your Ruby on Rails Apps with React.js</Subhead>
              <div className="cta-wrapper">
                <Button className="btn fancy-btn">asdf</Button>
              </div>
            </div>
          </div>
          <div className="col col-sm-12 col-md-7">
            <div className="pt-4 mt-4 text-center">
              <Embed>Big Embed Goes Here</Embed>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default Jumbotron