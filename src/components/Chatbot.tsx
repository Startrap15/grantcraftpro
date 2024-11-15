import React, { useEffect } from 'react';

declare global {
  interface Window {
    Tawk_API: any;
    Tawk_LoadStart: Date;
  }
}

export default function Chatbot() {
  useEffect(() => {
    const initTawkTo = () => {
      window.Tawk_API = window.Tawk_API || {};
      window.Tawk_LoadStart = new Date();

      const s1 = document.createElement('script');
      const s0 = document.getElementsByTagName('script')[0];
      
      s1.async = true;
      s1.src = 'https://embed.tawk.to/6733d9524304e3196ae13a70/1ich8hqvu';
      s1.charset = 'UTF-8';
      s1.setAttribute('crossorigin', '*');
      
      if (s0 && s0.parentNode) {
        s0.parentNode.insertBefore(s1, s0);
      } else {
        document.head.appendChild(s1);
      }
    };

    initTawkTo();

    return () => {
      const tawkScript = document.querySelector('script[src*="tawk.to"]');
      if (tawkScript && tawkScript.parentNode) {
        tawkScript.parentNode.removeChild(tawkScript);
      }
      delete window.Tawk_API;
      delete window.Tawk_LoadStart;
    };
  }, []);

  return null;
}