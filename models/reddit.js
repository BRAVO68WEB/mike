module.exports = async (data) => {

  data = await Object.assign({
      object: null,
      sub: null,
      type: 'image'
  }, data)


  Mike.http.get(`https://www.reddit.com/r/${data.sub}/top/.json?sort=top&t=day&limit=400`).then(async response => {

      const filters = {
          image: post => post.data.post_hint === 'image',
          text: post => post.data.post_hint !== 'image' && post.data.selftext.length <= 2000 && post.data.title.length <= 256
      };
      const posts = response.body.data.children.filter(filters[data.type]).filter(post => post.data.over_18 == false)
      const post = posts[Math.floor(Math.random() * posts.length)]
      const postTitle = post.data.title.length > 256 ? `${post.data.title.slice(0, 253)}...` : post.data.title

      if(data.type === "text"){
        Mike.models.snap({
          object: data.object,
          title: postTitle,
          message: post.data.selftext,
          url: `https://www.reddit.com${post.data.permalink}`,
          image: data.type === 'image' ? post.data.url : '',
          footer: `👍 ${post.data.ups} | 💬 ${post.data.num_comments}`
        })
      }

      Mike.models.snap({
        object: data.object,
        title: postTitle,
        message: ``,
        url: `https://www.reddit.com${post.data.permalink}`,
        image: data.type === 'image' ? post.data.url : '',
        footer: `👍 ${post.data.ups} | 💬 ${post.data.num_comments}`
      })

  }).catch(error => {

      return require('../handlers/error')(data.object, error)

  })
}
