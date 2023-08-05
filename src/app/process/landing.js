import { APIUrl } from "../../globals/consts";
import { Api, ApiFetch } from "../core/Api";

const getPinnedProjects = ({ onSuccess, onFailed }) => {
  Api.get(APIUrl.getPinnedProjects)
    .onSuccess(onSuccess)
    .onFailed(onFailed)
    .execute();
};

const sendContactMessage = async ({
  onSuccess,
  onFailed,
  body = { fullname: "", email: "", message: "" },
}) => {
  let ipDetailsClient = null;

  const { success, responseData } = await ApiFetch.get(APIUrl.getIPDetailClient);

  if (!success) {
    onFailed(responseData.status, responseData.error);
    return;
  }

  ipDetailsClient = responseData;

  const formData = new FormData();

  formData.append("ip_address", ipDetailsClient.ip ?? "");
  formData.append("city", ipDetailsClient.city ?? "");
  formData.append("region", `${ipDetailsClient.region ?? ""} (${ipDetailsClient.region_code ?? ""})`);
  formData.append("country", `${ipDetailsClient.country_name ?? ""} (${ipDetailsClient.country ?? ""})`);
  formData.append("timezone", ipDetailsClient.timezone ?? "");
  formData.append("organization", ipDetailsClient.org ?? "");
  formData.append("latitude", ipDetailsClient.latitude ?? "");
  formData.append("longitude", ipDetailsClient.longitude ?? "");
  formData.append("languages", ipDetailsClient.languages ?? "");
  formData.append("currency", ipDetailsClient.currency ?? "");
  formData.append("currency_name", ipDetailsClient.currency_name ?? "");
  formData.append("country_capital", ipDetailsClient.country_capital ?? "");
  formData.append("country_calling_code", ipDetailsClient.country_calling_code ?? "");
  formData.append("country_population", ipDetailsClient.country_population ?? "");
  formData.append("country_tld", ipDetailsClient.country_tld ?? "");
  formData.append("country_area", ipDetailsClient.country_area ?? "");
  formData.append("asn", ipDetailsClient.asn ?? "");

  const { fullname = "", email = "", message = "" } = body;
  formData.append("fullname", fullname);
  formData.append("email", email);
  formData.append("message", message);

  const data = {};
  formData.forEach((value, key) => { data[key] = value; });

  const headers = new Headers({
    "Content-Type": "application/json",
  });

  Api.post(APIUrl.contactMessages, JSON.stringify(data), headers)
    .onFailed(onFailed)
    .onSuccess(onSuccess)
    .execute();
};

export {
  getPinnedProjects,
  sendContactMessage,
};
