
// /assets/social-links.js
// Reusable <social-links> web component for social + podcast icons
// Usage:
// 1) <script type="module" src="/assets/social-links.js"></script>
// 2) Place <social-links></social-links> where you want the icons.
// 3) (Optional) Override per page with attributes, e.g.:
//    <social-links instagram="https://instagram.com/..." podcast-spotify="https://open.spotify.com/show/..."></social-links>
// 4) (Optional) Set global defaults (once, before this script) as:
//    <script>window.SOCIAL_DEFAULTS = { instagram:"...", youtube:"...", tiktok:"...", facebook:"...", bandcamp:"...", website:"...", podcast_spotify:"...", podcast_youtube:"...", podcast_apple:"..." };</script>

class SocialLinks extends HTMLElement {
  static get observedAttributes() {
    return [
      "instagram","youtube","tiktok","facebook","bandcamp","website",
      "podcast-spotify","podcast-youtube","podcast-apple"
    ];
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback() {
    // re-render on changes
    this.render();
  }

  getLinks() {
    const g = (window.SOCIAL_DEFAULTS || {});
    // attributes override defaults
    const a = (name) => this.getAttribute(name);
    return {
      instagram: a("instagram") || g.instagram || null,
      youtube: a("youtube") || g.youtube || null,
      tiktok: a("tiktok") || g.tiktok || null,
      facebook: a("facebook") || g.facebook || null,
      bandcamp: a("bandcamp") || g.bandcamp || null,
      website: a("website") || g.website || null,
      podcast_spotify: a("podcast-spotify") || g.podcast_spotify || null,
      podcast_youtube: a("podcast-youtube") || g.podcast_youtube || null,
      podcast_apple: a("podcast-apple") || g.podcast_apple || null,
    };
  }

  render() {
    const links = this.getLinks();

    const style = `
      :host { display: block; }
      .wrap { display:flex; flex-wrap:wrap; gap:12px; align-items:center; }
      .btn {
        width: 40px; height: 40px;
        display:flex; align-items:center; justify-content:center;
        border-radius:50%;
        text-decoration:none;
        box-shadow: 0 4px 15px rgba(0,0,0,.2);
        transition: transform .3s ease, box-shadow .3s ease, filter .2s ease;
        will-change: transform;
      }
      .btn:hover { transform: translateY(-4px) rotate(360deg); box-shadow: 0 8px 25px rgba(0,0,0,.3); }
      svg { width:22px; height:22px; fill:#fff; }

      /* brand backgrounds */
      .instagram { background: linear-gradient(45deg,#f09433 0%,#e6683c 25%,#dc2743 50%,#cc2366 75%,#bc1888 100%); }
      .youtube   { background: linear-gradient(45deg,#FF0000,#cc0000); }
      .tiktok    { background: linear-gradient(45deg,#000000,#25F4EE,#FE2C55); }
      .facebook  { background: linear-gradient(45deg,#1877f2,#0d5dbd); }
      .bandcamp  { background: linear-gradient(45deg,#1da0c3,#179fb3); }
      .website   { background: linear-gradient(45deg,#8b5cf6,#6d28d9); }

      .spotify   { background: linear-gradient(45deg,#1DB954,#12833c); }
      .apple     { background: linear-gradient(45deg,#a445f7,#7c3aed); }
      .pod-yt    { background: linear-gradient(45deg,#ff0000,#cc0000); }

      /* optional label row for podcast (pills) */
      .podcast-row { 
  display:flex; 
  flex-wrap:wrap; 
  gap:10px; 
  margin-left:6px; 

  margin-top:18px;  /* <— this adds vertical space */
}

      .pill {
        display:inline-flex; align-items:center; gap:10px;
        padding:10px 14px; border-radius:999px; color:#fff; text-decoration:none;
        box-shadow: 0 4px 15px rgba(0,0,0,.2);
        transition: transform .2s ease, box-shadow .2s ease;
      }
      .pill:hover { transform: translateY(-2px); box-shadow: 0 8px 25px rgba(0,0,0,.3); }
      .pill svg { width:20px; height:20px; }
    `;

    const icons = {
      instagram: '<path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2zm0 1.5A4.25 4.25 0 0 0 3.5 7.75v8.5A4.25 4.25 0 0 0 7.75 20.5h8.5A4.25 4.25 0 0 0 20.5 16.25v-8.5A4.25 4.25 0 0 0 16.25 3.5h-8.5zM12 7a5 5 0 1 1 0 10a5 5 0 0 1 0-10zm0 1.5a3.5 3.5 0 1 0 0 7a3.5 3.5 0 0 0 0-7zm5.75-.88a1.12 1.12 0 1 1-2.24 0a1.12 1.12 0 0 1 2.24 0z"/>',
      youtube: '<path d="M21.8 8.001c-.2-1.2-.8-2.1-2-2.3C17.7 5.3 12 5.3 12 5.3s-5.7 0-7.8.4c-1.2.2-1.8 1.1-2 2.3C2 9.2 2 12 2 12s0 2.8.2 4c.2 1.2.8 2.1 2 2.3c2.1.4 7.8.4 7.8.4s5.7 0 7.8-.4c1.2-.2 1.8-1.1 2-2.3c.2-1.2.2-4 .2-4s0-2.8-.2-4zM10 14.5v-5l5 2.5l-5 2.5z"/>',
      tiktok: '<path d="M12.5 2h3.2c.2 1.2.9 2.3 1.9 3c.9.7 2 1.2 3.1 1.3v3.3c-1.7-.1-3.4-.7-4.9-1.7v7.9c0 2.6-2.1 4.7-4.7 4.7S7.4 18.4 7.4 15.8c0-2.6 2.1-4.7 4.7-4.7h.4V7.9c-.8-.1-1.7-.1-2.5 0C6.8 8.5 4 11.8 4 15.8S7.3 23 11.4 23s7.4-3.3 7.4-7.3V2h-6.3z"/>',
      facebook: '<path d="M22 12c0-5.522-4.477-10-10-10S2 6.478 2 12c0 5 3.657 9.128 8.438 9.878V14.89H8.078v-2.89h2.36V9.845c0-2.33 1.393-3.62 3.523-3.62 1.02 0 2.086.182 2.086.182v2.29h-1.175c-1.158 0-1.52.72-1.52 1.458v1.746h2.588l-.414 2.89h-2.174v6.988C18.343 21.128 22 17 22 12z"/>',
      bandcamp: '<path d="M6 3L0 12l6 9h12l6-9-6-9H6z"/>',
      website: '<path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm0 2c1.93 0 3.68.78 4.95 2.05A6.97 6.97 0 0 0 14 8h-4a6.97 6.97 0 0 0-2.95-1.95A7.97 7.97 0 0 1 12 4zm-8 8c0-.69.1-1.36.29-2h3.32a8.07 8.07 0 0 0 0 4H4.29A7.97 7.97 0 0 1 4 12zm8 8a7.97 7.97 0 0 1-4.95-2.05A6.97 6.97 0 0 0 10 16h4a6.97 6.97 0 0 0 2.95 1.95A7.97 7.97 0 0 1 12 20zm3.39-6h-6.78a6.02 6.02 0 0 1 0-4h6.78a6.02 6.02 0 0 1 0 4zm1.69 2h3.32c-.19.64-.29 1.31-.29 2a7.97 7.97 0 0 1-.29 2h-3.32a8.07 8.07 0 0 0 0-4z"/>',
      spotify: '<path d="M12 1.8a10.2 10.2 0 1 0 0 20.4 10.2 10.2 0 0 0 0-20.4zm4.68 14.74a.8.8 0 0 1-1.1.26c-3-1.84-6.8-2.25-11.29-1.22a.8.8 0 0 1-.36-1.56c4.86-1.12 9.08-.65 12.4 1.36a.8.8 0 0 1 .35 1.16zm1.58-3.16a1 1 0 0 1-1.36.33c-3.41-2.08-8.6-2.69-12.63-1.46a1 1 0 1 1-.57-1.92c4.67-1.38 10.43-.7 14.3 1.63a1 1 0 0 1 .26 1.42zm.14-3.28a1.2 1.2 0 0 1-1.62.4c-3.9-2.32-10.37-2.54-14.1-1.39a1.2 1.2 0 1 1-.67-2.28c4.34-1.28 11.5-1.01 15.98 1.63a1.2 1.2 0 0 1 .41 1.64z"/>',
      apple: '<path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm0 3a3 3 0 0 1 3 3v5.5a3 3 0 1 1-6 0V8a3 3 0 0 1 3-3zm0 1.5A1.5 1.5 0 0 0 10.5 8v5.5a1.5 1.5 0 0 0 3 0V8A1.5 1.5 0 0 0 12 6.5zm0 11a.75.75 0 1 1 0 1.5.75.75 0 0 1 0-1.5z"/>',
    };

    const mkIcon = (cls, href, label, path) => `
      <a class="btn ${cls}" href="${href}" target="_blank" rel="noopener noreferrer" aria-label="${label}">
        <svg viewBox="0 0 24 24" aria-hidden="true">${path}</svg>
      </a>
    `;

    const rows = [];

    // Social icons row
    const socialParts = [];
    if (links.instagram) socialParts.push(mkIcon("instagram", links.instagram, "Instagram", icons.instagram));
    if (links.youtube)   socialParts.push(mkIcon("youtube",   links.youtube,   "YouTube",   icons.youtube));
    if (links.tiktok)    socialParts.push(mkIcon("tiktok",    links.tiktok,    "TikTok",    icons.tiktok));
    if (links.facebook)  socialParts.push(mkIcon("facebook",  links.facebook,  "Facebook",  icons.facebook));
    if (links.bandcamp)  socialParts.push(mkIcon("bandcamp",  links.bandcamp,  "Bandcamp",  icons.bandcamp));
    if (links.website)   socialParts.push(mkIcon("website",   links.website,   "Website",   icons.website));

    const socialRow = `<div class="wrap">${socialParts.join("")}</div>`;
    rows.push(socialRow);

    // Podcast row as labeled pills (if any exist)
    const podParts = [];
    if (links.podcast_spotify) podParts.push(`<a class="pill spotify" href="${links.podcast_spotify}" target="_blank" rel="noopener noreferrer" aria-label="Podcast on Spotify"><svg viewBox="0 0 24 24" aria-hidden="true">${icons.spotify}</svg><span>Podcast on Spotify</span></a>`);
    if (links.podcast_youtube) podParts.push(`<a class="pill pod-yt" href="${links.podcast_youtube}" target="_blank" rel="noopener noreferrer" aria-label="Podcast on YouTube"><svg viewBox="0 0 24 24" aria-hidden="true">${icons.youtube}</svg><span>Podcast on YouTube</span></a>`);
    if (links.podcast_apple) podParts.push(`<a class="pill apple" href="${links.podcast_apple}" target="_blank" rel="noopener noreferrer" aria-label="Podcast on Apple Podcasts"><svg viewBox="0 0 24 24" aria-hidden="true">${icons.apple}</svg><span>Apple Podcasts</span></a>`);

    let podRow = "";
    if (podParts.length) {
      podRow = `<div class="podcast-row">${podParts.join("")}</div>`;
      rows.push(podRow);
    }

    this.shadowRoot.innerHTML = `
      <style>${style}</style>
      ${rows.join("")}
    `;
  }
}

customElements.define("social-links", SocialLinks);
