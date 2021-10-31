window.dataLayer = window.dataLayer || [];
function gtag() {
  dataLayer.push(arguments);
}

if (!process.env.NODE_ENV === "development") {
  gtag("js", new Date());

  gtag("config", process.env.GTAG_ID);
}
