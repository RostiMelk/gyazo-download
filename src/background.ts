chrome.runtime.onMessage.addListener((e) => {
	if (e.type === 'download') {
		chrome.downloads.download({
			url: e.url,
			filename: e.filename,
		});
	}
});
