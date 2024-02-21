import fs from 'fs';
import { resolve } from 'path';

async function main() {
    const channelsJson = await fetch(
        'https://fastly.jsdelivr.net/gh/LeGend-wLw/my-tv-json-utils@main/channels.json',
    );
    const channels = await channelsJson.json();

    let content = '#EXTM3U' + '\n';
    channels.forEach((channel) => {
        const videoUrl = channel.videoUrl?.[0];
        const title = channel.title;
        const id = channel.id;
        const logo = channel.logo;
        if (videoUrl) {
            const line1 = `#EXTINF:-1 tvg-id="${id}" tvg-logo="${logo}",${title}` + '\n';
            const line2 = videoUrl + '\n\n';
            content = content + line1 + line2;
        }
    });
    if (content) {
        const outDir = resolve(__dirname, '..');
        const outPackagePath = resolve(outDir, 'channels.m3u');
        fs.writeFileSync(outPackagePath, content);
    }
}

main();
