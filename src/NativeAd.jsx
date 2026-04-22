import { useEffect, useRef } from 'react';

export default function NativeAd() {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current || containerRef.current.childNodes.length > 0) return;

    // Create the container div Adsterra needs
    const adContainer = document.createElement('div');
    adContainer.id = 'container-d26d546e46bdff771b057d6223339bd0';
    containerRef.current.appendChild(adContainer);

    // Inject the script that fills the container
    const script = document.createElement('script');
    script.async = true;
    script.dataset.cfasync = 'false';
    script.src = 'https://pl29217411.profitablecpmratenetwork.com/d26d546e46bdff771b057d6223339bd0/invoke.js';
    containerRef.current.appendChild(script);
  }, []);

  return (
    <div 
      ref={containerRef}
      style={{ 
        width: '100%', 
        margin: '1.5rem auto',
        maxWidth: '700px',
        minHeight: '100px'
      }}
    />
  );
}
