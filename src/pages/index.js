import React from 'react';
import Layout from '../components/Layout';
import Masthead from '../components/Masthead';
import Frame from '../components/Frame';
import SEO from '../components/seo';
import TwitterIcon from '../images/twitter.inline.svg';
import InstagramIcon from '../images/instagram.inline.svg';
import GithubIcon from '../images/github.inline.svg';

const socialLinks = [
  {
    icon: <TwitterIcon />,
    url: 'https://www.twitter.com/shaunbent',
    text: 'I say things on Twitter',
  },
  {
    icon: <InstagramIcon />,
    url: 'https://www.instagram.com/shaunbent',
    text: 'I write code on GitHub',
  },
  {
    icon: <GithubIcon />,
    url: 'https://www.github.com/shaunbent',
    text: 'A take pictures of things on Instagram',
  },
];

function Index() {
  return (
    <Layout>
      <SEO title="Shaun Bent" />
      <Masthead social={socialLinks} />
      <main>
        <Frame>
          <h2>About</h2>
          <p>Hej, I'm Shaun Bent and I work with Design Systems.</p>
        </Frame>
        <Frame color="snow">
          <h2>Work</h2>
          <p>Insert Companies</p>
        </Frame>
      </main>
      <footer>Copyright &copy; 2019-2020</footer>
    </Layout>
  );
}

export default Index;
