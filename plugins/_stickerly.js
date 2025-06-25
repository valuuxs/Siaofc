// lib/stickerly.js
import axios from 'axios';

const headers = {
  'user-agent': 'androidapp.stickerly/3.17.0 (Redmi Note 4; U; Android 29; in-ID; id;)',
  'content-type': 'application/json',
  'accept-encoding': 'gzip'
};

class StickerLy {
  async search(query) {
    if (!query) throw new Error('[❗] Debes escribir una palabra para buscar stickers.');
    try {
      const { data } = await axios.post('https://api.sticker.ly/v4/stickerPack/smartSearch', {
        keyword: query,
        enabledKeywordSearch: true,
        filter: {
          extendSearchResult: false,
          sortBy: 'RECOMMENDED',
          languages: ['ALL'],
          minStickerCount: 5,
          searchBy: 'ALL',
          stickerType: 'ALL'
        }
      }, { headers });

      const packs = data.result?.stickerPacks;
      if (!packs || !packs.length) return [];

      return packs.map(pack => ({
        name: pack.name,
        author: pack.authorName,
        stickerCount: pack.resourceFiles.length,
        viewCount: pack.viewCount,
        exportCount: pack.exportCount,
        isPaid: pack.isPaid,
        isAnimated: pack.isAnimated,
        thumbnailUrl: `${pack.resourceUrlPrefix}${pack.resourceFiles[pack.trayIndex]}`,
        url: pack.shareUrl
      }));
    } catch (err) {
      console.error('[StickerLy:search]', err.message);
      return [];
    }
  }

  async detail(url) {
    try {
      const match = url.match(/\/s\/([^\/\?#]+)/);
      if (!match) throw new Error('[❗] La URL no es válida.');

      const { data } = await axios.get(`https://api.sticker.ly/v4/stickerPack/${match[1]}?needRelation=true`, { headers });
      const result = data.result;

      return {
        name: result.name,
        author: {
          name: result.user.displayName,
          username: result.user.userName,
          bio: result.user.bio,
          followers: result.user.followerCount,
          following: result.user.followingCount,
          isPrivate: result.user.isPrivate,
          avatar: result.user.profileUrl,
          website: result.user.website,
          url: result.user.shareUrl
        },
        stickers: result.stickers.map(s => ({
          fileName: s.fileName,
          isAnimated: s.isAnimated,
          imageUrl: `${result.resourceUrlPrefix}${s.fileName}`
        })),
        stickerCount: result.stickers.length,
        viewCount: result.viewCount,
        exportCount: result.exportCount,
        isPaid: result.isPaid,
        isAnimated: result.isAnimated,
        thumbnailUrl: `${result.resourceUrlPrefix}${result.stickers[result.trayIndex].fileName}`,
        url: result.shareUrl
      };
    } catch (err) {
      console.error('[StickerLy:detail]', err.message);
      return null;
    }
  }
}

export default StickerLy;