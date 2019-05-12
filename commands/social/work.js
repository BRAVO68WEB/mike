exports.output = async ({message, dbUser}) => {

    if (dbUser.work < Math.trunc(Date.now() - 10800000)) {
        let bonus = 0
        let bonusMessage = ''
        const count = await Mike.utils.array.getCount(dbUser.inventory,"box")
        if (await count > 0){
            bonus =  Math.trunc(count*20 * Math.random()+5)
            bonusMessage += `\n\n\` + ${bonus}$ (${count}x\`<:itemBox:523918710717546557>\`)\``
        }
        const received = Math.trunc(Math.random() * 50 + 100);
        await Mike.db.update('users', message.author.id, 'work', Math.trunc(Date.now()));
        await Mike.db.addMoney(message.author.id, received+bonus);
        return Mike.exec.snap(message ,`\`You received ${received}$\`` + bonusMessage, false)
    } else {
        const left = Math.abs((Date.now() - 10800000 - dbUser.work) / 1000);
        return Mike.exec.error(message, `Wait another: ${Math.trunc(left / 60 / 60 % 24)} hours, ${Math.trunc(left / 60 % 60)} minutes and ${Math.trunc(left % 60)} seconds.`)
    }
}
exports.data = {
    triggers: ['work'],
    description: 'Work for cash.',
    voter: true
}
