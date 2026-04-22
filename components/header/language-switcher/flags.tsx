import * as React from "react";

export function FlagUS(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 480" width="16" height="12" {...props}>
      <path fill="#bd3d44" d="M0 0h640v480H0z"/>
      <path stroke="#fff" strokeWidth="37" d="M0 55.3h640M0 129h640M0 203h640M0 277h640M0 351h640M0 425h640"/>
      <path fill="#192f5d" d="M0 0h254v258H0z"/>
      <marker id="us-star" markerHeight="30" markerWidth="30">
        <g transform="scale(.0285)">
          <path fill="#fff" d="m146 54 36 111h117L204 234l36 111-94-69-95 69 36-111-95-69h117z"/>
        </g>
      </marker>
      <path fill="none" markerMid="url(#us-star)" d="M16 35h237m-208 30h208m-237 29h237m-208 30h208m-237 29h237m-208 29h208m-237 30h237m-208 30h208m-237 29h237"/>
    </svg>
  );
}

export function FlagBR(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 480" width="16" height="12" {...props}>
      <path fill="#009b3a" d="M0 0h640v480H0z"/>
      <path fill="#fedf00" d="m320 82 274 158-274 158L46 240z"/>
      <circle cx="320" cy="240" r="106" fill="#002776"/>
      <path stroke="#fff" strokeWidth="18" d="M228 276c38-34 94-43 147-23"/>
    </svg>
  );
}

export function FlagES(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 480" width="16" height="12" {...props}>
      <path fill="#c60b1e" d="M0 0h640v480H0z"/>
      <path fill="#ffc400" d="M0 120h640v240H0z"/>
    </svg>
  );
}

export function FlagIT(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 480" width="16" height="12" {...props}>
      <path fill="#009246" d="M0 0h213.3v480H0z"/>
      <path fill="#fff" d="M213.3 0h213.4v480H213.3z"/>
      <path fill="#ce2b37" d="M426.7 0H640v480H426.7z"/>
    </svg>
  );
}

export function FlagFR(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 480" width="16" height="12" {...props}>
      <path fill="#0055a4" d="M0 0h213.3v480H0z"/>
      <path fill="#fff" d="M213.3 0h213.4v480H213.3z"/>
      <path fill="#ef4135" d="M426.7 0H640v480H426.7z"/>
    </svg>
  );
}

export function FlagDE(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 480" width="16" height="12" {...props}>
      <path fill="#000" d="M0 0h640v160H0z"/>
      <path fill="#d00" d="M0 160h640v160H0z"/>
      <path fill="#ffce00" d="M0 320h640v160H0z"/>
    </svg>
  );
}
