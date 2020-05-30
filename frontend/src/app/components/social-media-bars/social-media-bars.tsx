import {
    FacebookIcon,
    FacebookShareButton,
    LinkedinIcon,
    LinkedinShareButton,
    TwitterIcon,
    TwitterShareButton,
    RedditIcon,
    RedditShareButton,
    WhatsappIcon,
    WhatsappShareButton,
    WorkplaceIcon,
    WorkplaceShareButton,
} from 'react-share';
import React from 'react';

const shareUrl = 'https://fightcovid.uk';
const defaultTitle =
    'I just signed up to Fightcovid.uk (https://fightcovid.uk) \n' +
    '\n' +
    'Join the fight against  Covid and volunteer your expertise and skills to help initiatives and organisations to tackle COVID-19. \n' +
    '\n' +
    'This platform:\n' +
    '      Allows you to volunteer your skills and expertise\n' +
    '      Allows initiatives to find the expertise and support they need\n' +
    '      Aggregates resources for initiatives tackling COVID\n' +
    '\n' +
    'Join the fight and spread the word!\n' +
    '#FightCovid19UK';

const twitterTitle =
    'I just signed up to Fight COVID (www.fightcovid.uk)\n' +
    '\n' +
    'Join the fight against Covid and volunteer your expertise and skills to help initiatives and organisations to tackle COVID-19. \n' +
    '\n' +
    'Join the fight and spread the word!\n' +
    '#FightCovid19UK';

export const MenuSocialMediaShareBar: React.FC = () => {
    return (
        <div className="menu-social-media-bar">
            <FacebookShareButton url={shareUrl} quote={defaultTitle} className="menu-social-media-icon">
                <FacebookIcon size={28} round />
            </FacebookShareButton>
            <LinkedinShareButton url={shareUrl} className="menu-social-media-icon">
                <LinkedinIcon size={28} round />
            </LinkedinShareButton>
            <TwitterShareButton url={shareUrl} title={twitterTitle} className="menu-social-media-icon">
                <TwitterIcon size={28} round />
            </TwitterShareButton>
            <RedditShareButton url={shareUrl} title={defaultTitle} className="menu-social-media-icon">
                <RedditIcon size={28} round />
            </RedditShareButton>
            <WhatsappShareButton url={shareUrl} title={defaultTitle} className="menu-social-media-icon">
                <WhatsappIcon size={28} round />
            </WhatsappShareButton>
            <WorkplaceShareButton url={shareUrl} title={defaultTitle} className="menu-social-media-icon">
                <WorkplaceIcon size={28} round />
            </WorkplaceShareButton>
        </div>
    );
};

export const LargerSocialMediaShareBar: React.FC = () => {
    return (
        <div className="modal-social-media-bar">
            <FacebookShareButton url={shareUrl} quote={defaultTitle} className="modal-social-media-icon">
                <FacebookIcon size={40} round />
            </FacebookShareButton>
            <LinkedinShareButton url={shareUrl} className="modal-social-media-icon">
                <LinkedinIcon size={40} round />
            </LinkedinShareButton>
            <TwitterShareButton url={shareUrl} title={twitterTitle} className="modal-social-media-icon">
                <TwitterIcon size={40} round />
            </TwitterShareButton>
            <RedditShareButton url={shareUrl} title={defaultTitle} className="modal-social-media-icon">
                <RedditIcon size={40} round />
            </RedditShareButton>
            <WhatsappShareButton url={shareUrl} title={defaultTitle} className="modal-social-media-icon">
                <WhatsappIcon size={40} round />
            </WhatsappShareButton>
            <WorkplaceShareButton url={shareUrl} title={defaultTitle} className="modal-social-media-icon">
                <WorkplaceIcon size={40} round />
            </WorkplaceShareButton>
        </div>
    );
};
