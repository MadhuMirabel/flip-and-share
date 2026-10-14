"use client";

import Script from "next/script";
import { useEffect } from "react";
import { useConsent } from "@/lib/consent";

/**
 * The only place third-party tracking scripts are added. Each one is rendered ONLY while the visitor has
 * allowed its category and its ID is set in the environment (see .env.example). No consent, no script:
 * nothing is requested from the tool's servers.
 */

const GA_ID = process.env.NEXT_PUBLIC_GA_ID ?? "";
const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID ?? "";

// IDs are placed inside inline scripts, so accept only the expected shapes.
const GA_OK = /^G-[A-Z0-9]{4,}$/.test(GA_ID);
const META_OK = /^\d{6,20}$/.test(META_PIXEL_ID);

export function ConsentScripts() {
  const consent = useConsent();
  const analytics = consent?.analytics === true;
  const marketing = consent?.marketing === true;

  // Withdrawn: tell Google Analytics to stop collecting for the rest of this page view.
  useEffect(() => {
    if (GA_OK && !analytics) (window as unknown as Record<string, boolean>)[`ga-disable-${GA_ID}`] = true;
    if (GA_OK && analytics) (window as unknown as Record<string, boolean>)[`ga-disable-${GA_ID}`] = false;
  }, [analytics]);

  return (
    <>
      {GA_OK && analytics && (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
          <Script id="ga-init" strategy="afterInteractive">
            {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','${GA_ID}',{anonymize_ip:true});`}
          </Script>
        </>
      )}
      {META_OK && marketing && (
        <Script id="meta-pixel" strategy="afterInteractive">
          {`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${META_PIXEL_ID}');fbq('track','PageView');`}
        </Script>
      )}
    </>
  );
}
