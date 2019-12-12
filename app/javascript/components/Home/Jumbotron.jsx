import React, { Component } from 'react';
import styled from 'styled-components';

const Section =styled.section`
  background-color: #d74235;
  // min-height: 550px;
  padding: 100px 0;
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
                <Button className="btn fancy-btn">Get Started</Button>
              </div>
            </div>
          </div>
          <div className="col col-sm-12 col-md-7">
            <div className="pt-4 mt-4 text-center">
              {/* <Embed>Big Embed Goes Here</Embed> */}
              <iframe width="560" height="315" src="https://www.youtube.com/embed/B0SxxHAImhc" frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default Jumbotron