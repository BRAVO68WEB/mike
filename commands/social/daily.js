exports.output = async ({message, dbUser}) => {

    if (dbUser.daily < Math.trunc(Date.now() - 86400000)) {
        let bonus = 0
        let bonusMessage = ''
        const count = await Mike.utils.array.getCount(dbUser.inventory,"coin")
        if (await count > 0){
            bonus =  Math.trunc(count*50 * Math.random()+25)
            bonusMessage += `\n\n\` + ${bonus}$ (${count}x\`<:itemCoin:523904670855331840>\`)\``
        }
        const received = Math.trunc(Math.random() * 200 + 100);
        await Mike.db.update('users', message.author.id, 'daily', Math.trunc(Date.now()));
        await Mike.db.addMoney(message.author.id, received+bonus);
        return Mike.exec.snap(message ,`\`You received ${received}$\`` + bonusMessage, false)
    } else {
        const left = Math.abs((Date.now() - 86400000 - dbUser.daily) / 1000);
        return Mike.exec.error(message, `Wait another: ${Math.trunc(left / 60 / 60 % 24)} hours, ${Math.trunc(left / 60 % 60)} minutes and ${Math.trunc(left % 60)} seconds.`)
    }
}
exports.data = {
    triggers: ['daily'],
    description: 'Gives your daily cash.'
}
