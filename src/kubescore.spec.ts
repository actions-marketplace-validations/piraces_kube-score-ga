import * as os from 'os';
import * as axios from 'axios';
import { getReleaseUrl } from './kubescore';

jest.mock('os');
jest.mock('axios');

const ARMArchitecture = 'arm';
const ARM64Architecture = 'arm64';
const x64Architecture = 'x64';

const DarwinPlatform = 'darwin';
const LinuxPlatform = 'linux';
const WindowsPlatform = 'win32';

describe('getReleaseUrl returns a valid URL', () => {
    const archMock = jest.spyOn(os, 'arch');
    const platformMock = jest.spyOn(os, 'platform');
    const axiosMock = jest.spyOn(axios.default, 'get');

    function prepareMocks(architecture: string, platform: any, version = '1.11.0') {
        archMock.mockImplementation(() => architecture);
        platformMock.mockImplementation(() => platform);
        axiosMock.mockImplementation(
            () =>
                new Promise<any>((resolve) => {
                    resolve({ data: { tag_name: version } });
                }),
        );
    }

    function restoreMocks() {
        archMock.mockRestore();
        platformMock.mockRestore();
        axiosMock.mockRestore();
    }

    test('if architecture is x64 and platform Windows and version is provided', async () => {
        prepareMocks(x64Architecture, WindowsPlatform);

        const releaseUrl = await getReleaseUrl('1.8.0');
        expect(releaseUrl).toBe(
            'https://github.com/zegl/kube-score/releases/download/v1.8.0/kube-score_1.8.0_windows_amd64.exe',
        );

        restoreMocks();
    });

    test('if architecture is ARM and platform Windows and version is provided', async () => {
        prepareMocks(ARMArchitecture, WindowsPlatform);

        const releaseUrl = await getReleaseUrl('1.8.0');
        expect(releaseUrl).toBe(
            'https://github.com/zegl/kube-score/releases/download/v1.8.0/kube-score_1.8.0_windows_armv6.exe',
        );

        restoreMocks();
    });

    test('if architecture is ARM64 and platform Windows and version is provided', async () => {
        prepareMocks(ARM64Architecture, WindowsPlatform);

        const releaseUrl = await getReleaseUrl('1.8.0');
        expect(releaseUrl).toBe(
            'https://github.com/zegl/kube-score/releases/download/v1.8.0/kube-score_1.8.0_windows_arm64.exe',
        );

        restoreMocks();
    });

    test('if architecture is x64 and platform Darwin and version is provided', async () => {
        prepareMocks(x64Architecture, DarwinPlatform);

        const releaseUrl = await getReleaseUrl('1.8.0');
        expect(releaseUrl).toBe(
            'https://github.com/zegl/kube-score/releases/download/v1.8.0/kube-score_1.8.0_darwin_amd64',
        );

        restoreMocks();
    });

    test('if architecture is ARM and platform Darwin and version is provided', async () => {
        prepareMocks(ARMArchitecture, DarwinPlatform);

        const releaseUrl = await getReleaseUrl('1.8.0');
        expect(releaseUrl).toBe(
            'https://github.com/zegl/kube-score/releases/download/v1.8.0/kube-score_1.8.0_darwin_armv6',
        );

        restoreMocks();
    });

    test('if architecture is ARM64 and platform Darwin and version is provided', async () => {
        prepareMocks(ARM64Architecture, DarwinPlatform);

        const releaseUrl = await getReleaseUrl('1.8.0');
        expect(releaseUrl).toBe(
            'https://github.com/zegl/kube-score/releases/download/v1.8.0/kube-score_1.8.0_darwin_arm64',
        );

        restoreMocks();
    });

    test('if architecture is x64 and platform Linux and version is provided', async () => {
        prepareMocks(x64Architecture, LinuxPlatform);

        const releaseUrl = await getReleaseUrl('1.8.0');
        expect(releaseUrl).toBe(
            'https://github.com/zegl/kube-score/releases/download/v1.8.0/kube-score_1.8.0_linux_amd64',
        );

        restoreMocks();
    });

    test('if architecture is ARM and platform Linux and version is provided', async () => {
        prepareMocks(ARMArchitecture, LinuxPlatform);

        const releaseUrl = await getReleaseUrl('1.8.0');
        expect(releaseUrl).toBe(
            'https://github.com/zegl/kube-score/releases/download/v1.8.0/kube-score_1.8.0_linux_armv6',
        );

        restoreMocks();
    });

    test('if architecture is ARM64 and platform Linux and version is provided', async () => {
        prepareMocks(ARM64Architecture, LinuxPlatform);

        const releaseUrl = await getReleaseUrl('1.8.0');
        expect(releaseUrl).toBe(
            'https://github.com/zegl/kube-score/releases/download/v1.8.0/kube-score_1.8.0_linux_arm64',
        );

        restoreMocks();
    });

    test('if architecture is x64 and platform Windows and version is not provided', async () => {
        prepareMocks(x64Architecture, WindowsPlatform);

        const releaseUrl = await getReleaseUrl(undefined);
        expect(releaseUrl).toBe(
            'https://github.com/zegl/kube-score/releases/download/v1.11.0/kube-score_1.11.0_windows_amd64.exe',
        );

        restoreMocks();
    });

    test('if architecture is ARM and platform Windows and version is not provided', async () => {
        prepareMocks(ARMArchitecture, WindowsPlatform);

        const releaseUrl = await getReleaseUrl(undefined);
        expect(releaseUrl).toBe(
            'https://github.com/zegl/kube-score/releases/download/v1.11.0/kube-score_1.11.0_windows_armv6.exe',
        );

        restoreMocks();
    });

    test('if architecture is ARM64 and platform Windows and version is not provided', async () => {
        prepareMocks(ARM64Architecture, WindowsPlatform);

        const releaseUrl = await getReleaseUrl(undefined);
        expect(releaseUrl).toBe(
            'https://github.com/zegl/kube-score/releases/download/v1.11.0/kube-score_1.11.0_windows_arm64.exe',
        );

        restoreMocks();
    });

    test('if architecture is x64 and platform Darwin and version is not provided', async () => {
        prepareMocks(x64Architecture, DarwinPlatform);

        const releaseUrl = await getReleaseUrl(undefined);
        expect(releaseUrl).toBe(
            'https://github.com/zegl/kube-score/releases/download/v1.11.0/kube-score_1.11.0_darwin_amd64',
        );

        restoreMocks();
    });

    test('if architecture is ARM and platform Darwin and version is not provided', async () => {
        prepareMocks(ARMArchitecture, DarwinPlatform);

        const releaseUrl = await getReleaseUrl(undefined);
        expect(releaseUrl).toBe(
            'https://github.com/zegl/kube-score/releases/download/v1.11.0/kube-score_1.11.0_darwin_armv6',
        );

        restoreMocks();
    });

    test('if architecture is ARM64 and platform Darwin and version is not provided', async () => {
        prepareMocks(ARM64Architecture, DarwinPlatform);

        const releaseUrl = await getReleaseUrl(undefined);
        expect(releaseUrl).toBe(
            'https://github.com/zegl/kube-score/releases/download/v1.11.0/kube-score_1.11.0_darwin_arm64',
        );

        restoreMocks();
    });

    test('if architecture is x64 and platform Linux and version is not provided', async () => {
        prepareMocks(x64Architecture, LinuxPlatform);

        const releaseUrl = await getReleaseUrl(undefined);
        expect(releaseUrl).toBe(
            'https://github.com/zegl/kube-score/releases/download/v1.11.0/kube-score_1.11.0_linux_amd64',
        );

        restoreMocks();
    });

    test('if architecture is ARM and platform Linux and version is not provided', async () => {
        prepareMocks(ARMArchitecture, LinuxPlatform);

        const releaseUrl = await getReleaseUrl(undefined);
        expect(releaseUrl).toBe(
            'https://github.com/zegl/kube-score/releases/download/v1.11.0/kube-score_1.11.0_linux_armv6',
        );

        restoreMocks();
    });

    test('if architecture is ARM64 and platform Linux and version is not provided', async () => {
        prepareMocks(ARM64Architecture, LinuxPlatform);

        const releaseUrl = await getReleaseUrl(undefined);
        expect(releaseUrl).toBe(
            'https://github.com/zegl/kube-score/releases/download/v1.11.0/kube-score_1.11.0_linux_arm64',
        );

        restoreMocks();
    });
});
