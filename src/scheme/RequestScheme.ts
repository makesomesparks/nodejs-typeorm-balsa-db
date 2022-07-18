const RequestScheme =
{
   value: "value",
   public: "public",
   passphrase: "passphrase",
   type: "type",
   responseType: "responseType"
};

export type ResponseType = "plain" | "json" | "yaml";
export type TypeType = "text" | "json" | "array" | "number" | "boolean" | "date" | "yaml" | "base64" | "binary";

export { RequestScheme as default };