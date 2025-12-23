export type PiiHandlingMode = 'redact' | 'tokenize' | 'deny';

export interface VibeCraftEnterpriseConfig {
  enterpriseReady: true;
  changeControlRequired: boolean;
  piiHandlingMode: PiiHandlingMode;
  isoReadinessGate: boolean;
  pciScopeDeclared: boolean;
}

export const defaultEnterpriseConfig: VibeCraftEnterpriseConfig = {
  enterpriseReady: true,
  changeControlRequired: true,
  piiHandlingMode: 'deny',
  isoReadinessGate: true,
  pciScopeDeclared: true
};

export function registerEnterpriseReadiness(
  overrides: Partial<VibeCraftEnterpriseConfig> = {}
): VibeCraftEnterpriseConfig {
  return {
    ...defaultEnterpriseConfig,
    ...overrides,
    enterpriseReady: true
  };
}
