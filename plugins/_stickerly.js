import axios from 'axios';

async function stickerlys(query) {

try {
if (!query) throw new Error('Ingrese El Texto Para Buscarlo ps');

const response = await axios.post('https://api.sticker.ly/v4/stickerPack/smartSearch',
      {
        keyword: query,
        enabledKeywordSearch: true,
        filter: {
          extendSearchResult: false,
          sortBy: 'RECOMMENDED',
          languages: ['ALL'],
          minStickerCount: 5,
          searchBy: 'ALL',
          stickerType: 'ALL',
        },
      },
      {
        headers: {
          'user-agent': 'androidapp.stickerly/3.17.0 (Redmi Note 4; U; Android 29; in-ID; id;)',
          'content-type': 'application/json',
          'accept-encoding': 'gzip',
        },
      }
    )

const packs = response.data.result.stickerPacks.map((pack) => ({
name: pack.name,
author: pack.authorName,
stickerCount: pack.resourceFiles.length,
viewCount: pack.viewCount,
exportCount: pack.exportCount,
isPaid: pack.isPaid,
isAnimated: pack.isAnimated,
thumbnailUrl: `${pack.resourceUrlPrefix}${pack.resourceFiles[pack.trayIndex]}`,
url: pack.shareUrl,
}));

return {
creator: 'Pecausa',
status: true,
data: packs,
}

} catch (error) {
return {
creator: 'Pecausa',
status: false,
message: error.message,
    }
  }
}

export default stickerlys