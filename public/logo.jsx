import * as React from "react";

function Logo(props) {
  return (
    <svg
      width={40}
      height={40}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g filter="url(#prefix__filter0_bdd_1_14)">
        <path
          d="M.411 1.74a.844.844 0 01.213-.388.584.584 0 01.337-.17.747.747 0 01.41.071c.185.084.324.2.417.35.094.149.138.317.13.503l-.27-.122a.52.52 0 00-.087-.298.57.57 0 00-.252-.21c-.142-.064-.272-.064-.389 0-.116.064-.2.19-.253.38a.77.77 0 00.009.504.57.57 0 00.302.314c.11.05.21.065.298.044a.346.346 0 00.215-.164l.27.122a.595.595 0 01-.351.283c-.148.042-.312.022-.493-.06a.93.93 0 01-.354-.276.924.924 0 01-.179-.405 1.06 1.06 0 01.027-.478z"
          fill="#fff"
        />
      </g>
      <defs>
        <filter
          id="prefix__filter0_bdd_1_14"
          x={0.033}
          y={0.769}
          width={2.184}
          height={2.746}
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity={0} result="BackgroundImageFix" />
          <feGaussianBlur in="BackgroundImageFix" stdDeviation={0.075} />
          <feComposite
            in2="SourceAlpha"
            operator="in"
            result="effect1_backgroundBlur_1_14"
          />
          <feColorMatrix
            in="SourceAlpha"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy={0.151} />
          <feGaussianBlur stdDeviation={0.075} />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
          <feBlend
            in2="effect1_backgroundBlur_1_14"
            result="effect2_dropShadow_1_14"
          />
          <feColorMatrix
            in="SourceAlpha"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy={0.151} />
          <feGaussianBlur stdDeviation={0.075} />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
          <feBlend
            in2="effect2_dropShadow_1_14"
            result="effect3_dropShadow_1_14"
          />
          <feBlend
            in="SourceGraphic"
            in2="effect3_dropShadow_1_14"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  );
}

export default Logo;