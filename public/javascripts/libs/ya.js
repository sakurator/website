function renderYandexAdsBlock(name) {
    window.yaContextCb.push(() => {
        Ya.Context.AdvManager.render({
            renderTo: 'yandex_rtb_' + name,
            blockId: name,
        });
    });
}

// R-A-1622843-1