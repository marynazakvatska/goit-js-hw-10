const profile = {
   name: 'Jacques Gluke',
   tag: 'jgluke',
   location: 'Ocho Rios, Jamaica',
   avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/r_oy/128.jpg',
   stats: {
     followers: 5603,
     views: 4827,
     likes: 1308,
   },
};
const { name, stats: { followers, views, likes } } = profile
console.log(likes, name)

const keys = Object.keys(profile)
console.log(keys)
for (const key of keys) {
    console.log(key)
 /*    console.log(profile[key]) */
}