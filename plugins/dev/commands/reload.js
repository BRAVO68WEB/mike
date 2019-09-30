exports.output = async ({message, args}) => {
  for (const path in require.cache) {
      if (path.includes('v4')) {
         if (
             path.includes('plugins')
         ) {
           delete require.cache[path]
         }
     }
   }
  await require("../../../handlers/plugins")()

  Mike.models.snap({
    object: message,
    message: `${Mike.customEmojis.markYes} \`plugins\``,
  })
}


exports.data = {
  triggers: ['reload'],
  description: 'Reload plugins.',
  developer: true,
}
