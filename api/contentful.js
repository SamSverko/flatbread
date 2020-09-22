import { createClient } from "contentful";

const getClient = () => {
  const client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID,
    accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
  });

  return client;
};

export async function getEntries(
  contentType,
  category = false,
  order = false,
  numberOfPosts = false,
  skip = false
) {
  const query = {
    content_type: contentType,
    "fields.ingredients[in]": "1 small carrot",
  };

  // if (category) {
  //   query["fields.categories.sys.id[in]"] = category;
  // }

  // if (order) {
  //   query.order = "-fields.date";
  // }

  // if (numberOfPosts && !isNaN(numberOfPosts)) {
  //   query.limit = numberOfPosts;
  // }

  // if (skip) {
  //   query.skip = skip;
  // }

  const entries = await getClient().getEntries(query);

  return entries.items;
}

export async function getEntryById(id) {
  const entry = await getClient().getEntry(id);

  return entry.fields;
}

export async function getEntryBySlug(contentType, slug) {
  const entries = await getClient().getEntries({
    content_type: contentType,
    "fields.slug[in]": slug,
    limit: 1,
  });

  return entries.items[0].fields;
}
