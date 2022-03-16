const fs = require('fs');
const { join } = require('path');
const matter = require('gray-matter');
const lunr = require('lunr');

(async () => {
  const root = process.cwd();

  const typeToPath = {
    blog: 'data/blog',
    snippet: 'data/snippets'
  };

  function getPosts(type) {
    const files = fs
      .readdirSync(join(root, typeToPath[type]))
      .filter((name) => name !== 'img');

    const posts = files
      .reduce((allPosts, postSlug) => {
        const source = fs.readFileSync(
          join(root, typeToPath[type], postSlug),
          'utf8'
        );
        const { data } = matter(source);

        return [
          {
            ...data,
            slug: postSlug.replace('.mdx', '')
          },
          ...allPosts
        ];
      }, [])
      .sort((post1, post2) => (post1.date > post2.date ? -1 : 1));
    return posts;
  }

  const documents = [...getPosts('blog'), ...getPosts('snippet')];

  const index = lunr(function () {
    this.field('title');
    this.field('subtitle');
    this.field('keywords');
    this.field('type');
    this.ref('slug');

    documents.forEach(function (doc) {
      this.add(doc);
    }, this);
  });

  const store = documents.reduce((acc, { slug, subtitle, title, type }) => {
    acc[slug] = { title, subtitle, slug, type };
    return acc;
  }, {});

  try {
    fs.readdirSync('cache');
  } catch (error) {
    fs.mkdirSync('cache');
  }

  fs.writeFile(
    'cache/search.json',
    JSON.stringify({ index, store }),
    (error) => {
      if (error) {
        return console.error(error);
      }
    }
  );
})();
