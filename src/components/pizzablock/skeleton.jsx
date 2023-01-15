import React from 'react';
import ContentLoader from 'react-content-loader';

const Skeleton = (props) => (
  <ContentLoader
    speed={2}
    width={280}
    height={465}
    viewBox="0 0 280 465"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}>
    <rect x="164" y="321" rx="0" ry="0" width="0" height="2" />
    <rect x="-4" y="298" rx="10" ry="10" width="280" height="88" />
    <rect x="13" y="407" rx="11" ry="11" width="95" height="30" />
    <rect x="123" y="397" rx="32" ry="32" width="152" height="45" />
    <circle cx="140" cy="124" r="100" />
    <rect x="20" y="261" rx="10" ry="10" width="240" height="25" />
  </ContentLoader>
);

export {Skeleton};
