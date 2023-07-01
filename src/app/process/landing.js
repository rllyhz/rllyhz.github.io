import { API } from "../../globals/consts";
import { Api, Api2 } from "../core/Api";

const getPinnedProjects = ({ onSuccess, onFailed }) => {
  Api2.get(API.getPinnedProjects)
    .onSuccess(onSuccess)
    .onFailed(onFailed)
    .execute();
};

const sendEmail = async ({
  onSuccess,
  onFailed,
  body = { fullname: "", email: "", message: "" },
}) => {
  let ipDetailsClient = null;

  const { success, responseData } = await Api.get(API.getIPDetailClient);

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

  const result = await Api.post(API.sendEmailToDocumentSheet, formData);

  if (result.success) {
    onSuccess();
  } else {
    onFailed();
  }
};

export {
  getPinnedProjects,
  sendEmail,
};
