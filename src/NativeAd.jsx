import { useEffect, useRef } from 'react';

export default function NativeAd() {
  const adRef = useRef(null);

  useEffect(() => {
    // Only inject the script once
    if (adRef.current && adRef.current.childNodes.length === 0) {
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.async = true;
      script.dataset.cfasync = 'false';
      script.src = 'https://pl29217413.profitablecpmratenetwork.com/7c/a9/ec/7ca9ec000f39f9344e5c836a664d147f.js';
      
      adRef.current.appendChild(script);
    }
  }, []);

  return (
    <div style={{ display: 'flex', justifyContent: 'center', width: '100%', margin: '2rem 0' }}>
      <div ref={adRef}></div>
    </div>
  );
}
