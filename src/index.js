(() => {
  var __defProp = Object.defineProperty;
  var __name = (target, value) => __defProp(target, "name", { value, configurable: true });

  // src/index.js
  addEventListener("fetch", (event) => {
    event.respondWith(handleRequest(event.request));
  });
  async function handleRequest(request) {
    const targetBaseUrl = self['targetBaseUrl'];
    const url = new URL(request.url);
    const targetUrl = new URL(targetBaseUrl);
    targetUrl.pathname = url.pathname;
    targetUrl.search = url.search;
    const modifiedRequest = new Request(targetUrl, {
      method: request.method,
      headers: request.headers,
      body: request.body,
      redirect: "follow"
    });
    modifiedRequest.headers.set("X-Forwarded-For", request.headers.get("X-Forwarded-For") || request.headers.get("CF-Connecting-IP") || request.headers.get("X-Real-IP") || "");
    modifiedRequest.headers.set("Referer", request.headers.get("Referer") || "");
    modifiedRequest.headers.set("User-Agent", request.headers.get("User-Agent") || "");
    const response = await fetch(modifiedRequest);
    return response;
  }
  __name(handleRequest, "handleRequest");
})();
//# sourceMappingURL=index.js.map
