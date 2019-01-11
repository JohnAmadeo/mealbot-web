import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import styled from 'styled-components';

import meal from '../svg/meal.svg';

class Landing extends React.Component {
  componentDidMount() {
    if (this.props.auth.isAuthenticated()) {
      this.props.auth.renewSession();
    }
  }

  render() {
    return !this.props.auth.isAuthenticated() ? (
      <>
        <BannerContainer>
          <BannerPanel>
            <Meal
              src={meal}
              alt="meal"
            />
            <Credit>Credit to <a href="https://www.humaaans.com/" target="_blank" rel="noopener noreferrer">Pablo Stanley</a></Credit>
          </BannerPanel>
          <BannerPanel>
            <BannerDescription>
              <BannerTitle>Mealbot</BannerTitle>
              <BannerText>Mealbot is a web app that randomly pairs up people in your club for meals on a regular basis.</BannerText>
              <BannerButton onClick={this.props.auth.login}>
                Log In / Sign Up
              </BannerButton>
            </BannerDescription>
          </BannerPanel>
        </BannerContainer>
        
        <PitchBackground>
          <PitchContainer>
            <PitchText>Have you ever been part of a large club? Have you ever found it hard to get to know other people in the group outside close friends?</PitchText>
          </PitchContainer>
        </PitchBackground>

        <PageBackground>
          <PageContainer>
            <ShowcaseFeatureLeft>
              <ShowcasePanel>
                <Email>
                  From: <span>ysc.meal.bot@gmail.com</span> <br />
                  To: <span>d.chen@yale.edu, john.amadeo@yale.edu</span> <br /><br />

                  Your Mealbot group this week is: <br/>
                  John Amadeo Daniswara <br />
                  Dawn Chen <br /><br />
                  Sent by your friendly neighborhood Mealbot
                </Email>
              </ShowcasePanel>
              <ShowcasePanel>
                <FeatureDescriptionRight>
                  <FeatureSubtitle>Automatic Pairing</FeatureSubtitle>
                  <FeatureText>Mealbot automatically pairs people for you by putting them on an email thread. It even remembers who has had meals with each other and tries its best to make sure you get to meet new people every week.</FeatureText>
                </FeatureDescriptionRight>
              </ShowcasePanel>
            </ShowcaseFeatureLeft>

            <ShowcaseFeatureRight>
              <ShowcasePanel>
                <FeatureDescriptionLeft>
                  <FeatureSubtitle>Scheduled Intervals</FeatureSubtitle>
                  <FeatureText>You have complete control over when Mealbot sends out its pairing emails. Choose the dates and frequency of meals that makes sense for your club.</FeatureText>
                </FeatureDescriptionLeft>
              </ShowcasePanel>
              <ShowcasePanel>
                <FeatureScreenshot 
                  src="../rounds.png" 
                  alt=""
                  />
              </ShowcasePanel>
            </ShowcaseFeatureRight>
            <Dedication>
              Check out the code <a href="https://github.com/johnamadeo/mealbot-web">here</a> and <a href="https://github.com/johnamadeo/mealbotgo">here</a>
            </Dedication>
          </PageContainer>
        </PageBackground>
      </>
    ) : (
      <Redirect to='/members' />
    );
  }
}

const BannerContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin: 0 auto;
  padding: 60px 0px;
  width: 90%;

  @media (max-width: 1024px) {
    padding: 0px;
    flex-direction: column-reverse;
  }
`;

const BannerPanel = styled.div`
  width: 50%;

  @media (max-width: 1024px) {
    margin: 0 auto;
    text-align: center;
    width: 90%;
  }
`;

const BannerDescription = styled.div`
  padding: 0px 24px 0px 24px;
`;

const BannerTitle = styled.p`
  color: midnightblue;
  font-family: 'Playfair Display';
  font-size: 72px;
  font-weight: bold;
  margin: 12px 0px;

  @media (max-width: 1024px) {
    font-size: 54px;
  }

  @media (max-width: 768px) {
    margin: 0 auto;
    text-align: center;
    width: 90%;
  }
`;

const BannerText = styled.p`
  color: royalblue;
  font-size: 24px;

  @media (max-width: 1024px) {
    font-size: 20px;
    margin: 18px auto;
    text-align: center;
    width: 90%;
  }
`;

const BannerButton = styled.button`
  background: midnightblue;
  border-radius: 24px;
  color: white;
  font-family: 'Playfair Display';
  font-size: 20px;
  padding: 12px 42px;

  &:hover {
    background: royalblue;
    cursor: pointer;
  }

  @media (max-width: 768px) {
    font-size: 16px;
    padding: 8px 22px;
  }
`;

const PitchBackground = styled.div`
  background: royalblue;
`;

const PitchContainer = styled.div`
  margin: 0 auto;
  padding: 18px 0px;
  width: 75%;
  text-align: center;
`;

const PitchText = styled.p`
  color: white;
  font-family: 'Playfair Display';
  font-size: 24px;

  @media (max-width: 1024px) {
    font-size: 20px;
  }
`;

const PageBackground = styled.div`
  background: papayawhip;
`;

const Meal = styled.img`
  width: 100%;
`;

const PageContainer = styled.div`
  margin: 0 auto; 
  width: 75%;

  @media (max-width: 1024px) {
    width: 90%;
  }
`;

const ShowcaseFeatureLeft = styled.div`
  display: flex;
  flex-direction: row;
  padding: 60px 0px 0px 0px;

  @media (max-width: 1024px) {
    flex-direction: column-reverse;
  }
`;

const ShowcaseFeatureRight = styled.div`
  display: flex;
  flex-direction: row;
  padding: 60px 0px 0px 0px;

  @media (max-width: 1024px) {
    flex-direction: column;
  }
`;

const ShowcasePanel = styled.div`
  width: 50%;

  @media (max-width: 1024px) {
    width: 100%;
  }
`;

const Email = styled.div`
  background: white;
  // border-radius: 12px;
  box-shadow: 0 6px 13px -3px rgba(50,50,93,.25), 0 4px 8px -4px rgba(0,0,0,.3);
  font-family: monospace;
  font-size: 14px;
  height: 300px;
  padding: 24px;
  width: 100%;

  span {
    font-family: monospace;
    font-weight: bold;
  }
`;

const FeatureScreenshot = styled.img`
  box-shadow: 0 6px 13px -3px rgba(50,50,93,.25), 0 4px 8px -4px rgba(0,0,0,.3);
  width: 100%;
`;

const FeatureDescriptionRight = styled.div`
  padding: 0px 0px 0px 36px;

  @media (max-width: 1024px) {
    padding: 0px 0px 36px 0px;
  }
`;

const FeatureDescriptionLeft = styled.div`
  padding: 0px 36px 0px 0px;

  @media (max-width: 1024px) {
    padding: 0px 0px 36px 0px;
  }
`;

const FeatureText = styled.p`
  color: royalblue;
  font-size: 18px;
  line-height: 30px;
  margin: 0;
`;

const FeatureSubtitle = styled.p`
  color: midnightblue;
  font-family: 'Playfair Display';
  font-size: 42px;
  font-weight: bold;
  margin: 0px 0px 24px 0px;
`;

const Dedication = styled.p`
  margin: 0 auto;
  padding: 48px 0px 12px 0px;
  text-align: center;
`;

const Credit = styled.p`
  font-size: 12px;
  text-align: center;
`;

Landing.propTypes = {
  auth: PropTypes.object.isRequired,
};

export default Landing;
