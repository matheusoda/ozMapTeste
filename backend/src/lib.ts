import https from "https";
import { URL } from "url";

class GeoLib {
    private readonly GOOGLE_API_KEY = process.env.GOOGLE_KEY;

    private makeRequest(url: string): Promise<any> {
        return new Promise((resolve, reject) => {
            https
                .get(url, (res) => {
                    let data = "";

                    res.on("data", (chunk) => {
                        data += chunk;
                    });

                    res.on("end", () => {
                        try {
                            const json = JSON.parse(data);
                            if (json.status === "OK") {
                                resolve(json);
                            } else {
                                reject(new Error(`API Error: ${json.status}`));
                            }
                        } catch (err) {
                            reject(
                                new Error(`JSON Parsing Error: ${err.message}`)
                            );
                        }
                    });
                })
                .on("error", (err) => {
                    reject(new Error(`HTTP Request Failed: ${err.message}`));
                });
        });
    }

    public async getAddressFromCoordinates(
        coordinates: [number, number] | { lat: number; lng: number }
    ): Promise<string> {
        const lat = Array.isArray(coordinates)
            ? coordinates[1]
            : coordinates.lat;
        const lng = Array.isArray(coordinates)
            ? coordinates[0]
            : coordinates.lng;

        const url = new URL(
            "https://maps.googleapis.com/maps/api/geocode/json"
        );
        url.searchParams.append("latlng", `${lat},${lng}`);
        url.searchParams.append("key", this.GOOGLE_API_KEY);

        try {
            const data = await this.makeRequest(url.toString());
            const address = data.results[0]?.formatted_address;
            if (!address) throw new Error("No address found");
            return address;
        } catch (err) {
            throw new Error(`getAddressFromCoordinates Error: ${err.message}`);
        }
    }

    public async getCoordinatesFromAddress(
        address: string
    ): Promise<{ lat: number; lng: number }> {
        const url = new URL(
            "https://maps.googleapis.com/maps/api/geocode/json"
        );
        url.searchParams.append("address", address);
        url.searchParams.append("key", this.GOOGLE_API_KEY);

        try {
            const data = await this.makeRequest(url.toString());
            const location = data.results[0]?.geometry?.location;
            if (!location) throw new Error("No coordinates found");
            return { lat: location.lat, lng: location.lng };
        } catch (err) {
            throw new Error(`getCoordinatesFromAddress Error: ${err.message}`);
        }
    }
}

export default new GeoLib();
