export interface SthanClientOptions {
  apiKey: string;
  baseUrl?: string;
  timeout?: number;
}

export interface SthanResponse<T> {
  Id: string;
  Result: T;
  ClientSessionId: string | null;
  StatusCode: number;
  IsError: boolean;
  Errors: string[];
}

export class SthanClient {
  private apiKey: string;
  private baseUrl: string;
  private timeout: number;

  constructor(options: SthanClientOptions) {
    this.apiKey = options.apiKey;
    this.baseUrl = (options.baseUrl || "https://api.sthan.io").replace(/\/$/, "");
    this.timeout = options.timeout || 30000;
  }

  async request<T>(path: string): Promise<SthanResponse<T>> {
    const url = `${this.baseUrl}${path}`;
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), this.timeout);

    try {
      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${this.apiKey}`,
          Accept: "application/json",
        },
        signal: controller.signal,
      });

      const body = await response.json() as SthanResponse<T>;

      if (!response.ok || body.IsError) {
        const errorMsg = body.Errors?.length
          ? body.Errors.join("; ")
          : `HTTP ${response.status}`;
        throw new SthanApiError(errorMsg, body.StatusCode, body.Errors);
      }

      return body;
    } finally {
      clearTimeout(timer);
    }
  }

  async verifyAddress(address: string) {
    return this.request<Record<string, unknown>>(
      `/AddressVerification/Usa/Single/${encodeURIComponent(address)}`
    );
  }

  async parseAddress(address: string) {
    return this.request<Record<string, unknown>>(
      `/AddressParser/USA/Single/${encodeURIComponent(address)}`
    );
  }

  async autocompleteAddress(text: string) {
    return this.request<string[]>(
      `/AutoComplete/USA/Address/${encodeURIComponent(text)}`
    );
  }

  async autocompleteCity(text: string, displayType: number = 0) {
    return this.request<string[]>(
      `/AutoComplete/USA/City/DisplayType/${displayType}/${encodeURIComponent(text)}`
    );
  }

  async autocompleteZipCode(text: string, displayType: number = 0) {
    return this.request<string[]>(
      `/AutoComplete/USA/ZipCode/DisplayType/${displayType}/${encodeURIComponent(text)}`
    );
  }

  async geocodeAddress(address: string) {
    return this.request<Record<string, unknown>>(
      `/Geocoding/USA/Forward/${encodeURIComponent(address)}`
    );
  }

  async reverseGeocode(latitude: number, longitude: number) {
    return this.request<Record<string, unknown>>(
      `/Geocoding/USA/Reverse/${latitude}/${longitude}`
    );
  }

  async ipGeolocation(ip: string) {
    return this.request<Record<string, unknown>>(
      `/IpGeolocation/${encodeURIComponent(ip)}`
    );
  }
}

export class SthanApiError extends Error {
  statusCode: number;
  errors: string[];

  constructor(message: string, statusCode: number, errors: string[] = []) {
    super(message);
    this.name = "SthanApiError";
    this.statusCode = statusCode;
    this.errors = errors;
  }
}
