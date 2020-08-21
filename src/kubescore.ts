const os = require('os');
const path = require('path');
const axios = require('axios');
const core = require('@actions/core');
const io = require('@actions/io');
const exec = require('@actions/exec');
const tc = require('@actions/tool-cache');

const MacOS = 'darwin';
const Windows = 'win32';
const Linux = 'linux';

const ARM = 'arm';
const ARM64 = 'arm64';
const x64 = 'x64';

export async function downloadKubeScore(version: string | undefined = undefined): Promise<void> {
    core.info('Downloading kube-score...');
    const url = getReleaseUrl(version);
    const downloadPath = await tc.downloadTool(url);
    await io.mv(downloadPath, path.join(downloadPath, 'kube-score'));

    core.info('Adding kube-score to the cache ...');
    const toolPath = await tc.cacheDir(downloadPath, 'node', version || getLatestVersionTag());
    core.info('Done');

    core.addPath(toolPath);
    if (os.platform() !== 'win32') {
        await exec.exec('chmod', ['+x', toolPath]);
    }
}

export async function runKubeScore(): Promise<void> {
    await exec.exec('kube-score', ['version']);
}

export async function getReleaseUrl(version: string | undefined): Promise<string> {
    if (!!version) {
        version = await getLatestVersionTag();
    }
    const architecture = getArchitecture();
    const osInfo = getOperatingSystemInfo();

    if (!architecture || !osInfo) {
        return '';
    }

    const platform = osInfo[0];
    const suffix = osInfo[1];


    return `https://github.com/zegl/kube-score/releases/download/v${version}/kube-score_${platform}_${architecture}${suffix}`
}

function getArchitecture(): string {
    const architecture = os.arch();
    const allowedArchitectures = [ARM, ARM64, x64];

    if (!allowedArchitectures.includes(architecture)) {
        core.error("[FATAL] Unsupported architecture... Supported: ARMv6, ARM64, x64.");
        return '';
    }

    switch (architecture) {
        case ARM:
            return 'armv6';
        case ARM64:
            return 'arm64';
        default:
            return 'amd64';
    }
}

function getOperatingSystemInfo(): [string, string] {
    const osPlatform = os.platform();

    switch (osPlatform) {
        case MacOS:
            return ['darwin', ''];
        case Windows:
            return ['windows', '.exe'];
        case Linux:
            return ['linux', ''];
        default:
            core.error("[FATAL] Unsupported OS... Supported: MacOS, Windows, Linux.");
            return ['', ''];
    }
}

async function getLatestVersionTag(): Promise<string> {
    return await axios.get('https://api.github.com/repos/zegl/kube-score/releases/latest').then(function (response: { data: { tag_name: string; }; }) {
        return response.data.tag_name.replace('v', '');
    }).catch(function (error: { message: string; }) {
        core.error("[FATAL] Error while retrieving latest version tag: " + error.message);
        return '';
    });
}
