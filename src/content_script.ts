const renderButton = () => {
	const button = document.createElement('button');
	button.innerText = isImage() ? 'Download image' : 'Download video';
	button.className = 'explorer-action-btn explorer-action-btn-dark';
	button.id = 'custom-download-button';
	button.style.marginBottom = '20px';

	button.onclick = () => {
		downloadAsset();
	};

	const wrapper = document.querySelector('.metadata-description .metadata-body');
	if (!wrapper || document.getElementById(button.id)) {
		return;
	}

	wrapper.insertBefore(button, wrapper.firstChild);
};

const downloadAsset = () => {
	const imageOrVideo = document.querySelector('.image-viewer') as HTMLImageElement;
	const image = imageOrVideo.src;
	const video = imageOrVideo.querySelector('source') as HTMLSourceElement;
	const url = image || video.src;
	const filename = url.split('/').pop();
	chrome.runtime.sendMessage({ type: 'download', url, filename });
};

const isImage = () => {
	const imageOrVideo = document.querySelector('.image-viewer') as HTMLImageElement;
	return imageOrVideo.tagName === 'IMG';
};

const observer = new MutationObserver(renderButton);

const config = { attributes: false, childList: true, subtree: false };
observer.observe(document.body, config);
