import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router';
import styled from 'styled-components';
import { secondary, primary, accent, desaturatedRed } from '../Utility/Colors';

const Hero = () => {
  const location = useLocation();
  const [heroProps, setHeroProps] = useState();
  const getProps = () => {
    setHeroProps(location.state);
  };

  useEffect(() => {
    getProps();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const [abilities, setAbilities] = useState();
  const [roleLevels, setRoleLevels] = useState();
  const [talents, setTalents] = useState();
  const [heroData, setHeroData] = useState();
  const getHeroData = async () => {
    const res = await fetch(`/.netlify/functions/hero/?id=${location.state}`);
    const json = await res.json();
    setTalents(json.result.data.heroes[0].talents);
    setRoleLevels(json.result.data.heroes[0].role_levels);
    setAbilities(json.result.data.heroes[0].abilities);
    setHeroData(json.result.data.heroes[0]);
  };

  useEffect(() => {
    getHeroData();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Setting images in variables
  console.log(heroData);
  const strength = (
    <img
      className='attrImg'
      src='https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/icons/hero_strength.png'
      alt=''
    />
  );
  const agility = (
    <img
      className='attrImg'
      src='https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/icons/hero_agility.png'
      alt=''
    />
  );
  const intelligence = (
    <img
      className='attrImg'
      src='https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/icons/hero_intelligence.png'
      alt=''
    />
  );

  const getAttrIcon = (element) => {
    switch (element) {
      case 0:
        return <>{strength}</>;

      case 1:
        return <>{agility}</>;

      case 2:
        return <>{intelligence}</>;

      default:
        return null;
    }
  };

  const getAttrColors = (element) => {
    switch (element) {
      case 0:
        return `linear-gradient(90deg, #622281, #CC3164 70%)`;

      case 1:
        return `linear-gradient(90deg, Darkgreen, #7DFE7D)`;

      case 2:
        return `linear-gradient(90deg, #145B78, Skyblue)`;

      default:
        return null;
    }
  };

  const getAttrIconText = (element) => {
    switch (element) {
      case 0:
        return (
          <>
            {strength}
            <h6>STRENGTH</h6>
          </>
        );

      case 1:
        return (
          <>
            {agility}
            <h6>AGILITY</h6>
          </>
        );
      case 2:
        return (
          <>
            {intelligence}
            <h6>INTELLIGENCE</h6>
          </>
        );
      default:
        return null;
    }
  };

  const processHeroName = (name) => {
    const heroName = name.replace('npc_dota_hero_', '');
    return heroName;
  };

  const processNumberUp = (number) => {
    const fixedNumber = Math.ceil(number * 10) / 10;
    return fixedNumber;
  };

  if (heroData)
    return (
      <HeroContainer>
        <TopStyles
          style={{
            backgroundImage: `${getAttrColors(heroData.primary_attr)}%`,
          }}
        >
          <div className='heroVerticalBar'>
            {getAttrIcon(heroData.primary_attr)}
            <h5> {heroData.name_loc.toUpperCase()}</h5>
            <h5>{heroData.id}</h5>
            <span className='verticalLine'></span>
          </div>
          <div className='heroDetails'>
            <div className='heroInfo'>
              <div className='attribute'>
                {getAttrIconText(heroData.primary_attr)}
              </div>
              <h1>{heroData.name_loc}</h1>
              <h5>{heroData.npe_desc_loc}</h5>
              <p className='heroLore'>{heroData.hype_loc}</p>
            </div>
            <video autoPlay loop muted>
              <source
                src={`https://cdn.cloudflare.steamstatic.com/apps/dota2/videos/dota_react/heroes/renders/${processHeroName(
                  heroData.name
                )}.webm`}
                type='video/mp4'
              />
            </video>
          </div>
        </TopStyles>
        <DetailsBarStyles>
          <div className='detailsContainer'>
            <div className='attributes_main-container'>
              <div className='attributesHeroPortrait'>
                <img
                  src={`https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/heroes/${processHeroName(
                    heroData.name
                  )}.png`}
                  alt=''
                />
                <div className='attributes_bar health_color'>
                  <p>{heroData.max_health}</p>

                  <p className='attribute_minor_number'>
                    + {processNumberUp(heroData.health_regen)}
                  </p>
                </div>
                <div className='attributes_bar mana_color'>
                  <p>{heroData.max_mana}</p>
                  <p className='attribute_minor_number'>
                    + {processNumberUp(heroData.mana_regen)}
                  </p>
                </div>
              </div>
              <div className='attributes_all_container'>
                <div className='attributes_single_attribute'>
                  {strength} <h5>{heroData.str_base}</h5>
                  <h5>+ {heroData.str_gain.toFixed(1)}</h5>
                </div>
                <div className='attributes_single_attribute'>
                  {agility} <h5>{heroData.agi_base}</h5>
                  <h5>+ {heroData.agi_gain.toFixed(1)}</h5>
                </div>
                <div className='attributes_single_attribute'>
                  {intelligence} <h5>{heroData.int_base}</h5>
                  <h5>+ {heroData.int_gain.toFixed(1)}</h5>
                </div>
              </div>
            </div>
            <div>
              <p className='header'>ATTRIBUTES</p>
            </div>
          </div>
          <div className='detailsVerticalSeparator'></div>
          <div className='detailsContainer roles'>
            <h5 className='header'>ROLES</h5>
          </div>
          <div className='detailsVerticalSeparator'></div>
          <div className='detailsContainer stats'>
            <h5 className='header'>STATS</h5>
          </div>
        </DetailsBarStyles>
      </HeroContainer>
    );
};

const HeroContainer = styled.div`
  width: 100%;
  min-height: 100vh;

  margin: 0 auto;
  color: ${secondary};
`;

const TopStyles = styled.div`
  display: flex;

  height: 75vh;
  position: relative;
  justify-content: center;

  .heroVerticalBar {
    display: flex;
    gap: 1rem;
    align-items: center;
    justify-content: center;
    transform-origin: left;

    transform: rotate(-90deg);
    position: absolute;
    bottom: 10px;
    left: 100px;
    .verticalLine {
      width: 50rem;
      height: 0.2rem;
      background: grey;
    }
  }

  .heroDetails {
    display: flex;

    .heroInfo {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: center;
      padding: 0 20rem;
    }
    .attribute {
      display: flex;
      gap: 1rem;
      align-items: center;
    }

    .heroLore {
      width: 50%;
      padding: 2rem 0;
    }
    video {
      width: 70rem;
      right: -7rem;
      z-index: 1;
      position: absolute;
    }
  }
`;

const DetailsBarStyles = styled.div`
  width: 100%;
  height: 15rem;
  padding: 0 5rem;
  position: relative;
  z-index: 3;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
  gap: 3rem;
  background: linear-gradient(80deg, #252728 0%, #101415 100%);
  border-top: 2px solid #282828;
  border-bottom: 2px solid #2c2e2e;
  box-shadow: 0px 0px 8px #000;

  .detailsContainer {
    width: 33%;
    padding: 2rem 0;

    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;

    .header {
      color: #969696;
      font-size: 1.3rem;
      letter-spacing: 2px;
      text-shadow: 1px 1px 2px #000;
    }
  }
  .attributes_main-container {
    display: flex;
    gap: 3rem;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;

    img {
      width: 2rem;
    }
  }

  .attributesHeroPortrait {
    img {
      width: 10rem;
    }
    .attributes_bar {
      width: 100%;
      height: 1.5rem;
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;
      text-shadow: 1px 1px 2px #000;

      .attribute_minor_number {
        position: absolute;
        right: 0.3rem;
        color: ${accent};
        font-size: 0.75rem;
        font-weight: 400;
        text-shadow: none;
      }
    }
  }

  .attributes_all_container {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    .attributes_single_attribute {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 1rem;
    }
  }
  .detailsVerticalSeparator {
    width: 1px;
    height: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;

    &::after {
      content: '';
      width: 100%;
      height: 80%;
      background-color: #4f4f4f;
    }
  }
`;

export default Hero;
