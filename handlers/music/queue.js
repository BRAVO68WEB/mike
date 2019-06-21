module.exports = class queue {
    constructor(gid) {
        this.songs = []
        this.np = {title: "", channel: "", length: 0, requester: "", url: "", track: "", paused: false, pd: 0, date: Date.now()}
        this.loop = false
        this.repeat = false
        this.pause = this.pause
        this.resume = this.resume
        Mike.queue[gid] = this
    }
    addSong(track, url, title, length, channel, requester) {
        this.songs.push({track, url, title, length, channel, requester})
    }
    pause() {
        this.np.paused = true
        this.np.pd = Date.now() - this.np.date
    }
    resume() {
        this.np.date = Date.now() - this.np.pd
        this.np.paused = false
    }
}
