export function listProviders(config) {
  for (const provider of Object.keys(config.providers).sort()) {
    console.log(provider);
  }
}

export function listSkills(config) {
  for (const skill of config.skills) {
    console.log(skill.name);
  }
}

export function listCommands(config, provider) {
  const providerSpec = config.providers[provider];
  if (!providerSpec) {
    const available = Object.keys(config.providers).sort().join(", ");
    throw new Error(`Unknown provider '${provider}'. Available: ${available}`);
  }
  for (const command of providerSpec.commands ?? []) {
    console.log(command.name);
  }
}
