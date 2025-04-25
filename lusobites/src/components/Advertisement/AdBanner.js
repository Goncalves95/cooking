// src/components/Advertisement/AdBanner.js
import React, { useEffect } from 'react';
import styled from 'styled-components';

const AdContainer = styled.div`
  width: 100%;
  margin: 2rem 0;
  overflow: hidden;
  text-align: center;
  
  .ad-label {
    color: #999;
    font-size: 0.8rem;
    margin-bottom: 0.5rem;
  }
`;

const AdBanner = ({ slot, format }) => {
  useEffect(() => {
    // Verificar se o AdSense está carregado
    if (window.adsbygoogle) {
      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch (e) {
        console.error('Erro ao carregar anúncio:', e);
      }
    }
  }, []);

  return (
    <AdContainer>
      <div className="ad-label">Publicidade</div>
      <ins className="adsbygoogle"
         style={{ display: 'block' }}
         data-ad-client="ca-pub-YOUR_ADSENSE_ID"
         data-ad-slot={slot}
         data-ad-format={format}
         data-full-width-responsive="true"></ins>
    </AdContainer>
  );
};

export default AdBanner;