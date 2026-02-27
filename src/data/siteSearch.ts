export interface SiteSearchPattern {
    pattern: string // 域名匹配模式
    name: string
    urlTemplate: string // 使用 {query} 作为查询占位符
}

// 内置站内搜索模式
export const SITE_SEARCH_PATTERNS: SiteSearchPattern[] = [
    // 搜索引擎
    { pattern: 'google.com', name: 'Google', urlTemplate: 'https://www.google.com/search?q={query}' },
    { pattern: 'bing.com', name: 'Bing', urlTemplate: 'https://www.bing.com/search?q={query}' },
    { pattern: 'baidu.com', name: '百度', urlTemplate: 'https://www.baidu.com/s?wd={query}' },
    { pattern: 'duckduckgo.com', name: 'DuckDuckGo', urlTemplate: 'https://duckduckgo.com/?q={query}' },
    { pattern: 'yahoo.com', name: 'Yahoo', urlTemplate: 'https://search.yahoo.com/search?p={query}' },
    { pattern: 'yandex.com', name: 'Yandex', urlTemplate: 'https://yandex.com/search/?text={query}' },
    { pattern: 'sogou.com', name: '搜狗', urlTemplate: 'https://www.sogou.com/web?query={query}' },
    { pattern: '360.cn', name: '360搜索', urlTemplate: 'https://www.so.com/s?q={query}' },
    { pattern: 'so.com', name: '360搜索', urlTemplate: 'https://www.so.com/s?q={query}' },
    // 视频
    { pattern: 'youtube.com', name: 'YouTube', urlTemplate: 'https://www.youtube.com/results?search_query={query}' },
    { pattern: 'bilibili.com', name: 'bilibili', urlTemplate: 'https://search.bilibili.com/all?keyword={query}' },
    { pattern: 'twitch.tv', name: 'Twitch', urlTemplate: 'https://www.twitch.tv/search?term={query}' },
    { pattern: 'vimeo.com', name: 'Vimeo', urlTemplate: 'https://vimeo.com/search?q={query}' },
    { pattern: 'netflix.com', name: 'Netflix', urlTemplate: 'https://www.netflix.com/search?q={query}' },
    { pattern: 'iqiyi.com', name: '爱奇艺', urlTemplate: 'https://so.iqiyi.com/so/q_{query}' },
    { pattern: 'youku.com', name: '优酷', urlTemplate: 'https://so.youku.com/search_video/q_{query}' },
    { pattern: 'disneyplus.com', name: 'Disney+', urlTemplate: 'https://www.disneyplus.com/search/{query}' },
    { pattern: 'primevideo.com', name: 'Prime Video', urlTemplate: 'https://www.primevideo.com/search?phrase={query}' },
    { pattern: 'dailymotion.com', name: 'Dailymotion', urlTemplate: 'https://www.dailymotion.com/search/{query}' },
    { pattern: 'nicovideo.jp', name: 'niconico', urlTemplate: 'https://www.nicovideo.jp/search/{query}' },
    { pattern: 'tiktok.com', name: 'TikTok', urlTemplate: 'https://www.tiktok.com/search?q={query}' },
    { pattern: 'douyin.com', name: '抖音', urlTemplate: 'https://www.douyin.com/search/{query}' },
    // 社交 / 社区
    { pattern: 'x.com', name: 'X', urlTemplate: 'https://x.com/search?q={query}' },
    { pattern: 'twitter.com', name: 'X', urlTemplate: 'https://x.com/search?q={query}' },
    { pattern: 'reddit.com', name: 'Reddit', urlTemplate: 'https://www.reddit.com/search/?q={query}' },
    { pattern: 'facebook.com', name: 'Facebook', urlTemplate: 'https://www.facebook.com/search/top/?q={query}' },
    { pattern: 'instagram.com', name: 'Instagram', urlTemplate: 'https://www.instagram.com/explore/tags/{query}/' },
    { pattern: 'linkedin.com', name: 'LinkedIn', urlTemplate: 'https://www.linkedin.com/search/results/all/?keywords={query}' },
    { pattern: 'pinterest.com', name: 'Pinterest', urlTemplate: 'https://www.pinterest.com/search/pins/?q={query}' },
    { pattern: 'weibo.com', name: '微博', urlTemplate: 'https://s.weibo.com/weibo?q={query}' },
    { pattern: 'douban.com', name: '豆瓣', urlTemplate: 'https://www.douban.com/search?q={query}' },
    { pattern: 'zhihu.com', name: '知乎', urlTemplate: 'https://www.zhihu.com/search?q={query}' },
    { pattern: 'quora.com', name: 'Quora', urlTemplate: 'https://www.quora.com/search?q={query}' },
    { pattern: 'tieba.baidu.com', name: '贴吧', urlTemplate: 'https://tieba.baidu.com/f/search/res?qw={query}' },
    { pattern: 'xiaohongshu.com', name: '小红书', urlTemplate: 'https://www.xiaohongshu.com/search_result?keyword={query}' },
    { pattern: 'threads.net', name: 'Threads', urlTemplate: 'https://www.threads.net/search?q={query}' },
    { pattern: 'mastodon.social', name: 'Mastodon', urlTemplate: 'https://mastodon.social/search?q={query}' },
    { pattern: 'v2ex.com', name: 'V2EX', urlTemplate: 'https://www.google.com/search?q=site:v2ex.com+{query}' },
    { pattern: 'nga.cn', name: 'NGA', urlTemplate: 'https://bbs.nga.cn/thread.php?key={query}' },
    { pattern: 'discord.com', name: 'Discord', urlTemplate: 'https://support.discord.com/hc/en-us/search?query={query}' },
    { pattern: 'telegram.org', name: 'Telegram', urlTemplate: 'https://t.me/s/{query}' },
    { pattern: 'tumblr.com', name: 'Tumblr', urlTemplate: 'https://www.tumblr.com/search/{query}' },
    // 开发者
    { pattern: 'github.com', name: 'GitHub', urlTemplate: 'https://github.com/search?q={query}' },
    { pattern: 'gitlab.com', name: 'GitLab', urlTemplate: 'https://gitlab.com/search?search={query}' },
    { pattern: 'stackoverflow.com', name: 'Stack Overflow', urlTemplate: 'https://stackoverflow.com/search?q={query}' },
    { pattern: 'stackexchange.com', name: 'Stack Exchange', urlTemplate: 'https://stackexchange.com/search?q={query}' },
    { pattern: 'npmjs.com', name: 'npm', urlTemplate: 'https://www.npmjs.com/search?q={query}' },
    { pattern: 'pypi.org', name: 'PyPI', urlTemplate: 'https://pypi.org/search/?q={query}' },
    { pattern: 'hub.docker.com', name: 'Docker Hub', urlTemplate: 'https://hub.docker.com/search?q={query}' },
    { pattern: 'crates.io', name: 'crates.io', urlTemplate: 'https://crates.io/search?q={query}' },
    { pattern: 'nuget.org', name: 'NuGet', urlTemplate: 'https://www.nuget.org/packages?q={query}' },
    { pattern: 'rubygems.org', name: 'RubyGems', urlTemplate: 'https://rubygems.org/search?query={query}' },
    { pattern: 'packagist.org', name: 'Packagist', urlTemplate: 'https://packagist.org/?query={query}' },
    { pattern: 'mvnrepository.com', name: 'Maven', urlTemplate: 'https://mvnrepository.com/search?q={query}' },
    { pattern: 'developer.mozilla.org', name: 'MDN', urlTemplate: 'https://developer.mozilla.org/en-US/search?q={query}' },
    { pattern: 'dev.to', name: 'DEV', urlTemplate: 'https://dev.to/search?q={query}' },
    { pattern: 'medium.com', name: 'Medium', urlTemplate: 'https://medium.com/search?q={query}' },
    { pattern: 'hackernews', name: 'Hacker News', urlTemplate: 'https://hn.algolia.com/?q={query}' },
    { pattern: 'news.ycombinator.com', name: 'Hacker News', urlTemplate: 'https://hn.algolia.com/?q={query}' },
    { pattern: 'codepen.io', name: 'CodePen', urlTemplate: 'https://codepen.io/search/pens?q={query}' },
    { pattern: 'juejin.cn', name: '掘金', urlTemplate: 'https://juejin.cn/search?query={query}' },
    { pattern: 'segmentfault.com', name: 'SegmentFault', urlTemplate: 'https://segmentfault.com/search?q={query}' },
    { pattern: 'csdn.net', name: 'CSDN', urlTemplate: 'https://so.csdn.net/so/search?q={query}' },
    { pattern: 'cnblogs.com', name: '博客园', urlTemplate: 'https://zzk.cnblogs.com/s?w={query}' },
    { pattern: 'bitbucket.org', name: 'Bitbucket', urlTemplate: 'https://bitbucket.org/repo/all?name={query}' },
    { pattern: 'codesandbox.io', name: 'CodeSandbox', urlTemplate: 'https://codesandbox.io/search?query={query}' },
    { pattern: 'replit.com', name: 'Replit', urlTemplate: 'https://replit.com/search?q={query}' },
    // 购物
    { pattern: 'amazon.com', name: 'Amazon', urlTemplate: 'https://www.amazon.com/s?k={query}' },
    { pattern: 'amazon.co.jp', name: 'Amazon JP', urlTemplate: 'https://www.amazon.co.jp/s?k={query}' },
    { pattern: 'amazon.co.uk', name: 'Amazon UK', urlTemplate: 'https://www.amazon.co.uk/s?k={query}' },
    { pattern: 'amazon.de', name: 'Amazon DE', urlTemplate: 'https://www.amazon.de/s?k={query}' },
    { pattern: 'taobao.com', name: '淘宝', urlTemplate: 'https://s.taobao.com/search?q={query}' },
    { pattern: 'jd.com', name: '京东', urlTemplate: 'https://search.jd.com/Search?keyword={query}' },
    { pattern: 'ebay.com', name: 'eBay', urlTemplate: 'https://www.ebay.com/sch/i.html?_nkw={query}' },
    { pattern: 'aliexpress.com', name: 'AliExpress', urlTemplate: 'https://www.aliexpress.com/wholesale?SearchText={query}' },
    { pattern: 'tmall.com', name: '天猫', urlTemplate: 'https://list.tmall.com/search_product.htm?q={query}' },
    { pattern: 'pinduoduo.com', name: '拼多多', urlTemplate: 'https://mobile.pinduoduo.com/search_result.html?search_key={query}' },
    { pattern: 'walmart.com', name: 'Walmart', urlTemplate: 'https://www.walmart.com/search?q={query}' },
    { pattern: 'etsy.com', name: 'Etsy', urlTemplate: 'https://www.etsy.com/search?q={query}' },
    { pattern: 'target.com', name: 'Target', urlTemplate: 'https://www.target.com/s?searchTerm={query}' },
    { pattern: 'bestbuy.com', name: 'Best Buy', urlTemplate: 'https://www.bestbuy.com/site/searchpage.jsp?st={query}' },
    // 知识 / 百科
    { pattern: 'wikipedia.org', name: 'Wikipedia', urlTemplate: 'https://en.wikipedia.org/w/index.php?search={query}' },
    { pattern: 'wolframalpha.com', name: 'Wolfram Alpha', urlTemplate: 'https://www.wolframalpha.com/input?i={query}' },
    { pattern: 'archive.org', name: 'Internet Archive', urlTemplate: 'https://archive.org/search?query={query}' },
    { pattern: 'wikihow.com', name: 'wikiHow', urlTemplate: 'https://www.wikihow.com/wikiHowTo?search={query}' },
    { pattern: 'scholar.google', name: 'Google Scholar', urlTemplate: 'https://scholar.google.com/scholar?q={query}' },
    // 新闻
    { pattern: 'bbc.com', name: 'BBC', urlTemplate: 'https://www.bbc.co.uk/search?q={query}' },
    { pattern: 'cnn.com', name: 'CNN', urlTemplate: 'https://edition.cnn.com/search?q={query}' },
    { pattern: 'nytimes.com', name: 'NYTimes', urlTemplate: 'https://www.nytimes.com/search?query={query}' },
    { pattern: 'theguardian.com', name: 'The Guardian', urlTemplate: 'https://www.theguardian.com/search?q={query}' },
    { pattern: 'reuters.com', name: 'Reuters', urlTemplate: 'https://www.reuters.com/search/news?query={query}' },
    { pattern: 'washingtonpost.com', name: 'Washington Post', urlTemplate: 'https://www.washingtonpost.com/search?query={query}' },
    { pattern: 'news.google', name: 'Google News', urlTemplate: 'https://news.google.com/search?q={query}' },
    // 音乐
    { pattern: 'spotify.com', name: 'Spotify', urlTemplate: 'https://open.spotify.com/search/{query}' },
    { pattern: 'soundcloud.com', name: 'SoundCloud', urlTemplate: 'https://soundcloud.com/search?q={query}' },
    { pattern: 'music.apple.com', name: 'Apple Music', urlTemplate: 'https://music.apple.com/search?term={query}' },
    { pattern: 'music.163.com', name: '网易云音乐', urlTemplate: 'https://music.163.com/#/search/m/?s={query}' },
    { pattern: 'music.youtube.com', name: 'YouTube Music', urlTemplate: 'https://music.youtube.com/search?q={query}' },
    { pattern: 'y.qq.com', name: 'QQ音乐', urlTemplate: 'https://y.qq.com/n/ryqq/search?w={query}' },
    // 地图
    { pattern: 'maps.google', name: 'Google Maps', urlTemplate: 'https://www.google.com/maps/search/{query}' },
    { pattern: 'map.baidu.com', name: '百度地图', urlTemplate: 'https://map.baidu.com/search/{query}' },
    { pattern: 'amap.com', name: '高德地图', urlTemplate: 'https://www.amap.com/search?query={query}' },
    // 游戏
    { pattern: 'steampowered.com', name: 'Steam', urlTemplate: 'https://store.steampowered.com/search/?term={query}' },
    { pattern: 'store.epicgames.com', name: 'Epic Games', urlTemplate: 'https://store.epicgames.com/browse?q={query}' },
    { pattern: 'gog.com', name: 'GOG', urlTemplate: 'https://www.gog.com/games?query={query}' },
    { pattern: 'itch.io', name: 'itch.io', urlTemplate: 'https://itch.io/search?q={query}' },
    // AI
    { pattern: 'huggingface.co', name: 'Hugging Face', urlTemplate: 'https://huggingface.co/models?search={query}' },
    { pattern: 'kaggle.com', name: 'Kaggle', urlTemplate: 'https://www.kaggle.com/search?q={query}' },
    // 设计
    { pattern: 'dribbble.com', name: 'Dribbble', urlTemplate: 'https://dribbble.com/search/{query}' },
    { pattern: 'behance.net', name: 'Behance', urlTemplate: 'https://www.behance.net/search/projects?search={query}' },
    { pattern: 'unsplash.com', name: 'Unsplash', urlTemplate: 'https://unsplash.com/s/photos/{query}' },
    { pattern: 'pexels.com', name: 'Pexels', urlTemplate: 'https://www.pexels.com/search/{query}/' },
    { pattern: 'flickr.com', name: 'Flickr', urlTemplate: 'https://www.flickr.com/search/?text={query}' },
    { pattern: 'figma.com', name: 'Figma', urlTemplate: 'https://www.figma.com/community/search?resource_type=mixed&sort_by=relevancy&query={query}' },
    // 旅行
    { pattern: 'booking.com', name: 'Booking.com', urlTemplate: 'https://www.booking.com/searchresults.html?ss={query}' },
    { pattern: 'airbnb.com', name: 'Airbnb', urlTemplate: 'https://www.airbnb.com/s/{query}/homes' },
    { pattern: 'tripadvisor.com', name: 'Tripadvisor', urlTemplate: 'https://www.tripadvisor.com/Search?q={query}' },
    // 文档 / 翻译
    { pattern: 'translate.google', name: 'Google Translate', urlTemplate: 'https://translate.google.com/?sl=auto&tl=en&text={query}' },
    { pattern: 'deepl.com', name: 'DeepL', urlTemplate: 'https://www.deepl.com/translator#auto/en/{query}' },
    // 其他
    { pattern: 'notion.so', name: 'Notion', urlTemplate: 'https://www.notion.so/search?q={query}' },
    { pattern: 'trello.com', name: 'Trello', urlTemplate: 'https://trello.com/search?q={query}' },
    { pattern: 'goodreads.com', name: 'Goodreads', urlTemplate: 'https://www.goodreads.com/search?q={query}' },
    { pattern: 'imdb.com', name: 'IMDb', urlTemplate: 'https://www.imdb.com/find/?q={query}' },
    { pattern: 'rottentomatoes.com', name: 'Rotten Tomatoes', urlTemplate: 'https://www.rottentomatoes.com/search?search={query}' },
    { pattern: 'myanimelist.net', name: 'MyAnimeList', urlTemplate: 'https://myanimelist.net/search/all?q={query}' },
    { pattern: 'bangumi.tv', name: 'Bangumi', urlTemplate: 'https://bgm.tv/subject_search/{query}' },
]

// 根据 URL 查找匹配的站内搜索模式
export function findSiteSearchPattern(url: string): SiteSearchPattern | null {
    try {
        const hostname = new URL(url).hostname
        return SITE_SEARCH_PATTERNS.find(p => hostname.includes(p.pattern)) ?? null
    } catch {
        return null
    }
}
