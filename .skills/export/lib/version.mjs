export function showVersion(config) {
  console.log(`${config.package.name} ${config.package.version}`);
  if (config.package.description) {
    console.log(config.package.description);
  }
}
