const CONFIG = {
  url: "https://cloud.squidex.io",
  appName: "flatbread",
  clientId: "flatbread:reader",
  clientSecret: process.env.SQUIDEX_CLIENT_SECRET,
};

function getBearerToken() {
  return localStorage.getItem("token");
}

function setBearerToken(token) {
  localStorage.setItem("token", token);
}

function clearBearerToken() {
  localStorage.removeItem("token");
}

export async function getPost(id) {
  const json = await getContent(`api/content/${CONFIG.appName}/posts/${id}`);

  return parsePost(json);
}

export async function getPage(slug) {
  const json = await getContent(
    `api/content/${CONFIG.appName}/pages/?$filter=data/slug/iv eq '${slug}'`
  );

  const { items } = json;

  if (items.length === 0) {
    return null;
  }

  return parsePage(items[0]);
}

export async function getPosts() {
  const json = await getContent(`api/content/${CONFIG.appName}/posts`);

  const { total, items } = json;

  return { total, posts: items.map((x) => parsePost(x)) };
}

export async function getPages() {
  const json = await getContent(`api/content/${CONFIG.appName}/pages`);

  const { total, items } = json;

  return { total, pages: items.map((x) => parsePage(x)) };
}

function parsePost(response) {
  return {
    id: response.id,
    title: response.data.title.iv,
    text: response.data.text.iv,
    slug: response.data.slug.iv,
  };
}

function parsePage(response) {
  return {
    id: response.id,
    title: response.data.title.iv,
    text: response.data.text.iv,
    slug: response.data.slug.iv,
  };
}

export async function fetchBearerToken() {
  // Check if we have already a bearer token in local store.
  let token = getBearerToken();

  if (token) {
    return token;
  }

  const body = new FormData();
  body.set("grant_type", "client_credentials");
  body.set("client_id", CONFIG.clientId);
  body.set("client_secret", CONFIG.clientSecret);
  body.set("scope", "squidex-api");

  // Get the bearer token. Ensure that we use a client id with readonly permissions.
  const response = await fetch(buildUrl("identity-server/connect/token"), {
    method: "POST",
    body,
  });

  if (!response.ok) {
    throw new Error(`Failed to retrieve token, got ${response.statusText}`);
  }

  const json = await response.json();

  token = json.access_token;

  // Cache the bearer token in the local store.
  setBearerToken(token);

  return token;
}

function getContent(url) {
  return getContentInternal(url, true);
}

async function getContentInternal(url, retry) {
  // Fetch the bearer token.
  const token = await fetchBearerToken();

  const response = await fetch(buildUrl(url), {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    if (response.status === 403 || response.status === 401) {
      // If we get an error we clear the bearer token and retry the request.
      clearBearerToken();

      if (retry) {
        return getContentInternal(url);
      }
    }

    throw new Error(`Failed to retrieve content, got ${response.statusText}`);
  }

  return await response.json();
}

function buildUrl(url) {
  if (url.length > 0 && url.startsWith("/")) {
    url = url.substr(1);
  }

  const result = `${CONFIG.url}/${url}`;

  return result;
}

// GET ALL RECIPES
// query {
//   queryRecipesContents {
//     id
//     data {
//       title {
//         iv
//       }
//       cuisines {
//         iv {
//           data {
//             title {
//               iv
//             }
//           }
//         }
//       }
//     }
//   }
// }
