exports.output = async ({message, args}) => {
    const song = args.slice(0).join(' ')
    const req = await Mike.utils.lyrics.request(`search?q=${encodeURIComponent(song)}`);
    const lyricdata = req.response.hits[0];
    if (!lyricdata) return Mike.exec.error(message, "The provided song could not be found.");
    const picture = lyricdata.result.song_art_image_thumbnail_url;
    const extendedsong = lyricdata.result.title_with_featured;
    const artist = lyricdata.result.primary_artist.name;
    const lyricsbody = await Mike.utils.lyrics.scrape(lyricdata.result.url);
    if (!lyricsbody) return Mike.exec.error(message, "The provided song could not be found.");
    return Mike.exec.snap(message,`${extendedsong} - ${artist}\n\n${lyricsbody.length >= 1900 ? `${lyricsbody.substr(0, 1900)}...` : lyricsbody}`,true, picture)
};

exports.data = {
    triggers: ['lyrics'],
    description: 'Shows track lyrics.',
    usage: [
        '{prefix}{command} <title>'
    ],
    args: [
        {
            'type':'any',
            'name':'text'
        }
    ]
}
