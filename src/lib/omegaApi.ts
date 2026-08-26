export type CapabilityStatus =
  | "operational"
  | "software_operational"
  | "research_only"
  | "research_integration"
  | "test_double_only"
  | "requires_equipment"
  | "not_available"
  | "not_clinically_available"
  | "disabled"
  | "integration_required";

export interface OmegaCapability {
  id: string;
  label: string;
  status: CapabilityStatus;
  requires: string[];
}

export interface CapabilityRegistryResponse {
  service: string;
  generated_at: string;
  capabilities: OmegaCapability[];
}

export async function fetchCapabilities(): Promise<CapabilityRegistryResponse> {
  const response = await fetch("/api/capabilities");
  if (!response.ok) {
    throw new Error(`Capability service unavailable (${response.status})`);
  }
  return response.json() as Promise<CapabilityRegistryResponse>;
}
