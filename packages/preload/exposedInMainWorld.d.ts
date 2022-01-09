interface Window {
    /**
     * Expose Environment versions.
     * @example
     * console.log( window.versions )
     */
    readonly versions: NodeJS.ProcessVersions;
    /**
     * Safely expose child_process API
     * @example
     * window.servers.launch({address: '127.0.0.1:3000', nickname: 'Jon_Doe'})
     */
    readonly servers: { launch({ address, nickname, onSuccess, onClose }: import("C:/Users/Fede/Documents/sade-mp/electron-poc/packages/preload/src/servers").LaunchServerOptions): void; };
}
