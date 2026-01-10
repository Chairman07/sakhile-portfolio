/**
 * Skills Component
 * 
 * Displays technical skills organized by category:
 * - Programming languages
 * - Web development technologies
 * - Cloud & DevOps tools
 * - Other tools and methodologies
 * 
 * Features scroll-triggered animations
 */
import { useInView, useStaggeredAnimation } from '../hooks/useScrollAnimation';
import './Skills.css';

/**
 * Technology logos as SVG components
 */
const TECH_LOGOS = {
  javascript: (
    <svg viewBox="0 0 24 24" className="skill-logo">
      <path fill="#F7DF1E" d="M0 0h24v24H0V0z"/>
      <path fill="#000" d="M6.5 14.5c0 1.5.5 2.5 2 2.5 1.2 0 1.8-.6 1.8-2v-5h2.3v5c0 3-1.8 4.5-4.1 4.5-2.2 0-3.8-1.2-4-3.5h2zm8.8-.5c0 2 1.2 3 3 3 1.5 0 2.5-.7 2.5-2 0-1.2-.7-1.7-2.2-2.2l-.8-.3c-2-.8-3.3-1.8-3.3-4 0-2 1.5-3.5 3.8-3.5 1.7 0 2.8.6 3.7 2l-2 1.3c-.5-.8-1-1.2-1.7-1.2-.8 0-1.3.5-1.3 1.2 0 .8.5 1.2 1.7 1.7l.8.3c2.3 1 3.5 2 3.5 4.2 0 2.4-1.8 3.7-4.3 3.7-2.5 0-4-1.3-4.8-3l2-1.2z"/>
    </svg>
  ),
  python: (
    <svg viewBox="0 0 24 24" className="skill-logo">
      <path fill="#3776AB" d="M12 0C8.7 0 8.3.2 8.3 2.2v3.2h5.4v.7H6.5c-2 0-3.7 1.2-4.2 3.5-.6 2.6-.6 4.2 0 7 .4 2 1.4 3.5 3.4 3.5h2.2V17c0-2.3 2-4.3 4.3-4.3h5.3c1.9 0 3.4-1.6 3.4-3.5V2.2C20.9.2 18.9 0 15.7 0H12zm-1.5 1.3c.7 0 1.3.6 1.3 1.3 0 .7-.6 1.3-1.3 1.3-.7 0-1.3-.6-1.3-1.3 0-.7.6-1.3 1.3-1.3z"/>
      <path fill="#FFD43B" d="M20.9 7.5c-.5-2-1.5-3.5-3.4-3.5h-2.2V7c0 2.3-2 4.3-4.3 4.3H5.7c-1.9 0-3.4 1.6-3.4 3.5v5.1c0 2 1.7 3.1 3.4 3.5 2 .5 4 .6 5.3 0 .9-.4 3.4-1.2 3.4-3.5v-3.2H9v-.7h8.8c2 0 2.7-1.4 3.4-3.5.7-2.2.7-4.2 0-7zm-7.3 13.2c.7 0 1.3.6 1.3 1.3 0 .7-.6 1.3-1.3 1.3-.7 0-1.3-.6-1.3-1.3 0-.7.6-1.3 1.3-1.3z"/>
    </svg>
  ),
  java: (
    <svg viewBox="0 0 24 24" className="skill-logo">
      <path fill="#E76F00" d="M8.851 18.56s-.917.534.653.714c1.902.218 2.874.187 4.969-.211 0 0 .552.346 1.321.646-4.699 2.013-10.633-.118-6.943-1.149m-.575-2.627s-1.028.761.542.924c2.032.209 3.636.227 6.413-.308 0 0 .384.389.987.602-5.679 1.661-12.007.13-7.942-1.218"/>
      <path fill="#E76F00" d="M13.503 10.737c1.157 1.332-.304 2.533-.304 2.533s2.939-1.518 1.589-3.418c-1.261-1.772-2.228-2.652 3.007-5.688 0 0-8.216 2.052-4.292 6.573"/>
      <path fill="#E76F00" d="M18.959 19.794s.679.56-.748 .991c-2.712.822-11.288 1.069-13.669.033-.856-.373.75-.89 1.254-.998.527-.114.828-.093.828-.093-.953-.671-6.156 1.317-2.643 1.887 9.58 1.553 17.462-.7 14.978-1.82"/>
      <path fill="#E76F00" d="M9.292 13.021s-4.362 1.036-1.544 1.412c1.189.159 3.561.123 5.77-.062 1.806-.152 3.618-.477 3.618-.477s-.637.272-1.098.587c-4.429 1.165-12.986.623-10.522-.569 2.082-1.006 3.776-.891 3.776-.891m7.809 4.371c4.503-2.34 2.421-4.589.968-4.285-.355.074-.515.138-.515.138s.132-.207.385-.297c2.875-1.011 5.086 2.981-.928 4.562 0 0 .07-.062.09-.118"/>
      <path fill="#5382A1" d="M14.402 0s2.494 2.494-2.365 6.338c-3.896 3.082-.889 4.842-.001 6.851-2.276-2.054-3.943-3.858-2.824-5.541 1.644-2.469 6.197-3.665 5.19-7.648"/>
      <path fill="#5382A1" d="M9.734 23.924c4.322.277 10.959-.153 11.116-2.198 0 0-.302.775-3.572 1.391-3.688.694-8.239.613-10.937.168 0 0 .553.457 3.393.639"/>
    </svg>
  ),
  typescript: (
    <svg viewBox="0 0 24 24" className="skill-logo">
      <rect fill="#3178C6" width="24" height="24" rx="2"/>
      <path fill="#fff" d="M12.4 12.5v7.2h-1.3v-7.2H8.3v-1.2h6.8v1.2h-2.7zm5.5 1.6c.4 0 .8.1 1 .3.3.2.5.5.6.9h-1.1c0-.2-.1-.3-.3-.4-.2-.1-.4-.2-.7-.2-.3 0-.5.1-.7.2-.2.1-.3.3-.3.5 0 .2.1.3.2.4.2.1.4.2.8.3l.8.2c.6.1 1 .3 1.3.5.3.3.4.6.4 1.1 0 .6-.2 1-.6 1.3-.4.3-1 .5-1.7.5-.7 0-1.3-.2-1.7-.5-.4-.3-.7-.8-.7-1.3h1.2c0 .3.1.5.3.6.2.2.5.2.9.2.3 0 .6-.1.8-.2.2-.1.3-.3.3-.6 0-.2-.1-.4-.3-.5-.2-.1-.5-.2-.9-.3l-.7-.2c-.6-.1-1-.3-1.3-.6-.3-.3-.4-.6-.4-1.1 0-.6.2-1 .6-1.3.4-.3.9-.5 1.6-.5z"/>
    </svg>
  ),
  sql: (
    <svg viewBox="0 0 24 24" className="skill-logo">
      <path fill="#CC2927" d="M12 2C6.5 2 2 3.8 2 6v12c0 2.2 4.5 4 10 4s10-1.8 10-4V6c0-2.2-4.5-4-10-4zm0 2c4.4 0 8 1.3 8 2s-3.6 2-8 2-8-1.3-8-2 3.6-2 8-2zm8 14c0 .7-3.6 2-8 2s-8-1.3-8-2v-3c1.9 1.2 5 2 8 2s6.1-.8 8-2v3zm0-5c0 .7-3.6 2-8 2s-8-1.3-8-2V9c1.9 1.2 5 2 8 2s6.1-.8 8-2v4z"/>
    </svg>
  ),
  html: (
    <svg viewBox="0 0 24 24" className="skill-logo">
      <path fill="#E34F26" d="M3.2 2l1.6 18L12 22l7.2-2L21 2H3.2zm14.4 6h-7.5l.2 2.5h7.1l-.6 6.5-4.8 1.3-4.8-1.3-.3-3.5h2.4l.1 1.8 2.6.7 2.6-.7.3-3.3H7.7l-.6-7h10.4l-.2 2.5z"/>
    </svg>
  ),
  react: (
    <svg viewBox="0 0 24 24" className="skill-logo">
      <circle fill="#61DAFB" cx="12" cy="12" r="2.2"/>
      <g fill="none" stroke="#61DAFB" strokeWidth="1">
        <ellipse cx="12" cy="12" rx="10" ry="4"/>
        <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(60 12 12)"/>
        <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(120 12 12)"/>
      </g>
    </svg>
  ),
  nodejs: (
    <svg viewBox="0 0 24 24" className="skill-logo">
      <path fill="#339933" d="M11.998 24c-.321 0-.641-.084-.922-.247l-2.936-1.737c-.438-.245-.224-.332-.08-.383.585-.203.703-.25 1.328-.604.065-.037.151-.023.218.017l2.256 1.339a.29.29 0 0 0 .272 0l8.795-5.076a.277.277 0 0 0 .134-.238V6.921a.283.283 0 0 0-.137-.242l-8.791-5.072a.278.278 0 0 0-.271 0L3.075 6.68a.284.284 0 0 0-.139.24v10.15c0 .099.053.19.138.236l2.409 1.392c1.307.654 2.108-.116 2.108-.89V7.787c0-.142.114-.253.256-.253h1.115c.139 0 .255.112.255.253v10.021c0 1.745-.95 2.745-2.604 2.745-.508 0-.909 0-2.026-.551l-2.307-1.326A1.85 1.85 0 0 1 1.356 17.07V6.921c0-.681.363-1.317.954-1.656L11.1.191a1.926 1.926 0 0 1 1.85 0l8.794 5.074c.588.339.952.975.952 1.656v10.15c0 .68-.364 1.314-.952 1.655l-8.794 5.076a1.872 1.872 0 0 1-.926.25z"/>
    </svg>
  ),
  express: (
    <svg viewBox="0 0 24 24" className="skill-logo">
      <path fill="currentColor" d="M24 18.588a1.529 1.529 0 0 1-1.895-.72l-3.45-4.771-.5-.667-4.003 5.444a1.466 1.466 0 0 1-1.802.708l5.158-6.92-4.798-6.251a1.595 1.595 0 0 1 1.9.666l3.576 4.83 3.596-4.81a1.435 1.435 0 0 1 1.788-.668L21.708 7.9l-2.522 3.283a.666.666 0 0 0 0 .994l4.804 6.412zM.002 11.576l.42-2.075c1.154-4.103 5.858-5.81 9.094-3.27 1.895 1.489 2.368 3.597 2.275 5.973H1.116C.943 16.447 4.005 19.009 7.92 17.7a4.078 4.078 0 0 0 2.582-2.876c.207-.666.548-.78 1.174-.588a5.417 5.417 0 0 1-2.589 3.957 6.272 6.272 0 0 1-7.306-.933 6.575 6.575 0 0 1-1.64-3.858c0-.235-.08-.455-.134-.666A88.33 88.33 0 0 1 0 11.577zm1.127-.286h9.654c-.06-3.076-2.001-5.258-4.59-5.278-2.882-.04-4.944 2.094-5.071 5.264z"/>
    </svg>
  ),
  mongodb: (
    <svg viewBox="0 0 24 24" className="skill-logo">
      <path fill="#47A248" d="M17.193 9.555c-1.264-5.58-4.252-7.414-4.573-8.115-.28-.394-.53-.954-.735-1.44-.036.495-.055.685-.523 1.184-.723.566-4.438 3.682-4.74 10.02-.282 5.912 4.27 9.435 4.888 9.884l.07.05A73.49 73.49 0 0111.91 24h.481c.114-1.032.284-2.056.51-3.07.417-.296.604-.463.85-.693a11.342 11.342 0 003.639-8.464c.01-.814-.103-1.662-.197-2.218zm-5.336 8.195s0-8.291.275-8.29c.213 0 .49 10.695.49 10.695-.381-.045-.765-1.76-.765-2.405z"/>
    </svg>
  ),
  postgresql: (
    <svg viewBox="0 0 24 24" className="skill-logo">
      <path fill="#336791" d="M23.557 14.945c-.328-.775-.636-.963-1.587-.963h-.266c.398-1.26.63-2.598.63-3.996 0-5.413-3.19-9.538-7.37-9.98-.242-.027-.487-.04-.735-.04-1.56 0-3.02.574-4.286 1.61-.71-.22-1.453-.326-2.192-.326-1.38 0-2.671.388-3.636 1.133C2.37 3.72 1.36 5.937 1.36 8.69c0 1.38.202 2.702.6 3.932-.083.078-.168.15-.248.234-.784.83-1.168 1.95-1.168 3.41 0 1.232.316 2.35.965 3.276.72 1.022 1.794 1.592 2.93 1.592.56 0 1.12-.11 1.663-.33.02 1.21.64 2.09 1.796 2.62.625.285 1.315.43 2.05.43.83 0 1.65-.19 2.37-.52-.076.32-.12.65-.12.99 0 .438.066.85.176 1.24l.038.13h.426c.94-.03 1.7-.135 2.24-.31 1.14-.37 1.93-1.06 2.35-2.07.14-.34.24-.72.3-1.12.78-.23 1.43-.58 1.93-1.06.72-.68 1.08-1.59 1.08-2.73 0-.4-.04-.77-.13-1.11.46-.1.88-.27 1.24-.52.74-.51 1.14-1.25 1.14-2.11 0-.56-.17-1.16-.38-1.67z"/>
      <path fill="#fff" d="M19.09 15.92c-.1-.46-.24-.86-.42-1.21.25-.55.38-1.16.38-1.83 0-1.08-.33-1.98-.96-2.62a3.18 3.18 0 0 0-.8-.6c.1-.5.16-1.02.16-1.55 0-1.36-.36-2.58-1.04-3.54-.74-1.04-1.82-1.71-3.14-1.97-.3-.06-.6-.08-.9-.08-.9 0-1.75.22-2.52.65a5.2 5.2 0 0 0-.78-.06c-.67 0-1.3.13-1.87.37-.72.31-1.31.77-1.76 1.36-.57.73-.94 1.61-1.08 2.58-.15 1.03-.04 2.13.33 3.27a3.12 3.12 0 0 0-1.22 2.5c0 .74.19 1.4.55 1.97.42.65 1.04 1.1 1.78 1.29.48.13.98.18 1.49.15.1.75.4 1.38.9 1.87.62.6 1.47.92 2.42.92.58 0 1.13-.11 1.62-.34.1.63.34 1.15.72 1.55.55.58 1.34.9 2.3.9.4 0 .79-.04 1.16-.14.76-.2 1.37-.6 1.79-1.17.37-.5.58-1.1.58-1.77 0-.2-.02-.4-.05-.59.55-.14 1-.42 1.32-.84.28-.37.42-.82.42-1.33 0-.36-.08-.72-.24-1.07z"/>
    </svg>
  ),
  azure: (
    <svg viewBox="0 0 24 24" className="skill-logo">
      <path fill="#0078D4" d="M13.05 4.24L6.56 18.05a.5.5 0 0 0 .46.7h12.24a.25.25 0 0 0 .21-.39L13.5 4.25a.26.26 0 0 0-.45 0zM8.87 15.65a.25.25 0 0 1-.24-.32l3.34-9.42a.25.25 0 0 1 .47 0l3.35 9.42a.25.25 0 0 1-.24.32z"/>
      <path fill="#50E6FF" d="M1.08 18.05l5.42-7.35a.25.25 0 0 1 .4 0l2.37 3.2a.25.25 0 0 1-.2.4H1.54a.5.5 0 0 0-.46.75z"/>
    </svg>
  ),
  aws: (
    <svg viewBox="0 0 24 24" className="skill-logo">
      <path fill="#232F3E" d="M6.763 10.036c0 .296.032.535.088.71.064.176.144.368.256.576.04.063.056.127.056.183 0 .08-.048.16-.152.24l-.503.335a.383.383 0 0 1-.208.072c-.08 0-.16-.04-.239-.112a2.47 2.47 0 0 1-.287-.375 6.18 6.18 0 0 1-.248-.471c-.622.734-1.405 1.101-2.347 1.101-.67 0-1.205-.191-1.596-.574-.391-.384-.59-.894-.59-1.533 0-.678.239-1.23.726-1.644.487-.415 1.133-.623 1.955-.623.272 0 .551.024.846.064.296.04.6.104.918.176v-.583c0-.607-.127-1.03-.375-1.277-.255-.248-.686-.367-1.3-.367-.28 0-.568.031-.863.103-.296.072-.583.16-.862.272a2.287 2.287 0 0 1-.28.104.488.488 0 0 1-.127.023c-.112 0-.168-.08-.168-.247v-.391c0-.128.016-.224.056-.28a.597.597 0 0 1 .224-.167c.279-.144.614-.264 1.005-.36a4.84 4.84 0 0 1 1.246-.151c.95 0 1.644.216 2.091.647.439.43.662 1.085.662 1.963v2.586z"/>
      <path fill="#FF9900" d="M21.725 16.912c-2.656 1.963-6.512 3.008-9.832 3.008-4.65 0-8.84-1.717-12.01-4.576-.248-.224-.024-.528.272-.352 3.422 1.987 7.653 3.184 12.026 3.184 2.947 0 6.186-.607 9.168-1.867.448-.2.823.288.376.603z"/>
      <path fill="#FF9900" d="M22.803 15.673c-.343-.44-2.259-.208-3.123-.104-.264.032-.303-.199-.063-.367 1.527-1.076 4.034-.766 4.33-.407.295.368-.08 2.876-1.512 4.074-.22.183-.43.087-.335-.152.327-.807 1.046-2.604.703-3.044z"/>
    </svg>
  ),
  docker: (
    <svg viewBox="0 0 24 24" className="skill-logo">
      <path fill="#2496ED" d="M13.9 9.4h-2.2V7.5h2.2v1.9zm-2.7 0H9V7.5h2.2v1.9zm-2.7 0H6.3V7.5h2.2v1.9zM13.9 6.9h-2.2V5h2.2v1.9zm-2.7 0H9V5h2.2v1.9zm6 2.5h-2.2V7.5h2.2v1.9zM24 12.3c-.6-.4-2-.5-3-.2-.2-1.4-1.1-2.6-2.2-3.7l-.4-.3-.3.4c-.6.8-.8 2-.6 3 .1.5.3 1 .7 1.4-1 .5-2.1.6-3.1.6H0c-.2 2.2.2 5.1 2 7 1.6 1.7 3.9 2.5 6.9 2.5 6.6 0 11.5-3 13.8-8.5 1 0 3.1 0 4.2-2 0-.1.1-.2.1-.3l-.1-.2c-.1 0-.1-.1-.1-.1-.5-.4-1.4-.6-2.3-.6z"/>
    </svg>
  ),
  kubernetes: (
    <svg viewBox="0 0 24 24" className="skill-logo">
      <path fill="#326CE5" d="M10.204 14.35l.007.01-.999 2.413a5.171 5.171 0 0 1-2.075-2.597l2.578-.437.004.005a.44.44 0 0 1 .484.606zm-.833-2.129a.44.44 0 0 0 .173-.756l.002-.011L7.585 9.7a5.143 5.143 0 0 0-.73 3.255l2.514-.725.002-.009zm1.145-1.98a.44.44 0 0 0 .699-.337l.01-.005.15-2.62a5.144 5.144 0 0 0-3.01 1.442l2.147 1.523.004-.002zm2.369 1.882a.44.44 0 0 0 .173.756l.002.01 2.514.725a5.143 5.143 0 0 0-.73-3.255l-1.96 1.762v.002zm-.597-.755a.44.44 0 0 0 .699.337l.004.002 2.147-1.523a5.144 5.144 0 0 0-3.01-1.442l.15 2.62.01.006zm.956 2.364l.004-.004 2.578.437a5.171 5.171 0 0 1-2.075 2.597l-.999-2.413.007-.01a.44.44 0 0 1 .485-.607z"/>
      <path fill="#326CE5" d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 2.273a9.727 9.727 0 1 1 0 19.454 9.727 9.727 0 0 1 0-19.454z"/>
    </svg>
  ),
  git: (
    <svg viewBox="0 0 24 24" className="skill-logo">
      <path fill="#F05032" d="M23.5 11.5l-10-10c-.7-.7-1.8-.7-2.5 0l-2.1 2.1 2.7 2.7c.7-.2 1.6-.1 2.2.5.6.6.7 1.5.5 2.2l2.6 2.6c.7-.2 1.6-.1 2.2.5.8.8.8 2.2 0 3-.8.8-2.2.8-3 0-.7-.7-.8-1.7-.4-2.5l-2.4-2.4v6.4c.2.1.4.2.6.4.8.8.8 2.2 0 3-.8.8-2.2.8-3 0-.8-.8-.8-2.2 0-3 .2-.2.4-.3.7-.4V9.9c-.2-.1-.5-.2-.7-.4-.7-.7-.8-1.7-.4-2.5L7.5 4.3.5 11.3c-.7.7-.7 1.8 0 2.5l10 10c.7.7 1.8.7 2.5 0l9.9-9.9c.7-.7.7-1.8 0-2.5z"/>
    </svg>
  ),
  vscode: (
    <svg viewBox="0 0 24 24" className="skill-logo">
      <path fill="#007ACC" d="M17.5 0L7 9.4 2.8 6.1 1 7.5v9l1.8 1.4L7 14.6 17.5 24 23 22.5v-21L17.5 0zm0 4.6v14.8L8.3 12 17.5 4.6z"/>
    </svg>
  ),
  linux: (
    // Tux the Linux Penguin
    <svg viewBox="0 0 24 24" className="skill-logo">
      {/* Body */}
      <ellipse fill="#000000" cx="12" cy="14" rx="7" ry="8"/>
      {/* White belly */}
      <ellipse fill="#FFFFFF" cx="12" cy="15" rx="5" ry="6"/>
      {/* Head */}
      <circle fill="#000000" cx="12" cy="6" r="5"/>
      {/* Face/white area */}
      <ellipse fill="#FFFFFF" cx="12" cy="7" rx="3.5" ry="3"/>
      {/* Left eye */}
      <ellipse fill="#FFFFFF" cx="10.5" cy="6" rx="1.2" ry="1.5"/>
      <ellipse fill="#000000" cx="10.5" cy="6.2" rx="0.5" ry="0.7"/>
      {/* Right eye */}
      <ellipse fill="#FFFFFF" cx="13.5" cy="6" rx="1.2" ry="1.5"/>
      <ellipse fill="#000000" cx="13.5" cy="6.2" rx="0.5" ry="0.7"/>
      {/* Beak */}
      <path fill="#F5A623" d="M12 7.5l-1.5 1.5h3L12 7.5z"/>
      {/* Left foot */}
      <ellipse fill="#F5A623" cx="9" cy="21" rx="2" ry="1"/>
      {/* Right foot */}
      <ellipse fill="#F5A623" cx="15" cy="21" rx="2" ry="1"/>
    </svg>
  ),
  agile: (
    <svg viewBox="0 0 24 24" className="skill-logo">
      <path fill="currentColor" d="M12 2L2 7v10l10 5 10-5V7L12 2zm0 2.2l7.5 3.8v7.5L12 19.8 4.5 15.5V8l7.5-3.8zM12 8c-2.2 0-4 1.8-4 4s1.8 4 4 4 4-1.8 4-4-1.8-4-4-4zm0 1.5c1.4 0 2.5 1.1 2.5 2.5s-1.1 2.5-2.5 2.5-2.5-1.1-2.5-2.5 1.1-2.5 2.5-2.5z"/>
    </svg>
  ),
  jira: (
    <svg viewBox="0 0 24 24" className="skill-logo">
      <path fill="#0052CC" d="M12 0C8.3 0 5.2 2.6 4.4 6.2H2L12 16.3l10-10.1h-2.4C18.8 2.6 15.7 0 12 0zm0 3.8c1.9 0 3.4 1.5 3.4 3.4H8.6c0-1.9 1.5-3.4 3.4-3.4z"/>
      <path fill="#0052CC" d="M12 7.7l-4.4 4.4c-.5 1.7.3 3.6 1.9 4.5 1.6.9 3.6.5 4.9-.9l4.4-4.4c.5-1.7-.3-3.6-1.9-4.5-1.6-.9-3.6-.5-4.9.9z"/>
    </svg>
  ),
  figma: (
    <svg viewBox="0 0 24 24" className="skill-logo">
      <path fill="#F24E1E" d="M8 24c2.2 0 4-1.8 4-4v-4H8c-2.2 0-4 1.8-4 4s1.8 4 4 4z"/>
      <path fill="#FF7262" d="M4 12c0-2.2 1.8-4 4-4h4v8H8c-2.2 0-4-1.8-4-4z"/>
      <path fill="#A259FF" d="M4 4c0-2.2 1.8-4 4-4h4v8H8C5.8 8 4 6.2 4 4z"/>
      <path fill="#1ABCFE" d="M12 0h4c2.2 0 4 1.8 4 4s-1.8 4-4 4h-4V0z"/>
      <path fill="#0ACF83" d="M20 12c0 2.2-1.8 4-4 4s-4-1.8-4-4 1.8-4 4-4 4 1.8 4 4z"/>
    </svg>
  ),
  testing: (
    <svg viewBox="0 0 24 24" className="skill-logo">
      <path fill="currentColor" d="M9.5 3L8 7H6l3 5.5L7.5 17H16l-.5-4.5L19 7h-2l-1.5-4h-6zM10.3 5h3.4l1 2.5h-5.4l1-2.5zM8.5 9h7l-1.5 2.5-1 3.5h-2l-1-3.5L8.5 9zm2 10v2h3v-2h-3z"/>
    </svg>
  ),
  restapi: (
    <svg viewBox="0 0 24 24" className="skill-logo">
      <path fill="#009688" d="M7 7h2v2H7V7zm0 4h2v2H7v-2zm0 4h2v2H7v-2z"/>
      <path fill="#009688" d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H4V6h16v12z"/>
      <path fill="#009688" d="M10 7h7v2h-7V7zm0 4h7v2h-7v-2zm0 4h4v2h-4v-2z"/>
    </svg>
  ),
  cicd: (
    <svg viewBox="0 0 24 24" className="skill-logo">
      <path fill="#4CAF50" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
      <path fill="#2196F3" d="M19.35 10.04A7.49 7.49 0 0 0 12 4C9.11 4 6.6 5.64 5.35 8.04A5.994 5.994 0 0 0 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z" opacity="0.3"/>
      <g fill="none" stroke="#FF9800" strokeWidth="1.5">
        <path d="M8 12l2 2 4-4"/>
        <circle cx="12" cy="12" r="3"/>
        <path d="M12 6v2M12 16v2M6 12h2M16 12h2"/>
      </g>
    </svg>
  ),
  // Cloud Security & Linux Tools
  bash: (
    // GNU Bash logo - Terminal with $ prompt
    <svg viewBox="0 0 24 24" className="skill-logo">
      <path fill="#4EAA25" d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
      <path fill="#2E7D32" d="M4 4h16c1.1 0 2 .9 2 2v2H2V6c0-1.1.9-2 2-2z"/>
      <circle fill="#EF5350" cx="5" cy="6" r="1"/>
      <circle fill="#FFCA28" cx="8" cy="6" r="1"/>
      <circle fill="#66BB6A" cx="11" cy="6" r="1"/>
      <text x="5" y="15" fill="#FFFFFF" fontSize="6" fontFamily="monospace" fontWeight="bold">$_</text>
    </svg>
  ),
  terraform: (
    // HashiCorp Terraform logo
    <svg viewBox="0 0 24 24" className="skill-logo">
      <path fill="#7B42BC" d="M8.654 3.891v5.588l4.846 2.794V6.685L8.654 3.89z"/>
      <path fill="#7B42BC" d="M14.125 6.685v5.588l4.846-2.794V3.891l-4.846 2.794z"/>
      <path fill="#7B42BC" d="M3.529 6.412v5.588l4.846 2.794V9.206L3.529 6.412z"/>
      <path fill="#7B42BC" d="M8.654 15.306v5.588l4.846 2.794v-5.588l-4.846-2.794z"/>
    </svg>
  ),
  wireshark: (
    // Wireshark logo - Shark fin
    <svg viewBox="0 0 24 24" className="skill-logo">
      <path fill="#1679A7" d="M2 14c0-5.5 4.5-10 10-10s10 4.5 10 10c0 2-2 4-4 4H6c-2 0-4-2-4-4z"/>
      <path fill="#5BB5E8" d="M12 6c-4 0-7 3-7 7h14c0-4-3-7-7-7z"/>
      <path fill="#1679A7" d="M8 11l4-3 4 3v4l-4 2-4-2v-4z"/>
      <path fill="#FFF" d="M10 12h4v2h-4z"/>
    </svg>
  ),
  nmap: (
    // Nmap logo - Network scanner eye
    <svg viewBox="0 0 24 24" className="skill-logo">
      <circle fill="#4A90D9" cx="12" cy="12" r="10"/>
      <circle fill="#1565C0" cx="12" cy="12" r="6"/>
      <circle fill="#0D47A1" cx="12" cy="12" r="3"/>
      <circle fill="#FFF" cx="12" cy="12" r="1.5"/>
      <path fill="none" stroke="#4A90D9" strokeWidth="1" d="M12 2v4M12 18v4M2 12h4M18 12h4"/>
    </svg>
  ),
  burpsuite: (
    // Burp Suite logo - Orange flame/target
    <svg viewBox="0 0 24 24" className="skill-logo">
      <circle fill="#FF6633" cx="12" cy="12" r="10"/>
      <circle fill="#FFF" cx="12" cy="12" r="7"/>
      <circle fill="#FF6633" cx="12" cy="12" r="4"/>
      <circle fill="#FFF" cx="12" cy="12" r="1.5"/>
    </svg>
  ),
  splunk: (
    // Splunk logo - Greater than symbol
    <svg viewBox="0 0 24 24" className="skill-logo">
      <rect fill="#000000" width="24" height="24" rx="3"/>
      <path fill="#65A637" d="M7 6l8 6-8 6V6z"/>
    </svg>
  ),
  iam: (
    // IAM - Identity/Key lock icon
    <svg viewBox="0 0 24 24" className="skill-logo">
      <path fill="#FF9900" d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z"/>
      <path fill="#232F3E" d="M12 6c-1.1 0-2 .9-2 2v1h-.5c-.55 0-1 .45-1 1v4c0 .55.45 1 1 1h5c.55 0 1-.45 1-1v-4c0-.55-.45-1-1-1H14V8c0-1.1-.9-2-2-2zm0 1c.55 0 1 .45 1 1v1h-2V8c0-.55.45-1 1-1z"/>
    </svg>
  ),
  firewall: (
    // Firewall/WAF - Shield with brick wall
    <svg viewBox="0 0 24 24" className="skill-logo">
      <path fill="#F44336" d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z"/>
      <rect fill="#FFF" x="5" y="8" width="6" height="3"/>
      <rect fill="#FFF" x="13" y="8" width="6" height="3"/>
      <rect fill="#FFF" x="8" y="12" width="8" height="3"/>
      <rect fill="#FFF" x="5" y="16" width="6" height="2"/>
      <rect fill="#FFF" x="13" y="16" width="4" height="2"/>
    </svg>
  ),
  siem: (
    // SIEM - Security monitoring dashboard
    <svg viewBox="0 0 24 24" className="skill-logo">
      <rect fill="#00BCD4" x="2" y="3" width="20" height="14" rx="2"/>
      <rect fill="#0097A7" x="2" y="3" width="20" height="3" rx="2"/>
      <circle fill="#4DD0E1" cx="5" cy="4.5" r="1"/>
      <rect fill="#FFF" x="4" y="8" width="7" height="3" rx="1"/>
      <rect fill="#FFF" x="13" y="8" width="7" height="3" rx="1"/>
      <rect fill="#FFF" x="4" y="12" width="16" height="3" rx="1"/>
      <rect fill="#0097A7" x="8" y="17" width="8" height="2"/>
      <rect fill="#00BCD4" x="6" y="19" width="12" height="2" rx="1"/>
    </svg>
  ),
  ssh: (
    // SSH - Secure shell terminal with lock
    <svg viewBox="0 0 24 24" className="skill-logo">
      <rect fill="#231F20" x="2" y="4" width="20" height="14" rx="2"/>
      <rect fill="#333" x="2" y="4" width="20" height="3"/>
      <circle fill="#FF5F56" cx="5" cy="5.5" r="1"/>
      <circle fill="#FFBD2E" cx="8" cy="5.5" r="1"/>
      <circle fill="#27CA40" cx="11" cy="5.5" r="1"/>
      <text x="4" y="14" fill="#00FF00" fontSize="5" fontFamily="monospace">ssh@</text>
      <path fill="#FFD700" d="M18 11v-1c0-1.1-.9-2-2-2s-2 .9-2 2v1c-.55 0-1 .45-1 1v3c0 .55.45 1 1 1h4c.55 0 1-.45 1-1v-3c0-.55-.45-1-1-1zm-1 0h-2v-1c0-.55.45-1 1-1s1 .45 1 1v1z"/>
    </svg>
  ),
  vim: (
    // Vim logo - Green V with diamond
    <svg viewBox="0 0 24 24" className="skill-logo">
      <path fill="#019833" d="M12 2L2 12l10 10 10-10L12 2z"/>
      <path fill="#FFF" d="M12 5l-7 7 7 7 7-7-7-7z"/>
      <text x="12" y="14" fill="#019833" fontSize="8" fontWeight="bold" fontFamily="serif" textAnchor="middle">V</text>
    </svg>
  ),
  grep: (
    // Grep - Search/magnifying glass with regex
    <svg viewBox="0 0 24 24" className="skill-logo">
      <circle fill="none" stroke="#4CAF50" strokeWidth="2" cx="10" cy="10" r="6"/>
      <path fill="#4CAF50" d="M14.5 14.5L20 20" stroke="#4CAF50" strokeWidth="3" strokeLinecap="round"/>
      <text x="10" y="12" fill="#4CAF50" fontSize="6" fontWeight="bold" fontFamily="monospace" textAnchor="middle">.*</text>
    </svg>
  ),
  awk: (
    // Awk/Sed - Text processing icon
    <svg viewBox="0 0 24 24" className="skill-logo">
      <rect fill="#FF9800" x="3" y="3" width="18" height="18" rx="2"/>
      <path fill="#FFF" d="M6 7h12v2H6zM6 11h10v2H6zM6 15h8v2H6z"/>
      <path fill="#FFF3E0" d="M16 11l3 3-3 3v-2h-2v-2h2v-2z"/>
    </svg>
  ),
  sed: (
    <svg viewBox="0 0 24 24" className="skill-logo">
      <path fill="#9C27B0" d="M3 5v14h18V5H3zm16 12H5V7h14v10z"/>
      <path fill="#9C27B0" d="M7 9h10v2H7V9zm0 3h8v2H7v-2z"/>
    </svg>
  ),
};

