addEventListener("fetch", (event) => {
  event.respondWith(handleRequest(event.request));
});

async function handleRequest(request) {
  try {
    let url = new URL(request.url);
    let path = url.pathname;
    let splitted = path.split("/");

    let projectId = splitted[1];
    let accessToken = splitted[2];
    let fileName = splitted[3];

    if (!projectId) throw new Error("Project ID is required");
    if (!accessToken) throw new Error("Access token is required");
    if (!fileName) throw new Error("File name is required");

    let fetchUrl = `https://drive.deta.sh/v1/${projectId}/termux-surveillance/files/download?name=${fileName}`;

    return fetch(fetchUrl, {
      method: "GET",
      headers: {
        "X-API-Key": accessToken,
      },
    });
  } catch (error) {
    return new Response(error.message, {
      status: 400,
      headers: {
        "content-type": "text/plain;charset=UTF-8",
      },
    });
  }
}
