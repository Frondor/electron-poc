interface Window {
  /**
   * Expose Environment versions.
   * @example
   * console.log( window.versions )
   */
  readonly versions: NodeJS.ProcessVersions;

  readonly servers: { launch: (options: import('./src/servers').LaunchServerOptions) => void };
}