/**
 * Skills data organized by category
 * @type {ReadonlyArray<{id: string, title: string, icon: string, skills: Array<{name: string, logo: string}>}>}
 */
const SKILL_CATEGORIES = Object.freeze([
  {
    id: 'frontend',
    title: 'Frontend',
    icon: '🎨',
    skills: [
      { name: 'React', logo: 'react' },
      { name: 'JavaScript', logo: 'javascript' },
      { name: 'TypeScript', logo: 'typescript' },
      { name: 'HTML/CSS', logo: 'html' },
      { name: 'Figma', logo: 'figma' },
    ],
  },
  {
    id: 'backend',
    title: 'Backend',
    icon: '⚙️',
    skills: [
      { name: 'Node.js', logo: 'nodejs' },
      { name: 'Express.js', logo: 'express' },
      { name: 'Python', logo: 'python' },
      { name: 'Java', logo: 'java' },
      { name: 'REST APIs', logo: 'restapi' },
    ],
  },
  {
    id: 'databases',
    title: 'Databases',
    icon: '🗄️',
    skills: [
      { name: 'MongoDB', logo: 'mongodb' },
      { name: 'PostgreSQL', logo: 'postgresql' },
      { name: 'SQL', logo: 'sql' },
    ],
  },
  {
    id: 'cloud',
    title: 'Cloud & DevOps',
    icon: '☁️',
    skills: [
      { name: 'Azure', logo: 'azure' },
      { name: 'AWS', logo: 'aws' },
      { name: 'Docker', logo: 'docker' },
      { name: 'Kubernetes', logo: 'kubernetes' },
      { name: 'Terraform', logo: 'terraform' },
      { name: 'CI/CD', logo: 'cicd' },
    ],
  },
  {
    id: 'security',
    title: 'Cloud Security',
    icon: '🔐',
    skills: [
      { name: 'IAM', logo: 'iam' },
      { name: 'Firewall/WAF', logo: 'firewall' },
      { name: 'SIEM', logo: 'siem' },
      { name: 'Wireshark', logo: 'wireshark' },
      { name: 'Nmap', logo: 'nmap' },
      { name: 'Burp Suite', logo: 'burpsuite' },
      { name: 'Splunk', logo: 'splunk' },
    ],
  },
  {
    id: 'linux',
    title: 'Linux & Tools',
    icon: '🐧',
    skills: [
      { name: 'Linux', logo: 'linux' },
      { name: 'Bash', logo: 'bash' },
      { name: 'SSH', logo: 'ssh' },
      { name: 'Vim', logo: 'vim' },
      { name: 'Grep', logo: 'grep' },
      { name: 'Awk/Sed', logo: 'awk' },
      { name: 'Git', logo: 'git' },
    ],
  },
]);

/**
 * SkillCard Component
 * Renders an individual skill category card with hover effects
 */
function SkillCard({ category, delay }) {
  const { id, title, icon, skills } = category;
  
  return (
    <article 
      className="skill-card"
      aria-labelledby={`skill-title-${id}`}
      style={{ transitionDelay: delay }}
    >
      <header className="skill-card-header">
        <span className="skill-icon" role="img" aria-hidden="true">
          {icon}
        </span>
        <h3 id={`skill-title-${id}`} className="skill-category">
          {title}
        </h3>
      </header>
      <ul className="skill-list" aria-label={`${title} skills`}>
        {skills.map((skill, index) => (
          <li key={skill.name} className="skill-item" style={{ transitionDelay: `${index * 50}ms` }}>
            <span className="skill-logo-wrapper" aria-hidden="true">
              {TECH_LOGOS[skill.logo]}
            </span>
            <span className="skill-name">{skill.name}</span>
          </li>
        ))}
      </ul>
    </article>
  );
}

function Skills() {
  const [headerRef, headerInView] = useInView({ threshold: 0.2 });
  const { ref: gridRef, isInView: gridInView, getDelay } = useStaggeredAnimation(
    SKILL_CATEGORIES.length,
    { threshold: 0.1, staggerDelay: 150 }
  );

  return (
    <section 
      id="skills" 
      className="skills"
      aria-labelledby="skills-heading"
    >
      <div className="skills-container">
        {/* Section Header */}
        <header 
          ref={headerRef}
          className={`section-header animate-fade-up ${headerInView ? 'in-view' : ''}`}
        >
          <h2 id="skills-heading" className="section-title">
            <span className="title-number" aria-hidden="true">01.</span>
            Skills & Technologies
          </h2>
          <div className="section-line" aria-hidden="true" />
        </header>

        <p className={`skills-intro animate-fade-up ${headerInView ? 'in-view' : ''}`} style={{ transitionDelay: '200ms' }}>
          Here are the technologies and tools I've been working with:
        </p>

        {/* Skills Grid */}
        <div 
          ref={gridRef}
          className={`skills-grid ${gridInView ? 'in-view' : ''}`}
        >
          {SKILL_CATEGORIES.map((category, index) => (
            <SkillCard 
              key={category.id} 
              category={category} 
              delay={getDelay(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Skills;
